import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import FacebookImg from "../../assets/Icons/facebook-icon.png";
import InstagramImg from "../../assets/Icons/instagram-icon.png";
import TwitterImg from "../../assets/Icons/twitter-icon.png";
import PlayImg from "../../assets/Icons/play-store-icon.png";
import AppStoreImg from "../../assets/Icons/apple-store-icon.png";
import styled from "styled-components";

const FooterContainer = styled.footer`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 75vw;
    opacity: 0;
    transform: translateX(+10rem);
    padding: 2rem;
    transition: all 1s ease-in-out;
    gap: 2rem;

    &.active{
        transform: translateX(0);
        opacity: 1;
    }
`

const FooterContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;

    @media screen and (min-width: 1640px){
        flex-direction: row;
        gap: 6rem;
    }
`

const FooterTexts = styled.div`
    display: flex;
    flex-direction: column;
    gap: .8rem;
`

const FooterTitle = styled.h1`
    font-family: 'Poppins', sans-serif;
    font-size: 2.5rem;
    font-weight: bold;
    color: var(--secondary-color);
`

const FooterSubtitle = styled.p`
    font-family: 'Poppins', sans-serif;
    font-size: .8rem;
    font-weight: bold;
    color: var(--primary-color);
    transition: all .7s;
`

const FooterListContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;

    @media screen and (min-width: 1640px){
        gap: 4rem;
    }
`

const FooterList = styled.div`
    display: flex;
    flex-direction: column;
    gap: .5rem;
`

const FooterListTitle = styled.h1`
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    font-weight: bold;
    color: var(--primary-color);
    transition: all .7s;
`

const FooterLinks = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Poppins', sans-serif;
    height: 5rem;
`

const LinkStyled = styled(Link)`
    text-decoration: none;
    color: var(--secondary-color);
`

const SocialList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`

const SocialListLinks = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
`

const DiscoverAppList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: .2rem;
`

const DiscoverAppTitle = styled.h2`
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    font-weight: bold;
    color: var(--primary-color);
    transition: all .7s;
`

const DiscoverApps = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
`

const LinkImg = styled.img`
    width: 1.8rem;
`

const DiscoverImg = styled.img`
    width: 6rem;
`

const FooterCopyright = styled.p`
    font-family: 'Poppins', sans-serif;
    font-size: .8rem;
    color: var(--primary-color);
    transition: all .7s;
`

function Footer(){
    const footerRef = useRef(null);

    useEffect(() => {
    const element = footerRef.current;
    
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
        <FooterContainer ref={footerRef}>
            <FooterContent>
                <FooterTexts>   
                        <FooterTitle>
                            Star Travel.
                        </FooterTitle>
                        <FooterSubtitle>
                            Book your trip in minute, get full<br/>Control for much longer.
                        </FooterSubtitle>
                </FooterTexts>  

                <FooterListContainer>
                            <FooterList>          
                                <FooterListTitle>
                                    Company
                                </FooterListTitle>
                                <FooterLinks>
                                    <LinkStyled to="/about">
                                        About
                                    </LinkStyled>
                                    <LinkStyled to="/careers">
                                        Careers
                                    </LinkStyled>
                                    <LinkStyled to="mailto:suporte@star.com" target="blank">
                                        Help/FAQ
                                    </LinkStyled>
                                </FooterLinks>
                            </FooterList>

                            <FooterList>  
                                <FooterListTitle>
                                    Contacts
                                </FooterListTitle>
                                <FooterLinks>
                                        <LinkStyled to="mailto:suporte@star.com" target="blank">
                                            Email
                                        </LinkStyled>
                                        <LinkStyled to="whatsapp://send?phone=+55(00)00000-0000" target="blank">
                                            Phone
                                        </LinkStyled>
                                </FooterLinks>
                            </FooterList>

                            <SocialList>
                                <SocialListLinks>
                                          <LinkStyled to="" target="blank">
                                            <LinkImg src={InstagramImg} alt="instagram-icon"/>
                                        </LinkStyled>
                                        <LinkStyled to="" target="blank">
                                            <LinkImg src={TwitterImg} alt="twitter-icon"/>
                                        </LinkStyled>
                                        <LinkStyled to="" target="blank">
                                            <LinkImg src={FacebookImg} alt="facebook-icon"/>
                                        </LinkStyled>
                                </SocialListLinks>

                                <DiscoverAppList>
                                    <DiscoverAppTitle>
                                        Discover our app
                                    </DiscoverAppTitle>

                                    <DiscoverApps>
                                        <LinkStyled to="" target="blank">
                                            <DiscoverImg src={PlayImg} alt="play-store-icon"/>
                                        </LinkStyled>
                                        <LinkStyled to="" target="blank">
                                            <DiscoverImg src={AppStoreImg} alt="apple-store-icon"/>
                                        </LinkStyled>
                                    </DiscoverApps>
                                </DiscoverAppList>
                            </SocialList>
                </FooterListContainer>
            </FooterContent>
            <FooterCopyright>All rights reserved@star.com</FooterCopyright>
        </FooterContainer>
    )
}

export default Footer