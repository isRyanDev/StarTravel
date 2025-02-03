import Accounts from "../../components/AccAssets/AccContainer"
import NotFoundContent from "./NotFoundContent/NotFound.js"

function NotFound() {
    return (
        <Accounts content={<NotFoundContent />}/>
    )
}

export default NotFound