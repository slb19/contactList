import {combineReducers } from "redux";
import usersReducer from "./usersReducer.js";
import customerContactsReducer from "./customerContactsReducer.js";
import employeeContactsReducer from "./employeeContactsReducer.js";
import authReducers from "./authReducers.js";

export default combineReducers({
    users:usersReducer,
    contacts:customerContactsReducer,
    employees:employeeContactsReducer,
    auth:authReducers   
})

