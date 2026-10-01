import Srv from "./index.js";

function list(req,res,next){
    Srv.list()
    .then(resp => {
        res.send(resp);
    })
    .catch(err => {
        next(err);
    })
}
export {
    list,
}