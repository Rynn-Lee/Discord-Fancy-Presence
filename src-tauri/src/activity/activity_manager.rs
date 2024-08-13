use super::{
    error::ActivityError, error::ActivityRuntimeError, helpers::build_activity, ActivityPayload,
};
use discord_rich_presence::{DiscordIpc, DiscordIpcClient};
use tokio::sync::mpsc;

use ActivityError as AE;
use ActivityRuntimeError as RE;

#[derive(Debug)]
enum ActivityMessage {
    UpdateActivity(Box<ActivityPayload>),
    UpdateClientId(String),
}

pub struct ActivityManager {
    sender: mpsc::Sender<ActivityMessage>,
}

impl ActivityManager {
    pub fn create() -> (Self, impl FnOnce() -> mpsc::Receiver<String>) {
        let (sender, receiver) = mpsc::channel(10);
        let manager = ActivityManager { sender };
        let runtime = || Self::spawn_manager_runtime(receiver);
        (manager, runtime)
    }

    pub async fn update_client_id(&self, client_id: String) -> Result<(), ActivityError> {
        self.sender
            .send(ActivityMessage::UpdateClientId(client_id))
            .await
            .or(Err(AE::SendRuntimeError))?;
        Ok(())
    }

    pub async fn update_activity(
        &self,
        activity_payload: ActivityPayload,
    ) -> Result<(), ActivityError> {
        self.sender
            .send(ActivityMessage::UpdateActivity(Box::new(activity_payload)))
            .await
            .or(Err(AE::SendRuntimeError))?;
        Ok(())
    }

    fn spawn_manager_runtime(
        mut receiver: mpsc::Receiver<ActivityMessage>,
    ) -> mpsc::Receiver<String> {
        let (error_sender, error_receiver) = mpsc::channel(10);
        tauri::async_runtime::spawn(async move {
            let mut client: Option<DiscordIpcClient> = None;
            while let Some(message) = receiver.recv().await {
                match message {
                    ActivityMessage::UpdateClientId(client_id) => {
                        if let Err(error) = Self::handle_update_client_id(&mut client, &client_id) {
                            handle_error(&error_sender, &error).await;
                        };
                    }
                    ActivityMessage::UpdateActivity(activity_payload) => {
                        if let Err(error) =
                            Self::handle_update_activity(&mut client, &activity_payload)
                        {
                            handle_error(&error_sender, &error).await;
                        };
                    }
                }
            }
        });

        error_receiver
    }

    fn handle_update_client_id(
        client: &mut Option<DiscordIpcClient>,
        new_client_id: &str,
    ) -> Result<(), ActivityRuntimeError> {
        let mut new_client = DiscordIpcClient::new(new_client_id)
            .expect("creating new client instance should not fail");

        new_client.connect().or(Err(RE::ClientConnectionFailed))?;
        *client = Some(new_client);
        Ok(())
    }

    fn handle_update_activity(
        client: &mut Option<DiscordIpcClient>,
        payload: &ActivityPayload,
    ) -> Result<(), ActivityRuntimeError> {
        if let Some(client) = client.as_mut() {
            let activity = build_activity(payload);
            client
                .set_activity(activity)
                .or(Err(RE::SettingActivityFailed))?;
            Ok(())
        } else {
            Err(RE::ClientNotConnected)
        }
    }
}

async fn handle_error(sender: &mpsc::Sender<String>, error: &ActivityRuntimeError) {
    let error_code = match error {
        RE::ClientConnectionFailed => "CLIENT_CONNECTION_FAILED".to_owned(),
        RE::ClientNotConnected => "CLIENT_NOT_CONNECTED".to_owned(),
        RE::SettingActivityFailed => "SETTING_ACTIVITY_FAILED".to_owned(),
    };
    let _ = sender.send(error_code).await;
}
