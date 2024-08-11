use std::collections::HashMap;

use sysinfo::{ProcessesToUpdate, System};

// use sysinfo::System;
mod macos;
mod windows;

#[derive(Debug)]
pub struct ForegroundProcess {
    pub process_id: u32,
    pub title: String,
}

#[derive(serde::Serialize, Debug)]
pub struct AppProcess {
    id: u32,
    title: Option<String>,
    name: String,
    foreground: bool,
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

fn normalize_foreground_processes(processes: Vec<ForegroundProcess>) -> HashMap<u32, String> {
    processes
        .into_iter()
        .map(|p| (p.process_id, p.title))
        .collect()
}

pub fn get_system_processes() -> Vec<AppProcess> {
    let mut sys = System::new_all();
    sys.refresh_processes(ProcessesToUpdate::All);

    let foreground_processes_map = normalize_foreground_processes(get_foreground_processes());

    let processes: Vec<AppProcess> = sys
        .processes()
        .iter()
        .map(|(pid, process)| {
            let process_id = pid.as_u32();
            let process_window_title = foreground_processes_map.get(&process_id);
            let process_name = process
                .name()
                .to_owned()
                .into_string()
                .expect("Error converting OS String into string");
            match process_window_title {
                Some(title) => AppProcess {
                    foreground: true,
                    title: Some(title.to_owned()),
                    name: process_name,
                    id: process_id,
                },
                None => AppProcess {
                    foreground: false,
                    title: None,
                    name: process_name,
                    id: process_id,
                },
            }
        })
        .collect();

    processes
}
