import styled from "styled-components";

const Select = styled.select`
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

function SelectInput({list, selectedOption, setSelectedOption}){
    return(
        <Select value={selectedOption} onChange={(e) => {setSelectedOption(e.target.value)}}>
            <option value={""}>Select</option>

            {list.map((child, index) => (
                <option key={index} value={child.name}>{child.name}</option>
            ))}
        </Select>
    )
}

export default SelectInput