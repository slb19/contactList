import React , {Fragment, useEffect} from 'react'
import ContactItem from "./ContactItem.js"
import Spinner from "../layout/Spinner.js"
//import {connect} from "react-redux";
import {useDispatch} from "react-redux"
import {getContacts} from "../../redux/actions/customerContactsActions.js"
import {connect} from "react-redux"

const Contacts = ({ contacts, 
                     filter,
                      next, 
                     editContactF,
                                  }) => {
    
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(getContacts());
        // eslint-disable-next-line
    }, []);

     if(contacts.length===0){
        return <Spinner />
        }

    return (
           <Fragment>
               {filter!==null ? filter.slice(next[0],next[1]).map(fItem=>{
                   return <ContactItem key={fItem.BusinessEntityId} 
                   contact={fItem}  
                        />
                    }) : 
                    contacts.slice(next[0],next[1]).map((contact,index)=>{
                            return <ContactItem key={contact.BusinessEntityId} 
                             contact={contact} 
                                />
                            })} 
            </Fragment>    
    )
}

 const mapStateToProps=state=>({
    filter:state.contacts.filter,
    next:state.contacts.next
  });

export default connect(mapStateToProps)(Contacts)

