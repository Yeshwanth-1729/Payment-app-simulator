
const { JWT_PASS }= require("../config");
const jwt=require("jsonwebtoken");
const authmiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("bearer ")){
        return res.status(403).json({
            message: "Authentication failed",
        })
    }
    //console.log(req);
    const token=authHeader.split(' ')[1];
    //console.log(token);
    //console.log(JWT_PASS);
    try{
        const decoded= jwt.verify(token,JWT_PASS);
        //console.log("reached");
        //console.log(decoded);
        if(decoded.userId){
            req.userId=decoded.userId;
            //console.log("next");
            next();
        }else{
            return res.json({
                message: "user not found",
                decoded: decoded,
            })
        }
    }catch(err){
        return res.status(403).json({
            msg: "error occured: "+err ,
        })
    }
}
module.exports={
    authmiddleware
}