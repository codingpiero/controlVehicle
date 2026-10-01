
function ServiceUser(injectedStore){
    let store = injectedStore;
    async function list(){
        const responseDatabase = await store.list();
        
        if(responseDatabase.total === 0){
            return {status:200,message:'No se encontraron resultados.'}
        }
        return {status:200,message:'Se encontraron resultados.',data:responseDatabase.data};
    }
    return {
        list,
    }
}

export default ServiceUser;