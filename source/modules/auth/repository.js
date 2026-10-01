import { pool } from "../../shared/config/postgres.js";


async function searchUser(dni){
    const result = await pool.query(`
        SELECT
        1
        FROM
        lobos.usuario
        WHERE
        dni= $1`,[
            dni
        ]);
    return {total:result.rowCount};
}

async function getUser(dni){
    const result = await pool.query(`
        SELECT
        u.id,
        u.name,
        u.apellidos,
        u.locked,
        u.status,
        a.passwordencrypt
        FROM
        lobos.usuario u
        INNER JOIN
        lobos.auth a
        ON
        u.id = a.id_user
        WHERE
        dni = $1`,[
            dni
        ]);
    return {data:result.rows[0]};
}

async function rolesUser(id){
    const result = await pool.query(`
        SELECT
        id_rol
        FROM 
        lobos.user_rol
        WHERE
        id_user = $1`,[id]);
    return result.rows.map(rol => rol.id_rol);
}

export default {
    searchUser,
    getUser,
    rolesUser,
}