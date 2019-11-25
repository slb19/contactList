const sql=require("mssql");
const Contacts=require("../models/contacts.js");
const Users=require("../models/users.js")

//Get Contacts
exports.getCustomerContacts=async(req,res)=>{
    try{
        let contacts= await Contacts.query("SELECT * FROM dbo.customerContacts");
        res.status(200).json(contacts.recordset);
        
     }catch(error){
        res.status(500).json({msgError:"Server Error"});
         console.log(error)
     }       
} 

//add a new contact
exports.postCustomerContacts=async(req,res)=>{
    try{

        const date=new Date()
        const month=date.getMonth()+1
        const fullDate=date.getDate()+"/"+month+"/"+date.getFullYear();
           
        const {FirstName, LastName, Phone, EmailAddress}=req.body;
        
        let user=await Users.query(`SELECT username FROM dbo.users WHERE userid=${req.user.id}`);
                const user1=user.recordset[0].username;

        let maxId=await Contacts.query("SELECT * FROM  dbo.customerContacts WHERE BusinessEntityId = "+
                                    "(SELECT MAX(BusinessEntityId)  FROM dbo.customerContacts)");
            maxId.recordset[0].BusinessEntityId++ //AUTO INCREMENT IN DATABASE NOT WORKING

        const request=new sql.Request(Contacts).input('FirstName',sql.NVarChar(50),FirstName)
                                               .input('LastName',sql.NVarChar(50),LastName)
                                               .input('Phone',sql.NVarChar(25),Phone)
                                               .input('EmailAddress',sql.NVarChar(50),EmailAddress)
                                               .input('user1',sql.NVarChar(50),user1)
                                               .input('fullDate',sql.NVarChar(50),fullDate)

       await request.query(`INSERT INTO dbo.customerContacts VALUES( ${maxId.recordset[0].BusinessEntityId},`+
            `@FirstName, @LastName, @EmailAddress, @Phone, @user1, @fullDate)`);

       let contact=await Contacts.query(`SELECT * FROM  dbo.customerContacts WHERE BusinessEntityId =${maxId.recordset[0].BusinessEntityId}`);
                 res.status(201).json(contact.recordset[0])

    }catch(error){
        console.log(error.message);
        res.status(500).json({msgError:"Server Error"});
    }

}

//update contact
exports.putCustomerContacts=async(req,res)=>{
    try{
        const date=new Date()
        const month=date.getMonth()+1
        const fullDate=date.getDate()+"/"+month+"/"+date.getFullYear();

        const id=req.params.id
        const{FirstName,LastName,Phone,EmailAddress}=req.body
       
        let user=await Users.query(`SELECT username FROM dbo.users WHERE userid=${req.user.id}`);
                const user1=user.recordset[0].username;

                const request=new sql.Request(Contacts).input('FirstName',sql.NVarChar(50),FirstName)
                                                       .input('LastName',sql.NVarChar(50),LastName)
                                                       .input('Phone',sql.NVarChar(25),Phone)
                                                       .input('EmailAddress',sql.NVarChar(50),EmailAddress)
                                                       .input('user1',sql.NVarChar(50),user1)
                                                       .input('fullDate',sql.NVarChar(50),fullDate)
       
                await request.query(`UPDATE dbo.customerContacts SET FirstName=@FirstName,`+
                                                    `LastName=@LastName,`+
                                                    `EmailAddress=@EmailAddress,`+
                                                    `Phone=@Phone,`+
                                                    `LastUpdatedBy=@user1,`+
                                                    `LastUpdatedBy=@fullDate WHERE BusinessEntityId=${id}`);
                                                
            let updatedContact=await Contacts.query(`SELECT * FROM  dbo.customerContacts WHERE BusinessEntityId =${id}`);
            //console.log(updatedContact.recordset[0])
                            res.status(200).json(updatedContact.recordset[0]);
        }catch(error){
            console.log(error.message);
            res.status(500).json({msgError:"Server Error"});
        }
}

//delete contact
exports.deleteCustomerContacts=async(req,res)=>{
    try{
            
        const id=req.params.id;
        const deletedContact= await Contacts.query(`SELECT * FROM dbo.customerContacts where BusinessEntityId=${id}`)
            await Contacts.query(`DELETE FROM dbo.customerContacts where BusinessEntityId=${id}`);
                res.status(200).json(deletedContact.recordset[0])
    }catch(error){
        console.log(error.message);
        res.status(500).json({msgError:"Server Error"}) 
    }
}