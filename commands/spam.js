let intervals = []
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

    case 'stop':
      message.react("🛑")
      console.log(intervals);
      intervals.forEach(e => clearInterval(e))
      intervals = []

      break;

    default:
      message.channel.send('spam help')
      break;
  }

}

const start = (message, msg, time = 0, interval = 1) => {

  message.channel.send(msg)

  const intervalObj = setInterval(() => {

    message.channel.send(msg)

  }, interval * 1000);

  intervals.push(intervalObj)
  const index = intervals.length - 1

  if (time > 0) {
    setTimeout(() => {
      clearInterval(intervalObj)
      intervals.splice(index, 1)
    }, time * 1000);
  }


}


const private_msg = async (client, id, msg, time = 0, interval = 1) => {

  const user = await client.users.fetch(id, false)

  const intervalObj = setInterval(() => {

    user.send(msg)

  }, interval * 1000);

  intervals.push(intervalObj)
  const index = intervals.length - 1

  if (time > 0) {
    setTimeout(() => {
      clearInterval(intervalObj)
      intervals.splice(index, 1)
    }, time * 1000);

  }
}



export default spam