import axios from "axios";

const API = axios.create({
    baseURL: "https://star.api.ryandev.com.br/products-types",
    // baseURL: "http://localhost:8080/products-types",
    withCredentials: true,
});

async function getProductsTypes() {
    try {
        const response = await API.get(`/get`);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

export { getProductsTypes };