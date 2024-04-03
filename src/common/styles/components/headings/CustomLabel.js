import React from "react";
import styled from "styled-components";
import "../../diodrumFont.css";
import MandatoryFieldIcon from "../../../icons/MandatoryFieldIcon";

const StyledHeading = styled.label`
    font-family:"DiodrumRegular", sans-serif;
    font-style: normal;
    font-size:14px;
    font-weight:400;
    line-height: 16px;
    color:${({disabled})=>disabled?"#969696":"#000"};
    margin-bottom:4px;
    display: flex;
`;
const CustomLabel = ({id, label, mandatoryIcon, className, onClick, disabled, hidden, children}) => {
  return (
    <>
        <StyledHeading className={className} id={id} onClick={onClick} disabled={disabled} hidden={hidden}>
            {mandatoryIcon?(<MandatoryFieldIcon/>):""}{children}{label}
        </StyledHeading>
    </>
  );
};

export default CustomLabel;