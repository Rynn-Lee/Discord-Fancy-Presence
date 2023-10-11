use sysinfo::{PidExt, ProcessExt, System, SystemExt};
mod utils;

#[derive(serde::Serialize, Debug)]
pub struct AppProcess {
    id: u32,
    name: String,
    foreground: bool,
}

pub fn get_system_processes() -> Vec<AppProcess> {
    // let mut processes: Vec<AppProcess> = vec![];

    let mut sys = System::new_all();
    sys.refresh_all();

    let foreground_processes_names = utils::foreground_processes::get_os_foreground_process_names();

    let processes: Vec<AppProcess> = sys
        .processes()
        .iter()
        .map(|(pid, process)| {
            let process_name = process.name().to_string();
            AppProcess {
                id: pid.as_u32(),
                foreground: foreground_processes_names.contains(&process_name),
                name: process_name,
            }
        })
        .collect();
    // let debug_processes: Vec<&AppProcess> = processes
    //     .iter()
    //     .filter(|process| process.name == "Arc")
    //     .collect();
    let p_length = processes.len();

    println!("processes: {p_length}");

    processes
}
