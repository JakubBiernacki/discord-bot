import { MessageEmbed } from "discord.js";

const help = () => {
  const embed = new MessageEmbed()
    .setTitle('Komendy')
    .setColor('#0099ff')
    .setDescription('Polecenia dla bota')
    .addFields(
      { name: 'Śmieszny żart 😉', value: '$joke' },
      { name: 'Spam 📨', value: '$spam start [wiadomość] [czas trwania: sec] [co ile: sec]' },
      { name: 'Stop spam 🛑', value: '$spam stop' },
      { name: 'Spam na PV 📩', value: '$spam private [id użytkownika] [wiadomość] [czas trwania: sec] [co ile: sec]' }
    )

  return embed
}

export default help