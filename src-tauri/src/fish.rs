use tauri::{AppHandle, Manager, WebviewUrl, WebviewWindowBuilder};

#[tauri::command]
pub async fn fish(app_handle: AppHandle, is_open: bool) -> Result<(), String> {
    if is_open {
        WebviewWindowBuilder::new(&app_handle, "fish", WebviewUrl::App("fish".into()))
            .title("Fish")
            .resizable(false)
            .maximizable(false)
            .minimizable(false)
            .inner_size(630.0, 380.0)
            .build()
            .or(Err("Failed to spawn a fish"))?;
    } else if let Some(window) = app_handle.get_webview_window("fish") {
        window.close().or(Err("Failed to kill the fish"))?;
    }
    Ok(())
}
