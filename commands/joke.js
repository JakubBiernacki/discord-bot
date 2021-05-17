import axios from "axios";

const getJoke = async() => {
  const response = await axios.get('https://v2.jokeapi.dev/joke/Programming')
  
  const joke = response.data.joke ?? response.data.setup + `\n\n||${response.data.delivery}||`

  return joke
}

export default getJoke