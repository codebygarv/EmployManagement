import { departmentConstant } from "../constants/departmentConstant"

const initialState = {
    loading: false,
    success: false,
    error: null,
    departmentData: {},
    departmentIndividualDetails: {}
}

export const departmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case departmentConstant.DEPARTMENT_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                success: false
            }
            break;

        case departmentConstant.DEPARTMENT_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                departmentData: action.payload
            }
            break;

        case departmentConstant.DEPARTMENT_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload
            }
            break;

        case departmentConstant.DEPARTMENT_ADD_REQUEST:
            return {
                ...state,
                loading: true,
                success: false
            }
            break;

        case departmentConstant.DEPARTMENT_ADD_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
            }
            break;

        case departmentConstant.DEPARTMENT_ADD_FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload
            }
            break;

        case departmentConstant.DEPARTMENT_EDIT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                success: false
            }
            break;

        case departmentConstant.DEPARTMENT_EDIT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                departmentIndividualDetails: action.payload
            }
            break;

        case departmentConstant.DEPARTMENT_EDIT_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload
            }
            break;

        case departmentConstant.DEPARTMENT_EDIT_REQUEST:
            return {
                ...state,
                loading: true,
                success: false
            }
            break;

        case departmentConstant.DEPARTMENT_EDIT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
            }
            break;

        case departmentConstant.DEPARTMENT_EDIT_FAILURE:
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
