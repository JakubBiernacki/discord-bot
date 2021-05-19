import { spamHelp } from "./help.js";

let intervals = []
let alerts = []

const spam = async (client, message, command, ...args) => {


  switch (command) {
    case 'start':
      message.react("👍")
      start(message, ...args)

      break;

    case 'private':
      message.react("👍")
      await private_msg(client, ...args)

      break;

    case 'alert':
      
      alert(message,...args)
      break;

    case 'stop':
      message.react("🛑")
      
      intervals.forEach(e => clearInterval(e))
      intervals = []

      break;

    default:
      message.channel.send(spamHelp())
      break;
  }

}


const start = (message, msg, time = 0, interval = 1) => {

  message.channel.send(msg)

  const intervalObj = setInterval(() => {

    message.channel.send(msg)

  }, interval * 1000);

  intervals.push(intervalObj)
  

  if (time > 0) {
    setTimeout(() => {
      clearInterval(intervalObj)
      const index = intervals.findIndex(el => el === intervalObj)
      intervals.splice(index,1)
    }, time * 1000);
  }


}


const private_msg = async (client, id, msg, time = 0, interval = 1) => {

  const user = await client.users.fetch(id, false)

  const intervalObj = setInterval(() => {

    user.send(msg)

  }, interval * 1000);

  intervals.push(intervalObj)
  

  if (time > 0) {
    setTimeout(() => {
      clearInterval(intervalObj)
      intervals.alerts.shift()
    }, time * 1000);

  }
}

const alert = (message, msg, time = 0, interval = 1, startTime) => {
  
  console.log(startTime);
  
  const now = new Date()

  const nowDate = now.toISOString().split('T')[0]

  const targetDate = new Date(nowDate + 'T' + startTime)

  const diff = targetDate.getTime() - now.getTime()

  if (diff<0 || !diff) {
    message.react("⚠️")
    message.reply(`Podaj poprawną godzine`)
    return
  }

  const alertObj = {
    name: `⌚ ${startTime}`,
    value: `treść: "${msg}" czas trawania: ${time}s interval: ${interval}s`,
    start: diff 
    
  }
  alerts.push(alertObj)
  
  

  setTimeout(()=>{
    const index = alerts.findIndex(el => el === alertObj)

    console.log(index);
    alerts.splice(index,1)
    start(message, msg, time, interval)

  }, diff)

  

  

  message.react("⏱️")
  message.reply(`Alert ustwiony na godzine ${startTime}`)

}


export default spam
export {alerts}