const jwt=require("jsonwebtoken");
const config=require("config");


const isHRAuth=(req,res,next)=>{
    const token=req.header("x-auth-token");
    if(!token){
        return res.status(401).json({msg:"Access denied"})
    }
    try{
        const decoded=jwt.verify(token, config.get("jwtSecret"))
            
            if(decoded.isHR || decoded.isAdmin){
                req.user=decoded;
                next();
            }else{
                res.status(401).json({msg:"token is Invalid"})
            }
            
    }catch(error){
        console.log(error);
        res.status(500).json({msg:"Server Error"})
    }
}

module.exports=isHRAuth