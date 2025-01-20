import { toast } from 'react-toastify';
import { authConstant } from '../constants/authConstant'
import { authService } from '../Services/authServices';


const signIn = async (data) => {
    const response = await authService.signIn("/auth/login", data);

    if (response.status === 200) {
        // console.log('response-', response, authConstant.SIGNIN_SUCCESS);
        // toast.success(response?.data?.message);
        return { type: 'SIGNIN_SUCCESS', payload: response.data }
    } else {
        toast.error(response?.data?.message);
        return { type: 'SIGNIN_FAILURE', payload: response.data }
    }
}

const signOut = async (token) => {
    const response = await authService.signOut("/auth/logout", {}, token);
    if (response.status === 200) {
        toast.success("Logged Out!");
        console.log({ type: authConstant.SIGNOUT_SUCCESS, payload: response.data });
        return { type: authConstant.SIGNOUT_SUCCESS, payload: response.data };
    } else {
        toast.error(response?.data?.message);
        return { type: authConstant.SIGNOUT_FAILURE, payload: response?.data };
    }
}

export const auth = {
    signIn,
    signOut
}
