const bcrypt=require("bcrypt");
const {validationResult} = require('express-validator');
const sql=require("mssql");
const Users=require("../models/users.js");

//Sinup a user
exports.postSignup=async (req,res)=>{
    const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.errors[0].msg});
     }
    const {userName, password, permission}=req.body;
   
try{
    const request=new sql.Request(Users).input('username',sql.VarChar(50),userName)

    const user=await request.query(`SELECT * FROM dbo.users WHERE username=@username`);
    //console.log(user);
        if(user.recordset.length!==0){
            return res.status(400).json({msgError:"This username is taken"})
        }

    const salt= await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(password, salt)
    
        let isHR;
        let isAdmin;

        switch(permission){
            case "Emp":isHR=0,isAdmin=0
            break;
            case "HR":isHR=1,isAdmin=0
            break;
            case "Admin":isHR=0,isAdmin=1
            break;
        }

        const request1=new sql.Request(Users).input('username',sql.VarChar(50),userName)
                                             .input('hashedPassword',sql.Char(60),hashedPassword)
                                             .input('isHR',sql.Bit(), isHR)
                                             .input('isAdmin',sql.Bit(), isAdmin)

    await request1.query(`insert into users values(@username, @hashedPassword, @isHR, @isAdmin)`)
    res.status(201).json({msgSuccess:"Sign-up Succesfull"})

}catch(error){
console.log(error)
res.status(500).json({msgError:"Internal Server error"});

}
}

//GET users
exports.getUsers=async(req,res)=>{
    try{
        let users=await Users.query("SELECT userid, username ,isHR, isAdmin FROM dbo.users ORDER BY userid desc")
            res.status(200).json(users.recordset)
    }catch(error){
        console.log(error)
        res.status(500).json({msgError:"Internal Server error"});  
    }
}

//Update users permissions
exports.updateUsers=async(req,res)=>{
    const id=req.params.id;
    const {perm}=req.body
   
    try{
        let isHR;
        let isAdmin;

        switch(perm){
            case "Emp":isHR=0,isAdmin=0
            break;
            case "HR":isHR=1,isAdmin=0
            break;
            case "Admin":isHR=0,isAdmin=1
            break;
        }
      
            await Users.query(`UPDATE dbo.users SET isHR=${isHR}, isAdmin=${isAdmin} WHERE userid=${id}`)
      
              res.status(201).json({msg:"permissions updated"})  
    }catch(error){
       console.log(error);
        res.status(500).json({msgError:"Server error"}); 
    }
}

//Delete User
exports.deleteUsers=async(req,res)=>{
    try{
        const id=req.params.id;
            const deletedUser= await Users.query(`SELECT * FROM dbo.users where userid=${id}`)
                await Users.query(`DELETE FROM dbo.users where userid=${id}`);
                    res.status(200).json(deletedUser.recordset[0])
    }catch(error){
        console.log(error);
        res.status(500).json({msgError:"Server error"}); 
    }
}