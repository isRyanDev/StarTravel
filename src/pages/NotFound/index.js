import { useEffect } from "react";
import Accounts from "../../components/AccAssets/AccContainer"
import NotFoundContent from "./NotFoundContent/NotFound.js"

function NotFound() {
    useEffect(() => {
        document.title = "404 Not Found";
      }, []);

    return (
        <Accounts content={<NotFoundContent />}/>
    )
}

export default NotFound