import { useEffect, useRef } from "react";
import styled from "styled-components";
import Background from "../AccBackground/background";
import loginValidation from "../../../utils/loginValidation";

const AccContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
`

const AccContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 1.5rem;
    border: 1px solid #B9B9B9;
    background-color: var(--secondary-color);
    height: 95%;
    width: 95%;
    overflow: hidden;
    opacity: 0;
    transform: scale(0.9);
    transition: all 1s ease-in-out;

    &.active{
      opacity: 1;
      transform: scale(1);
    }

    @media screen and (min-width: 1000px){
      width: 40%;
    }

    @media screen and (min-width: 750px) and (min-height: 850px){
      width: 40rem;
      height: ${props => props.height || "unset"};
    }
`

function Accounts({content, height}) {
    const AccRef = useRef(null);

    useEffect(() => {
        document.title = "Star Travel | Login";

        loginValidation();
      }, []);

    useEffect(() => {
      const element = AccRef.current;
    
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
        <AccContainer>
            <Background/>

            <AccContentContainer height={height} ref={AccRef}>
                {content}
            </AccContentContainer>
        </AccContainer>
    );
}

export default Accounts;