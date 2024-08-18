mod activity;
mod error;
mod fish;
mod processes;

use activity::{ActivityManager, ActivityPayload};
use error::DrpcError;
use fish::fish;
use processes::{ProcessPayload, Processes};
use tauri::{AppHandle, Emitter};

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

fn emit_runtime_error(handle: &AppHandle, error_code: String) {
    eprintln!("Activity runtime error: {}", error_code);
    if handle
        .emit("activity_runtime_error", RuntimeErrorPayload { error_code })
        .is_err()
    {
        eprintln!("Failed to send runtime error to the frontend")
    };
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let (activity_manager, spawn_manager_runtime) = ActivityManager::create();

    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .manage(activity_manager)
        .setup(move |app| {
            let handle = app.handle().clone();
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
            update_activity_client_id,
            fish
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
