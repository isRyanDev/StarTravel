import axios from "axios";

const API = axios.create({
    baseURL: "https://star.api.ryandev.com.br/groups",
    // baseURL: "http://localhost:8080/groups",
    withCredentials: true,
});

async function getGroups() {
    try {
        const response = await API.get('');
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

async function userPermissions() {
    try {
        const response = await API.get("/permissions");
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

async function updateGroup(newGroup) {
    try {
        const response = await API.post(`/update-group`, newGroup);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

async function addTeam(group) {
    try {
        const response = await API.post(`/add-team`, group);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

export { 
    getGroups,
    updateGroup,
    addTeam,
    userPermissions,
};