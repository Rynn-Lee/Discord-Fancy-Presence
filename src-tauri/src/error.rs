use thiserror::Error;

use crate::activity::ActivityError;

#[derive(Error, Debug)]
pub enum DrpcError {
    #[error("activity error: {0}")]
    ActivityError(#[from] ActivityError),
}

impl serde::Serialize for DrpcError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::ser::Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}
