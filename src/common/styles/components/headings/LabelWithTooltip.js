import React from "react";
import styled from "styled-components";
import "../../diodrumFont.css";
import MandatoryFieldIcon from "../../../icons/MandatoryFieldIcon";
import CustomTooltip from "../tooltip/CustomTooltip";

const StyledHeading = styled.h3`
    font-family:${(props)=>props.fontFamily||"DiodrumRegular"};
    font-style: normal;
    font-size: ${(props)=>props.fontSize || "14px"};
    font-weight: ${(props)=>props.fontWeight || "normal"};
    color: ${(props)=>props.color || "#000"};
    margin-bottom: 0;
    display: flex;
`;
const LabelWithTooltip = ({fontSize, fontWeight, label, id, color, fontFamily, className, mandatoryIcon, toolTipText}) => {
    if(toolTipText){
        return(
            <CustomTooltip text={label}>
                <StyledHeading className={className} fontSize={fontSize} id={id} fontWeight={fontWeight} color={color} fontFamily={fontFamily}>
                {mandatoryIcon?(<MandatoryFieldIcon/>):""}{label}
                </StyledHeading>
            </CustomTooltip>
        );
    }else{
    <StyledHeading className={className} fontSize={fontSize} id={id} fontWeight={fontWeight} color={color} fontFamily={fontFamily}>
      {mandatoryIcon?(<MandatoryFieldIcon/>):""}{label}
      </StyledHeading>;
    }
};

export default LabelWithTooltip;