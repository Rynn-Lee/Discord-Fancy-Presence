mod utils;
use std::collections::HashMap;
use sysinfo::{PidExt, ProcessExt, System, SystemExt};
pub use utils::activity_manager;
use utils::foreground_processes;
use utils::foreground_processes::ForegroundProcess;
// mod activity_manager;

#[derive(serde::Serialize, Debug)]
pub struct AppProcess {
    id: u32,
    name: String,
    foreground: bool,
}

fn normilize_foreground_processes(processes: Vec<ForegroundProcess>) -> HashMap<u32, String> {
    processes
        .into_iter()
        .map(|p| (p.process_id, p.title))
        .collect()
}

pub fn get_system_processes() -> Vec<AppProcess> {
    let mut sys = System::new_all();
    sys.refresh_processes();

    let foreground_processes_map =
        normilize_foreground_processes(foreground_processes::get_foreground_processes());

    let processes: Vec<AppProcess> = sys
        .processes()
        .iter()
        .map(|(pid, process)| {
            let process_id = pid.as_u32();
            let process_window_title = foreground_processes_map.get(&process_id);
            match process_window_title {
                Some(title) => AppProcess {
                    foreground: true,
                    name: title.to_owned(),
                    id: process_id,
                },
                None => AppProcess {
                    foreground: false,
                    name: process.name().to_owned(),
                    id: process_id,
                },
            }
        })
        .collect();

    processes
}
