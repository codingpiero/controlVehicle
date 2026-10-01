import { obtnCodigoDocumento } from "./utils.js";

function ServiceVigilancia(injectedStore){
    let store = injectedStore;
    async function list(){
        const responseDatabase = await store.list();
        if(responseDatabase.total === 0)
            return {status:200,message:'No se encontraron resultados.'};
        return {status:200,message:'Se encontraron resultados',data:responseDatabase.data};
    }
    async function create(body,file){
        let buffer = null;
        if(file !== undefined)
            buffer = file.buffer;
        let {tipo_documento,...part2} = body;

        let data = {
            id_documento: obtnCodigoDocumento(tipo_documento),
            ...part2,
            foto:buffer
        };
        
        
        const responseDatabase = await store.create(data);
        if(responseDatabase.total === 0)
            return {status:200,message:'Registro no exitoso.'}
        
        return {status:201,message:'Proceso Exitoso.'};
    }
    async function getPhoto(codigo){
        let id = Number(codigo);
        if(Number.isNaN(id))
            return {status:400,message:'Codigo Invalido.'};
        const responseDatabase = await store.getPhoto(id);
        if(responseDatabase.data.foto === null || responseDatabase.total == undefined)
            return {status:200,message:'No hay foto'}
        let base64 = responseDatabase.data.foto.toString('base64');
        return {status:200,message:'Se encontraron resultados.',base64:`data:image/jpeg;base64,${base64}`};
    }
    async function get(codigo){
        let id = Number(codigo);
        if(Number.isNaN(id))
            return {status:400,message:'Codigo Invalido'};
        const responseDatabase = await store.get(Number(codigo));
        if(responseDatabase.total === 0)
            return {status:200,message:'No se encontraron resultados.'};
        return {status:200,message:'Se encontraron resultados',data:responseDatabase.data};
    }
    async function remove(codigo){
        let id = Number(codigo);
        if(Number.isNaN(id)){
            return {status:200,message:'Codigo Invalido.'};
        }
        const responseDatabase = await store.remove(id);
        if(responseDatabase.total ===0 )
            return {status:200,message:'Registro no eliminado.'}
        return {status:204};
    }
    return {
        list,
        create,
        getPhoto,
        get,
        remove
    }
}

export default ServiceVigilancia;