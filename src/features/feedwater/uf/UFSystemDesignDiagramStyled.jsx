import { Col } from "react-bootstrap";
import styled from "styled-components";
import eyeImage from "../../../common/assets/images/EyeOpen.svg";
import closeEye from "../../../common/assets/images/EyeInvisible.svg";
import { accordionStyles, colors, fontStyles } from "../../../common/styles/Theme";

const UFSystemDesignDiagramStyled = styled(Col)`
  margin-bottom: 15px;
    .accordion{
        ${accordionStyles.normalAccordionStyle};
        .accordion-item{
            border-radius:4px;
            .accordion-header{
                background-color: none;
                .accordion-button{
                    ${accordionStyles.accordionHeaderStyle};
                    ${fontStyles.diodrum14}
                    color: ${colors.PrimaryDarkAquaMarine};
                    span{
                        color: ${colors.Black};
                        position: absolute;
                        right: 45px;
                    }
                    ::after{
                        background-image: url(${eyeImage});
                    }
                }
                .accordion-button:not(.collapsed){
                    ${accordionStyles.accordionHeaderStyle};
                }
                .accordion-button:not(.collapsed)::after {
                    background-image: url(${closeEye});
                }
            }
            .image-container{
                display: flex;
                justify-content: center;
            }
        }
    }  
`;
export default UFSystemDesignDiagramStyled;