import React, { useState } from "react";
import CustomTooltip from "../tooltip/CustomTooltip";
import styled from "styled-components";
import InfoIcon from "../../../icons/InfoIcon";
import InfoIconHovered from "../../../icons/InfoIconHovered";
import normalInfoIcon from "../../../icons/normal-info-icon.svg";
import tealInfoIcon from "../../../icons/teal-info-icon.svg";

const StyledSpan = styled.span`
    padding: .6px;
    display: flex;
    width: 16px;
    min-width: 16px;
    height: 16px;
    background-image: url(${normalInfoIcon});
    background-repeat: no-repeat;
    background-position: center center;
    :hover{
      width: 16px;
      min-width: 16px;
      height: 16px;
      background-image: url(${tealInfoIcon});
      background-repeat: no-repeat;
      background-position: center center;
    }
`;

const IconWithTooltip = ({label, icon, placement}) => {
  const [mouseEnter,setMouseEnter] = useState(false);
  return (
    <>
    <CustomTooltip text={label} placement={placement}>
        <StyledSpan onMouseEnter={()=>setMouseEnter(true)} onMouseLeave={()=>setMouseEnter(false)}>
        
        </StyledSpan>
    </CustomTooltip>
    </>
  );
};

export default IconWithTooltip;