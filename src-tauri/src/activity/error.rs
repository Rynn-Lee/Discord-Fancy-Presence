use thiserror::Error;

#[derive(Error, Debug)]
pub enum ActivityRuntimeError {
    #[error("failed to connect to the discord client")]
    ClientConnectionFailed,

    #[error("failed to set activity to the client")]
    SettingActivityFailed,

    #[error("client is not connected to discord")]
    ClientNotConnected,
}

#[derive(Error, Debug)]
pub enum ActivityError {
    #[error("failed to send runtime message")]
    SendRuntimeError,
}
