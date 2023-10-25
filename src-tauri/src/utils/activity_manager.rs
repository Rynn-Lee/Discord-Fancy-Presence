use discord_rich_presence::{
    activity::{self, Activity, Assets},
    DiscordIpc, DiscordIpcClient,
};
use std::time::{SystemTime, UNIX_EPOCH};
use tokio::sync::mpsc;

#[derive(serde::Deserialize, Debug)]
pub struct ActivityPayload {
    state: String,
    details: String,
    #[serde(rename = "largeImage")]
    large_image: String,
    #[serde(rename = "largeText")]
    large_text: String,
    #[serde(rename = "smallImage")]
    small_image: String,
    #[serde(rename = "smallText")]
    small_text: String,
    #[serde(rename = "startTimestamp")]
    start_timestamp: bool,
}

enum ActivityMessage {
    UpdateActivity(ActivityPayload),
    UpdateClientId(String),
}

type ActivitySender = mpsc::Sender<ActivityMessage>;

pub struct ActivityManagerState {
    sender: ActivitySender,
}

fn build_activity(activity_payload: &ActivityPayload) -> Activity {
    let mut activity = Activity::new();
    if !activity_payload.state.is_empty() {
        activity = activity.state(&activity_payload.state);
    }
    if !activity_payload.details.is_empty() {
        activity = activity.details(&activity_payload.details);
    }

    let mut assets = Assets::new();
    if !activity_payload.large_image.is_empty() {
        assets = assets.large_image(&activity_payload.large_image);
    }
    if !activity_payload.large_text.is_empty() {
        assets = assets.large_text(&activity_payload.large_text);
    }
    if !activity_payload.small_image.is_empty() {
        assets = assets.small_image(&activity_payload.small_image);
    }
    if !activity_payload.small_text.is_empty() {
        assets = assets.small_text(&activity_payload.small_text);
    }
    activity = activity.assets(assets);

    if activity_payload.start_timestamp {
        let time_unix = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap()
            .as_secs() as i64;
        activity = activity.timestamps(activity::Timestamps::new().start(time_unix));
    }

    activity
}

fn initialize_client(client_id: &str) -> Result<DiscordIpcClient, Box<dyn std::error::Error>> {
    let mut client = DiscordIpcClient::new(client_id)?;
    client.connect()?;
    Ok(client)
}

pub fn create_activity_manager() -> (ActivityManagerState, impl FnOnce()) {
    let (manager_sender, mut manager_reciever) = mpsc::channel::<ActivityMessage>(10);

    let spawn_manager_runtime = move || {
        tauri::async_runtime::spawn(async move {
            let mut activity_client: Option<DiscordIpcClient> = None;
            loop {
                if let Some(message) = manager_reciever.recv().await {
                    match message {
                        ActivityMessage::UpdateActivity(activity_payload) => {
                            let activity = build_activity(&activity_payload);

                            if let Some(client) = activity_client.as_mut() {
                                client.set_activity(activity).unwrap();
                            }
                        }
                        ActivityMessage::UpdateClientId(client_id) => {
                            match initialize_client(&client_id) {
                                Ok(client) => activity_client = Some(client),
                                Err(e) => eprintln!("Failed to initialize client: {:?}", e),
                            }
                        }
                    }
                }
            }
        });
    };

    let activity_state = ActivityManagerState {
        sender: manager_sender,
    };

    (activity_state, spawn_manager_runtime)
}

// todo: return Result for error handling on the frontend side
pub async fn update_activity(state: &ActivityManagerState, activity_payload: ActivityPayload) {
    if let Err(e) = state
        .sender
        .send(ActivityMessage::UpdateActivity(activity_payload))
        .await
    {
        eprintln!("Failed to send update activity message: {:?}", e);
    }
}

pub async fn update_client_id(state: &ActivityManagerState, client_id: String) {
    if let Err(e) = state
        .sender
        .send(ActivityMessage::UpdateClientId(client_id))
        .await
    {
        eprintln!("Failed to send update client id message: {:?}", e);
    }
}
