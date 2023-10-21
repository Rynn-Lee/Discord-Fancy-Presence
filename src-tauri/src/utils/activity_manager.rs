use discord_rich_presence::{
    activity::{self, Activity},
    DiscordIpc, DiscordIpcClient,
};
use tokio::sync::{mpsc, Mutex};

// pub fn set_activity() {
//     println!("set activity");
// }

// pub struct ActivityManager {
//     discord_client: DiscordIpcClient,
//     // thread_channel: (Sender<String>, j)
// }

// #[derive(serde::Serialize, Debug)]
// pub struct DiscordActivity {}

// impl ActivityManager {
//     pub fn build(client_id: &str) -> Self {
//         // Looks like new method for DiscordIpcClient doesn't return Result::Err
//         let discord_client =
//             DiscordIpcClient::new(client_id).expect("DiscordIpcClient must return client");
//         Self { discord_client }
//     }

//     fn get_sender_state() {}
// }

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

type ActivitySender = Mutex<mpsc::Sender<ActivityMessage>>;

pub struct ActivityManagerState {
    sender: ActivitySender,
}

// fn handle_message(message: &str) {
//     match message {
//         "set_activity" => {
//             println!("Set acitivty")
//         }
//         _ => panic!("Cannot handle message {}", message),
//     }
// }

// fn create_activity(activity_payload: ActivityPayload) -> Activity {
//     let activity = Activity::new();
//     let activity_state: Activity = if !activity_payload.state.is_empty() {
//         activity.state(&activity_payload.state).clone()
//     } else {
//         activity
//     };
//     let activity_details: Activity = if !activity_payload.details.is_empty() {
//         activity_state.details(&activity_payload.details).clone()
//     } else {
//         activity_state
//     };
//     let activity_large_image: Activity = if !activity_payload.large_image.is_empty() {
//         activity_details
//             .assets(activity::Assets::new().large_image(&activity_payload.large_image))
//             .clone()
//     } else {
//         activity_details
//     };
//     let activity_large_text: Activity = if !activity_payload.large_text.is_empty() {
//         activity_large_image
//             .assets(
//                 activity::Assets::new()
//                     .large_image(&activity_payload.large_image)
//                     .large_text(&activity_payload.large_text),
//             )
//             .clone()
//     } else {
//         activity_large_image
//     };
//     let activity_small_image: Activity = if !activity_payload.small_image.is_empty() {
//         activity_large_text
//             .assets(
//                 activity::Assets::new()
//                     .large_image(&activity_payload.large_image)
//                     .large_text(&activity_payload.large_text)
//                     .small_image(&activity_payload.small_image),
//             )
//             .clone()
//     } else {
//         activity_large_text
//     };
//     let activity_small_text: Activity = if !activity_payload.small_text.is_empty() {
//         activity_small_image
//             .assets(
//                 activity::Assets::new()
//                     .large_image(&activity_payload.large_image)
//                     .large_text(&activity_payload.large_text)
//                     .small_image(&activity_payload.small_image)
//                     .small_text(&activity_payload.small_text),
//             )
//             .clone()
//     } else {
//         activity_small_image
//     };
//     activity_small_text
// }

pub fn create_activity_manager() -> (ActivityManagerState, impl FnOnce()) {
    let (manager_sender, mut manager_reciever) = mpsc::channel::<ActivityMessage>(10);

    let spawn_manager_runtime = move || {
        tauri::async_runtime::spawn(async move {
            let mut activity_client: Option<DiscordIpcClient> = None;
            loop {
                if let Some(message) = manager_reciever.recv().await {
                    match message {
                        ActivityMessage::UpdateActivity(activity_payload) => {
                            println!("Activity payload {:?}", activity_payload);

                            // let activity = create_activity(activity_payload);

                            // ==== Activity Creation
                            let activity = Activity::new();
                            let activity_state: Activity = if !activity_payload.state.is_empty() {
                                activity.state(&activity_payload.state).clone()
                            } else {
                                activity
                            };
                            let activity_details: Activity = if !activity_payload.details.is_empty()
                            {
                                activity_state.details(&activity_payload.details).clone()
                            } else {
                                activity_state
                            };
                            let activity_large_image: Activity =
                                if !activity_payload.large_image.is_empty() {
                                    activity_details
                                        .assets(
                                            activity::Assets::new()
                                                .large_image(&activity_payload.large_image),
                                        )
                                        .clone()
                                } else {
                                    activity_details
                                };
                            let activity_large_text: Activity =
                                if !activity_payload.large_text.is_empty() {
                                    activity_large_image
                                        .assets(
                                            activity::Assets::new()
                                                .large_image(&activity_payload.large_image)
                                                .large_text(&activity_payload.large_text),
                                        )
                                        .clone()
                                } else {
                                    activity_large_image
                                };
                            let activity_small_image: Activity =
                                if !activity_payload.small_image.is_empty() {
                                    activity_large_text
                                        .assets(
                                            activity::Assets::new()
                                                .large_image(&activity_payload.large_image)
                                                .large_text(&activity_payload.large_text)
                                                .small_image(&activity_payload.small_image),
                                        )
                                        .clone()
                                } else {
                                    activity_large_text
                                };
                            let activity_small_text: Activity =
                                if !activity_payload.small_text.is_empty() {
                                    activity_small_image
                                        .assets(
                                            activity::Assets::new()
                                                .large_image(&activity_payload.large_image)
                                                .large_text(&activity_payload.large_text)
                                                .small_image(&activity_payload.small_image)
                                                .small_text(&activity_payload.small_text),
                                        )
                                        .clone()
                                } else {
                                    activity_small_image
                                };
                            // ====

                            if let Some(client) = activity_client.as_mut() {
                                client.set_activity(activity_small_text).unwrap();
                            }
                        }
                        ActivityMessage::UpdateClientId(client_id) => {
                            println!("Client id {}", client_id);
                            let mut client = DiscordIpcClient::new(&client_id)
                                .expect("DiscordIpcClient always must return Result::Ok");
                            client.connect().unwrap();
                            activity_client = Some(client)
                        }
                    }
                }
            }
        });
    };

    let activity_state = ActivityManagerState {
        sender: Mutex::new(manager_sender),
    };

    (activity_state, spawn_manager_runtime)
}

pub async fn update_activity(state: &ActivityManagerState, activity_payload: ActivityPayload) {
    let manager_sender = state.sender.lock().await;
    manager_sender
        .send(ActivityMessage::UpdateActivity(activity_payload))
        .await
        .unwrap();
}

pub async fn update_client_id(state: &ActivityManagerState, client_id: String) {
    let manager_sender = state.sender.lock().await;
    manager_sender
        .send(ActivityMessage::UpdateClientId(client_id))
        .await
        .unwrap();
}
