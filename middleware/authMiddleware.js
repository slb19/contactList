const jwt=require("jsonwebtoken");
const config=require("config");

const allUsersAuth=(req,res,next)=>{
    const token=req.header("x-auth-token");
        if(!token){
            return res.status(401).json({msg:"Access denied"})
        }
        try{
            const decoded=jwt.verify(token, config.get("jwtSecret"))
                req.user=decoded;
                next();
        }catch(error){
            res.status(500).json({msg:"Server Error"})
        }
}


module.exports=allUsersAuth 