import React from 'react'
import {connect} from "react-redux"
import {nextFiftyF,previousFifty} from "../../redux/actions/customerContactsActions.js"

const NextFiftyFiltered = (props) => {
    return (
       
            <div className="fcont">
               <p onClick={props.nextFiftyF} className="nF" >Next 50 results</p>
                    {props.next[0]>=50 && <p className="pF" onClick={props.previousFifty} 
                                    >Previous 50 results</p>}
           </div>
        
    )
}

const mapStateToProps=state=>({
    next:state.contacts.next
})

export default connect(mapStateToProps,{nextFiftyF,previousFifty})(NextFiftyFiltered)
