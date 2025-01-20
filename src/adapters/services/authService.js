import { post, get } from "../xhr";

export const authService = {
    signIn,
    signOut
}

function signIn(url, params, headers = {}) {
    return post(url, params, headers);
}

function signOut(url, params, headers) {
    return post(url, params, headers);
}
