import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
`

const Load = styled.svg`
    height: 2rem;
    width: 2rem;
    transform-origin: center;
    animation: rotate4 2s linear infinite;

    & circle {
        fill: none;
        stroke: hsl(214, 97%, 59%);
        stroke-width: 2;
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
        stroke-linecap: round;
        animation: dash4 1.5s ease-in-out infinite;

        @keyframes dash4 {
            0% {
                stroke-dasharray: 1, 200;
                stroke-dashoffset: 0;
            }
        
            50% {
                stroke-dasharray: 90, 200;
                stroke-dashoffset: -35px;
            }
        
            100% {
                stroke-dashoffset: -125px;
            }
        }
    }

    @keyframes rotate4 {
        100% {
            transform: rotate(360deg);
        }
    }
   

`

function CircleLoad() {
    return (
        <Container>
            <Load viewBox="25 25 50 50">
            <circle r="20" cy="50" cx="50"></circle>
            </Load>
        </Container>
    );    
}

export default CircleLoad