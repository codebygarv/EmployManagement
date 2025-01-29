import { post, get, del, put } from "../xhr";

export const employeeService = {
    employeeListService,
    employeeIndividualService,
    employeeDeleteService,
    employeeAddService,
    employeeEditService
}

function employeeListService(url, token) {
    const headers = {
        AUTHORIZATION: `Bearer ${token}`,
    };
    return get(url, headers);
}

function employeeIndividualService(url, token) {
    const headers = {
        AUTHORIZATION: `Bearer ${token}`,
    };
    return get(url, headers);
}

function employeeDeleteService(url, token) {
    const headers = {
        AUTHORIZATION: `Bearer ${token}`,
    };
    return del(url, headers);
}

function employeeAddService(url, params, token) {
    const headers = {
        AUTHORIZATION: `Bearer ${token}`,
    };
    return post(url, params, headers);
}

function employeeEditService(url, params, token) {
    const headers = {
        AUTHORIZATION: `Bearer ${token}`,
    };
    return put(url, params, headers);
}