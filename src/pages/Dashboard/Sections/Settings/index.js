import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SettingsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2.3rem;
    font-family: 'Nunito Sans', sans-serif;
    padding: 2.3rem 1.8rem;
`;

const Title = styled.h1`
    font-size: 32px;
    font-weight: bold;
`;

const SettingsContent = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    gap: 1rem;
    padding: 1rem;
    background-color: var(--secondary-color);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

const ProfileOptions = styled.div`
    display: flex;
    flex-direction: row;
    gap: .5rem;
`;

const ProfileImg = styled.img`
    width: 5rem;
    transition: all 0.3s ease-in-out;

    &:hover{
        cursor: pointer;
        transform: scale(1.1);
    }
`;

const profileImages = ["men1", "men2", "men3", "woman1", "woman2", "woman3"];

function SettingsSections(){
    const navigate = useNavigate();

    const changeProfileImage = (image) => {
        localStorage.setItem("profile", image);
        navigate("/dashboard", {Settings: true});
    }

    return(
        <SettingsContainer>
            <Title>General Settings</Title>

            <SettingsContent>
                Choose your profile icon

                <ProfileOptions>
                    {profileImages.map((image, index) => ( 
                        <ProfileImg onClick={() => changeProfileImage(image)} key={index} src={`/profile/${image}.png`} alt="profile" />
                    ))}
                </ProfileOptions>
            </SettingsContent>
        </SettingsContainer>
    )
}

export default SettingsSections