
import { compareEncrypt } from "../../libs/encrypt.js";

import { generatedToken } from "../../libs/auth.js";

function ServiceAuth(injectedStore){
    let store = injectedStore;
    async function login(body){
        let {dni,password} = body;
        if(dni.length === 0 ){
            return {status:400,message:'Ingrese su DNI.'};
        }
        let dniOriginal = Number(dni);

        if(Number.isNaN(dniOriginal))
            return {status:400,message:'DNI invalido.'};

        if(dni.length !== 8 ){
            return {status:400,message:'El DNI. no tiene 8 digitos.'};
        }
        if(password.length === 0){
            return {status:400,message:'Ingrese su Password.'};
        }
        let responseSearchUser = await store.searchUser(dni);
        
        if(responseSearchUser.total === 0){
            return {status:401,message:'Credenciales Invalidas.'};
        }
        const responseUser = await store.getUser(dni);
        if(!responseUser.data.locked)
            return {status:403,message:'Usuario Bloqueado.'};
        if(!responseUser.data.status)
            return {status:403,message:'Usuario Inactivo.'};
        let validPassword = await compareEncrypt(body.password,
        responseUser.data.passwordencrypt);
        if(!validPassword)
            return {status:401,message:'Credenciales Invalidas.'};

        let roles = await store.rolesUser(responseUser.data.id);

        let payload = {
            id:responseUser.data.id,
            nombre:responseUser.data.name,
            apellidos:responseUser.data.apellidos,
            roles
        }
        let token = await generatedToken(payload)
        return {status:200,token};
    }
    return {
        login
    }
}

export default ServiceAuth;