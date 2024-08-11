// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use fancy_drpc::{
    activity::{ActivityManager, ActivityPayload},
    processes::{ProcessPayload, Processes},
};
use tauri::Manager;

#[tauri::command]
fn get_processes() -> Vec<ProcessPayload> {
    Processes::get_system_processes()
}

#[tauri::command]
async fn update_activity(
    manager: tauri::State<'_, ActivityManager>,
    activity_payload: ActivityPayload,
) -> Result<(), ()> {
    // todo: return error
    let _ = manager.update_activity(activity_payload).await;
    Ok(())
}

#[tauri::command]
async fn update_activity_client_id(
    manager: tauri::State<'_, ActivityManager>,
    client_id: String,
) -> Result<(), ()> {
    // todo: same as above
    let _ = manager.update_client_id(client_id).await;
    Ok(())
}

#[derive(Clone, serde::Serialize)]
struct RuntimeErrorPayload {
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
                    if handle
                        .emit_all("activity_runtime_error", RuntimeErrorPayload { error_code })
                        .is_err()
                    {
                        eprintln!("Error emitting activity runtime error")
                    };
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
