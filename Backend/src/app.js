import express from 'express';
import cors from 'cors'
import morgan from 'morgan'

import usersRoutes from './rutas/rutas';

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(usersRoutes);

export default app;