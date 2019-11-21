import React,{Fragment, useState} from 'react'
import {useDispatch} from "react-redux"
import {deleteUser,changePerm} from '../../redux/actions/usersActions.js';
import {connect} from "react-redux";

const AdminUserItem = (props) => {

    const dispatch=useDispatch();

    const[permission, setPermission]=useState({
        id:null,
        perm:null});

    const[updateUser, setUpdateUser]=useState(false);

    const {username, isHR, isAdmin}=props.user
    

    const onClick=(e)=>{
        console.log(updateUser)
        setUpdateUser(true)
    }

    const onChange=(e)=>{
        console.log(e.target.value)
        setPermission({
            id:props.user.userid,
            perm:e.target.value
        });   
    }

    const submitChange=(e)=>{
        e.preventDefault()
        if(permission.perm!==null){
        dispatch(changePerm(permission))
        }
        setUpdateUser(false)
        setPermission({
            id:null,
            perm:null
        });
    }

    return (
        
       <Fragment>
            
           {/* */} 
           {updateUser!==true ?
           <tbody>
               
          <tr>
            <td>{username}</td>
            <td><form>
            <p>
                <label>
                    <input type="checkbox" className="filled-in" checked={!isHR && !isAdmin} readOnly />
                    <span></span>
                </label>
            </p>
                </form></td>
            <td><form>
            <p>
                <label>
                    <input type="checkbox" className="filled-in" checked={isHR}  readOnly />
                    <span></span>
                </label>
            </p>
                </form></td>
            <td><form>
            <p >
                <label>
                    <input type="checkbox" className="filled-in"  checked={isAdmin}  readOnly />
                    <span></span>
                </label>
            </p>
                </form></td>
                <td>
            
            <button className="waves-effect waves-light btn-small" 
                    onClick={onClick}
                    style={{backgroundColor:"#0091ea"}}>Edit</button>
            
            <button className="waves-effect waves-light btn-small" 
                    onClick={()=>dispatch(deleteUser(props.user))}
                    style={{float:"right",backgroundColor:"#e53935",width:"60px"}}>Del</button>
            
            </td>
          </tr>
          
        </tbody>
        
        :
        
        <tbody>
          
          <tr>
            <td>{username}</td>
            <td>
            <p>
                <label>
                    <input type="radio" className="with-gap" name="perm" value="Emp"  onChange={onChange}/>
                    <span></span>
                </label>
            </p>
                </td>
            <td>
            <p>
                <label>
                    <input type="radio" className="with-gap" name="perm" value="HR" onChange={onChange} />
                    <span></span>
                </label>
            </p>
                </td>
            <td>
            <p className="radioP">
                <label>
                    <input type="radio" className="with-gap" name="perm" value="Admin" onChange={onChange}/>
                    <span></span>
                </label>
            </p>
                </td>
                <td>
            <p className="radioP">
            <button className="waves-effect waves-light btn-small" onClick={submitChange}>ok</button>
            </p>
                </td>
          </tr> 
          
        </tbody>
        
           }
       </Fragment>
    )
}

const mapStateToProps=state=>({
    error:state.users.error
})

export default connect(mapStateToProps)(AdminUserItem)


