const sql=require("mssql");
const Contacts=require("../models/contacts.js");
const Users=require("../models/users.js")

//GET Employees Contacts
exports.getEmployeeContacts=async(req,res)=>{
    try{
        let employees= await Contacts.query("SELECT * FROM dbo.employeeContacts");
        res.status(200).json(employees.recordset);
    }catch(error){
        res.status(500).json({msgError:"Server Error"});
        console.log(error)
    }
}

//Add employee contact
exports.postEmployeeContacts=async(req,res)=>{
   
    try{
        const date=new Date()
        const month=date.getMonth()+1
        const fullDate=date.getDate()+"/"+month+"/"+date.getFullYear();

        const {NationalIdNumber,LoginId,JobTitle,FirstName, LastName, Phone, EmailAddress,}=req.body;
     
        let user=await Users.query(`SELECT username FROM dbo.users WHERE userid=${req.user.id}`)
                const user1=user.recordset[0].username  

        let maxId=await Contacts.query("SELECT * FROM  dbo.employeeContacts WHERE BusinessEntityId = "+
                                    "(SELECT MAX(BusinessEntityId)  FROM dbo.employeeContacts)");
            maxId.recordset[0].BusinessEntityId++         //AUTO INCREMENT IN DATABASE DOES NOT WORK 

        const request=new sql.Request(Contacts).input('NationalIdNumber',sql.NVarChar(15),NationalIdNumber)
                                            .input('LoginId',sql.NVarChar(256),LoginId)
                                            .input('JobTitle',sql.NChar(50),JobTitle)
                                            .input('FirstName',sql.NVarChar(50),FirstName)
                                            .input('LastName',sql.NVarChar(50),LastName)
                                            .input('Phone',sql.NVarChar(25),Phone)
                                            .input('EmailAddress',sql.NVarChar(50),EmailAddress)
                                            .input('user1',sql.NVarChar(50),user1)
                                            .input('fullDate',sql.NVarChar(50),fullDate)

       await request.query(`INSERT INTO dbo.employeeContacts VALUES( ${maxId.recordset[0].BusinessEntityId},`+
            `@NationalIdNumber, @LoginId, @JobTitle, ${null}, ${null}, ${null}, ${null}, @FirstName, @LastName, @EmailAddress, @Phone, @user1, @fullDate)`);

       let employee=await Contacts.query(`SELECT * FROM  dbo.employeeContacts WHERE BusinessEntityId =${maxId.recordset[0].BusinessEntityId}`);
                   
                 res.status(201).json(employee.recordset[0])
    }catch(error){
        console.log(error.message);
        res.status(500).json({msgError:"Server Error"});
    }
}

//uPDATE Employee contact

exports.putEmployeeContacts=async(req,res)=>{
    try{
        const date=new Date()
        const month=date.getMonth()+1
        const fullDate=date.getDate()+"/"+month+"/"+date.getFullYear();

        const id=req.params.id
        const {NationalIdNumber,LoginId,JobTitle,FirstName, LastName, Phone, EmailAddress,}=req.body;
       
        let user=await Users.query(`SELECT username FROM dbo.users WHERE userid=${req.user.id}`);
                const user1=user.recordset[0].username;

                const request=new sql.Request(Contacts).input('NationalIdNumber',sql.NVarChar(15),NationalIdNumber)
                                                        .input('LoginId',sql.NVarChar(256),LoginId)
                                                        .input('JobTitle',sql.NChar(50),JobTitle)
                                                        .input('FirstName',sql.NVarChar(50),FirstName)
                                                        .input('LastName',sql.NVarChar(50),LastName)
                                                        .input('Phone',sql.NVarChar(25),Phone)
                                                        .input('EmailAddress',sql.NVarChar(50),EmailAddress)
                                                        .input('user1',sql.NVarChar(50),user1)
                                                        .input('fullDate',sql.NVarChar(50),fullDate)

            await request.query(`UPDATE dbo.employeeContacts SET NationalIdNumber=@NationalIdNumber,`+
                                                 `LoginId= @LoginId,` +         
                                                `FirstName=@FirstName,`+
                                                `JobTitle=@JobTitle,`+
                                                `BirthDate=${null},`+
                                                `HireDate=${null},`+
                                                `VacationHours=${null},`+
                                                `SickLeaveHours=${null},`+
                                                `LastName=@LastName,`+
                                                `EmailAddress=@EmailAddress,`+
                                                `Phone=@Phone,`+
                                                `LastUpdatedBy=@user1,`+
                                                `LastUpdatedAt=@fullDate WHERE BusinessEntityId=${id}`);
                                               
                                                
            let updatedEmployee=await Contacts.query(`SELECT * FROM  dbo.employeeContacts WHERE BusinessEntityId =${id}`);
            console.log(updatedEmployee.recordset[0])
                            res.status(200).json(updatedEmployee.recordset[0]);
        }catch(error){
            console.log(error.message);
            res.status(500).json({msgError:"Server Error"});
        }
}

//Delete employee contact
exports.deleteEmployeeContacts=async(req,res)=>{
    try{
            
        const id=req.params.id;
        const deletedEmployee= await Contacts.query(`SELECT * FROM dbo.employeeContacts where BusinessEntityId=${id}`)
            await Contacts.query(`DELETE FROM dbo.employeeContacts where BusinessEntityId=${id}`);
                res.status(200).json(deletedEmployee.recordset[0])
    }catch(error){
        console.log(error.message);
        res.status(500).json({msgError:"Server Error"}) 
    }
}
