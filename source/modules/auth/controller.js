import Srv from "./index.js";

async function login(req,res,next){
    Srv.login(req.body)
    .then(resp =>{
        res.send(resp);
    })
    .catch(err => {
        next(err);
    })
}

export {
    login
}