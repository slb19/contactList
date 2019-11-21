import React , {Fragment} from 'react'
import loading from "./loading.gif"
import {connect} from "react-redux"

const Spinner = ({error}) => {
    return (
        <Fragment>
            {error && <div className="error" style={{width:"40%", margin:"auto"}}>
                        <div>{error}</div>
                      </div>}
            <img src={loading} alt="Loading..." style={{ width:"400px", margin:"auto", display:"block"}}/>
        </Fragment>
    )
}

const mapStateToProps=state=>({
    error:state.users.error
})

export default connect(mapStateToProps)(Spinner)
