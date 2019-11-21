import React,{Fragment} from 'react';
import {BrowserRouter as Router ,Route,Switch, Redirect} from "react-router-dom";
import LogIn from "./components/logIn/LogIn.js";
import CustomerContacts from "./components/customerContacts/CustomerContacts.js";
import EmployeesContacts from "./components/employeesContacts/EmployeesContacts.js";
import Admin from "./components/admin/Admin.js";
import Navbar from "./components/layout/Navbar.js";
import "materialize-css/dist/css/materialize.min.css"; //this is the path to the node modules
// eslint-disable-next-line 
import M from "materialize-css/dist/js/materialize.min.js" //this is the path to the node modules
import {connect} from "react-redux";
import './App.css';


const App=({auth})=> {

  return (
   
    <Router>
      <Fragment>
        
        <Navbar  />
          <Switch>
              <Route exact path="/" render={props=>(
                <LogIn  auth={auth}/>)} 
                              />  

              <Route exact path="/customerContacts" render={props=>!auth.isAuth || !auth.token ? (
                <Redirect to="/" />
                                ):(
                <CustomerContacts  auth={auth}/> )} 
                                        />

                <Route exact path="/employeesContacts" render={props=>!auth.isAuth || !auth.token || !auth.isHR ? (
                  <Redirect to="/customerContacts" />
                                ):(
                    <EmployeesContacts auth={auth} />)} 
                                            />

                  <Route exact path="/admin" render={props=>!auth.token || !auth.isAdmin ? (
                    <Redirect to="/customerContacts"/>
                                ):(
                    <Admin  auth={auth}/>)} 
                                              />
                </Switch>
              
      </Fragment>
     </Router>
     
  );
}

 const mapStateToProps=state=>({
   auth:state.auth
 })

export default connect(mapStateToProps)(App);
