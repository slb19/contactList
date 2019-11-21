const express=require("express");
const router=express.Router();
const customerContactsController=require("../controllers/customerContacts.js")
const allUsersAuth =require("../middleware/authMiddleware.js");

router.get("/customerContacts", allUsersAuth, customerContactsController.getCustomerContacts)

//add a new contact
router.post("/customerContacts", allUsersAuth, customerContactsController.postCustomerContacts)

//update Contact
router.put("/customerContacts/:id", allUsersAuth, customerContactsController.putCustomerContacts )

//delete Contact
router.delete("/customerContacts/:id", allUsersAuth, customerContactsController.deleteCustomerContacts)

module.exports=router;