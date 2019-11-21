import React,{useState} from 'react'
import {useDispatch} from "react-redux"
import {connect} from "react-redux"
import {addUser,clearError} from '../../redux/actions/usersActions.js';

const AdminForm = ({error}) => {

    const dispatch=useDispatch();

    const [adminForm, setAdminForm]=useState({
        userName:"",
        password:"",
        permission:"Emp"
    });

    const {userName, password, permission}=adminForm;

    const onChange=(e)=>setAdminForm({...adminForm, [e.target.name]:e.target.value }); 

    const onSubmit=(e)=>{
        e.preventDefault();
        dispatch(addUser(adminForm));
            setAdminForm({
                userName:"",
                password:"",
                permission:"Emp"
            })
        }
            
//console.log(error.errors)
    return (
       <div>
            {error && <div className="error" onLoad={dispatch(clearError())}>{error}</div>}

            <form onSubmit={onSubmit}>
                <h3>New User</h3>
                <div className="input-field">
                    <input type="text" name="userName" value={userName} onChange={onChange} required />
                    <label htmlFor="Username">Username</label>
                </div>
                    <div className="input-field">
                    <input type="password" name="password" value={password} onChange={onChange} required />
                    <label htmlFor="Password">Password</label>
                </div>
                
                    <p className="radioP">
                    <label>
                        <input name="permission" value="Emp" type="radio" checked={permission==="Emp"} onChange={onChange}/>
                        <span>Emp</span>
                    </label>
                    </p>
                       <p className="radioP">
                        <label>
                            <input name="permission" value="HR" type="radio" checked={permission==="HR"} onChange={onChange}/>
                            <span>HR</span>
                        </label>
                        </p>
                        <p className="radioP" >
                        <label>
                            <input name="permission" value="Admin" type="radio" checked={permission==="Admin"} onChange={onChange}/>
                            <span>Admin</span>
                        </label>
                        </p>
                        
                        <div>
                            <input type="submit" value="Add" 
                                className="waves-effect waves-light btn-large"
                                    style={{backgroundColor:"#0091ea"}}/>
                        </div>
                        
            </form>
            </div>
    )
}

const mapStateToProps=state=>({
    error:state.users.error
})

export default connect(mapStateToProps)(AdminForm)
