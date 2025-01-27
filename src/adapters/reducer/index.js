import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { departmentReducer } from "./departmentReducer";
import { sidebarReducer } from "./sidebarReducer";
import { employeeReducer } from "./employeeReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    sidebar: sidebarReducer,
    department: departmentReducer,
    employee: employeeReducer,
})