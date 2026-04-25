import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../hooks/Authentication/AuthContext";
import { manageUser } from "../../services/users";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TextInput from "../../components/Inputs/TextInput";
import TextAreaInput from "../../components/Inputs/TextArea";
import Background from "../../components/AccAssets/AccBackground/background";
import FormButton from "../../components/Inputs/Button";
import APIResponse from "../../components/ApiResponse";
import CircleLoad from "../../components/CircleLoad";

const Container = styled.section`
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100vw;
    overflow-x: hidden;
    background-color: var(--background);
`

const ContentContainer = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    margin: 1rem;
    width: 90%;
    min-height: 90%;

    @media screen and (min-width: 1300px) {
        width: 60%;
        min-height: 90%;
    }
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
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: var(--secondary-color);
    z-index: 2;
`

const UserInfosContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    height: 100%;

    @media screen and (min-height: 800px) {
        gap: 2rem;
    }
`   

const ChangeProfileImg = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const ProfileModal = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    text-align: center;
    font-family: "Nunito Sans", sans-serif;
    font-size: .9rem;
    color: white;
    transition: all 0.3s ease-in-out;
    padding: .5rem;
    gap: .5rem;
    background-color: rgba(101, 121, 252, 0.9);
    border-radius: 1rem;
    height: 100%;
    width: 100%;
    transform: ${(props) => (props.isModalOpen ? "translateY(100%)" : "translateY(90%)")};
    opacity: ${(props) => (props.isModalOpen ? "1" : "0")};
    visibility: ${(props) => (props.isModalOpen ? "visible" : "hidden")};
    pointer-events: ${(props) => (props.isModalOpen ? "all" : "none")};

    @media screen and (min-width: 800px) {
        transform: ${(props) => (props.isModalOpen ? "translateX(120%)" : "translateX(110%)")};
    }
`;

const ProfileImg = styled.img`
    width: 8rem;
`;

const ProfileOptionsContainer = styled.div`
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(3,1fr);
`

const ProfileOptions = styled.img`
    width: 3rem;
    transition: all 0.3s ease-in-out;

    &:hover {
        cursor: pointer;
        transform: scale(1.1);
    }
`;

const ChangeButton = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p{
        font-family: "Nunito Sans", sans-serif;
        font-size: 0.875rem;
        color: var(--background);
    }

    &:hover p{
        cursor: pointer;
        text-decoration: underline;
    }
`

const UserInfos = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 2rem;

    @media screen and (min-width: 800px) {
        width: 80%;
        flex-direction: row;
        gap: 3.75rem;
    }
`

const Infos = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 2.5rem;
`

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.7rem;
`

const InputAreaContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 0.7rem;
`

const Label = styled.label`
    font-family: "Nunito Sans";
    font-size: 1rem;
    font-weight: 600;
    color: #606060;
`

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    gap: 1rem;
    font-family: "Nunito Sans";

    @media screen and (min-width: 800px) {
        width: 50%;
    }
`

const Button = styled.div`
    display: flex;
    justify-content: center;
    height: 3.5rem;
    align-items: center;
    width: 82%;
    box-sizing: border-box;
    border-radius: .5rem;
    color: black;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
    opacity: ${props => props.isDisabled ? 0.5 : 0.8};
    pointer-events: ${props => props.isDisabled ? 'none' : 'unset'};
    cursor: ${props => props.isDisabled ? 'not-allowed' : 'pointer'};
`;

const NumberInput = styled.input`
    width: 100%;
    box-sizing: border-box;
    border-radius: .5rem;
    border: 1px solid #D8D8D8;
    color: var(--login-text-color);
    font-family: "Nunito Sans";
    font-size: 1.125rem;
    padding: 1rem;
    background: #F1F4F9;

    &:focus-visible{
        outline: none;
    }

    &::placeholder{
        color: #A6A6A6;
        font-family: "Nunito Sans";
        font-size: 1.125rem;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`

function ManageAccount(){
    const {user, checkAuth} = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [apiResponse, setApiResponse] = useState("");
    const [apiResponseColor, setApiResponseColor] = useState("");
    const [newFirstName, setNewFirstName] = useState(user.first_name);
    const [newLastName, setNewLastName] = useState(user.last_name);
    const [newUsername, setNewUsername] = useState(user.username);
    const [newDescription, setNewDescription] = useState(user.description);
    const [newPhoneNumber, setNewPhoneNumber] = useState(user.phone_number);
    const [newProfile, setNewProfile] = useState(user.user_profile);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        document.title = "Star Travel | Manage Account";
        localStorage.removeItem("currentSection");
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        setButtonDisabled(true);
        setLoading(true);

        if(!newFirstName || !newLastName || !newUsername || !newDescription || !newPhoneNumber) {
            setApiResponseColor("red");
            setApiResponse("Please fill all fields");
            setLoading(false);
            setButtonDisabled(false);
            return;
        }

        try {
            const response = await manageUser({
                newFirstName,
                newLastName,
                newUsername,
                newPhoneNumber,
                newDescription,
                newProfile
            })

            if(response.success) {
                setApiResponseColor("#6579FC");
                setApiResponse("User updated successfully");
                setTimeout(() => {
                    checkAuth();
                    navigate("/");
                }, 2000);
            } else{
                setApiResponseColor("red");
                setApiResponse(response.message || "Something went wrong");
            }
        } catch (error) {
            setApiResponseColor("red");
            setApiResponse(error.message || "Something went wrong");
        }

        setLoading(false);
        setButtonDisabled(false);
    }

    const handleProfile = (image) => {
        setNewProfile(image);
        setIsModalOpen(false);
    }

    const FormatPhoneNumber = (e) => {
        const value = e.replace(/\D/g, "").slice(0, 11); 

        let formattedValue = value;

        if (value.length > 0) {
            formattedValue = `(${value.slice(0, 2)}`;
        }
        if (value.length >= 3) {
            formattedValue += `) ${value.slice(2, 3)}`;
        }
        if (value.length >= 4) {
            formattedValue += ` ${value.slice(3, 7)}`;
        }
        if (value.length >= 8) {
            formattedValue += `-${value.slice(7, 11)}`;
        }

        setNewPhoneNumber(formattedValue);
    };

    const handleCancel = () => {
        navigate("/");
    }

    const profileImages = ["men1", "men2", "men3", "woman1", "woman2", "woman3"];

    return(
        <Container>
            <Background/>

            <ContentContainer>
                
                <ContentCard>
                    <Title>General Settings</Title>
                    
                    <UserInfosContainer onSubmit={handleSave}>
                        <ChangeProfileImg>
                            <ProfileImg src={`/profile/${newProfile}.png`} alt={`${user.user_profile}`}/>
                            <ChangeButton onClick={() => setIsModalOpen(prev => !prev)}>
                                <p>Change your profile image</p>
                            </ChangeButton>

                            <ProfileModal isModalOpen={isModalOpen}>
                                <p>Select your new icon</p>

                                <ProfileOptionsContainer>
                                    {profileImages.map((image) => (
                                        <ProfileOptions
                                            key={image} 
                                            src={`/profile/${image}.png`} 
                                            alt={`Profile ${image}`} 
                                            onClick={() => handleProfile(image)}
                                        />
                                    ))}
                                </ProfileOptionsContainer>
                            </ProfileModal>
                        </ChangeProfileImg>

                        <UserInfos>
                            <Infos>
                                <InputContainer>
                                    <Label>First Name</Label>
                                    <TextInput 
                                        setText={setNewFirstName}
                                        placeholder={"Your first name"}
                                        type={"text"}
                                        value={newFirstName}
                                    />
                                </InputContainer>

                                <InputContainer>
                                    <Label>Username</Label>
                                    <TextInput 
                                        setText={setNewUsername}
                                        placeholder={"Your username"}
                                        type={"text"}
                                        value={newUsername}
                                    />
                                </InputContainer>

                                <InputContainer>
                                    <Label>Phone Number</Label>
                                    <NumberInput 
                                        placeholder="Your phone number"
                                        type="text"
                                        value={newPhoneNumber}
                                        onChange={(e) => FormatPhoneNumber(e.target.value)} 
                                    />
                                </InputContainer>
                            </Infos>

                            <Infos>
                                <InputContainer>
                                    <Label>Last Name</Label>
                                    <TextInput 
                                        setText={setNewLastName}
                                        placeholder={"Your last name"}
                                        type={"text"}
                                        value={newLastName}
                                    />
                                </InputContainer>

                                <InputAreaContainer>
                                    <Label>Description</Label>
                                    <TextAreaInput 
                                        setText={setNewDescription}
                                        placeholder={"Your profile description"}
                                        type={"text"}
                                        value={newDescription}
                                    />
                                </InputAreaContainer>
                            </Infos>
                        </UserInfos>

                        <ButtonsContainer>
                            <FormButton
                                type={"submit"}
                                content={"Save"}
                                isDisabled={buttonDisabled}
                            />
                            <Button onClick={handleCancel} isDisabled={buttonDisabled}>Cancel</Button>
                        </ButtonsContainer>

                        {loading ? <CircleLoad/> :
                            <APIResponse apiResponseColor={apiResponseColor} apiResponse={apiResponse}/>
                        }
                    </UserInfosContainer>
                </ContentCard>
            </ContentContainer>
        </Container>
    )
}

export default ManageAccount;