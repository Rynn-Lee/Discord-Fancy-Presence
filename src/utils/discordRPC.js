// import { useRef } from "react"
// const DiscordRPC = require('discord-rpc')

// export const useDiscord = () => {
//   console.log("CALLED")
//   const RPC = new DiscordRPC.Client({transport: 'ipc'})
//   const init = useRef({ClientBotID: ""})

//   const initialize = (clientId: string) => {
//     console.log("Init called")
//     init.current.ClientBotID = clientId
//     DiscordRPC.register(clientId)
//   }

//   const setAcivity = () => {
//     console.log("Set activity called")
//     if(!RPC){return}
//     RPC.setActivity({
//       details: "details",
//       state: "state",
//       largeImageKey: 'discord',
//       largeImageText: 'discord',
//       smallImageKey: 'discord',
//       smallImageText: 'discord',
//       instance: false
//     })
//   }

//   const launch = () => {
//     console.log("Launch called")
//     RPC.login(init.current.ClientBotID).catch((err: any) => console.log(err))
//   }

//   return {initialize, setAcivity, launch}
// }


const Discord = () => {
    const clientId = "1118418570855067688"
    const DiscordRPC = require('discord-rpc')
    const RPC = new DiscordRPC.Client({transport: 'ipc'})
    console.log("CALLED")
    DiscordRPC.register(clientId)
  
    async function setActivity() {
      if(!RPC){return}
      RPC.setActivity({
        details: 'details',
        state: 'state',
        startTimestamp: Date.now(),
        largeImageKey: 'https://avatars.githubusercontent.com/u/38906839?v=4',
        largeImageText: 'PFP test',
        smallImageKey: 'https://avatars.githubusercontent.com/u/47696233?v=',
        smallImageText: 'Lil pfp test',
        type: "watching",
        instance: false,
        // buttons: [
        //   {
        //     label: '',
        //     url: ''
        //   }
        // ]
      })
    }
  
    RPC.on('ready', async() => {
      setActivity()
      setInterval(()=>{
        setActivity()
      }, 20000)
    })
    
    RPC.login({clientId}).catch((err) => console.log(err))
}

Discord()