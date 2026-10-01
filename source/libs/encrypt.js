import bcrypt from "bcrypt";

async function compareEncrypt (text,textEncrypt){
    return await bcrypt.compare(text,textEncrypt); 
}

export {
    compareEncrypt,
}