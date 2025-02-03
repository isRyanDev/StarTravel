import { useEffect } from "react";
import Accounts from "../../components/AccAssets/AccContainer";
import loginValidation from "../../utils/loginValidation";
import LoginContent from "./LoginContent/login";

function Login() {
    useEffect(() => {
        document.title = "JStar Travel | Login";

        loginValidation();
      }, []);

    return (
        <Accounts height="45rem" content={<LoginContent />} />
    );
}

export default Login;