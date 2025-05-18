import axios from "axios";

const API = axios.create({
    baseURL: "https://star.api.ryandev.com.br/products",
    // baseURL: "http://localhost:8080/products",
    withCredentials: true,
});

async function getProductsPerType(type) {
    try {
        const response = await API.get(`/get/types/${type}`);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

async function getProductsTypes() {
    try {
        const response = await API.get(`/get/types`);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

export { getProductsPerType, getProductsTypes };