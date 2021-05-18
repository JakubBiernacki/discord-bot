import { MessageEmbed } from "discord.js";

const help = () => {
  const embed = new MessageEmbed().setTitle('Help').setColor(0xb348ff)

  embed.setDescription('test')

  return embed
}

export default help