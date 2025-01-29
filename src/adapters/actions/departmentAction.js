import toast from "react-hot-toast";
import { departmentConstant } from "../constants/departmentConstant";
import { departmentService } from "../services/departmentService";
import { headers } from "../helpers/header";

export const departmentList = (params) => {
    return async (dispatch) => {
        try {
            dispatch({ type: departmentConstant.DEPARTMENT_LIST_REQUEST, payload: null });

            let url = `/department/get?${new URLSearchParams(params).toString()}`;
            const response = await departmentService.departmentListService(url, headers.token);

            if (response.status === 200) {
                dispatch({ type: departmentConstant.DEPARTMENT_LIST_SUCCESS, payload: response.data });
            } else {
                toast.error(response?.data?.message || 'Failed to Get List Data');
                dispatch({ type: departmentConstant.DEPARTMENT_LIST_FAILURE, payload: response?.data });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetching department data");
            dispatch({ type: departmentConstant.DEPARTMENT_LIST_FAILURE, payload: error.response?.data });
        }
    };
};


export const departmentAdd = (data, token) => {
    return async (dispatch) => {
        try {
            dispatch({ type: departmentConstant.DEPARTMENT_ADD_REQUEST, payload: null });
            const response = await departmentService.departmentAddService("/department/create", data, token);

            if (response.status === 200) {
                dispatch({ type: departmentConstant.DEPARTMENT_ADD_SUCCESS, payload: response.data });
                toast.success('Department Added Successfully!');
            } else {
                toast.error(response?.data?.message || 'Failed to Add Department');
                dispatch({ type: departmentConstant.DEPARTMENT_ADD_FAILURE, payload: response?.data });
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Error adding department");
            dispatch({ type: departmentConstant.DEPARTMENT_ADD_FAILURE, payload: error.response?.data });
        }
    }
}

export const departmentEditDetails = (id, token) => {
    return async (dispatch) => {
        try {
            dispatch({ type: departmentConstant.DEPARTMENT_EDIT_DETAILS_REQUEST, payload: null });
            const response = await departmentService.departmentEditDetailsService(`/department/get/${id}`, token);
            if (response.status === 200) {
                dispatch({ type: departmentConstant.DEPARTMENT_EDIT_DETAILS_SUCCESS, payload: response.data });
            } else {
                toast.error(response?.data?.message || 'Failed to Get Department Details');
                dispatch({ type: departmentConstant.DEPARTMENT_EDIT_DETAILS_FAILURE, payload: response?.data });
            }
            return response?.data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetching department details");
            dispatch({ type: departmentConstant.DEPARTMENT_EDIT_DETAILS_FAILURE, payload: error.response?.data });
        }
    }
}


export const departmentEdit = (id, data, token) => {
    return async (dispatch) => {
        try {
            dispatch({ type: departmentConstant.DEPARTMENT_EDIT_REQUEST, payload: null });
            const response = await departmentService.departmentEditService(`/department/update/${id}`, data, token);
            if (response.status === 200) {
                dispatch({ type: departmentConstant.DEPARTMENT_EDIT_SUCCESS, payload: response.data });
                toast.success('Department Updated Successfully!');
            } else {
                toast.error(response?.data?.message || 'Failed to Update Department');
                dispatch({ type: departmentConstant.DEPARTMENT_EDIT_FAILURE, payload: response?.data });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating department");
            dispatch({ type: departmentConstant.DEPARTMENT_EDIT_FAILURE, payload: error.response?.data });
        }
    }
}