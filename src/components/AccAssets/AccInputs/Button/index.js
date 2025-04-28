import styled from "styled-components"

const AccButton = styled.button`
    width: 82%;
    height: 3.5rem;
    border-radius: 0.5rem;
    border: none;
    background: var(--background);
    color: var(--secondary-color);
    font-family: "Nunito Sans";
    font-size: 1.25rem;
    font-weight: 700;
    transition: all .7s;
    opacity: ${props => props.disabled ? 0.5 : 0.8};
    pointer-events: ${props => props.disabled ? 'none' : 'unset'};
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};

    &:hover{
        opacity: 1;
    }
`

function FormButton({type, content, action, isDisabled}){
    return(
        <AccButton disabled={isDisabled} type={type} onClick={action}>{content}</AccButton>
    )
}

export default FormButton