const express = require("express");
const sql=require("mssql");
const Users=require("../models/users.js");
const {validationResult} = require('express-validator');
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const config=require("config");

exports.postLogin= async (req,res)=>{

                    const errors= validationResult(req);
                    if (!errors.isEmpty()) { 
                        return res.status(400).json({ errors: errors.array() });   
                    }
    try{
         const {username,password}=req.body
        
         const request=new sql.Request(Users).input('username',sql.VarChar(50),username)
         //console.log(request)
        const user= await request.query(`SELECT * FROM dbo.users WHERE username=@username`);
        
            if(user.recordset.length===0){
                return res.status(400).json({msg:"Invalid Credentials"})
            }
            const passwordIsMatch= await bcrypt.compare(password, user.recordset[0].password);
            
                if(!passwordIsMatch){
                    return res.status(400).json({msg:"Invalid Credentials"})
                }
                
                 const payload={
                      id:user.recordset[0].userid,
                      isHR:user.recordset[0].isHR,
                      isAdmin:user.recordset[0].isAdmin    
                    }
                    
                jwt.sign(payload,config.get("jwtSecret"),{expiresIn:"10h"},(error, token)=>{
                    //console.log(payload.isHR)
                    if(error){
                        throw new Error;
                    }
                    if(payload.isHR){
                        res.json({token, msg:"isHR"})
                    }if(payload.isAdmin){
                        res.json({token,msg:"isAdmin"})
                    }
                    res.json({token})
                });

    }catch(error){
        console.log(error)
        res.status(500).json({msgError:"Server error"});
    }
}