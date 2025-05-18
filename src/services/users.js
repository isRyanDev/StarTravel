import axios from "axios";

const API = axios.create({
    baseURL: "https://star.api.ryandev.com.br/users",
    // baseURL: "http://localhost:8080/users",
    withCredentials: true,
});

async function userLogin(credentials) {
    try {
        const response = await API.post("/login", credentials);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

async function userLogout() {
    try {
        const response = await API.post("/logout");
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

async function userAuth() {
    try {
        const response = await API.get("/auth");
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

async function refreshToken() {
    try {
        const response = await API.post("/refresh-token");
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

async function userRegister(credentials) {
    try {
        const response = await API.post("/register", credentials);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

async function userUUID(email) {
    try {
        const response = await API.post("/uuid", email);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

async function resetPassword(parameters) {
    try {
        const response = await API.post(`/reset-password`, parameters);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

async function sendCode(email) {
    try {
        const response = await API.post(`/send-code`, email);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

async function verifyCode(parameters) {
    try {
        const response = await API.post(`/verify-code`, parameters);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

async function getUsers() {
    try {
        const response = await API.get("/get");
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

async function manageUser(parameters) {
    try {
        const response = await API.post(`/manage-user`, parameters);
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
    getUsers,
    manageUser
    };