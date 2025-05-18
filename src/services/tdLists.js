import axios from "axios";

const API = axios.create({
    baseURL: "https://star.api.ryandev.com.br/tdlists",
    // baseURL: "http://localhost:8080/tdlists",
    withCredentials: true,
});

async function userGetList() {
    try {
        const response = await API.post("/user-list");
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

async function userAddList(body) {
    try {
        const response = await API.post("/add-list", body);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

export { userAddList, userGetList };