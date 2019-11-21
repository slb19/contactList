import React from 'react'
import {connect} from "react-redux"
import {nextFiftyFE,previousFiftyE} from "../../redux/actions/employeeContactsActions.js"

const NextFiftyFilteredE = (props) => {
    return (
       
            <div className="fcont">
               <p onClick={props.nextFiftyFE} className="nF" >Next 50 results</p>
                    {props.next[0]>=50 && <p className="pF" onClick={props.previousFiftyE} 
                                    >Previous 50 results</p>}
           </div>
        
    )
}

const mapStateToProps=state=>({
    next:state.employees.next
})

export default connect(mapStateToProps,{nextFiftyFE,previousFiftyE})(NextFiftyFilteredE)
