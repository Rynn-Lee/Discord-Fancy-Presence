// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use fancy_drpc::AppProcess;

#[tauri::command]
fn get_processes() -> Vec<AppProcess> {
    fancy_drpc::get_system_processes()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_processes])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
