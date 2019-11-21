import {GET_USERS,
         ADD_USER, 
          DELETE_USER, 
           LOGOUT, 
            CLEAR_ERROR, 
             CHANGE_PERM} from "../actions/types.js"


const initialState={
    users:[],
    error:false
}

export default(state=initialState, action)=>{
    switch(action.type){
        case GET_USERS:
            if(action.payload.msgError || action.payload==="Network Error"){
                return{
                    ...state,
                    error:action.payload.msgError || action.payload
                }    
            }
            return{
               ...state,
                users:[...action.payload]
            }
        case ADD_USER:
            if(action.payload.errors || action.payload.msgError || action.payload==="Network Error"){
                return{
                    ...state,
                    error:action.payload.errors || action.payload.msgError || action.payload
                }    
            }
            return{
                ...state,
                users:[action.payload,...state.users]
            }
            case DELETE_USER:
                    if(action.payload.msgError || action.payload==="Network Error"){
                        return{
                            ...state,
                            error:action.payload.msgError || action.payload
                        }    
                    }
                return{
                    ...state,
                    users:[...state.users.filter(user=>user.userid!==action.payload.BusinessEntityId)]      
                }
                case CHANGE_PERM:
                        if(action.payload.msgError || action.payload==="Network Error"){
                            return{
                                ...state,
                                error:action.payload.msgError || action.payload
                            }    
                        }else{
                            return{
                                ...state
                            }
                        }
                        
                case LOGOUT:
                    return{
                        users:[],
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

