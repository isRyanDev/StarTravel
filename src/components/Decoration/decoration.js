import { useEffect, useRef } from "react";
import { ReactComponent as DecorationImg } from "../../assets/Svg-Icons/Decoration.svg"
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    z-index: -1;
    width: 54rem;
    height: 54rem;
`

const Decore = styled(DecorationImg)`
    display: none;
    transition: all .7s;

    @media screen and (min-width: 1640px) {
        display: flex;
        width: 100%;
        height: 100%;
        opacity: 0;
        transform: translate(+10rem, -10rem);
        transition: all 1s ease-in-out;
        fill: var(--decore-color);

        &.active{
            transform: translate(0, 0);
            opacity: 1;
        }
    }
`

function Decoration() {
    const decorationRef = useRef(null);

    useEffect(() => {
        const element = decorationRef.current;
    
        if (element) {
        const observer = new IntersectionObserver(
            ([entry]) => {
            if (entry.isIntersecting) {
                element.classList.add("active");
            } else {
                element.classList.remove("active");
            }
            },
            {
            root: null,
            threshold: 0.1,
            }
        );
    
        observer.observe(element);
    
        return () => observer.disconnect();
        }
    }, []);

    return (
        <Container>
            <Decore ref={decorationRef}/>
        </Container>
    )
}

export default Decoration