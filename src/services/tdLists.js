import axios from "axios";

const loginAPI = axios.create({
    // baseURL: "https://jstar.api.ryandev.com.br/users",
    baseURL: "http://localhost:8080/tdlists",
});

async function userGetList(username) {
    try {
        const response = await loginAPI.post("/user-list", username);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

async function userAddList(body) {
    try {
        const response = await loginAPI.post("/add-list", body);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

export { userAddList, userGetList };
