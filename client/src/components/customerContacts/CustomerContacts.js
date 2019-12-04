import React,{Fragment} from 'react'
import Contacts from "./Contacts.js"
import ContactForm from "./ContactForm.js"
import ContactsFilter from "./ContactsFilter.js"
import NextFiftyFiltered from "./NextFiftyFiltered.js"
import NextFiftyContacts from "./NextFiftyContacts.js"
import {connect} from "react-redux";
import {clearError} from "../../redux/actions/customerContactsActions"

const CustomerContacts = ({
                            contacts,
                            filter,
                            next,
                            error,
                            clearError
                                }) => {

    return (
        <Fragment>
            <div id="asd" className="container ">

            {error && <div className="error" style={{width:"50%",
                      margin:"0 auto", marginTop:"5px"}} onLoad={clearError()}>{error}</div>}

              <div className="row">
                <div className="col l7 m6 s12 extras">   
                    <ContactForm />
                      <ContactsFilter next={next}/>

            {filter ? <div className="textResults"><NextFiftyFiltered />{filter.length-next[0]} Results</div>
                                 : 
                      <div className="textResults"><NextFiftyContacts />{contacts.length-next[0]} Results</div>}
                </div>

              <div className="col l5 m6 s12">
                    <Contacts contacts={contacts} />
                   </div>
                 </div>
                </div>
        </Fragment>
    )
}

const mapStateToProps=state=>({
  contacts:state.contacts.contacts,
  filter:state.contacts.filter,
  next:state.contacts.next,
  error:state.contacts.error
});


export default connect(mapStateToProps,{clearError})(CustomerContacts)
