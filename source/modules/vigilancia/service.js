import { obtnCodigoDocumento } from "./utils.js";
import { AppError } from "../../shared/error/AppError.js";


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
            throw new AppError(400,'INVALID_CODIGO','El codigo tiene un formato invalido.');
        const responseDatabase = await store.getPhoto(id);
        if(responseDatabase.total === 0  || responseDatabase.total === undefined)
            return {status:200,message:'No hay foto'}
        let base64 = responseDatabase.data.foto.toString('base64');
        return {status:200,message:'Se encontraron resultados.',base64:`data:image/jpeg;base64,${base64}`};
    }
    async function get(codigo){
        let id = Number(codigo);
        if(Number.isNaN(id))
            throw new AppError(400,'INVALID_CODIGO','El codigo tiene un formato invalido.');

        const responseDatabase = await store.get(Number(codigo));
        if(responseDatabase.total === 0)
            return {status:200,message:'No se encontraron resultados.'};
        return {status:200,message:'Se encontraron resultados',data:responseDatabase.data};
    }
    async function remove(codigo){
        let id = Number(codigo);
        if(Number.isNaN(id)){
            throw new AppError(400,'INVALID_CODIGO','El codigo tiene un formato invalido.');
        }
        const responseDatabase = await store.remove(id);
        if(responseDatabase.total ===0 )
            return {status:200,message:'Registro no eliminado.'}
        return {status:204};
    }
    async function update(id,body,file){
        let {tipo_documento,salida,...partData} = body;
        let buffer = null; 
        let fecha_salida = null;
        let codigo = Number(id);

        if(Number.isNaN(codigo))
            throw new AppError(400,'INVALID_CODIGO','El codigo tiene un formato invalido.');

        const searchControl = await store.get(codigo);
        if(searchControl.total === 0)
            throw new AppError(409,'NOT_FOUND','No se ha encontrado informacion.');
        
        if(file)
            buffer = file?.buffer;
        if(salida.toUpperCase().trim() === 'SI')
            fecha_salida = new Date();

        let data = {
            id:codigo,
            id_documento: obtnCodigoDocumento(body.tipo_documento),
            ...partData,
            fecha_salida,
            foto:buffer,
        }
        const responseDatabase = await store.update(data);
        if(responseDatabase.total === 0){
            return {status:200,message:'Registro no Actualizado.'};
        }
        return {status:202,message:'Registro Actualizado.'};
    }
    return {
        list,
        create,
        getPhoto,
        get,
        remove,
        update
    }
}

export default ServiceVigilancia;