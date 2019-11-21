import React,{Fragment} from 'react';
import Employees from "./Employees.js";
import EmployeesForm from "./EmployeesForm.js";
import EmployeesFilter from "./EmployeesFilter.js";
import NextFiftyEmployees from "./NextFiftyEmployees.js";
import NextFiftyFilteredE from "../employeesContacts/NextFiftyFilteredE.js";
import {clearError} from "../../redux/actions/employeeContactsActions.js"

import {connect} from "react-redux";

    const EmployeesContacts = ({
                                employees,
                                  filter,
                                    next,
                                      error,
                                       clearError
                                         }) => {

    return (
            <Fragment>

                <div className="container ">

                {error && <div className="error" style={{width:"50%",
                      margin:"0 auto", marginTop:"5px"}} onLoad={clearError()}>{error}</div>}

                    <div className="row">
                        <div className="col l7 m6 s12 extras extras1">
                            <EmployeesForm />            
                               <EmployeesFilter next={next}/>

                        {filter ? <div className="textResults"><NextFiftyFilteredE/>{filter.length-next[0]} Results</div>
                                                        : 
                            <div className="textResults"><NextFiftyEmployees />{employees.length-next[0]} Results</div>}
                       </div>

                <div className="col l5 m6 s12">
                    <Employees  employees={employees} />   
        </div>
    </div>
</div>
            </Fragment>
            )
        }

        const mapStateToProps=state=>({
            employees:state.employees.employees,
            filter:state.employees.filter,
            next:state.employees.next,
            error:state.employees.error
        });

 export default connect(mapStateToProps,{clearError})(EmployeesContacts)