import React,{useState} from 'react'
import {useDispatch} from "react-redux"
import {deleteContact,editContactF} from '../../redux/actions/customerContactsActions.js';


const ContactItem = (props) => {

  const dispatch=useDispatch()

const[update, setUpdate]=useState(false);
const [editContact,seteditContact]=useState(null);

const {FirstName, LastName, Phone, EmailAddress, BusinessEntityId,LastUpdatedBy,LastUpdatedAt}=props.contact;

const onClick=(e)=>{
    console.log(e.target, update)
    setUpdate(true)
    
    seteditContact({
      FirstName,
      LastName,
      Phone,
      EmailAddress,
      BusinessEntityId
     })
    
}

const onChange=(e)=>{
  console.log(e.target.name);
    console.log(e.target.value);
  seteditContact({...editContact, [e.target.name]:e.target.value});
}

const onSubmit=(e)=>{
  e.preventDefault();
   dispatch(editContactF(editContact))
   seteditContact({
      FirstName:"",
      LastName:"",
      Phone:"",
      EmailAddress:""
  });
  setUpdate(false);
}


const onClickD=(e)=>{
    console.log(e.target)
       dispatch(deleteContact(props.contact));
}

    return (
      
        <div className="row ">
        <div className="col s12 m12 l12 xl12" >
          <div className="card small blue-grey darken-1" >
            {update!==true ? 

            <div className="card-content  white-text " >
              
                <p style={{float:"right"}}>
                  <span style={{color:"black", fontStyle:"italic"}}>
                    Updated by: </span>{LastUpdatedBy} <span style={{color:"black",fontStyle:"italic"}}>at </span>
                    {LastUpdatedAt}
                      </p>
                <hr style={{marginBottom:"17px"}}/>

                <p><span style={{color:"black"}}>First Name: </span> {FirstName}</p>
                <p><span style={{color:"black"}}>Last Name:</span> {LastName}</p>
                <p><span style={{color:"black"}}>Phone:</span> {Phone}</p>
                <p><span style={{color:"black"}}>Email:</span> {EmailAddress}</p> 
                  <hr/>
                    <button className="waves-effect waves-light btn-small " onClick={onClick} style={{backgroundColor:"#0091ea"}}>Edit</button>
                    <button className="waves-effect waves-light btn-small" style={{float:"right",backgroundColor:"#e53935"}} onClick={onClickD}>Delete</button> 
                  
                </div>
                      : 
                        <div className="card-content white-text" >

                          <form onSubmit={onSubmit} >
                          <p><span style={{color:"white"}}>First Name:</span>
                             <input type="text" name="FirstName" value={editContact.FirstName} onChange={onChange} /></p>
                          <p><span style={{color:"white"}}>Last Name:</span> 
                              <input type="text" name="LastName" value={editContact.LastName} onChange={onChange} /></p>
                          <p><span style={{color:"white"}}>Phone:</span>
                              <input type="text" name="Phone" value={editContact.Phone} onChange={onChange} /></p>
                          <p><span style={{color:"white"}}>Email:</span> 
                              <input type="text" name="EmailAddress" value={editContact.EmailAddress} onChange={onChange} /></p>
                                    <input type="submit" value="OK" className="waves-effect waves-light btn-small" />
                            </form>

                    </div> } 
              </div>
        </div>
      </div>
    )
}

export default ContactItem
