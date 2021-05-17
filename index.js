import { Client, Collection } from "discord.js";
import dotenv from "dotenv"
dotenv.config()

import getJoke from "./commands/joke.js";
import help from "./commands/help.js";


const client = new Client()
const PREFIX = '$'

client.commands = new Collection()


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
})

client.on('message', async(message) => {
  if(message.content.includes('pong')){
    message.channel.send('ping')
  }


  if(message.author.bot) return
  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/)

    console.log(CMD_NAME);
    console.log(args);


    switch (CMD_NAME) {
      case 'joke':
        message.react("👌")
        message.reply(await getJoke())
        break;

      case 'help':
        message.react("ℹ️")
        message.reply(help())
        break;
      
      default:
        message.react("⚠️")
        message.reply('Nie ma takiej komendy, $help')
        break;
    }
      
  }


})

client.login(process.env.TOKEN)

//Error
client.on("debug", ()=>{})
client.on("warn", ()=>{})
client.on("error", ()=>{})