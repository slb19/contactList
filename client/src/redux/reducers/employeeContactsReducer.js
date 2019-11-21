import {GET_EMPLOYEES,
         ADD_EMPLOYEE, 
          EDIT_EMPLOYEEF,
           DELETE_EMPLOYEE,
            FILTER_EMPLOYEES,
             CLEAR_FILTER_EMPLOYEES,
              NEXT_FIFTYE,
               PREVIOUS_FIFTYE,
                NEXT_FIFTYFE,
                 RESET_NEXTE,
                  LOGOUT,
                   CLEAR_ERROR} from "../actions/types.js";


const initialState={
    employees:[],
    filter:null,
    next:[0,50],
    error:false
}


export default(state=initialState, action)=>{
    switch(action.type){
        case GET_EMPLOYEES:
                if(action.payload.msgError || action.payload==="Network Error"){
                    return{
                        ...state,
                        error:action.payload.msgError || action.payload
                    }    
                }
            return{
               ...state,
                employees:[...action.payload]
            }
            case ADD_EMPLOYEE:
                    if(action.payload.msgError || action.payload==="Network Error"){
                        return{
                            ...state,
                            error:action.payload.msgError || action.payload
                        }    
                    }
            return{
                ...state,
                employees:[action.payload,...state.employees]
            }
            case EDIT_EMPLOYEEF:
                    if(action.payload.msgError || action.payload==="Network Error"){
                        return{
                            ...state,
                            error:action.payload.msgError || action.payload
                        }    
                    }
                if(state.filter){
                    return{
                        ...state,
                        filter:[...state.filter.map(emp=>{
                            if(emp.BusinessEntityId===action.payload.BusinessEntityId){
                                return action.payload
                            }else{
                                return emp
                            }
                        })]
                    }
                }
                return{
                    ...state,
                    employees:[...state.employees.map(emp=>{
                        if(emp.BusinessEntityId===action.payload.BusinessEntityId){
                            return action.payload
                        }else{
                            return emp
                        }
                    })]
                }
                case DELETE_EMPLOYEE:
                        if(action.payload.msgError || action.payload==="Network Error"){
                            return{
                                ...state,
                                error:action.payload.msgError || action.payload
                            }    
                        }
                    if(state.filter){
                        return{
                            ...state,
                            filter:[...state.filter.filter(emp=>emp.BusinessEntityId!==action.payload.BusinessEntityId)]
                        }
                    }
                    return{
                        ...state,
                        employees:[...state.employees.filter(emp=>emp.BusinessEntityId!==action.payload.BusinessEntityId)]
                    }
                case FILTER_EMPLOYEES:
                    return{
                        ...state,
                        filter:[...state.employees.filter(employee=>{
                            const regex=new RegExp(`${action.payload}`, "gi");
                            return employee.FirstName.match(regex) || employee.LastName.match(regex)
                        })]
                    }
                    case CLEAR_FILTER_EMPLOYEES:
                        return{
                            ...state,
                            filter:null
                        }
                    case NEXT_FIFTYE:
                        var a=state.next[0]
                        var b=state.next[1]
                            if(state.employees.length-state.next[0]>50){
                        return{
                            ...state,
                            next:[a+50,b+50]
                        }
                    }else{
                        return{
                            ...state
                        }
                    }
                    case PREVIOUS_FIFTYE:
                             a=state.next[0]
                             b=state.next[1]
                        return{
                            ...state,
                            next:[a-50, b-50]
                        }
                    case NEXT_FIFTYFE:
                             a=state.next[0]
                             b=state.next[1]
                            if(state.filter.length-state.next[0]>50){   
                        return{
                            ...state,
                            next:[a+50,b+50]
                        }
                    }else{
                        return{
                            ...state
                        }
                    }
                    case RESET_NEXTE:
                        return{
                            ...state,
                            next:[0,50]
                        }
                    case LOGOUT:
                        return{
                            ...state,
                            employees:[],
                            filter:null,
                            error:false
                        }
                    case CLEAR_ERROR:
                        return{
                            ...state,
                            error:false
                        }    
            default:
                return state
    }
}


