// extern crate winapi;

// use std::ffi::OsString;
// use std::os::windows::ffi::OsStrExt;
// use std::os::windows::prelude::OsStringExt;
// use std::ptr::null_mut;
// use std::sync::atomic::{AtomicUsize, Ordering};
// use winapi::shared::windef::HWND;
// use winapi::um::winuser::{EnumWindows, GetWindowTextW};

// static COUNTER: AtomicUsize = AtomicUsize::new(0);

// extern "system" fn enum_proc(hwnd: HWND, _l_param: isize) -> i32 {
//     let mut buffer = [0u16, 256];
//     let length = unsafe { GetWindowTextW(hwnd, buffer.as_mut_ptr(), buffer.len() as i32) };
//     if length > 0 {
//         let title = OsString::from_wide(&buffer[..length as usize]);
//         println!("Window title: {:?}", title);
//     }
//     COUNTER.fetch_add(1, Ordering::SeqCst);
//     1
// }
use windows::{Win32::Foundation::*, Win32::UI::WindowsAndMessaging::*};

extern "system" fn enum_window(window: HWND, _: LPARAM) -> BOOL {
    unsafe {
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
            println!(
                "[{}] {} ({}, {})",
                process_id, text, info.rcWindow.left, info.rcWindow.top
            );
        }

        true.into()
    }
}

#[cfg(windows)]
pub fn get_windows_foreground_processes() -> Vec<String> {
    unsafe {
        EnumWindows(Some(enum_window), LPARAM(0)).expect("Error enum windows");
    }

    println!("hello windows");
    vec![]
}

#[cfg(not(windows))]
pub fn get_windows_foreground_processes() -> Vec<String> {
    vec![]
}
