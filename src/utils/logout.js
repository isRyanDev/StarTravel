async function userLogout(){
    try {
        await userLogout();
        window.location.href = "/";
    } catch (error) {
        console.error("Error logging out:", error);
    }
};

export default userLogout;