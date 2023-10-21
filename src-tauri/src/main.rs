// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use fancy_drpc::{
    activity_manager::{ActivityManagerState, ActivityPayload},
    AppProcess,
};

#[tauri::command]
fn get_processes() -> Vec<AppProcess> {
    fancy_drpc::get_system_processes()
}

#[tauri::command]
async fn update_activity(
    state: tauri::State<'_, ActivityManagerState>,
    activity_payload: ActivityPayload,
) -> Result<(), ()> {
    fancy_drpc::activity_manager::update_activity(&state, activity_payload).await;
    Ok(())
}

#[tauri::command]
async fn update_activity_client_id(
    state: tauri::State<'_, ActivityManagerState>,
    client_id: String,
) -> Result<(), ()> {
    fancy_drpc::activity_manager::update_client_id(&state, client_id).await;
    Ok(())
}

fn main() {
    let (activity_state, spawn_activity_runtime) =
        fancy_drpc::activity_manager::create_activity_manager();

    tauri::Builder::default()
        .manage(activity_state)
        .setup(move |_| {
            spawn_activity_runtime();
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            get_processes,
            update_activity,
            update_activity_client_id
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
