use std::collections::HashMap;

use sysinfo::{Pid, Process, ProcessesToUpdate, System};

mod error;
mod macos;
mod windows;

#[derive(Debug)]
pub struct GuiProcess {
    pub process_id: u32,
    pub title: String,
}

#[derive(serde::Serialize, Debug)]
pub struct ProcessPayload {
    id: u32,
    title: Option<String>,
    name: String,
    foreground: bool,
}

pub struct Processes;

impl Processes {
    pub fn get_system_processes() -> Vec<ProcessPayload> {
        let mut sys = System::new_all();
        sys.refresh_processes(ProcessesToUpdate::All);

        let gui_processes_map = normalize_gui_processes(Self::get_gui_processes());

        let processes: Vec<ProcessPayload> = sys
            .processes()
            .iter()
            .filter_map(|(pid, process)| map_process_to_payload(pid, process, &gui_processes_map))
            .collect();

        processes
    }

    pub fn get_gui_processes() -> Vec<GuiProcess> {
        if cfg!(target_os = "windows") {
            windows::get_windows_gui_processes()
        } else if cfg!(target_os = "macos") {
            macos::get_macos_gui_processes()
        } else {
            vec![]
        }
    }
}

fn normalize_gui_processes(processes: Vec<GuiProcess>) -> HashMap<u32, String> {
    processes
        .into_iter()
        .map(|p| (p.process_id, p.title))
        .collect()
}

fn map_process_to_payload(
    pid: &Pid,
    process: &Process,
    gui_processes_map: &HashMap<u32, String>,
) -> Option<ProcessPayload> {
    let process_id = pid.as_u32();
    let process_gui_title = gui_processes_map.get(&process_id);
    let process_name = process.name().to_owned().into_string().ok()?;

    match process_gui_title {
        Some(title) => Some(ProcessPayload {
            foreground: true,
            title: Some(title.to_owned()),
            name: process_name,
            id: process_id,
        }),
        None => Some(ProcessPayload {
            foreground: false,
            title: None,
            name: process_name,
            id: process_id,
        }),
    }
}
