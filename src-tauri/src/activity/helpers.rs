use std::time::{SystemTime, UNIX_EPOCH};

use discord_rich_presence::activity::{Activity, Assets, Timestamps};

use super::ActivityPayload;

pub fn build_activity(payload: &ActivityPayload) -> Activity {
    let mut activity = Activity::new();
    let mut assets = Assets::new();

    if !payload.state.is_empty() {
        activity = activity.state(&payload.state);
    }
    if !payload.details.is_empty() {
        activity = activity.details(&payload.details);
    }

    if !payload.large_image.is_empty() {
        assets = assets.large_image(&payload.large_image);
    }
    if !payload.large_text.is_empty() {
        assets = assets.large_text(&payload.large_text);
    }
    if !payload.small_image.is_empty() {
        assets = assets.small_image(&payload.small_image);
    }
    if !payload.small_text.is_empty() {
        assets = assets.small_text(&payload.small_text);
    }

    activity = activity.assets(assets);

    // if !activity_payload.button_1_text.is_empty() && !activity_payload.button_1_url.is_empty(){
    //     println!("{} {}", "button 1 text :", &activity_payload.button_1_text);
    //     println!("{} {}", "button 1 url :", &activity_payload.button_1_url);
    //     activity = activity.buttons(vec![
    //         activity::Button::new(&activity_payload.button_1_text, &activity_payload.button_1_url)
    //     ]);
    // }
    // if !activity_payload.button_1_text.is_empty() && !activity_payload.button_1_url.is_empty() && !activity_payload.button_2_text.is_empty() && !activity_payload.button_2_url.is_empty(){
    //     println!("{} {}", "button 2 text :", &activity_payload.button_2_text);
    //     println!("{} {}", "button 2 url :", &activity_payload.button_2_url);
    //     activity = activity.buttons(vec![
    //         activity::Button::new(&activity_payload.button_1_text, &activity_payload.button_1_url),
    //         activity::Button::new(&activity_payload.button_2_text, &activity_payload.button_2_url),
    //     ]);
    // }

    if payload.start_timestamp {
        let time_unix = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap()
            .as_secs() as i64;
        activity = activity.timestamps(Timestamps::new().start(time_unix));
    }

    activity
}
