import Accounts from "../../components/AccAssets/AccContainer";
import RegisterContent from "./RegisterContent/register";

function Register(){
    return(
        <Accounts content={<RegisterContent />}/>
    );
}

export default Register