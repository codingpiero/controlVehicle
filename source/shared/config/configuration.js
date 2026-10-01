import dotenv from "dotenv";

let env = process.env.NODE_ENV ?? 'development';
dotenv.config({
    path:`.env.${env}.local`,
})

const config = {
    API:{
        PORT:process.env.PORT || 3000,
    },
    POSTGRESQL:{
        URI:process.env.POSTGRESQL
    },
    JWT:{
        SECRET_KEY:process.env.SECRET_KEY,
    }
}
export default config;