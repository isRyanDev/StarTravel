import Accounts from "../../components/AccAssets/AccContainer";
import LoginContent from "./LoginContent/login";

function Login() {
    return (
        <Accounts height="45rem" content={<LoginContent />} />
    );
}

export default Login;