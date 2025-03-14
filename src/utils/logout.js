function deleteCookie(name) {
    document.cookie = `${name}=; max-age=0; path=/; SameSite=None; Secure`;
}

function userLogout(){
    localStorage.clear();
    deleteCookie('authToken');
    deleteCookie('refreshToken');
    window.location.href = "/";
};

export default userLogout;