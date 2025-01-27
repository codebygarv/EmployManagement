import { post, get, del, put } from "../xhr";

export const departmentService = {
    departmentListService,
    departmentAddService,
    departmentDeleteService,
    departmentEditDetailsService,
    departmentEditService,
}

function departmentListService(url, token) {
    const headers = {
        AUTHORIZATION: `Bearer ${token}`,
    };
    return get(url, headers);
}

function departmentAddService(url, params, token) {
    const headers = {
        AUTHORIZATION: `Bearer ${token}`,
    };

    return post(url, params, headers);
}

function departmentDeleteService(url, token) {
    const headers = {
        AUTHORIZATION: `Bearer ${token}`,
    };
    return del(url, headers);
}

function departmentEditDetailsService(url, token) {
    const headers = {
        AUTHORIZATION: `Bearer ${token}`,
    };
    return get(url, headers);
}

function departmentEditService(url, params, token) {
    const headers = {
        AUTHORIZATION: `Bearer ${token}`,
    };
    return put(url, params, headers);
}