import axios from "axios"

const config = {
  headers: {
    Group: 127, //Aqui va el ID del equipo!!
  },
}

const Get = () => {
  axios
    .get("https://jsonplaceholder.typicode.com/users", config)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}

const getSecureHeader = () => {
  const token = localStorage.getItem("token")
  return token
    ? { Authorization: "Bearer " + token }
    : { error: "No token found" }
}

export const privateDelete = (route, id) => {
  const url = `${route}/${id}`
  let token = getSecureHeader()
  const { Authorization, error } = token

  if (Authorization) {
    axios.delete(url, {
      header: {
        ...config.headers,
        Authorization,
      }
    })

  } else {
    return error
  }
}

export default Get 
