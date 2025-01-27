import { store } from '../../store'

const storeObj = store.getState();

export const headers = {
    token: storeObj.auth?.userDetails.token,
};