import React from 'react'
import {useDispatch} from "react-redux"
import {filterContacts,clearFilterContacts,resetNext} from '../../redux/actions/customerContactsActions.js';

const ContactsFilter = (props) => {
  
    const dispatch=useDispatch()

 const onChange=(e)=>{
    console.log(e.target.value)
  
    let filterText=e.target.value;
    if(filterText ===""){
        dispatch(clearFilterContacts())
            dispatch(resetNext()) 
    }else{
        dispatch(filterContacts(filterText))
        if(props.next[0]>filterText.length){
            dispatch(resetNext())
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


export default ContactsFilter
