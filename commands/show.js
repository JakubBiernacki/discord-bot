import { MessageEmbed } from "discord.js";
import { alerts } from "./spam.js";

const show = (message, command) => {

  switch (command) {
    case "alerts":
      message.react("⌛")
      message.reply(showAlerts())
      break;
  
    default:
      message.react("⚠️")
      message.reply(`Podaj poprawną komende`)
      break;
  }
}

const showAlerts = () => {
  const embed = new MessageEmbed()
    .setTitle('Ustawione alerty ⌛')
    .setColor('#E74C3C')
    .addFields(
      ...alerts.sort((a, b) => {
        return a.start - b.start
      })
    )
  
  return embed
}

export default show