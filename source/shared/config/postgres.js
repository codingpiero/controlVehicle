import pg from "pg";
import config from "./configuration.js";

const pool = new pg.Pool({
    connectionString: config.POSTGRESQL.URI,
    ssl: {
        rejectUnauthorized:false
    }
});



export {
    pool,
}