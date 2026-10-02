import Srv from "./index.js";
import { successData,success } from "../../shared/response/response.js";

function list(req,res,next){
    Srv.list()
    .then(resp => {
        successData(req,res,resp.status,resp.message,resp?.data);
    })
    .catch(err => {
        next(err);
    })
}
function create(req,res,next){
    Srv.create(req.body,req.file)
    .then(resp=>{
        res.send(resp);
    })
    .catch(err => {
        next(err);
    })
}
function getPhoto(req,res,next){
    Srv.getPhoto(req.params.id)
    .then(resp => {
        res.send(resp)
    })
    .catch(err =>{
        next(err);
    });
}
function get(req,res,next){
    Srv.get(req.params.id)
    .then(resp =>{
        res.send(resp);
    })
    .catch(err =>{
        next(err);
    })
}

function remove(req,res,next){
    Srv.remove(req.params.id)
    .then(resp =>  {
        res.send(resp);
    })
    .catch(err => {
        next(err);
    })
}

function update(req,res,next){
    Srv.update(req.params.id,req.body,req.file)
    .then(resp => {
        success(req,res,resp.status,resp.message);
    })
    .catch(err => {
        next(err);
    })
}

export {
    list,
    create,
    getPhoto,
    get,
    remove,
    update
}