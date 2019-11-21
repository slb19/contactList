import React,{useState} from 'react'
import {useDispatch} from "react-redux"
import {editEmployeeF, deleteEmployee} from '../../redux/actions/employeeContactsActions.js';

const EmployeeItem = (props) => {

  const dispatch=useDispatch();

const[updateE, setUpdateE]=useState(false);
const [editEmployee,seteditEmployee]=useState(null);

const {FirstName,
     LastName,
      Phone,
       EmailAddress,
       NationalIdNumber,
        LoginId,
         JobTitle,
          LastUpdatedBy,
           LastUpdatedAt,
             BusinessEntityId}=props.employee;

const onClick=(e)=>{
    console.log(e.target, updateE)
    setUpdateE(true)
    
    seteditEmployee({
      FirstName,
      LastName,
      Phone,
      EmailAddress,
      NationalIdNumber,
      LoginId,
      JobTitle,
      BusinessEntityId
     })
    
}

const onChange=(e)=>{

  console.log(e.target.name);
    console.log(e.target.value);
  seteditEmployee({...editEmployee, [e.target.name]:e.target.value});
 
}

const onSubmit=(e)=>{
   
  e.preventDefault();
 dispatch(editEmployeeF(editEmployee))
   seteditEmployee({
      FirstName:"",
      LastName:"",
      Phone:"",
      EmailAddress:"",
      NatioanalIdNumber:"",
      LoginId:"",
      JobTitle:"",
      BirthDate:"",
      HireDate:"",
  });
  setUpdateE(false);
 
}


const onClickD=(e)=>{
    console.log(e.target)
     dispatch(deleteEmployee(props.employee));
}

    return (
      
        <div className="row ">
        <div className="col s12 m12 l12 xl12" >
          <div className="card small blue-grey darken-1" >
            {updateE!==true ? 

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
                <p><span style={{color:"black"}}>National Id Number: </span> {NationalIdNumber}</p>
                <p><span style={{color:"black"}}>LoginId:</span> {LoginId}</p>
                <p><span style={{color:"black"}}>Job Title:</span> {JobTitle}</p>
              

                  <hr/>
                    <button className="waves-effect waves-light btn-small " onClick={onClick} style={{backgroundColor:"#0091ea"}}>Edit</button>
                    <button className="waves-effect waves-light btn-small" style={{float:"right",backgroundColor:"#e53935"}} onClick={onClickD}>Delete</button> 
                  
                </div>
                      : 
                        <div className="card-content white-text" >

                          <form onSubmit={onSubmit} >
                          <p><span style={{color:"white"}}>First Name:</span>
                             <input type="text" name="FirstName" value={editEmployee.FirstName} onChange={onChange} /></p>
                          <p><span style={{color:"white"}}>Last Name:</span> 
                              <input type="text" name="LastName" value={editEmployee.LastName} onChange={onChange} /></p>
                          <p><span style={{color:"white"}}>Phone:</span>
                              <input type="text" name="Phone" value={editEmployee.Phone} onChange={onChange} /></p>
                          <p><span style={{color:"white"}}>Email:</span> 
                              <input type="text" name="EmailAddress" value={editEmployee.EmailAddress} onChange={onChange} /></p>

                          <p><span style={{color:"white"}}>National Id Number:</span>
                              <input type="text" name="NationalIdNumber" value={editEmployee.NationalIdNumber} onChange={onChange} /></p>
                          <p><span style={{color:"white"}}>Login Id:</span>
                              <input type="text" name="LoginId" value={editEmployee.LoginId} onChange={onChange} /></p>
                          <p><span style={{color:"white"}}>Job Title:</span>
                              <input type="text" name="JobTitle" value={editEmployee.JobTitle} onChange={onChange} /></p>
                          

                                    <input type="submit" value="OK" className="waves-effect waves-light btn-small" />
                            </form>

                    </div> } 
              </div>
        </div>
      </div>
    )
}

export default EmployeeItem
