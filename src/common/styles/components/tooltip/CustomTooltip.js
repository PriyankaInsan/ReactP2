import React from "react";
import {Tooltip } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import styled from "styled-components";
import { colors, fontStyles } from "../../Theme";

const StyledTooltip = styled(Tooltip)`
  .tooltip-inner {
    text-align: left;
    ${fontStyles.diodrum12}
    color: ${colors.White};
  }
`;
const StyledOverlayTrigger = styled(OverlayTrigger)`
  border-radius:2px;
  text-align: left;
`;

const CustomTooltip = ({text, children, placement}) => {
    const renderTooltip =()=>(
        <StyledTooltip id="tooltip">
            {text}
        </StyledTooltip>
    );
  return (
    <>
    <StyledOverlayTrigger placement={placement?placement:"top"} overlay={renderTooltip(text)}>
        {children}
    </StyledOverlayTrigger>
    </>
  );
};

export default CustomTooltip;