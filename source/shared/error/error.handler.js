
const errorGeneral = (err,req,res,next)=>{
    console.log(err);
    res.send('error general');
}

export {
    errorGeneral,
}