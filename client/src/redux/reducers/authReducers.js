import {LOGIN, LOGOUT,CLEAR_ERROR} from "../actions/types.js";

const initialState={
    token:localStorage.getItem("token"),
    isAuth:false,
    isHR:false,
    isAdmin:false,
    error:false
}

export default(state=initialState, action)=>{
    switch(action.type){
        case LOGIN:
            if(action.payload.msg==="isHR"){
            return{
                token:localStorage.getItem("token"),
                isAuth:true,
                isHR:true,
                isAdmin:false,
                error:false
               }
            }
            if(action.payload.msg==="isAdmin"){
            return{
                token:localStorage.getItem("token"),
                isAuth:true,
                isHR:true,
                isAdmin:true,
                error:false
                }
            }
            if(action.payload.msg==="Invalid Credentials"){
                return{
                    ...state,
                    error:action.payload.msg
                }
            }
            if(action.payload.msgError){
              return{
                  ...state,
                  error:action.payload.msgError
              }
          }
          if(action.payload==="Network Error"){
            return{
                ...state,
                error:action.payload
            }
          }
            else if(!action.payload.msg){
            return{
                ...state,
                token:localStorage.getItem("token"),
                isAuth:true,
                error:false
                }
            }
            break
        case LOGOUT:
            return{
                token:localStorage.removeItem("token"),
                isAuth:false,
                isHR:false,
                isAdmin:false,
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

