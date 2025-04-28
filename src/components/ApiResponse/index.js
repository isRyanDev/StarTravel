import { useEffect, useRef } from "react";
import styled from "styled-components";

const ApiResContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 2rem;
    transition: all .7s;
    transform: scale(0);
    opacity: 0;
    width: 100%;

    &.active{
        opacity: 1;
        transform: scale(1);
    }
`

const ApiRes = styled.p`
    font-family: "Nunito Sans";
    font-size: 1rem;
    background: none;
    font-weight: 500;
    text-align: center;
    color: ${(props) => props.color || "black"};
    transition: all .7s;
    animation: pulseApiResponse 1.5s infinite; 

    @keyframes pulseApiResponse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }
`

function APIResponse({ apiResponse, apiResponseColor }) {
    const apiResContainer = useRef(null);

    useEffect(() => {
        const element = apiResContainer.current;

        if(apiResponse !== "") {
            element.classList.add("active");
        }
        else{
            element.classList.remove("active");
        }
    })

    return (
        <ApiResContainer ref={apiResContainer}>
            <ApiRes color={apiResponseColor}>{apiResponse}</ApiRes>
        </ApiResContainer>
    );
}

export default APIResponse