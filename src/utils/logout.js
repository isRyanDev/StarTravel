import { userLogout } from "../services/userAccount";

async function Logout(){
    try {
        localStorage.removeItem("notifyMessage");
        await userLogout();
        window.location.reload();
    } catch (error) {
        console.error("Error logging out:", error);
    }
};

export default Logout;