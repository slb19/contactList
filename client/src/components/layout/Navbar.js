import React,{useRef} from 'react'
import {Link} from "react-router-dom"
import {useDispatch} from "react-redux"
import {logout} from "../../redux/actions/authActions.js"

const Navbar = () => {

  const dispatch=useDispatch();

  const show=useRef(null)
  const show1=useRef(null)
  const show2=useRef(null)

  const onClick=()=>{
    //console.log(show.current.classList)
    
    show.current.classList.toggle("active1");
    show1.current.classList.toggle("active2");
    show2.current.classList.toggle("active3");
  }

  const onClickLogOut=()=>{
    dispatch(logout());
  }

    return (
        <nav className="navb" ref={show1}>
          <div className="title">Contacts !</div>

                <a href="#!" className="burg" onClick={onClick}>
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>    
                </a> 
                <hr className="vline" ref={show2}/> 
            <div  className="navb-links" ref={show}>
              <ul>
                <li><Link to="/customerContacts">Customers</Link></li>
                <li><Link to="/employeesContacts">Employees</Link></li>    
                <li><Link to="/admin">Admin</Link></li>  
                <li><Link onClick={onClickLogOut} to="/">Log-out</Link></li>   
              </ul>
            </div>
        </nav>
    )
  
}

export default Navbar
