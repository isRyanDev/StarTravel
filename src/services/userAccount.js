import axios from "axios";

const loginAPI = axios.create({
    baseURL: "https://star.api.ryandev.com.br/users",
    // baseURL: "http://localhost:8080/users",
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

async function userPermissions() {
    try {
        const response = await loginAPI.get("/permissions");
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

async function resetPassword(uuid, newpassword) {
    try {
        const response = await loginAPI.post(`/${uuid}/reset-password`, newpassword);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

async function getGroup(id) {
    try {
        const response = await loginAPI.get(`/group`);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

async function updateGroup(newGroup) {
    try {
        const response = await loginAPI.post(`/update-group`, newGroup);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

async function setGroup(group) {
    try {
        const response = await loginAPI.post(`/set-group`, group);
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

async function getProfile(id) {
    try {
        const response = await loginAPI.get(`/profile/${id}`);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

async function postProfile(id, newProfile) {
    try {
        const response = await loginAPI.post(`/profile/${id}`, newProfile);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

export { userLogin, userUUID, resetPassword, userRegister, getGroup, getProfile, postProfile, getUsers, updateGroup, setGroup, userLogout, userAuth, refreshToken, userPermissions };