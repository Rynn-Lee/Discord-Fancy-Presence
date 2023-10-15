// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use fancy_drpc::AppProcess;
use discord_rich_presence::{activity::{self, Activity}, DiscordIpcClient, DiscordIpc};
use std::time::{SystemTime, UNIX_EPOCH, Duration};
use std::thread;

#[tauri::command]
fn get_processes() -> Vec<AppProcess> {
    fancy_drpc::get_system_processes()
}

// #[tauri::command]
fn discordrpc(client_id: String, details: String, state: String, large_image: String, large_text: String, small_image: String, small_text: String, start_timestamp: bool) -> (){
    println!("Called drpc");
    let mut client = DiscordIpcClient::new(&client_id).expect("Failed to create client");
    println!("connected");
    let activity = activity::Activity::new();
    match client.connect() {
        Ok(_) => {println!("Client connected to Discord successfully.");},
        Err(_) => {println!("Client failed to connect to Discord, Please try again or relaunch Discord.")},
    };

    let activity_state:Activity = if !state.is_empty() {
        activity.state(&state).clone()
    } else {
        activity
    };
    let activity_details:Activity = if !details.is_empty() {
        activity_state.details(&details).clone()
    } else {
        activity_state
    };
    let activity_large_image:Activity = if !large_image.is_empty() {
        activity_details.assets(activity::Assets::new().large_image(&large_image)).clone()
    } else {
        activity_details
    };
    let activity_large_text:Activity = if !large_text.is_empty() {
        activity_large_image.assets(activity::Assets::new().large_image(&large_image).large_text(&large_text)).clone()
    } else {
        activity_large_image
    };
    let activity_small_image:Activity = if !small_image.is_empty() {
        activity_large_text.assets(activity::Assets::new().large_image(&large_image).large_text(&large_text).small_image(&small_image)).clone()
    } else {
        activity_large_text
    };
    let activity_small_text:Activity = if !small_text.is_empty() {
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
    thread::sleep(Duration::from_secs(10));
}

#[tauri::command]
fn setactivity(client_id: String, details: String, state: String, large_image: String, large_text: String, small_image: String, small_text: String, start_timestamp: bool){
    println!("Called setactivity");
    thread::spawn(move ||{
        discordrpc(client_id, details, state, large_image, large_text, small_image, small_text, start_timestamp);
    });
}


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_processes,setactivity])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
