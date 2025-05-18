import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Inputs/Button/index.js";
import notFoundImg from "../../../assets/Images/notFound.png";

const NotFoundContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 6.25rem;
    padding: 6.5rem;
    width: 80%;
`;

const NotFoundInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 2.2rem;
`

const NotFoundText = styled.h3`
    color: var(--primary-color);
    font-family: "Nunito Sans";
    font-size: 2rem;
    font-weight: 700;
`

function NotFoundContent() {
    const navigate = useNavigate();

    return (
        <NotFoundContainer>
            <img src={notFoundImg} alt="404" />

            <NotFoundInfo>
                <NotFoundText>Looks like you’ve got lost….</NotFoundText>
                <Button action={() => navigate("/")} content={"Back to Home"}></Button>
            </NotFoundInfo>
        </NotFoundContainer>
    );
}

export default NotFoundContent;