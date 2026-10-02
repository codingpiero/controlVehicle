import {jwt} from "../libs/auth.js";
import config from "../shared/config/configuration.js";
import {log} from "../libs/log.js";
import { decode } from "jsonwebtoken";

async function verifyToken(req,res,next){
    let authorization = req.headers.authorization;
    if(!authorization)
        return res.status(401).json({
            success:false,
            error:'INVALID_TOKEN',
            message:'Token no enviado'
        });
    if(authorization.slice(0,7).trim() !== 'Bearer'.trim())
        return res.status(401).json({
            success:false,
            error:'INVALID_TOKEN',
            message:'Token Invalido.'
        });
    let token = authorization.slice(7);
    try{
        let decoded = await jwt.decode(token,config.JWT.SECRET_KEY);
        if(!decoded)
            return res.status(401).json({
                success:false,
                error:'INVALID_TOKEN',
                message:'Token no Valido.'
            });
        req.user = decoded;
        return next();
    }catch(e){
        log.error(e);
        return res.status(401).json({
            success:false,
            error:'EXPIRED_INVALID_TOKEN',
            message:'Token Invalido o Expirado'
        });
    }
}

function verifyRol(...roles){
    return (req,res,next)=>{
        let myRoles = req.user.roles;
        let foundRoles = roles.filter(rol => myRoles.includes(rol));
        if(foundRoles.length === 0)
            return res.status(403).json({
                success:false,
                error:'FORBIDDEN',
                message:'No tiene permiso.',
            });
        return next();
    }
}

export {
    verifyToken,
    verifyRol,
}