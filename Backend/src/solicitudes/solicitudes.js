import { connect } from "../database";

// Obtener el listado de todos los usuarios
export const getUsers = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection
        .query('SELECT * FROM Usuarios');

    res.json(rows);
};

//Obtener un solo usuario por su dni
export const getUser = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.
        query('SELECT * FROM Usuarios WHERE DNI = ?',
            [req.params.dni,]
        );

    res.json(rows[0]);
};

// Actualizar la contraseña de un usuario
export const updatePassUser = async (req, res) => {
    const connection = await connect();
    await connection.
        query('UPDATE Usuarios SET ? WHERE DNI = ?',
            [
                req.body,
                req.params.dni
            ]
        );

    res.sendStatus(204);
};

//=========================================================

// Obtener el listado de todos los espacios
export const getPlaces = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection
        .query('SELECT * FROM Espacios')

    res.json(rows);
};

//Obtener un solo espacio por su codigo
export const getPlace = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.
        query('SELECT * FROM Espacios WHERE CODIGO = ?',
            [req.params.codigo,]
        );

    res.json(rows[0]);
};

// Crear un nuevo espacio
export const savePlace = async (req, res) => {
    const connection = await connect();
    const [results] = await connection
        .query('INSERT INTO Espacios(CODIGO, Nombre) VALUES (?, ?)',
            [
                req.body.codigo,
                req.body.nombre
            ]
        );

    res.json({
        ...req.body
    });
};

//=========================================================

// Obtener el listado de todas las relaciones
export const getPermissions = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection
        .query('SELECT * FROM Espacios_has_Usuarios');

    res.json(rows);
};

// Crear relacion espacio-usuario
export const savePermission = async (req, res) => {
    const connection = await connect();
    const [results] = await connection
        .query('INSERT INTO Espacios_has_Usuarios(Espacios_CODIGO, Usuarios_DNI) VALUES (?, ?)',
            [
                req.body.espacio,
                req.body.usuario
            ]
        );

    res.json({
        ...req.body
    });
};

//Obtener un solo usuario por su dni
export const getPermission = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.
        query('SELECT Espacios_CODIGO FROM Espacios_has_Usuarios WHERE Usuarios_DNI = ?',
            [req.params.dni,]
        );

    res.json(rows);
};

// Cantidad de espacios registrados para el usuario
export const getPermissionCount = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection
        .query('SELECT COUNT(*) FROM Espacios_has_Usuarios WHERE Usuarios_DNI = ?',
            [req.params.dni]
        );

    res.json(rows[0]['COUNT(*)'])
};

//=========================================================