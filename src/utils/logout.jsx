import { userLogout } from "../services/users";

async function Logout(){
    try {
        await userLogout();
        window.location.reload();
    } catch (error) {
        console.error("Error logging out:", error);
    }
};

export default Logout;