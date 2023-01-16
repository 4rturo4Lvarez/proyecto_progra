const URL_users = 'http://proyecto-backend-production-0e49.up.railway.app/users'

const URL_permissions = 'http://proyecto-backend-production-0e49.up.railway.app/permissions'

const URL_ESP8266 = 'http://192.168.1.107/ON'

export const getUsers = async () => {   //Obtener el listado de todos los usuarios registrados
  const res = await fetch(URL_users)
  return await res.json()
}

export const getUser = async (dni) => {   //Obtener los datos de un usuario a partir de su DNI
  const res = await fetch(`${URL_users}/${dni}`)
  return await res.json()
}

export const getPermissions = async (dni) => {   //Obtener los permisos de un usuario a partir de su DNI
  const res = await fetch(`${URL_permissions}/${dni}`)
  return await res.json()
}

export const abrirPuerta = async () => {   //Abrir puerta
  await fetch(URL_ESP8266)
}