mod macos;
mod windows;

#[derive(Debug)]
pub struct ForegroundProcess {
    pub process_id: u32,
    pub title: String,
}

pub fn get_foreground_processes() -> Vec<ForegroundProcess> {
    if cfg!(target_os = "windows") {
        windows::get_windows_foreground_processes()
    } else if cfg!(target_os = "macos") {
        macos::get_macos_foreground_process_ids()
    } else {
        vec![]
    }
}
