const express=require("express");
const router=express.Router();
const employeeContactsController=require("../controllers/employeeContacts.js");
const isHRAuth =require("../middleware/authHrMiddleware.js");

router.get("/employeesContacts", isHRAuth, employeeContactsController.getEmployeeContacts);

//add a new contact
router.post("/employeesContacts", isHRAuth, employeeContactsController.postEmployeeContacts);

//update Contact
router.put("/employeesContacts/:id", isHRAuth, employeeContactsController.putEmployeeContacts);

//delete Contact
router.delete("/employeesContacts/:id", isHRAuth, employeeContactsController.deleteEmployeeContacts);

module.exports=router;