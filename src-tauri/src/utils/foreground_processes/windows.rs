#[cfg(windows)]
use windows::{Win32::Foundation::*, Win32::UI::WindowsAndMessaging::*};

#[cfg(windows)]
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
