import React, {useState} from 'react'
//import Contacts from './Contacts';
import {useDispatch} from "react-redux"
import {addEmployee} from '../../redux/actions/employeeContactsActions.js';

const EmployeesForm = () => {

    const dispatch=useDispatch();

    const [employeeForm, setEmployeeForm]=useState({
        FirstName:"",
         LastName:"",
          Phone:"",
           EmailAddress:"",
            NationalIdNumber:"",
             LoginId:"",
              JobTitle:""
                            });

    const {FirstName,
           LastName,
            Phone,
             EmailAddress,
              NationalIdNumber,
               LoginId,
                JobTitle}=employeeForm;

    const onChange=(e)=>setEmployeeForm({...employeeForm, [e.target.name]:e.target.value});
    

    const onSubmit=(e)=>{
        e.preventDefault();
        dispatch(addEmployee(employeeForm))
         setEmployeeForm({
            FirstName:"",
            LastName:"",
            Phone:"",
            EmailAddress:"",
            NationalIdNumber:"",
            LoginId:"",
            JobTitle:""
         })
    }

    return (
        <div style={style}>
            <form onSubmit={onSubmit}>
                <h3>New Employee</h3>
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

                <div className="input-field">
                    <input type="text" name="NationalIdNumber" value={NationalIdNumber} onChange={onChange} required />
                    <label htmlFor="NationalIdNumber">National Id Number</label>
                </div>
                <div className="input-field">
                    <input type="text" name="LoginId" value={LoginId} onChange={onChange} required />
                    <label htmlFor="LoginId">LoginId</label>
                </div>
                <div className="input-field">
                    <input type="text" name="JobTitle" value={JobTitle} onChange={onChange} required />
                    <label htmlFor="JobTitle">Job Title</label>
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
export default EmployeesForm
