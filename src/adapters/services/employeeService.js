import { post, get, del, put } from "../xhr";

export const employeeService = {
    employeeListService,
}

function employeeListService(url, token) {
    const headers = {
        AUTHORIZATION: `Bearer ${token}`,
    };
    return get(url, headers);
}
