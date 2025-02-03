import { useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header/header";
import SectionAbout from "../components/Sections/about";
import SectionServices from "../components/Sections/services";
import SectionDestinations from "../components/Sections/destinations";
import Decoration from "../components/Decoration/decoration";
import SectionSubscribe from "../components/Sections/subscribe";
import Footer from "../components/Footer/footer";
import loginValidation from "../utils/loginValidation";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
`

function Home() {
  useEffect(() => {
    document.title = "JStar Travel | Home";

    loginValidation();
  }, []);

  return (
    <HomeContainer>
      <Decoration />

      <Header profileColor="var(--tertiary-color)" />

      <SectionAbout />

      <SectionServices />

      <SectionDestinations />

      <SectionSubscribe/>

      <Footer/>
      
    </HomeContainer>
  );
}

export default Home;
