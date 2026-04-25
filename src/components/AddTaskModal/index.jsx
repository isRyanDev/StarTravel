import styled from "styled-components"
import { useState } from "react"
import TextInput from "../Inputs/TextInput";
import FormButton from "../Inputs/Button";
import APIResponse from "../ApiResponse";

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
    padding: 2rem;
    background-color: var(--secondary-color);
    font-family: "Nunito Sans", sans-serif;
    transform: ${(props) => (props.isOpen ? "scale(1)" : "scale(0.9)")};
    opacity: ${(props) => (props.isOpen ? "1" : "0")};
    transition: all 0.3s ease-in-out;

    @media screen and (min-width: 430px){
        padding: 3rem;
    }

    @media screen and (min-width: 1250px){
        width: 25vw;
        height: 45dvh;
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
    width: 100%;
    box-sizing: border-box;
    border-radius: .5rem;
    color: black;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;

    &:hover{
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    }

    @media screen and (min-width: 1250px){
        width: 82%;
    }
`;


function AddTaskModal({ isOpen, setIsOpen, title, subtitle, text, setText, handleAddTask }) {
    const [apiResponse, setApiResponse] = useState("");
    const [apiResponseColor, setApiResponseColor] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!text) {
            setApiResponseColor("red");
            setApiResponse("Please fill in all fields.");
            return;
        }
        handleAddTask();
    };

    return (
        <Container isOpen={isOpen}>
            <ModalContainer isOpen={isOpen}>
                <Texts>
                    <Title>{title}</Title>
                    <Subtitle>{subtitle}</Subtitle>
                </Texts>

                <FormContainer onSubmit={handleSubmit}>
                    <InputContent>
                        <InputLabel>
                            <p>Task</p>
                        </InputLabel>

                        <TextInput value={text} setText={setText} type={"text"} placeholder={"New task description"} />
                    </InputContent>

                    <ButtonsContainer>
                        <FormButton type="submit" content="Continue" />
                        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
                        {apiResponse ? <APIResponse apiResponseColor={apiResponseColor} apiResponse={apiResponse}/> : ""}
                    </ButtonsContainer>
                </FormContainer>
            </ModalContainer>
        </Container>
    );
}

export default AddTaskModal;