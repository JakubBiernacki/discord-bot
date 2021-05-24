import { spamHelp } from "./help.js"

let intervals = []
let alerts = []

const spam = async (client, message, command, ...args) => {
  switch (command) {
    case "start":
      message.react("👍")
      start(message, ...args)

      break

    case "private":
      message.react("👍")
      await private_msg(client, ...args)

      break

    case "private-alert":
      private_alert_msg(client, message, ...args)

      break

    case "alert":
      alert_msg(message, ...args)
      break

    case "stop":
      message.react("🛑")

      intervals.forEach((e) => clearInterval(e))
      intervals = []

      break

    default:
      message.channel.send(spamHelp())
      break
  }
}

const start = (message, msg, time = 0, interval = 1) => {
  message.channel.send(msg)

  const intervalObj = setInterval(() => {
    message.channel.send(msg)
  }, interval * 1000)

  intervals.push(intervalObj)

  if (time > 0) {
    setTimeout(() => {
      clearInterval(intervalObj)
      const index = intervals.findIndex((el) => el === intervalObj)
      intervals.splice(index, 1)
    }, time * 1000)
  }
}

const alert = (message, msg, time = 0, interval = 1, startTime, info) => {
  const now = new Date()

  const nowDate = now.toISOString().split("T")[0]

  const targetDate = new Date(nowDate + "T" + startTime)

  const diff = targetDate.getTime() - now.getTime()

  if (diff < 0 || !diff) {
    message.react("⚠️")
    message.reply(`Podaj poprawną godzine`)
    return
  }

  const alertObj = {
    name: `⌚ ${info}`,
    value: `treść: "${msg}" czas trawania: ${time}s interval: ${interval}s`,
    start: diff,
  }
  alerts.push(alertObj)

  return alertObj
}

const private_msg = async (client, id, msg, time = 0, interval = 1) => {
  const user = await client.users.fetch(id, false)

  const intervalObj = setInterval(() => {
    user.send(msg)
  }, interval * 1000)

  intervals.push(intervalObj)

  if (time > 0) {
    setTimeout(() => {
      clearInterval(intervalObj)
      intervals.shift()
    }, time * 1000)
  }
}

const alert_msg = (message, msg, time = 0, interval = 1, startTime) => {
  const alertObj = alert(message, msg, time, interval, startTime, startTime)

  setTimeout(() => {
    const index = alerts.findIndex((el) => el === alertObj)

    console.log(index)
    alerts.splice(index, 1)
    start(message, msg, time, interval)
  }, alertObj.start)

  message.react("⏱️")
  message.reply(`Alert ustwiony na godzine ${startTime}`)
}

const private_alert_msg = (
  client,
  message,
  userId,
  msg,
  time = 0,
  interval = 1,
  startTime
) => {
  const user = message.guild.members.cache.get(userId).user

  const alertObj = alert(
    message,
    msg,
    time,
    interval,
    startTime,
    `${startTime} user: ${user.username}`
  )

  setTimeout(async () => {
    const index = alerts.findIndex((el) => el === alertObj)

    alerts.splice(index, 1)
    await private_msg(client, userId, msg, time, interval)
  }, alertObj.start)

  message.react("⏰")
  message.reply(
    `Alert ustwiony na godzine ${startTime} dla użytkownika ${user.username}`
  )
}

export default spam
export { alerts }
