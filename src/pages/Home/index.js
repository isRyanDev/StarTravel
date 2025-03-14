import { useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/Header/header";
import SectionAbout from "../../utils/Sections/about";
import SectionServices from "../../utils/Sections/services";
import SectionDestinations from "../../utils/Sections/destinations";
import Decoration from "../../components/Decoration/decoration";
import SectionSubscribe from "../../utils/Sections/subscribe";
import Footer from "../../components/Footer/footer";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
`

function Home() {
  useEffect(() => {
    document.title = "Star Travel | Home";
    localStorage.removeItem("currentSection");
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
