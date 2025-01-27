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