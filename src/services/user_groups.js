import axios from "axios";

const loginAPI = axios.create({
    baseURL: "https://star.api.ryandev.com.br/groups",
    // baseURL: "http://localhost:8080/groups",
    withCredentials: true,
});

async function manageUser(parameters) {
    try {
        const response = await loginAPI.post(`/manage-user`, parameters);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

async function getGroups() {
    try {
        const response = await loginAPI.get('');
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

async function updateGroup(newGroup) {
    try {
        const response = await loginAPI.post(`/update-group`, newGroup);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

async function addTeam(group) {
    try {
        const response = await loginAPI.post(`/add-team`, group);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

export { 
    manageUser,
    getGroups,
    updateGroup,
    addTeam,
    userPermissions,
};