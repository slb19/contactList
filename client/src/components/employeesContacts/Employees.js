import React , {Fragment, useEffect} from 'react'
import EmployeesItem from "./EmployeesItem.js"
import Spinner from "../layout/Spinner.js"
import {useDispatch} from "react-redux"
import {connect} from "react-redux"
import {getEmployees} from '../../redux/actions/employeeContactsActions.js';

const Employees = ({
                    employees,
                    next,
                      filter,
                        }) => {

        const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(getEmployees());
        // eslint-disable-next-line
    },[]);

     if(employees.length===0){
        return <Spinner />
        }

    return (
           <Fragment>
               {filter!==null ? filter.slice(next[0],next[1]).map(fItem=>{
                   return <EmployeesItem key={fItem.BusinessEntityId} 
                   employee={fItem}
                    
                        />
                    }) : 
                    employees.slice(next[0],next[1]).map((employee,index)=>{
                            return <EmployeesItem key={employee.BusinessEntityId} 
                             employee={employee} 
                                />
                                })} 
            </Fragment>    
    )
}

const mapStateToProps=state=>({
    filter:state.employees.filter,
    next:state.employees.next
})

export default connect(mapStateToProps)(Employees)