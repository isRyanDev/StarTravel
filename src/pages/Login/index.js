import { useEffect } from "react";
import Accounts from "../../components/AccAssets/AccContainer";
import LoginContent from "./LoginContent/login";

function Login() {
    useEffect(() => {
        document.title = "Star Travel | Login";
        localStorage.removeItem("currentSection");
      }, []);

    return (
        <Accounts height="45rem" content={<LoginContent />} />
    );
}

export default Login;