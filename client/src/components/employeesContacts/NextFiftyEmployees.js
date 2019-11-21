import React from 'react'
import {connect} from "react-redux"
import {nextFiftyE,previousFiftyE} from "../../redux/actions/employeeContactsActions.js"

const NextFiftyEmployees = (props) => {
    return (
        
        <div className="fcont">
               <p onClick={props.nextFiftyE} className="nF" >Next 50 results</p>
                    {props.next[0]>=50 && <p className="pF" onClick={props.previousFiftyE} 
                                    >Previous 50 results</p>}
                                     
        </div>
    )
}

const mapStateToProps=state=>({
    next:state.employees.next
})

export default connect(mapStateToProps,{nextFiftyE,previousFiftyE})(NextFiftyEmployees)