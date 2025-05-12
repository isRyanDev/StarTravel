import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../hooks/Authentication/AuthContext";
import TextInput from "../../components/AccAssets/AccInputs/TextInput";
import TextAreaInput from "../../components/AccAssets/AccInputs/TextArea";
import Background from "../../components/AccAssets/AccBackground/background";
import FormButton from "../../components/AccAssets/AccInputs/Button";
import { useNavigate } from "react-router-dom";
import APIResponse from "../../components/ApiResponse";
import { manageUser } from "../../services/userAccount";
import CircleLoad from "../../components/CircleLoad";

const Container = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: var(--background);
`

const ContentContainer = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 60%;
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
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: var(--secondary-color);
    z-index: 2;
`

const UserInfosContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 100%;
`   

const ChangeProfileImg = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const ProfileImg = styled.img`
    width: 8rem;
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
    flex-direction: row;
    width: 80%;
    gap: 3.75rem;
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
    width: 50%;
    gap: 1rem;

    font-family: "Nunito Sans";
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
                setApiResponse(response.message);
            }
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
        setButtonDisabled(false);
    }

    const handleCancel = () => {
        navigate("/");
    }

    return(
        <Container>
            <Background/>

            <ContentContainer>
                
                <ContentCard>
                    <Title>General Settings</Title>
                    
                    <UserInfosContainer onSubmit={handleSave}>
                        <ChangeProfileImg>
                            <ProfileImg src={`/profile/${user.user_profile}.png`} alt={`${user.user_profile}`}/>
                            <ChangeButton>
                                <p>Change your profile image</p>
                            </ChangeButton>
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
                                    <TextInput 
                                        setText={setNewPhoneNumber}
                                        placeholder={"Your phone number"}
                                        type={"text"}
                                        value={newPhoneNumber}
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