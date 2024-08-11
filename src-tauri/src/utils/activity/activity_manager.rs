use super::{error::ActivityError, helpers::build_activity, ActivityPayload};
use discord_rich_presence::{DiscordIpc, DiscordIpcClient};
use tokio::sync::mpsc;

use ActivityError as AE;

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
            .or(Err(AE::SendError))?;
        Ok(())
    }

    pub async fn update_activity(
        &self,
        activity_payload: ActivityPayload,
    ) -> Result<(), ActivityError> {
        self.sender
            .send(ActivityMessage::UpdateActivity(Box::new(activity_payload)))
            .await
            .or(Err(AE::SendError))?;
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
                    // todo: handle activity errors
                    ActivityMessage::UpdateClientId(client_id) => {
                        if let Err(_error) = Self::handle_update_client_id(&mut client, &client_id)
                        {
                            handle_error(&error_sender).await;
                            // error_handler(get_error_code(&error));
                        };
                    }
                    ActivityMessage::UpdateActivity(activity_payload) => {
                        if let Err(_error) =
                            Self::handle_update_activity(&mut client, &activity_payload)
                        {
                            handle_error(&error_sender).await;
                            // error_handler(get_error_code(&error));
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
    ) -> Result<(), ActivityError> {
        let mut new_client = DiscordIpcClient::new(new_client_id)
            .expect("creating new client instance should not fail");

        new_client.connect().or(Err(AE::ClientConnectFailed))?;
        *client = Some(new_client);
        Ok(())
    }

    fn handle_update_activity(
        client: &mut Option<DiscordIpcClient>,
        payload: &ActivityPayload,
    ) -> Result<(), ActivityError> {
        if let Some(client) = client.as_mut() {
            let activity = build_activity(payload);
            client
                .set_activity(activity)
                .or(Err(AE::SettingActivityFailed))?;
            Ok(())
        } else {
            Err(AE::DisconnectedClient)
        }
    }
}

async fn handle_error(sender: &mpsc::Sender<String>) {
    let _ = sender.send("RUNTIME_ERROR".into()).await;
}
