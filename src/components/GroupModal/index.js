import styled from "styled-components"
import { getGroups, addTeam, updateGroup } from "../../services/user_groups";
import { useEffect, useState } from "react"
import { useNotify } from "../../hooks/Notify/NotifyContext";
import TextInput from "../AccAssets/AccInputs/TextInput";
import FormButton from "../AccAssets/AccInputs/Button";
import APIResponse from "../ApiResponse";
import CircleLoad from "../CircleLoad";

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s ease-in-out;
    z-index: 1000;

    opacity: ${(props) => (props.isOpen ? 1 : 0)};
    pointer-events: ${(props) => (props.isOpen ? "auto" : "none")};
`

const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    border-radius: 1rem;
    height: 70vh;
    width: 70vw;
    padding: 3rem;
    background-color: var(--secondary-color);
    font-family: "Nunito Sans", sans-serif;
    transform: ${(props) => (props.isOpen ? "scale(1)" : "scale(0.9)")};
    opacity: ${(props) => (props.isOpen ? "1" : "0")};

    @media screen and (min-width: 625px){
        width: 60vw;
    }

    @media screen and (min-width: 1000px){
        width: 30vw;
        height: 60vh;
    }
`

const Texts = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`

const Title = styled.h1`
    color: var(--login-text-color);
    font-family: "Nunito Sans";
    font-size: 2rem;
    font-weight: 700;
`

const Subtitle = styled.p`
    color: var(--login-text-color);
    font-family: "Nunito Sans";
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.064px;
`

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    width: 100%;
`;

const InputContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 1rem;
`

const InputLabel = styled.label`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    color: var(--login-text-color);
    font-family: "Nunito Sans";
    font-size: 1.125rem;
`

const EditUsername = styled.div`
    display: flex;
    width: 100%;
    gap: 1rem;
    flex-direction: column;
`

const Username = styled.div`
    width: 100%;
    box-sizing: border-box;
    border-radius: .5rem;
    border: 1px solid #D8D8D8;
    color: var(--login-text-color);
    font-family: "Nunito Sans";
    font-size: 1.125rem;
    padding: 1rem;
    background: #F1F4F9;
`

const SelectInput = styled.select`
    width: 100%;
    box-sizing: border-box;
    border-radius: .5rem;
    border: 1px solid #D8D8D8;
    color: var(--login-text-color);
    font-family: "Nunito Sans";
    font-size: 1.125rem;
    padding: 1rem;
    background: #F1F4F9;
    appearance: none;
    cursor: pointer;

    &:focus-visible{
        outline: none;
    }
`

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%;
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
`;


function GroupModal({isOpen, setIsOpen, title, subtitle, reqUsername, member, selectedGroup, setSelectedGroup, isEdit, fetchUsers}){
    const [username, setUsername] = useState("");
    const [apiResponse, setApiResponse] = useState("");
    const [apiResponseColor, setApiResponseColor] = useState("");
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const { addNotification } = useNotify();

    async function fetchGroups() {
        try {
            const response = await getGroups();
            setGroups(response.groups);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchGroups();
    }, []);

    useEffect(() => {
        if (isEdit) {
            setUsername(member);
        }
    }, [isEdit, member]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setButtonDisabled(true);

        const body = {
            "username": username,
            "group": selectedGroup
        }

        if (!username || !selectedGroup || selectedGroup === "Select") {
            setApiResponseColor("red");
            setApiResponse("Please fill in all fields.");
            setLoading(false);
            setButtonDisabled(false);
            return;
        }

        if(isEdit){
            try {
                const response = await updateGroup(body);

                if(response.success){
                    addNotification(response.message);
                }
                else{
                    setApiResponseColor("red");
                    setApiResponse(response.message);
                    setLoading(false);
                    setButtonDisabled(false);
                    return;
                }
            } catch (error) {
                setApiResponseColor("red");
                setApiResponse(error.message);
                return;
            }
        }
        else{
            try {
                const response = await addTeam(body);
                
                if(response.success){
                    addNotification(response.message);
                }
                else{
                    setApiResponseColor("red");
                    setApiResponse(response.message);
                    setLoading(false);
                    setButtonDisabled(false);
                    return;
                }
            } catch (error) {
                setApiResponseColor("red");
                setApiResponse(error.message);
                return;
            }
        }

        setUsername("");
        setSelectedGroup("");
        setIsOpen(false);
        setLoading(false);
        fetchUsers();
    }

    const handleCancel = () => {
        setUsername("");
        setSelectedGroup("");
        setApiResponseColor("");
        setApiResponse("");
        setIsOpen(false);

        if (isEdit) {
            setUsername(member);
            setSelectedGroup("Select");
        }
    };    

    return(
        <Container isOpen={isOpen}>

            <ModalContainer isOpen={isOpen}>

                <Texts>
                    <Title>{title}</Title>
                    <Subtitle>{subtitle}</Subtitle>
                </Texts>

                <FormContainer onSubmit={handleSubmit}>
                    <InputContent>
                        <InputLabel>
                            {isEdit ? (
                                <EditUsername>
                                    <p>Username</p>

                                    <Username>
                                        <p>{member}</p>
                                    </Username>
                                </EditUsername>
                            ) : (
                                <p>Username</p>
                            )}
                            
                        </InputLabel>
                        
                        {reqUsername ? (
                            <TextInput value={username} setText={setUsername} type={"text"} placeholder={"New member's username"}/>
                        ) : (
                            <></>
                        )}
                    </InputContent>

                    <InputContent>
                        <InputLabel>
                            <p>Group</p>
                        </InputLabel>

                        <SelectInput value={selectedGroup} onChange={(e) => {setSelectedGroup(e.target.value)}}>
                            <option value={""}>Select</option>

                            {reqUsername ? (
                                groups.filter((group) => group.name !== "Customers").map((group) => (
                                    <option key={group.name} value={group.name}>{group.name}</option>
                                ))
                            ) : (
                                groups.map((group) => (
                                    <option key={group.name} value={group.name}>{group.name}</option>
                                ))
                            )}
                        </SelectInput>
                    </InputContent>

                    <ButtonsContainer>
                        <FormButton isDisabled={buttonDisabled} type={"submit"} content={"Continue"}/>
                        <Button onClick={handleCancel}>Cancel</Button>
                    </ButtonsContainer>

                    {loading ? <CircleLoad/> :
                        <APIResponse apiResponse={apiResponse} apiResponseColor={apiResponseColor}/>
                    }   
                </FormContainer>
            </ModalContainer>
        </Container>
    )
}

export default GroupModal