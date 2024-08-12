// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use fancy_drpc::{
    activity::{ActivityManager, ActivityPayload},
    error::DrpcError,
    processes::{ProcessPayload, Processes},
};
use tauri::{AppHandle, Manager};

#[tauri::command]
fn get_processes() -> Vec<ProcessPayload> {
    Processes::get_system_processes()
}

#[tauri::command]
async fn update_activity(
    manager: tauri::State<'_, ActivityManager>,
    activity_payload: ActivityPayload,
) -> Result<(), DrpcError> {
    manager.update_activity(activity_payload).await?;
    Ok(())
}

#[tauri::command]
async fn update_activity_client_id(
    manager: tauri::State<'_, ActivityManager>,
    client_id: String,
) -> Result<(), DrpcError> {
    manager.update_client_id(client_id).await?;
    Ok(())
}

#[derive(Clone, serde::Serialize)]
struct RuntimeErrorPayload {
    #[serde(rename = "errorCode")]
    error_code: String,
}

fn main() {
    // let (activity_manager, spawn_manager_runtime) =
    // fancy_drpc::activity_manager::create_activity_manager();
    let (activity_manager, spawn_manager_runtime) = ActivityManager::create();

    tauri::Builder::default()
        .manage(activity_manager)
        .setup(move |app| {
            let handle = app.handle();
            let mut error_receiver = spawn_manager_runtime();

            tauri::async_runtime::spawn(async move {
                while let Some(error_code) = error_receiver.recv().await {
                    emit_runtime_error(&handle, error_code)
                }
            });

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

fn emit_runtime_error(handle: &AppHandle, error_code: String) {
    eprintln!("Activity runtime error: {}", error_code);
    if handle
        .emit_all("activity_runtime_error", RuntimeErrorPayload { error_code })
        .is_err()
    {
        eprintln!("Failed to send runtime error to the frontend")
    };
}
