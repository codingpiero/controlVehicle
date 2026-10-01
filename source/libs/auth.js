import jwt from "jsonwebtoken";
import config from "../shared/config/configuration.js";

async function generatedToken(payload){
    return await jwt.sign(payload,config.JWT.SECRET_KEY,{
        expiresIn:'1d',
    })  
};

export {
    generatedToken,
    jwt,
}