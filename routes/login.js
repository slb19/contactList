const express=require("express");
const router=express.Router();
const { check} = require('express-validator');
const loginController=require("../controllers/login.js");

//Login User
router.post("/login",[check("username", "username is required").exists(),
                      check("password","Password is required").exists()], loginController.postLogin);

module.exports=router;