import { employeeConstant } from "../constants/employeeConstant";

const initailState = {
    loading: false,
    success: false,
    error: null,
    employees: []
}


export const employeeReducer = (state = initailState, action) => {
    switch (action.type) {
        case employeeConstant.EMPLOYEE_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                success: false
            }
            break;

        case employeeConstant.EMPLOYEE_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                employees: action.payload
            }
            break;

        case employeeConstant.EMPLOYEE_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload
            }
            break;

        default:
            return state;
    }
}
