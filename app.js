const express = require("express");
const helmet =require("helmet")
const app=express();

app.use(helmet());

const customerContactsRoutes=require("./routes/customerContacts.js");
const employeeContactsRoutes=require("./routes/employeeContacts.js");
const loginRoutes=require("./routes/login.js");
const adminRoutes=require("./routes/admin.js");

app.use((req,res,next)=>{     
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,PATCH,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-auth-token");
        next();
});

app.use(express.json({extended:false}));

app.use(customerContactsRoutes);
app.use(employeeContactsRoutes);
app.use(loginRoutes);
app.use(adminRoutes);

   app.get("/", (req,res)=>{
       res.redirect("/login")
   });

   const port=5000 || process.env.PORT

app.listen(port,()=>{
    console.log("warehouse server has started")
})

