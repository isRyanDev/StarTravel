import axios from "axios";

const API = axios.create({
    baseURL: "https://star.api.ryandev.com.br/products",
    // baseURL: "http://localhost:8080/products",
    withCredentials: true,
});

async function getProducts(type) {
    try {
        const response = await API.get(`/${type}`);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

export { getProducts };