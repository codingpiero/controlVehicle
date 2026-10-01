
function obtnCodigoDocumento(tipoDocumento){
    let codigo = 5;
    switch (tipoDocumento.toUpperCase()) {
        case 'DNI':
            codigo = 1;
            break;
        case 'CE':
            codigo = 2;
            break;
        case 'RUC':
            codigo = 3;
            break;
        case 'PS':
            codigo = 4;
            break;
        default:
            break;
    }
    return codigo;
}

export{
    obtnCodigoDocumento
}