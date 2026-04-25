import { useEffect } from "react";
import Accounts from "../../components/AccAssets/AccContainer";
import RegisterContent from "./RegisterContent/register";

function Register(){
    useEffect(() => {
        document.title = "Star Travel | Register";
        localStorage.removeItem("currentSection");
    }, []);

    return(
        <Accounts content={<RegisterContent />}/>
    );
}

export default Register