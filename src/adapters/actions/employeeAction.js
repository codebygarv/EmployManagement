import toast from "react-hot-toast";
import { employeeConstant } from "../constants/employeeConstant";
import { employeeService } from "../services/employeeService";
import { headers } from "../helpers/header";

export const employeeListAction = (params, token) => {
    return async (dispatch) => {
        try {
            dispatch({ type: employeeConstant.EMPLOYEE_LIST_REQUEST, payload: null });

            let url = `/employee/get?${new URLSearchParams(params).toString()}`;
            const response = await employeeService.employeeListService(url, headers.token);

            if (response.status === 200) {
                dispatch({ type: employeeConstant.EMPLOYEE_LIST_SUCCESS, payload: response.data });
            } else {
                toast.error(response?.data?.message || 'Failed to Get List Data');
                dispatch({ type: employeeConstant.EMPLOYEE_LIST_FAILURE, payload: response?.data });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetching employee data");
            dispatch({ type: employeeConstant.EMPLOYEE_LIST_FAILURE, payload: error.response?.data });
        }
    };
}

export const employeeIndividualAction = (id, token) => {
    return async (dispatch) => {
        try {
            dispatch({ type: employeeConstant.EMPLOYEE_INDIVIDUAL_REQUEST, payload: null });

            let url = `/employee/get/${id}`;
            const response = await employeeService.employeeIndividualService(url, headers.token);

            if (response.status === 200) {
                dispatch({ type: employeeConstant.EMPLOYEE_INDIVIDUAL_SUCCESS, payload: response.data });
            } else {
                toast.error(response?.data?.message || 'Failed to Get Individual Data');
                dispatch({ type: employeeConstant.EMPLOYEE_INDIVIDUAL_FAILURE, payload: response?.data });
            }
            return response?.data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetching employee data");
            dispatch({ type: employeeConstant.EMPLOYEE_INDIVIDUAL_FAILURE, payload: error.response?.data });
        }
    };
}

export const employeeDelete = (id, token) => {
    return async (dispatch) => {
        try {
            dispatch({ type: employeeConstant.EMPLOYEE_DELETE_REQUEST, payload: null });

            let url = `/employee/delete/${id}`;
            const response = await employeeService.employeeDeleteService(url, token);

            if (response.status === 200) {
                toast.success(response?.data?.message || 'Employee Deleted Successfully');
                dispatch({ type: employeeConstant.EMPLOYEE_DELETE_SUCCESS, payload: response.data });
            } else {
                toast.error(response?.data?.message || 'Failed to Delete Employee');
                dispatch({ type: employeeConstant.EMPLOYEE_DELETE_FAILURE, payload: response?.data });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error deleting employee data");
            dispatch({ type: employeeConstant.EMPLOYEE_DELETE_FAILURE, payload: error.response?.data });
        }
    };
}


export const employeeAddAction = (data, token) => {
    return async (dispatch) => {
        try {
            dispatch({ type: employeeConstant.EMPLOYEE_ADD_REQUEST, payload: null });

            let url = `/employee/add`;
            const response = await employeeService.employeeAddService(url, data, token);

            if (response.status === 200) {
                toast.success(response?.data?.message || 'Employee Added Successfully');
                dispatch({ type: employeeConstant.EMPLOYEE_ADD_SUCCESS, payload: response.data });
            } else {
                toast.error(response?.data?.message || 'Failed to Add Employee');
                dispatch({ type: employeeConstant.EMPLOYEE_ADD_FAILURE, payload: response?.data });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error adding employee data");
            dispatch({ type: employeeConstant.EMPLOYEE_ADD_FAILURE, payload: error.response?.data });
        }
    };
}

export const employeeEditAction = (id, data, token) => {
    return async (dispatch) => {
        try {
            dispatch({ type: employeeConstant.EMPLOYEE_EDIT_REQUEST, payload: null });

            let url = `/employee/update/${id}`;
            const response = await employeeService.employeeEditService(url, data, token);

            if (response.status === 200) {
                toast.success(response?.data?.message || 'Employee Edited Successfully');
                dispatch({ type: employeeConstant.EMPLOYEE_EDIT_SUCCESS, payload: response.data });
            } else {
                toast.error(response?.data?.message || 'Failed to Edit Employee');
                dispatch({ type: employeeConstant.EMPLOYEE_EDIT_FAILURE, payload: response?.data });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error editing employee data");
            dispatch({ type: employeeConstant.EMPLOYEE_EDIT_FAILURE, payload: error.response?.data });
        }
    };
}