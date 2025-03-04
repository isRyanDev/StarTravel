import styled from "styled-components"
import { useState } from "react"
import groups from "../groups.json"
import EmailInput from "../../components/AccAssets/AccInputs/EmailInput";
import FormButton from "../../components/AccAssets/AccInputs/Button";
import { updateGroup } from "../../services/userAccount";

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
  z-index: 10;

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
    width: 30vw;
    height: 60vh;
    padding: 3rem;
    background-color: var(--secondary-color);
    font-family: "Nunito Sans", sans-serif;
    transform: ${(props) => (props.isOpen ? "scale(1)" : "scale(0.9)")};
    opacity: ${(props) => (props.isOpen ? "1" : "0")};
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
    transition: all 0.3s ease-in-out;

    &:hover{
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
`;


function FormModal({isOpen, setIsOpen}){
    const [username, setUsername] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = {
            "username": username,
            "group": selectedGroup
        }

        if (!username || !selectedGroup) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const response = await updateGroup(body);

            alert(response.message);
            setUsername("");
            setSelectedGroup("");
            setIsOpen(false);
        } catch (error) {
            throw error;
        }
    }

    return(
        <Container isOpen={isOpen}>
            <ModalContainer isOpen={isOpen}>

                <Texts>
                    <Title>New member</Title>
                    <Subtitle>Please enter the new member's username and group to continue</Subtitle>
                </Texts>

                <FormContainer onSubmit={handleSubmit}>
                    <InputContent>
                        <InputLabel>
                            <p>Username</p>
                        </InputLabel>
                        
                        <EmailInput value={username} setUsername={setUsername} type={"text"} placeholder={"New member's username"}/>
                    </InputContent>

                    <InputContent>
                        <InputLabel>
                            <p>Group</p>
                        </InputLabel>

                        <SelectInput value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)}>
                            {groups.filter((roles) => roles.group !== "Client").map((roles) => (
                                <option key={roles.group} value={roles.group}>{roles.group}</option>
                            ))}
                        </SelectInput>
                    </InputContent>

                    <ButtonsContainer>
                        <FormButton type={"submit"} content={"Continue"}/>
                        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
                    </ButtonsContainer>
                </FormContainer>
            </ModalContainer>
        </Container>
    )
}

export default FormModal