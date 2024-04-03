/* eslint-disable max-len */
import React, {useState} from "react";
import DismissStyled from "./DismissStyled";
import {Explore} from "./Explore";
import ExploreStyledPopUp from "../modals/ExploreStyledPopUp";
import CloseIcon from "../../common/icons/CloseIcon";
import CarouselImageOne from "../../common/assets/images/image 193.svg";
import CarouselImageTwo from "../../common/assets/images/image 194.svg";
import CarouselImageThree from "../../common/assets/images/image 194.svg";
import CarouselImageFour from "../../common/assets/images/image 167.svg";
import CarouselImageFive from "../../common/assets/images/Banner=With CTA.svg";
import CarouselImageSix from "../../common/assets/images/Banner=Descriptive.svg";
import CarouselImageSeven from "../../common/assets/images/Banner=WavePro.svg";
import CarouselImageEight from "../../common/assets/images/CarouselImage6.svg";
import Dismiss from "./Dismiss";
import {Col, Row, Carousel} from "react-bootstrap";
import ComonStyled from "./ComonStyled";
const ProjectHeadline = () => {
  const[show, setShow]= useState(false);
  const handleOpen = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  const[isCarouselOpen, setCarouselOpen] = useState(true);
  const handleCloseCarousel =()=>{
    setCarouselOpen(false);
    console.log("hello  dismiss");
  };
  return (
    <>
      <ComonStyled>
        {isCarouselOpen &&
      <Row>
        <Col lg={12} md={12} sm={12} xs={12}> 
          <Carousel>
            {/* <Carousel.Item>
              <img className="d-block w-100" src={CarouselImageOne} alt="First slide"/>
              <Carousel.Caption>
                <h3>Working together for a clean‑water future</h3>
                <p>We offer a broad portfolio of globally recognized, industry-leading solutions to help you produce, purify, and extract some of the world’s most commercially important products.</p>
                 
                <a href="#" onClick={handleOpen}>Explore</a>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={CarouselImageTwo} alt="Second slide"/>
              <Carousel.Caption>
                <h3 className="dupont-water-tag">DuPont Water Solutions</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={CarouselImageEight} alt="Second slide"/>
              <Carousel.Caption>
                <p>We offer a broad portfolio of globally recognized, industry-leading solutions to help you produce, purify, and extract some of the world’s most commercially important products.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={CarouselImageFour} alt="Third slide"/>
              <Carousel.Caption>
                <p>
                  “When we meet our end user expectations by delivering 100% recycled water to meet their environmental social goals, it gives us biggest joy as a service provider.”
                </p>
                <h6>- Vishal Murarka, CEO Banka Bio</h6>
              </Carousel.Caption>
            </Carousel.Item> */}
            <Carousel.Item>
            <img className="d-block w-100" src={CarouselImageSeven} alt="Seventh slide"/>
            </Carousel.Item>
            <Carousel.Item>
            <img className="d-block w-100" src={CarouselImageFive} alt="Fifth slide"/>
            </Carousel.Item>
            <Carousel.Item>
            <img className="d-block w-100" src={CarouselImageSix} alt="Sixth slide"/>
            </Carousel.Item>
          </Carousel>  
        </Col>
      </Row>
        }
      </ComonStyled>
      <DismissStyled>
        <Dismiss onClose={handleCloseCarousel}/>
      </DismissStyled>
      <ExploreStyledPopUp centered show={show} onHide={handleClose} backdrop="static" keyboard="false">
        <div className="d-flex justify-content-between">
          <h1>About DuPont</h1>
          <div className="close-icon" onClick={handleClose}>
            <CloseIcon/>
          </div>
        </div>
        <div>
          <p>“When we meet our end user expectations by delivering 100% recycled water to meet their environmental social goals, it gives us biggest joy as a service provider.”
          “When we meet our end user expectations by delivering 100% recycled water to meet their environmental social goals, it gives us biggest joy as a service provider.”
          </p>
        </div>
      </ExploreStyledPopUp>
    </>
  );
};

export default ProjectHeadline;