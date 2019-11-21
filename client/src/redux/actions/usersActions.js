import {GET_USERS, 
        ADD_USER, 
         DELETE_USER,
          CHANGE_PERM,
           LOGOUT,
            CLEAR_ERROR} from "./types.js"

//GET ALL USERS FROM DATABASE
export const getUsers=()=>async dispatch=>{
    try{
   const res=await fetch("http://localhost:5000/users",{
        method:"GET",
        headers:{
          Accept:"Application/json",
          "Content-Type":"Application/json",
         "x-auth-token":localStorage.getItem("token")
        }
      })
      const data= await res.json();
        dispatch({
            type:GET_USERS,
            payload:data
        })
    }catch(error){
      dispatch({
        type:GET_USERS,
        payload:"Network Error"
        })
        console.log(error)
    }
}

//SignUp a user From admin page Form
export const addUser=(adminForm)=>async dispatch=>{
    try{
    const res= await fetch("http://localhost:5000/signup",{
      method:"POST",
      body:JSON.stringify(adminForm),
      headers:{
        Accept:"Application/json",
        "Content-Type":"Application/json",
        "x-auth-token":localStorage.getItem("token")
      }
    })
    const data=await res.json()
        dispatch({
            type:ADD_USER,
            payload:data
        })
    }catch(error){
      dispatch({
        type:ADD_USER,
        payload:"Network Error"
        })
        console.log(error)
        }
}

//DELETE USER
export const deleteUser=(user)=>async dispatch=>{
    try{ 
       const res=await fetch(`http://localhost:5000/users/${user.userid}`,{
            method:"DELETE",
            //body:JSON.stringify(user),
            headers:{
            Accept:"Application/json",
            "Content-Type":"Application/json",
            "x-auth-token":localStorage.getItem("token")
            }
        })
        const data=await res.json();
            dispatch({
                type:DELETE_USER,
                payload:data
            })   
    }catch(error){
      dispatch({
        type:DELETE_USER,
        payload:"Network Error"
        })
        console.log(error)
    }  
  }

    //Change Permission of a user
export const changePerm=(permission)=>async dispatch=>{
        console.log(permission.id)
        try{
         const res=await fetch(`http://localhost:5000/users/${permission.id}`,{
                method:"PATCH",
                body:JSON.stringify(permission),
                headers:{
                  Accept:"Application/json",
                  "Content-Type":"Application/json",
                  "x-auth-token":localStorage.getItem("token")
                }
              });
              const data=await res.json();
                dispatch({
                    type:CHANGE_PERM,
                    payload:data
                })
        }catch(error){
          dispatch({
            type:CHANGE_PERM,
            payload:"Network Error"
            })
            console.log(error)
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