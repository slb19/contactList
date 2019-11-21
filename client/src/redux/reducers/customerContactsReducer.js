import {GET_CONTACTS,
        ADD_CONTACT,
        EDIT_CONTACTF,
         DELETE_CONTACT,
          FILTER_CONTACTS,
           CLEAR_FILTER_CONTACTS,
            NEXT_FIFTYC,
             PREVIOUS_FIFTY,
              NEXT_FIFTYF,
               RESET_NEXT,
                LOGOUT,
                 CLEAR_ERROR} from "../actions/types.js"

const initialState={
    contacts:[],
    filter:null,
    next:[0,50],
    error:false
}

export default(state=initialState, action)=>{
    
    switch(action.type){
        case GET_CONTACTS:
                if(action.payload.msgError || action.payload==="Network Error"){
                    return{
                        ...state,
                        error:action.payload.msgError || action.payload
                    }    
                }
            return{
               ...state,
                contacts:[...action.payload]
            }
            case ADD_CONTACT:
                    if(action.payload.msgError || action.payload==="Network Error"){
                        return{
                            ...state,
                            error:action.payload.msgError || action.payload
                        }    
                    }
            return{
               ...state,
                contacts:[action.payload,...state.contacts]
            }
            case EDIT_CONTACTF:
                if(action.payload.msgError || action.payload==="Network Error"){
                        return{
                            ...state,
                            error:action.payload.msgError || action.payload
                        }    
                    }
                if(state.filter){
                    return{
                        ...state,
                        filter:[...state.filter.map(cont=>{
                            if(cont.BusinessEntityId===action.payload.BusinessEntityId){
                                return action.payload
                            }else{
                                return cont
                            }
                        })]
                    }
                }
                return{
                    ...state,
                    contacts:[...state.contacts.map(cont=>{
                        if(cont.BusinessEntityId===action.payload.BusinessEntityId){
                            return action.payload
                        }else{
                            return cont
                        }
                    })]
                }
            case DELETE_CONTACT:
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
                    contacts:[...state.contacts.filter(cont=>cont.BusinessEntityId!==action.payload.BusinessEntityId)]
            }
            case FILTER_CONTACTS:
                return{
                    ...state,
                    filter:[...state.contacts.filter(contact=>{
                        const regex= new RegExp(`${action.payload}`, "gi");
                         return contact.FirstName.match(regex) || contact.LastName.match(regex) 
                    })]
                }
                case CLEAR_FILTER_CONTACTS:
                    return{
                        ...state,
                        filter:null
                    }
                case NEXT_FIFTYC:
                        var a=state.next[0]
                        var b=state.next[1]
                        if(state.contacts.length-state.next[0]>50){
                    return{
                        ...state,
                        next:[a+50,b+50]
                    }
                }else{
                    return{
                        ...state
                    }
                }
                case PREVIOUS_FIFTY:
                         a=state.next[0]
                         b=state.next[1]
                    return{
                        ...state,
                        next:[a-50, b-50]
                    }
                case NEXT_FIFTYF:
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
                case RESET_NEXT:
                    return{
                        ...state,
                        next:[0,50]
                    }
                case LOGOUT:
                    return{
                        ...state,
                        contacts:[],
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

