import React, {useState} from 'react'
import {useDispatch} from "react-redux"
import {addContact} from '../../redux/actions/customerContactsActions.js';

const ContactForm = () => {

    const dispatch=useDispatch();

    const[contactsForm, setContactsForm]=useState({
        FirstName:"",
        LastName:"",
        Phone:"",
        EmailAddress:""
    });

    const{FirstName,LastName,Phone,EmailAddress}=contactsForm;

    const onChange=(e)=>{
         console.log(e.target.name);
        console.log(e.target.value);
        setContactsForm({...contactsForm, [e.target.name]:e.target.value});
    }

    const onSubmit=(e)=>{
        e.preventDefault();
        dispatch(addContact(contactsForm))
         setContactsForm({
            FirstName:"",
            LastName:"",
            Phone:"",
            EmailAddress:""
         })
    }

    return (
        <div style={style}>
            <form onSubmit={onSubmit}>
                <h3>New Contact</h3>
                <div className="input-field">
                    <input type="text" name="FirstName" value={FirstName} onChange={onChange} required />
                    <label htmlFor="first_name">First Name</label>
                </div>
                    <div className="input-field">
                    <input type="text" name="LastName" value={LastName} onChange={onChange} required />
                    <label htmlFor="last_name">Last Name</label>
                </div>
                <div className="input-field">
                    <input type="text" name="Phone" value={Phone}  onChange={onChange} required />
                    <label htmlFor="Phone">Phone</label>
                </div>
                <div className="input-field">
                    <input type="email" name="EmailAddress" value={EmailAddress} onChange={onChange} required />
                    <label htmlFor="Email">Email</label>
                </div>
                        <div>
                            <input type="submit" value="Add" 
                                className="waves-effect waves-light btn-large"
                                    style={{backgroundColor:"#0091ea"}}/>
                        </div>
                        
            </form>
        </div>
    )
}
const style={
    marginTop:"10px",
    
}  
export default ContactForm
