const URL_users = 'http://192.168.3.11:3000/users'

const URL_ESP8266 = 'http://192.168.3.107/ON'

export const getUsers = async () => {   //Obtener el listado de todos los usuarios registrados
  const res = await fetch(URL_users)
  return await res.json()
}

export const abrirPuerta = async () => {   //Abrir puerta
  await fetch(URL_ESP8266)
}