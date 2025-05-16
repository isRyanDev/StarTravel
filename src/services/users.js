import axios from "axios";

const loginAPI = axios.create({
    // baseURL: "https://star.api.ryandev.com.br/users",
    baseURL: "http://localhost:8080/users",
    withCredentials: true,
});

async function userLogin(credentials) {
    try {
        const response = await loginAPI.post("/login", credentials);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

async function userLogout() {
    try {
        const response = await loginAPI.post("/logout");
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

async function userAuth() {
    try {
        const response = await loginAPI.get("/auth");
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

async function refreshToken() {
    try {
        const response = await loginAPI.post("/refresh-token");
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

async function userRegister(credentials) {
    try {
        const response = await loginAPI.post("/register", credentials);
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

async function resetPassword(parameters) {
    try {
        const response = await loginAPI.post(`/reset-password`, parameters);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

async function sendCode(email) {
    try {
        const response = await loginAPI.post(`/send-code`, email);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

async function verifyCode(parameters) {
    try {
        const response = await loginAPI.post(`/verify-code`, parameters);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

async function getUsers() {
    try {
        const response = await loginAPI.get("/get");
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

export { 
    userLogin, 
    userUUID, 
    resetPassword, 
    userRegister, 
    userLogout, 
    userAuth, 
    refreshToken, 
    sendCode,
    verifyCode,
    getUsers
    };