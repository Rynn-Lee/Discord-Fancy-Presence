use thiserror::Error;

#[derive(Error, Debug)]
pub enum ActivityError {
    #[error("failed to connect to the discord client")]
    ClientConnectFailed,

    #[error("failed to set activity to the client")]
    SettingActivityFailed,

    #[error("client is not connected to discord")]
    DisconnectedClient,

    #[error("failed to send activity message")]
    SendError,
}
