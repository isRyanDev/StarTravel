function userLogout(){
    localStorage.clear();
    window.location.href = "/";
};

export default userLogout;