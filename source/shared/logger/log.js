import { log } from "../../libs/log.js";


function logger(e){
    log.error('===========START::ERROR===========');
    log.error(e);
    log.error('===========END::ERROR===========')
}

export {
    logger,
}