import styled from "styled-components";

const Input = styled.input`
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
`

function TextInput({setText, placeholder, type, value}){

    return(
        <Input 
            type={type} 
            value={value || ""}
            placeholder={placeholder}
            onChange={(e) => setText(e.target.value)}
        />
    );
}

export default TextInput;