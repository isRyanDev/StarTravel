import { useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header/header";
import Footer from "../components/Footer/footer";
import SectionDestinations from "../components/Sections/destinations";
import loginValidation from "../utils/loginValidation";

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
`

function Destinations() {
  useEffect(() => {
    document.title = "JStar Travel | Destinations";

    loginValidation();
  }, []);

  return (
    <AboutContainer>
      <Header />

      <SectionDestinations height={"90vh"}/>

      <Footer/>
    </AboutContainer>
  );
}

export default Destinations;
