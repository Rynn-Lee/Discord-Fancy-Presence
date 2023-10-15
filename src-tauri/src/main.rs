// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use fancy_drpc::AppProcess;
use discord_rich_presence::{activity::{self, Activity}, DiscordIpcClient, DiscordIpc};
use std::thread;
use std::time::{SystemTime, UNIX_EPOCH};

#[tauri::command]
fn get_processes() -> Vec<AppProcess> {
    fancy_drpc::get_system_processes()
}

#[tauri::command]
fn discordrpc(details: String, state: String, large_image: String, large_text: String, small_image: String, small_text: String, start_timestamp: bool) -> (){
    let mut client = DiscordIpcClient::new("1118418570855067688").expect("Failed to create client");


    let activity = activity::Activity::new();
    match client.connect() {
        Ok(_) => {println!("Client connected to Discord successfully.");},
        Err(_) => {println!("Client failed to connect to Discord, Please try again or relaunch Discord.")},
    };

    let activity_state:Activity = if state != "" {
        activity.state(&state).clone()
    } else {
        activity
    };
    let activity_details:Activity = if details != "" {
        activity_state.details(&details).clone()
    } else {
        activity_state
    };
    let activity_large_image:Activity = if large_image != "" {
        activity_details.assets(activity::Assets::new().large_image(&large_image)).clone()
    } else {
        activity_details
    };
    let activity_large_text:Activity = if large_text != "" {
        activity_large_image.assets(activity::Assets::new().large_image(&large_image).large_text(&large_text)).clone()
    } else {
        activity_large_image
    };
    let activity_small_image:Activity = if small_image != "" {
        activity_large_text.assets(activity::Assets::new().large_image(&large_image).large_text(&large_text).small_image(&small_image)).clone()
    } else {
        activity_large_text
    };
    let activity_small_text:Activity = if small_text != "" {
        activity_small_image.assets(activity::Assets::new().large_image(&large_image).large_text(&large_text).small_image(&small_image).small_text(&small_text)).clone()
    } else {
        activity_small_image
    };

    let time_unix = SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_secs() as i64;

    let activity_time:Activity = if start_timestamp == true {
        activity_small_text.timestamps(activity::Timestamps::new().start(time_unix)).clone()
    } else {
        activity_small_text
    };

    let _activity_init:Activity = activity_time;

    match client.set_activity(_activity_init) {
        Ok(_) => {println!("Client set activity successfully.");},
        Err(_) => {println!("Client failed to set activity, Please try again or relaunch Discord.");},
    };

    loop{}
}


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_processes,discordrpc])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
