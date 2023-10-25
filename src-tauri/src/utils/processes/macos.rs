use std::process::Command;
use super::ForegroundProcess;

const OSA_LIST_FOREGROUND_PROCESSES_SCRIPT: &str =
    "Application(\"System Events\").processes.whose({ backgroundOnly: false }).name()";

pub fn get_macos_foreground_process_ids() -> Vec<ForegroundProcess> {
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
