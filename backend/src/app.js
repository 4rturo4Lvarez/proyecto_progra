import express from 'express';

import { PUERTO } from './config.js'
import usersRoutes from './rutas/rutas.js';

const app = express();

app.use(express.json());

app.use(usersRoutes);

app.listen(PUERTO)
console.log("Ejecutandose en el puerto", PUERTO)