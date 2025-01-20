import axios from "axios";
import { config } from "../constants/config";
import { toast } from "react-toastify";

const returnAxiosInstance = () => {
    axios.create({
        baseURL: process.env.VITE_API_BASE_URL,
        timeout: config.TIMEOUT
    });
}

export const get = async (url, headers = {}) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}${url}`, {
            headers,
        });

        return response;
    } catch (error) {
        toast.error('Internal Server Error');
    }
}

export const post = async (url, requestedData, headers = {}) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}${url}`, requestedData, {
            headers,
        });

        return response;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return error;
    }
}

export const del = async (url, headers = {}) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}${url}`, {
            headers,
        });

        return response;
    } catch (error) {
        toast.error('Internal Server Error');
    }
};

export const put = async (url, requestedData, headers = {}) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}${url}`, requestedData, {
            headers,
        });

        return response;
    } catch (error) {
        toast.error('Internal Server Error');
    }
};