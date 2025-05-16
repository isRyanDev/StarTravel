import axios from "axios";

const loginAPI = axios.create({
    baseURL: "https://star.api.ryandev.com.br/products",
    // baseURL: "http://localhost:8080/products",
    withCredentials: true,
});

async function getProducts(type) {
    try {
        console.log(type);
        const response = await loginAPI.get(`/${type}`);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

export { getProducts };