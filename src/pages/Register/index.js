import { useEffect } from "react";
import Accounts from "../../components/AccAssets/AccContainer";
import RegisterContent from "./RegisterContent/register";
import loginValidation from "../../utils/loginValidation";

function Register(){
    useEffect(() => {
        document.title = "Star Travel | Register";

        loginValidation();
    }, []);

    return(
        <Accounts content={<RegisterContent />}/>
    );
}

export default Register