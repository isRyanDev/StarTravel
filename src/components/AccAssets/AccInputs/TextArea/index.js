import styled from "styled-components";

const Input = styled.textarea`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-radius: .5rem;
    border: 1px solid #D8D8D8;
    color: var(--login-text-color);
    font-family: "Nunito Sans";
    font-size: 1.125rem;
    padding: 1rem;
    background: #F1F4F9;
    resize: none;

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

function TextAreaInput({setText, placeholder, type, value}){

    return(
        <Input 
            type={type} 
            value={value || ""}
            placeholder={placeholder}
            onChange={(e) => setText(e.target.value)}
        />
    );
}

export default TextAreaInput;