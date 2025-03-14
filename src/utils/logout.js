import { userLogout } from "../services/userAccount";

async function Logout(){
    try {
        await userLogout();
    } catch (error) {
        console.error("Error logging out:", error);
    }
};

export default Logout;