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
      { name: 'Spam alert⏱️', value: '$spam alert [wiadomość] [czas trwania: sec] [co ile: sec] [hh:mm:ss]' },
      { name: 'Spam na PV 📩', value: '$spam private [id użytkownika] [wiadomość] [czas trwania: sec] [co ile: sec]' },
      { name: 'Spam alert na PV ⏰', value: '$spam private-alert [id użytkownika] [wiadomość] [czas trwania: sec] [co ile: sec] [hh:mm:ss]' },
      { name: 'Usuwa alerty i czyści pamięć podręczną🗑️', value: '$spam clear' },
      { name: 'Pokazuje planowane alerty⌛', value: '$show alerts' },
    )

  return embed
}

const spamHelp = () => {
  const embed = new MessageEmbed()
    .setTitle('Spam 💬')
    .setColor('#ac00e6  ')
    .setDescription('Polecenie $spam')
    .addFields(
      { name: 'Spam 📨', value: '$spam start [wiadomość] [czas trwania: sec] [co ile: sec]' },
      { name: 'Stop spam 🛑', value: '$spam stop' },
      { name: 'Spam alert⏱️', value: '$spam alert [wiadomość] [czas trwania: sec] [co ile: sec] [hh:mm:ss]' },
      { name: 'Spam na PV 📩', value: '$spam private [id użytkownika] [wiadomość] [czas trwania: sec] [co ile: sec]' },
      { name: 'Spam alert na PV ⏰', value: '$spam private-alert [id użytkownika] [wiadomość] [czas trwania: sec] [co ile: sec] [hh:mm:ss]' },
      { name: 'Usuwa alerty i czyści pamięć podręczną🗑️', value: '$spam clear' },
    )
  return embed
}
export default help
export { spamHelp }