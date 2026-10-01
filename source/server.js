
import server from "./app.js";
import config from "./shared/config/configuration.js";
import {log} from "./libs/log.js";

server.listen(config.API.PORT,()=>{
    log.info(`SERVER START [ENV:${process.env.NODE_ENV}]::[PORT:${config.API.PORT}]`);
});