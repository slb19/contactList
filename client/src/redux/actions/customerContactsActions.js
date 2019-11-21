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
                 CLEAR_ERROR} from "./types.js"


  //GET CONTACTS
  export const getContacts=()=>async dispatch=>{
   try{
    const res= await fetch("http://localhost:5000/customerContacts",{
        method:"GET",
        headers:{
          Accept:"Application/json",
          "Content-Type":"Application/json",
          "x-auth-token":localStorage.getItem("token")
        }
      });
      const data= await res.json();
            dispatch({
                type:GET_CONTACTS,
                payload:data
            });      
   }catch(error){
    dispatch({
      type:GET_CONTACTS,
      payload:"Network Error"
      });
        console.log(error)
   }         
  }

    //ADD CONTACTS
  export const addContact=(contactsForm)=> async dispatch=>{
      try{ 
          const res=await fetch("http://localhost:5000/customerContacts",{
        method:"POST",
        body:JSON.stringify(contactsForm),
        headers:{
          Accept:"Application/json",
          "Content-Type":"Application/json",
          "x-auth-token":localStorage.getItem("token")
        }
      });
      const data= await res.json();
              dispatch({
                  type:ADD_CONTACT,
                  payload:data
              })
            }catch(error){
              dispatch({
                type:ADD_CONTACT,
                payload:"Network Error"
              });
            console.log(error)
      }
}

 //EDIT CUSTOMER CONTACTS
 export const editContactF=(editContact)=>async dispatch=>{
   console.log(editContact)
   try{
    const res=await fetch(`http://localhost:5000/customerContacts/${editContact.BusidtworkssEntityId}`,{
      method:"PUT",
      body:JSON.stringify(editContact),
      headers:{
        Accept:"Application/json",
        "Content-Type":"Application/json",
        "x-auth-token":localStorage.getItem("token")
      }
    });
    const data=await res.json();
      dispatch({
        type:EDIT_CONTACTF,
        payload:data
      })
   }catch(error){
    dispatch({
      type:EDIT_CONTACTF,
      payload:"Network Error"
      });
    console.log(error)
   }
}

 //DELETE CONTACT
export const deleteContact=(contact)=>async dispatch=>{
    const{BusinessEntityId}=contact
    try{
       const res=await fetch(`http://localhost:5000/customerContacts/${BusinessEntityId}`,{
      method:"DELETE",
      headers:{
        Accept:"Application/json",
        "Content-Type":"Application/json",
        "x-auth-token":localStorage.getItem("token")
      }
    })
        const data= await res.json();
            dispatch({
                type:DELETE_CONTACT,
                payload:data
            });
    }catch(error){
      dispatch({
        type:DELETE_CONTACT,
        payload:"Network Error"
        });
        console.log(error)
    }
  }

  //FILTER CONTACTS
 export const filterContacts=(filterText)=>dispatch=>{
              dispatch({
                type:FILTER_CONTACTS,
                payload:filterText
              })
            }

 //CLEAR FILTER CONTACTS
export const clearFilterContacts=()=>dispatch=>{
                dispatch({
                  type:CLEAR_FILTER_CONTACTS
                })
              }
   
export const nextFiftyC=()=>dispatch=>{
      dispatch({
        type:NEXT_FIFTYC
      });        
} 

export const previousFifty=()=>dispatch=>{
      dispatch({
        type:PREVIOUS_FIFTY
      });
}

export const nextFiftyF=()=>dispatch=>{
      dispatch({
        type:NEXT_FIFTYF
      });
}

export const resetNext=()=>dispatch=>{
  dispatch({
    type:RESET_NEXT
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


/*
   //EDIT CUSTOMER CONTACTS
   const editContactF=(editContact)=>{
    fetch(`http://localhost:5000/customerContacts/${editContact.BusidtworkssEntityId}`,{
      method:"PUT",
      body:JSON.stringify(editContact),
      headers:{
        Accept:"Application/json",
        "Content-Type":"Application/json",
        "x-auth-token":localStorage.getItem("token")
      }
    }).then(res=>{
      return res.json()
    }).then(data=>{
      if(data.msgError){
        setAuth({
          ...auth,
          error:data.msgError
        })
        clearError();
        return ;
      }

      setContacts([...contacts.map(cont=>{
        if(cont.BusinessEntityId===data.BusinessEntityId){
          return data;
        }else{
          return cont;
        }
      })]);
      if(filter){
        setFilter([...filter.map(cont=>{
          if(cont.BusinessEntityId===data.BusinessEntityId){
            return data;
          }else{
            return cont;
          }
        })]);
      }
    }).catch(error=>{
      setAuth({
        ...auth,
       error:"Cant Edit to Database/ Network Error"
      })
      clearError()
      console.log(error);
    })
  }
*/