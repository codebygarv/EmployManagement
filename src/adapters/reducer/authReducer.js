import { authConstant } from "../constants/authConstant";

const initialState = {
    auth: false,
    loading: false,
    userDetails: {},
    logoutFlag: true,
    error: null,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case authConstant.SIGNIN_REQUEST:
            return { ...state, loading: true };
            break;

        case authConstant.SIGNIN_SUCCESS:
            return {
                auth: true,
                userDetails: action.payload,
                submitted: false,
                loading: false,
            };
            break;

        case authConstant.SIGNIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
            break;

        case authConstant.SIGNOUT_REQUEST:
            return { ...state, logoutFlag: false };
            break;

        case authConstant.SIGNOUT_SUCCESS:
            return { ...initialState, auth: false, userDetails: [] };
            break;

        case authConstant.SIGNOUT_FAILURE:
            return { ...state, auth: true, logoutFlag: true };
            break;

        default:
            return state;
            break;
    }
}