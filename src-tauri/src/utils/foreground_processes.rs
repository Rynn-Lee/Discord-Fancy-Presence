mod windows;
use std::process::Command;

const OSA_LIST_FOREGROUND_PROCESSES_SCRIPT: &str =
    "Application(\"System Events\").processes.whose({ backgroundOnly: false }).name()";

fn get_macos_foreground_process_ids() -> Vec<String> {
    let output = Command::new("osascript")
        .arg("-l")
        .arg("JavaScript")
        .arg("-e")
        .arg(OSA_LIST_FOREGROUND_PROCESSES_SCRIPT)
        .output()
        .expect("output failed");
    // todo: check output.status.success
    let mut stdout = String::from_utf8(output.stdout).expect("failed to convert");
    stdout = stdout.replace(' ', "");
    stdout = stdout.replace('\n', "");
    let converted: Vec<&str> = stdout.split(',').collect();
    println!("{converted:?}");
    vec![]
}

pub fn get_os_foreground_process_names() -> Vec<String> {
    if cfg!(target_os = "windows") {
        windows::get_windows_foreground_processes();
        vec![]
    } else if cfg!(target_os = "macos") {
        get_macos_foreground_process_ids();
        vec!["Code".to_string()]
    } else {
        vec![]
    }
}
