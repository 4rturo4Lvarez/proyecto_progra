import { Router } from 'express';
import {
    getUser,
    getUsers,
    updatePassUser,
    getPlaces,
    savePlace,
    getPermissions,
    savePermission,
    getPermission,
    getPlace,
    getPermissionCount,
} from '../solicitudes/solicitudes';

const router = Router()

router.get('/users', getUsers)

router.get('/users/:dni', getUser)

router.put('/users/:dni', updatePassUser)

router.get('/places', getPlaces)

router.get('/places/:codigo', getPlace)

router.post('/places', savePlace)

router.get('/permissions', getPermissions)

router.post('/permissions', savePermission)

router.get('/permissions/:dni', getPermission)

router.get('/permissions/count/:dni', getPermissionCount)

export default router