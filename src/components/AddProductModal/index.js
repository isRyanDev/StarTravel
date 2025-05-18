import styled from "styled-components"
import { useEffect, useState } from "react"
import TextInput from "../Inputs/TextInput";
import FormButton from "../Inputs/Button";
import APIResponse from "../ApiResponse";
import SelectInput from "../Inputs/Select";
import { getProductsTypes } from "../../services/products";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  transition: all 0.5s ease-in-out;
  z-index: 1000;

  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  pointer-events: ${(props) => (props.isOpen ? "auto" : "none")};
`

const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 1.5rem;
    border-radius: 1rem;
    width: 70vw;
    height: 75vh;
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
    }
`

const Texts = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
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
    justify-content: flex-start;
    width: 100%;
    box-sizing: border-box;
    overflow-y: auto;
    gap: 2rem;

    &::-webkit-scrollbar {
        display: none;
    }
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
    width: 82%;
    box-sizing: border-box;
    border-radius: .5rem;
    color: black;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
`;


function ProductModal({ isOpen, setIsOpen, title, subtitle}) {
    const [selectedOption, setSelectedOption] = useState("");
    const [typesList, setTypesList] = useState([]);
    const [apiResponse, setApiResponse] = useState("");
    const [apiResponseColor, setApiResponseColor] = useState("");

    async function fetchProductsTypes(){
        try {
            const response = await getProductsTypes();

            if(response.success){
                setTypesList(response.types)
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        fetchProductsTypes();
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();

        // if (!text) {
        //     setApiResponseColor("red");
        //     setApiResponse("Please fill in all fields.");
        //     return;
        // }
    };

    const textDetails = [
        {
            label: "Name",
            placeholder: "Product name",
            type: "text"
        },
        {
            label: "Company",
            placeholder: "Product Company",
            type: "text"
        },
        {
            label: "Price",
            placeholder: "Product price",
            type: "number"
        }
    ]

    return (
        <Container isOpen={isOpen}>
            <ModalContainer isOpen={isOpen}>
                <Texts>
                    <Title>{title}</Title>
                    <Subtitle>{subtitle}</Subtitle>
                </Texts>

                <FormContainer onSubmit={handleSubmit}>
                    {textDetails.map((item, index) => (
                        <InputContent key={index}>
                            <InputLabel>
                                <p>{item.label}</p>
                            </InputLabel>

                            <TextInput placeholder={item.placeholder} type={item.type} />
                        </InputContent>
                    ))}

                    <InputContent>
                        <InputLabel>
                            <p>Product Type</p>
                        </InputLabel>
                        
                        <SelectInput 
                            list={typesList}
                            selectedOption={selectedOption}
                            setSelectedOption={setSelectedOption}
                        />
                    </InputContent>

                    <ButtonsContainer>
                        <FormButton type="submit" content="Continue" />
                        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
                    </ButtonsContainer>

                    <APIResponse apiResponseColor={apiResponseColor} apiResponse={apiResponse}/>
                </FormContainer>
            </ModalContainer>
        </Container>
    );
}

export default ProductModal;