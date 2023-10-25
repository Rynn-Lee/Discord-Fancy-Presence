use super::ForegroundProcess;
#[cfg(windows)]
use std::{cell::RefCell, rc::Rc};
#[cfg(windows)]
use windows::{Win32::Foundation::*, Win32::UI::WindowsAndMessaging::*};

#[cfg(windows)]
struct WindowInfo {
    process_id: u32,
    title: String,
}

#[cfg(windows)]
extern "system" fn enum_window(window: HWND, lparam: LPARAM) -> BOOL {
    // some low-level dark magic
    unsafe {
        let windows_info: &Rc<RefCell<Vec<WindowInfo>>> =
            &*(lparam.0 as *mut Rc<RefCell<Vec<WindowInfo>>>);

        let mut text: [u16; 512] = [0; 512];
        let len = GetWindowTextW(window, &mut text);
        let text = String::from_utf16_lossy(&text[..len as usize]);

        let mut info = WINDOWINFO {
            cbSize: core::mem::size_of::<WINDOWINFO>() as u32,
            ..Default::default()
        };

        GetWindowInfo(window, &mut info).unwrap();
        let mut process_id: u32 = 0;

        GetWindowThreadProcessId(window, Some(&mut process_id));

        if !text.is_empty() && info.dwStyle.contains(WS_VISIBLE) {
            windows_info.borrow_mut().push(WindowInfo {
                process_id,
                title: text,
            });
        }

        true.into()
    }
}

#[cfg(windows)]
pub fn get_windows_foreground_processes() -> Vec<ForegroundProcess> {
    let windows_info = Rc::new(RefCell::new(Vec::<WindowInfo>::new()));

    unsafe {
        EnumWindows(
            Some(enum_window),
            LPARAM(&windows_info as *const _ as isize),
        )
        .expect("Error enum windows");
    }

    let processes = windows_info
        .borrow()
        .iter()
        .map(|win| ForegroundProcess {
            process_id: win.process_id,
            title: win.title.clone(),
        })
        .collect();
    processes
}

#[cfg(not(windows))]
pub fn get_windows_foreground_processes() -> Vec<ForegroundProcess> {
    vec![]
}
