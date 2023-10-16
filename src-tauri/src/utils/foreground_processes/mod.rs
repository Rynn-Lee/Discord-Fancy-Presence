mod macos;
mod windows;

pub fn get_os_foreground_process_names() -> Vec<String> {
    if cfg!(target_os = "windows") {
        windows::get_windows_foreground_processes()
    } else if cfg!(target_os = "macos") {
        macos::get_macos_foreground_process_ids()
    } else {
        vec![]
    }
}
