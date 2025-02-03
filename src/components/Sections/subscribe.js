import { useRef, useEffect } from "react";
import styled from "styled-components";
import BackgroundImg from "../../assets/Images/subscribe-background.png"
import EmailIcon from "../../assets/Images/icons/subscribe-email-element.png"

const SubscribeContainer = styled.section`
    display: flex;
    margin-top: 2rem;
    height: 50vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transform: translateX(-10rem);
    opacity: 0;
    transition: transform 1s ease-in-out, opacity .5s ease-in-out; 
    gap: 4rem;

    &.active{
        transform: translateX(0);
        opacity: 1;
    }

    @media screen and (min-width: 1640px){
        justify-content: space-between;
        margin: 0;
    }
`

const SubscribeContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4rem;
    height: 25rem;
    width: 72rem;

    @media screen and (min-width: 1640px){
        gap: 6rem;
    }
`

const SubscribeBackground = styled.img`
    display: none;
    z-index: -1;

    @media screen and (min-width: 1640px){
        display: flex;
        position: absolute;
        width: 100%;
    }
`

const SubscribeTitle = styled.h1`
    font-family: 'Poppins', sans-serif;
    font-size: 1.5rem;
    font-weight: bold;
    max-width: 26rem;
    color: var(--primary-color);
    z-index: 999;
    text-align: center;
    transition: all .7s;

    @media screen and (min-width: 1640px){
        font-size: 2rem;
        max-width: 100rem;
    }
`

const SubscribeForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 100;
    gap: 1.5rem;

    @media screen and (min-width: 1640px){
        flex-direction: row;
        gap: 1.5rem;
    }
`

const SubscribeEmail = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 4rem;
    background-color: var(--secondary-color);
    padding: 0 1.2rem 0 1.2rem;
    border-radius: .5rem;
    gap: .8rem;
`

const EmailImg = styled.img`
    width: 1rem;
`

const SubscribeEmailInput = styled.input`
    border: none;
    background-color: transparent;
    width: 20rem;
    color: var(--primary-color);

    &:focus-visible{
        outline: none;
    }

    @media screen and (min-width: 1640px){
        width: 26rem;
    }
`

const SubscribeSubmit = styled.button`
    font-family: 'Open Sans', sans-serif;
    font-weight: bold;
    width: 24.2rem;
    height: 4rem;
    border: none;
    background-color: var(--tertiary-color);
    color: var(--secondary-color);
    border-radius: .5rem;
    cursor: pointer;
    transition: all .7s;

    &:hover{
        background-color: var(--primary-color);
    }

    @media screen and (min-width: 1640px){
        width: 11.25rem;
    }
`

function SectionSubscribe() {
    const subscribeRef = useRef(null);

    useEffect(() => {
      const element = subscribeRef.current;
    
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
            threshold: 0.4,
          }
        );
    
        observer.observe(element);
    
        return () => observer.disconnect();
      }
    }, []);

    return(
        <SubscribeContainer ref={subscribeRef}> 
            <SubscribeContent>
                <SubscribeBackground src={BackgroundImg} alt="subscribe-background"/>
                <div>
                    <SubscribeTitle>
                        Subscribe to get information, latest news and other<br/>interesting offers about JStar
                    </SubscribeTitle>
                </div>
        
                <SubscribeForm>
                    <SubscribeEmail>
                        <EmailImg src={EmailIcon} alt="subscribe-email-element"/>
                        <SubscribeEmailInput type="email" placeholder="Enter your email"/>
                    </SubscribeEmail>

                    <SubscribeSubmit>
                        Subscribe
                    </SubscribeSubmit>
                </SubscribeForm>
                {/* <img class="subscribe-ui-element" src="./assets/images/subscribe-ui-element.png" alt="subscribe-ui-element"/> */}
            </SubscribeContent>
        </SubscribeContainer>
    )
}

export default SectionSubscribe