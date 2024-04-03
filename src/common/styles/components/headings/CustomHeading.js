import React from "react";
import styled from "styled-components";
import "../../diodrumFont.css";
import MandatoryFieldIcon from "../../../icons/MandatoryFieldIcon";

const StyledHeading = styled.h3`
    font-family:${(props)=>props.fontFamily||"DiodrumRegular"};
    font-style: normal;
    line-height: ${(props)=>props.lineHeight};
    font-size: ${(props)=>props.fontSize || "14px"};
    font-weight: ${(props)=>props.fontWeight || "normal"};
    color: ${(props)=>props.color || "#000"};
    margin-bottom: 0;
    display: flex;
`;
const CustomHeading = ({children, fontSize, lineHeight, onClick, fontWeight, label, id, color, fontFamily, className, mandatoryIcon,hidden}) => {
  return (
    <>
      <StyledHeading className={className} lineHeight={lineHeight} onClick={onClick} fontSize={fontSize} id={id} fontWeight={fontWeight} color={color} fontFamily={fontFamily} hidden={hidden}>
      {mandatoryIcon?(<MandatoryFieldIcon/>):""}{label}{children}
      </StyledHeading>
    </>
  );
};

export default CustomHeading;