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
export default {
    list,
}