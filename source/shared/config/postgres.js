import pg from "pg";
import config from "./configuration.js";

const pool = new pg.Pool({
    connectionString: config.POSTGRESQL.URI,
    ssl: {
        rejectUnauthorized:process.env.NODE_ENV == 'production' ? true:false
    }
});



export {
    pool,
}