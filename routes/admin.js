const express=require("express");
const router=express.Router();
const {check} = require('express-validator');
const isAdminAuth =require("../middleware/authAdminMiddleware.js");
const adminController=require("../controllers/admin.js");

//Sign up User
router.post("/signup",[check("userName","username must be more than 3 characters").isLength({min:3, max:25}),
                      check("password","password must be more than 6 characters").isLength({min:6})] ,
                        isAdminAuth ,
                            adminController.postSignup);
//Get Users
router.get("/users", isAdminAuth, adminController.getUsers);

//Update user permissions
router.patch("/users/:id", isAdminAuth, adminController.updateUsers);

//Delete User
router.delete("/users/:id",isAdminAuth , adminController.deleteUsers)

module.exports=router;