use clap::Parser;

#[derive(Parser)]
pub(crate) struct Cli {
    #[clap(short = 'c', long = "clientid",help = "Your application's client id (REQUIRED if AFK is off)" ,required = false, default_value="__None",display_order = 1)]
    pub clientid: String,

    #[clap(short = 'd', long = "details",help = "Your desired details string (optional)",required = false,default_value="__None",display_order=2)]
    pub details: String,

    #[clap(short = 's', long = "state",help = "Your desired state string (optional)" ,required = false,default_value="__None",display_order=3)]
    pub state: String,

    #[clap(short = 'N', long = "large_image",help = "The name of your large image (optional)",required = false,default_value="__None",display_order=4)]
    pub large_image: String,

    #[clap(short = 'I', long = "large_image_text",help = "The text shown on your large image (optional)",required = false,default_value="__None",display_order=5)]
    pub large_text: String,

    #[clap(short = 'n', long = "small_image",help = "The name of your small image (optional)",required = false,default_value="__None",display_order=6)]
    pub small_image: String,

    #[clap(short = 'i', long = "small_image_text",help = "The text shown on your small image (optional)",required = false,default_value="__None",display_order=7)]
    pub small_text: String,
}