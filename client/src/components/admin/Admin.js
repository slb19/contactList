import React,{Fragment, useEffect} from 'react'
import AdminForm from "./AdminForm.js"
import AdminUserItem from "./AdminUserItem.js"
import Spinner from"../layout/Spinner.js"

import {connect} from "react-redux";
import {getUsers} from '../../redux/actions/usersActions.js';

const Admin = ({users, getUsers}) => {
    
    useEffect(()=>{
        getUsers()
       // eslint-disable-next-line
    },[users])

    if(users.length===0){
        return <Spinner /> 
        }
  

    return (
<Fragment>
            <div className="container">
              <div className="row">
              
                <div className="col l4 m6 s12">
                        <AdminForm />
                    </div>
                        
              <div className="col l8 m6 s12">
              
              <table className="highlight ">
        <thead>
          <tr>
              <th>Username</th>
              <th>Emp</th>
              <th>HR</th>
              <th>Admin</th>
              <th style={{float:"right", color:"grey"}}>{users.length} Users</th>
          </tr>
        </thead>
        {users.map(user=>{
            return <AdminUserItem key={user.userid} user={user} />
                                })}
                            </table>                   
                        </div>
                    </div>
                </div>
        </Fragment>
    )
}

 const mapStateToProps=state=>({
    users:state.users.users,
    
 });

export default connect(mapStateToProps, {getUsers})(Admin)
