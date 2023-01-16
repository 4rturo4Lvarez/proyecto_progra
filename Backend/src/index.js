import app from './app'

import { PUERTO } from './config'

app.listen(PUERTO)
console.log("Ejecutandose en el puerto", PUERTO)