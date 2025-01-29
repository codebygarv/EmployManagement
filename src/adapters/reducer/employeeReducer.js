import { employeeConstant } from "../constants/employeeConstant";

const initailState = {
    loading: false,
    success: false,
    error: null,
    employees: [],
    employeeIndividual: []
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

        case employeeConstant.EMPLOYEE_INDIVIDUAL_REQUEST:
            return {
                ...state,
                loading: true,
                success: false
            }
            break;

        case employeeConstant.EMPLOYEE_INDIVIDUAL_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                employeeIndividual: action.payload
            }
            break;

        case employeeConstant.EMPLOYEE_INDIVIDUAL_FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload
            }
            break;

        case employeeConstant.EMPLOYEE_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
                success: false
            }
            break;

        case employeeConstant.EMPLOYEE_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true
            }
            break;

        case employeeConstant.EMPLOYEE_DELETE_FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload
            }
            break;

        case employeeConstant.EMPLOYEE_ADD_REQUEST:
            return {
                ...state,
                loading: true,
                success: false
            }
            break;

        case employeeConstant.EMPLOYEE_ADD_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true
            }
            break;

        case employeeConstant.EMPLOYEE_ADD_FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload
            }

        case employeeConstant.EMPLOYEE_EDIT_REQUEST:
            return {
                ...state,
                loading: true,
                success: false
            }
            break;

        case employeeConstant.EMPLOYEE_EDIT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true
            }
            break;

        case employeeConstant.EMPLOYEE_EDIT_FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload
            }

        default:
            return state;
    }
}
