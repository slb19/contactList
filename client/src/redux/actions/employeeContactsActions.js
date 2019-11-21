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
                   CLEAR_ERROR} from "./types.js"
             

export const getEmployees=()=>async dispatch=>{
   
   try{
    const res= await fetch("http://localhost:5000/employeesContacts",{
        method:"GET",
        headers:{
          Accept:"Application/json",
          "Content-Type":"Application/json",
          "x-auth-token":localStorage.getItem("token")
        }
      })
      const data= await res.json()
          dispatch({
              type:GET_EMPLOYEES,
              payload:data
          })
        
   }catch(error){
    dispatch({
      type:GET_EMPLOYEES,
      payload:"Network Error"
      })
     console.log(error)
   }        
  }
  
  //ADD Employee
export const addEmployee=(employeeForm)=>async dispatch=>{
    try{
    const res=await fetch(`http://localhost:5000/employeesContacts`,{
            method:"POST",
            body:JSON.stringify(employeeForm),
            headers:{
              Accept:"Application/json",
              "Content-Type":"Application/json",
              "x-auth-token":localStorage.getItem("token")
            }
          });
          const data= await res.json();
                dispatch({
                    type:ADD_EMPLOYEE,
                    payload:data
                })
          
    }catch(error){
      dispatch({
        type:ADD_EMPLOYEE,
        payload:"Network Error"
        })
        console.log(error);
    }
  }

    //edit Employee
export const editEmployeeF=(editEmployee)=>async dispatch=>{
  console.log(editEmployee)
    try{
    const res=await fetch(`http://localhost:5000/employeesContacts/${editEmployee.BusinessEntityId}`,{
            method:"PUT",
            body:JSON.stringify(editEmployee),
            headers:{
              Accept:"Application/json",
              "Content-Type":"Application/json",
              "x-auth-token":localStorage.getItem("token")
            }
          });
          const data= await res.json();
                dispatch({
                    type:EDIT_EMPLOYEEF,
                    payload:data
                });
          
    }catch(error){
      dispatch({
        type:EDIT_EMPLOYEEF,
        payload:"Network Error"
        })
        console.log(error);
    }
  }
  
  //DELETE EMPLOYEE
  export const deleteEmployee=(employee)=>async dispatch=>{
    const{BusinessEntityId}=employee;
      try{
       const res= await fetch(`http://localhost:5000/employeesContacts/${BusinessEntityId}`,{
            method:"DELETE",
            headers:{
              Accept:"Application/json",
              "Content-Type":"Application/json",
              "x-auth-token":localStorage.getItem("token")
            }
          });
          const data = await res.json();
                    dispatch({
                        type:DELETE_EMPLOYEE,
                        payload:data
                    });
      }catch(error){
        dispatch({
          type:DELETE_EMPLOYEE,
          payload:"Network Error"
          });
          console.log(error);
      }
    }

  export const filterEmployees=(filterText)=>dispatch=>{
                    dispatch({
                        type:FILTER_EMPLOYEES,
                        payload:filterText
                    })
      }
      
   export const clearFilterEmployees=()=>dispatch=>{
    dispatch({
        type:CLEAR_FILTER_EMPLOYEES
        
    })
  }

  export const nextFiftyE=()=>dispatch=>{
    dispatch({
      type:NEXT_FIFTYE
    });        
} 

export const previousFiftyE=()=>dispatch=>{
    dispatch({
      type:PREVIOUS_FIFTYE
    });
}

export const nextFiftyFE=()=>dispatch=>{
    dispatch({
      type:NEXT_FIFTYFE
    });
}

export const resetNextE=()=>dispatch=>{
dispatch({
  type:RESET_NEXTE
});
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