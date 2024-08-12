#[derive(serde::Deserialize, Debug)]
pub struct ActivityPayload {
    pub state: String,
    pub details: String,
    #[serde(rename = "largeImage")]
    pub large_image: String,
    #[serde(rename = "largeText")]
    pub large_text: String,
    #[serde(rename = "smallImage")]
    pub small_image: String,
    #[serde(rename = "smallText")]
    pub small_text: String,
    // #[serde(rename = "button1Text")]
    // pub button_1_text: String,
    // #[serde(rename = "button1Url")]
    // pub button_1_url: String,
    // #[serde(rename = "button2Text")]
    // pub button_2_text: String,
    // #[serde(rename = "button2Url")]
    // pub button_2_url: String,
    #[serde(rename = "startTimestamp")]
    pub start_timestamp: bool,
}
