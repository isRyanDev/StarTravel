import styled from "styled-components"

const Container = styled.div`
    width: 80px;
    height: 60px;
    position: relative;
`

const LoadText = styled.span`
    font-family: "Nunito Sans", sans-serif;
    position: absolute;
    top: 0;
    padding: 0;
    margin: 0;
    font-weight: bold;
    color: var(--background);
    animation: text_713 3.5s ease both infinite;
    font-size: 1rem;
    letter-spacing: 1px;

    @keyframes text_713 {
        0% {
            letter-spacing: 1px;
            transform: translateX(0px);
        }

        40% {
            letter-spacing: 2px;
            transform: translateX(26px);
        }

        80% {
            letter-spacing: 1px;
            transform: translateX(32px);
        }

        90% {
            letter-spacing: 2px;
            transform: translateX(0px);
        }

        100% {
            letter-spacing: 1px;
            transform: translateX(0px);
        }
    }
`

const Load = styled.span`
    background-color: rgb(0, 48, 204);
    border-radius: 50px;
    display: block;
    height: 1.5rem;
    width: 1.5rem;
    bottom: 0;
    position: absolute;
    transform: translateX(64px);
    animation: loading_713 3.5s ease both infinite;

    &::before{
        position: absolute;
        content: "";
        width: 100%;
        height: 100%;
        background-color: var(--background);
        border-radius: inherit;
        animation: loading2_713 3.5s ease both infinite;
    }

    @keyframes loading_713 {
        0% {
            width: 1.5rem;
            transform: translateX(0px);
        }

        40% {
            width: 100%;
            transform: translateX(0px);
        }

        80% {
            width: 1.5rem;
            transform: translateX(64px);
        }

        90% {
            width: 100%;
            transform: translateX(0px);
        }

        100% {
            width: 1.5rem;
            transform: translateX(0px);
        }
    }

    @keyframes loading2_713 {
        0% {
            width: 1.5rem;
            transform: translateX(0px);
        }

        40% {
            transform: translateX(0%);
            width: 80%;
        }

        80% {
            width: 100%;
            transform: translateX(0px);
        }

        90% {
            width: 80%;
            transform: translateX(15px);
        }

        100% {
            width: 1.5rem;
            transform: translateX(0px);
        }
    }
`

function ExtendedLoad() {
    return(
        <Container>
            <LoadText>LOADING</LoadText>
            <Load></Load>
        </Container>
    )
}

export default ExtendedLoad 