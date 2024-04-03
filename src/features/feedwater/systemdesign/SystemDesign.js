import React from "react";
import { Container } from "react-bootstrap";
import FeedTechnology from "./FeedTechnology";
import SystemDesignStyled from "./SystemDesignStyled";
import Footer from "../../../common/footer/Footer";

const SystemDesign = () => {
  return (
    <>
      <SystemDesignStyled>
        <Container fluid className="g-0">
          <FeedTechnology/>
          {/* <Footer/> */}
        </Container>
      </SystemDesignStyled>
    </>
  );
};

export default SystemDesign;