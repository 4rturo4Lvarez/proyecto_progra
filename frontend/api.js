const URL_users = 'http://proyecto-backend-production-0e49.up.railway.app/users'

const URL_permissions = 'http://proyecto-backend-production-0e49.up.railway.app/permissions'

const URL_places = 'http://proyecto-backend-production-0e49.up.railway.app/places'

//Obtener el listado de todos los usuarios registrados
export const getUsers = async () => {
  const res = await fetch(URL_users)
  return await res.json()
}

//Obtener los datos de un usuario a partir de su DNI
export const getUser = async (dni) => {
  const res = await fetch(`${URL_users}/${dni}`)
  return await res.json()
}

//Obtener los permisos de un usuario a partir de su DNI
export const getPermissions = async(dni) => {
  const res = await fetch(`${URL_permissions}/${dni}`)
  return await res.json()
}

//Obtener los datos de un espacio a partir de su codigo
export const getPlaces= async() => {   
  const res = await fetch(URL_places)
  return await res.json()
}

//Abrir puerta
export const abrirPuerta = async (ip) => {
  await fetch(`http://${ip}/ON`)
}