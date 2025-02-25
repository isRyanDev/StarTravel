import styled from "styled-components"

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
    padding: 3rem;
    background-color: var(--secondary-color);
    font-family: "Nunito Sans", sans-serif;
    transform: ${(props) => (props.isOpen ? "scale(1)" : "scale(0.9)")};
    opacity: ${(props) => (props.isOpen ? "1" : "0")};
`

const ModalConfirmation = styled.p`
    font-size: 1.2rem;
    text-align: center;
    color: var(--login-text-color);
`

const ModalOptions = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 90%;
`;

const Button = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    color: black;
    cursor: pointer;

    &:hover{
        transform: scale(1.1);
    }
`;

function ConfirmModal({isOpen, setIsOpen, text, setConfirm}){
    return(
        <Container isOpen={isOpen}>
            <ModalContainer isOpen={isOpen}>
                <ModalConfirmation>{text}</ModalConfirmation>

                <ModalOptions>
                    <Button onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button onClick={() => setConfirm(true)} style={{background: "var(--dashboard-secondary-color)", color: "var(--secondary-color)"}}>Confirm</Button>
                </ModalOptions>
            </ModalContainer>
        </Container>
    )
}

export default ConfirmModal