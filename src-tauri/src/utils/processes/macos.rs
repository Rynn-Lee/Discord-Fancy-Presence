use sysinfo::{Process, ProcessesToUpdate, System};

use super::GuiProcess;

fn is_macos_gui_process(process: &Process) -> bool {
    if let Some(executable_path) = process.exe() {
        if let Some(path_str) = executable_path.to_str() {
            path_str.contains("Applications")
                && !path_str.contains("Frameworks")
                && !path_str.contains("Library")
        } else {
            false
        }
    } else {
        false
    }
}

pub fn get_macos_gui_processes() -> Vec<GuiProcess> {
    let mut sys = System::new();
    sys.refresh_processes(ProcessesToUpdate::All);

    let gui_processes: Vec<GuiProcess> = sys
        .processes()
        .iter()
        .filter_map(|(pid, process)| {
            if is_macos_gui_process(process) {
                process.name().to_str().map(|process_name| GuiProcess {
                    process_id: pid.as_u32(),
                    title: process_name.to_owned(),
                })
            } else {
                None
            }
        })
        .collect();
    gui_processes
}
