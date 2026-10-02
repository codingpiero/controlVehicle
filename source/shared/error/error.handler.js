import { success } from "zod";
import { logger } from "../../shared/logger/log.js";
const errorGeneral = (err,req,res,next)=>{
    logger(err);
    if(err.isOperational){
        return res.status(err.status).json({
            success:false,
            code:err.code,
            message:err.message
        });
    }
    return res.status(500).json({
        success:false,
        code:'ERROR_INTERNAL',
        message:'Ha ocurrido un error interno en el servidor.'
    });
}

export {
    errorGeneral,
}