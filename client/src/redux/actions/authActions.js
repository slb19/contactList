import {LOGIN, LOGOUT,CLEAR_ERROR} from "./types"

export const login=(user)=>async dispatch=>{
    try{
    const res=await fetch("http://localhost:5000/login",{
      method:"POST",
      body:JSON.stringify(user),
      headers:{
        Accept:"Application/json",
        "Content-Type":"Application/json"
      }
    });
    const data=await res.json();
    localStorage.setItem("token",data.token)
        dispatch({
            type:LOGIN,
            payload:data
        })
    }catch(error){
        dispatch({
            type:LOGIN,
            payload:"Network Error"
            })
        console.log(error);
    }  
  }

  //LOGOUT
  export const logout=()=>dispatch=>{
      dispatch({
          type:LOGOUT
      })
  }

  export const clearError=()=>dispatch=>{
    setTimeout(()=>{
      dispatch({
        type:CLEAR_ERROR
      })  
    },3000)
  }
  
  