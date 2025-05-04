import styled from "styled-components";
import Header from "../../components/Header/header";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../hooks/Authentication/AuthContext";

const Container = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: var(--dashboard-background-color);
`

const ContentContainer = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 100%;
    height: 90%;
`

const Title = styled.h1`
    font-family: "Nunito Sans", sans-serif;
    color: black;
    font-size: 2rem;
    font-weight: bold;
`

const ContentCard = styled.div`
    display: flex;
    flex-direction: column;
    height: 95%;
    width: 95%;
    padding: 2rem;
    border-radius: 1rem;
    box-sizing: border-box;
    gap: 1rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: var(--secondary-color);
`

const UserInfosContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const ProfileImg = styled.img`
    width: 10rem;
`;

const Texts = styled.p`
    font-family: "Nunito Sans", sans-serif;
    color: black;
    font-size: 1.5rem;
    font-weight: bold;
`

function ManageAccount(){
    const {user, loading} = useContext(AuthContext);

    useEffect(() => {
        document.title = "Star Travel | Manage Account";
        localStorage.removeItem("currentSection");

        console.log(user);
    }, [user]);

    return(
        <Container>
            <Header profileColor={"black"} logoColor={"var(--primary-color)"}/>

            <ContentContainer>
                <ContentCard>
                    <Title>General Settings</Title>

                    <UserInfosContainer>
                        <ProfileImg src={`/profile/${user.user_profile}.png`} alt={`${user.user_profile}`}/>

                        <Texts>{user.username}</Texts>
                        <Texts>{user.user_group}</Texts>
                    </UserInfosContainer>
                </ContentCard>
            </ContentContainer>
        </Container>
    )
}

export default ManageAccount;