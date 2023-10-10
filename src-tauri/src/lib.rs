use sysinfo::{PidExt, ProcessExt, System, SystemExt};

#[derive(serde::Serialize, Debug)]
pub struct AppProcess {
    id: u32,
    name: String,
}

pub fn get_system_processes() -> Vec<AppProcess> {
    let mut processes: Vec<AppProcess> = vec![];

    let mut sys = System::new_all();
    sys.refresh_all();

    for (pid, process) in sys.processes() {
        processes.push(AppProcess {
            id: pid.as_u32(),
            name: process.name().to_owned(),
        })
    }

    processes
}
