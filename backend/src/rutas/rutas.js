import { Router } from 'express';
import {
    getUser,
    getUsers,
    updatePassUser,
    getPlaces,
    getPermission,
} from '../solicitudes/solicitudes.js';

const router = Router()

router.get('/users', getUsers)  //Lista de Todos los Usuarios

router.get('/users/:dni', getUser)  //Datos de un solo Usuario

router.put('/users/:dni', updatePassUser)   //Actualizar Contraseña Usuario

router.get('/places', getPlaces)     //Datos de un Espacio con su Codigo

router.get('/permissions/:dni', getPermission)  //Permisos de un solo Usuario por su DNI

export default router