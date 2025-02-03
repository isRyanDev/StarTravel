import axios from "axios";

const loginAPI = axios.create({
    baseURL: "https://api.ryandev.com.br/accounts/user",
});

async function userLogin(credentials) {
    try {
        const response = await loginAPI.post("/login", credentials);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

async function userUUID(email) {
    try {
        const response = await loginAPI.post("/uuid", email);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

async function resetPassword(uuid, newpassword) {
    try {
        const response = await loginAPI.post(`/${uuid}/reset-password`, newpassword);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

export { userLogin, userUUID, resetPassword };
