import { pool } from "../../shared/config/postgres.js";


async function list() {
    try {
        const result = await pool.query(`
            SELECT
            c.id as codigo,
            t.abrv as documento,
            c.fecha_ingreso as fecha_ingreso,
            c.nombres as nombres,
            c.apellidos as apellidos,
            c.placa_vehiculo as placa_vehiculo,
            c.color_vehiculo as color_vehiculo,
            c.cant_pasajero as cant_pasajero,
            c.nombre_visita as nombre_visita,
            c.direccion_visita as direccion_visita,
            c.motivo_ingreso as motivo_ingreso,
            c.fecha_salida as fecha_salida
            FROM
            lobos.control_vehiculo c
            INNER JOIN
            lobos.tipo_documento t
            ON
            c.id_documento = t.id
            ORDER BY 
            c.id DESC`);
        return { total: result.rowCount, data:result.rows};
    } catch (error) {
        throw Error(error);
    }
};
async function create(data){
    try {
        const result = await pool.query(`
            INSERT INTO lobos.control_vehiculo
            (id_documento,
            nombres,
            apellidos,
            placa_vehiculo,
            color_vehiculo,
            cant_pasajero,
            nombre_visita,
            direccion_visita,
            motivo_ingreso,
            foto)
            VALUES
            ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,[
                data.id_documento,
                data.nombres,
                data.apellidos,
                data.placa_vehiculo,
                data.color_vehiculo,
                data.cant_pasajero,
                data.nombre_visita,
                data.direccion_visita,
                data.motivo_ingreso,
                data.foto
            ]);
            return {total:result.rowCount}
    } catch (error) {
        throw Error(error);
    }
}
async function get(codigo){
    try {
    const result = await pool.query(`
        SELECT
            c.id as codigo,
            t.abrv as documento,
            c.fecha_ingreso as fecha_ingreso,
            c.nombres as nombres,
            c.apellidos as apellidos,
            c.placa_vehiculo as placa_vehiculo,
            c.color_vehiculo as color_vehiculo,
            c.cant_pasajero as cant_pasajero,
            c.nombre_visita as nombre_visita,
            c.direccion_visita as direccion_visita,
            c.motivo_ingreso as motivo_ingreso,
            c.fecha_salida as fecha_salida
            FROM
            lobos.control_vehiculo c
            INNER JOIN
            lobos.tipo_documento t
            ON
            c.id_documento = t.id
            WHERE
            c.id = $1
        `,[codigo]);
    return {total:result.rowCount,data:result.rows};    
    } catch (error) {
        throw Error(error);
    }
}

async function getPhoto(codigo){
    try {
        const result = await pool.query(`
            SELECT 
            foto
            FROM
            lobos.control_vehiculo
            WHERE
            id = $1`,[codigo]);
        return {total:result.rowCount, data:result.rows[0]};
    } catch (error) {
        throw Error(error);
    }
}

async function remove(codigo){
    try {
        
    const result = await pool.query(`
        DELETE FROM lobos.control_vehiculo
        WHERE
        id = $1`,[
            codigo
        ]);
    return {total:result.rowCount};
    } catch (error) {
        throw Error(error);
    }
}

export default {
    list,
    create,
    get,
    getPhoto,
    remove,
}