const success = (req,res,httpCode,message) => {
    res.status(httpCode).json({
        success:true,
        message:message
    });
}
const successData = (req,res,httpCode,message,data) => {
    res.status(httpCode).json({
        success:true,
        message:message,
        data
    });
}

export {
    success,
    successData,
}