import React from 'react'
import {useDispatch} from "react-redux"
import {filterEmployees,clearFilterEmployees,resetNextE} from '../../redux/actions/employeeContactsActions.js';

const EmployeesFilter = (props) => {
  
    const dispatch=useDispatch();

 const onChange=(e)=>{
    console.log(e.target.value)
  
    let filterText=e.target.value;
    if(filterText ===""){
       dispatch(clearFilterEmployees())
            dispatch(resetNextE()) 
    }else{
        dispatch(filterEmployees(filterText))
        if(props.next[0]>filterText.length){
            dispatch(resetNextE()) 
        } 
    }  
 }

    return (
        <form >
            <div className="input-field filter">
                <input type="text" name="text"  onChange={onChange} />
                <label htmlFor="Filter Contacts">Filter Contacts</label>
            </div>
        </form>
    )
}


export default EmployeesFilter