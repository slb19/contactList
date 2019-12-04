import React,{useState, useEffect} from 'react'
import { withRouter } from "react-router-dom";
import {useDispatch} from "react-redux";
import {login,clearError} from "../../redux/actions/authActions.js"
import Spinner from"../layout/Spinner.js"


const LogIn = ({auth,history }) => {

    const dispatch=useDispatch();

    const {isAuth, isHR, isAdmin, error}=auth

    const [user,setUser]= useState({
        username:"",
        password:"",   
    });

    const [loading,setLoading]=useState(false)

    const{username,password}=user

    const onChange=(e)=>{
        setUser({...user, [e.target.name]:e.target.value})
    }

    const onSubmit=(e)=>{
        e.preventDefault();
            dispatch(login(user))
    }

    useEffect(()=>{
       if(isAuth){
            history.push("/customerContacts")
        }if(isAuth && isHR){
            history.push("/employeesContacts")
        }if(isAuth && isHR && isAdmin){
            history.push("/admin")
        }
        if(error || !error){
            setLoading(false)
        }
        
    }, [isAuth, isHR,isAdmin, history, error])


    return (
    <div className='container'>
      <div className="logIn">

      {error && <div className="error" onLoad={dispatch(clearError())}>{error}</div>}

           <form onSubmit={onSubmit}>
                <h3>Log In</h3>
                <div className="input-field">
                    <input  type="text" name="username" value={username} onChange={onChange} required />
                    <label htmlFor="first_name">Username</label>
                </div>
                    <div className="input-field">
                    <input type="password" name="password" value={password} onChange={onChange} required />
                    <label htmlFor="password">Password</label>
                </div>
               
                <input type="submit" value="Submit" 
                                className="waves-effect waves-light btn-large"
                                    style={{backgroundColor:"#0091ea"}} onClick={()=>setLoading(true)}/>
                                                        
            </form>
         </div>
         {loading && !error && <Spinner /> }
       </div>
    )
}

export default withRouter(LogIn)
