import { connect } from "../database.js";

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

//Obtener los datos de todos los Espacios
export const getPlaces = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.
        query('SELECT * FROM Espacios');

    res.json(rows);
};

//=========================================================

//Obtener un solo usuario por su dni
export const getPermission = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.
        query('SELECT Espacios_CODIGO FROM Espacios_has_Usuarios WHERE Usuarios_DNI = ?',
            [req.params.dni,]
        );

    res.json(rows);
};

//=========================================================