import React from "react";
import styled from "styled-components";
import { colors, fontStyles } from "../../../Theme";

const StyledButton = styled.button`
    height: 30px;
    display: inline-flex;
    padding: 4px 8px;
    gap: 5px;
    align-items: center;
    border: 0.5px solid ${colors.GreyE1};
    background-color: ${(props)=>props.color || colors.Pale20PaleTeal};
    box-shadow: 1px 1px 3px 0px ${colors.blackTransparency020};
    color: ${(props)=>props.color || colors.Black};
    ${fontStyles.notoSans14SemiBold}
    &:hover{
        background-color: ${colors.LightLightTeal};
    }
    &:disabled{
        background-color: ${colors.GreyE1};
        color: ${colors.Grey96};
    }
`;
const NormalTechButtons = ({id, label, value, onClick, disabled, className}) => {
  return (
    <>
    <StyledButton id={id} label={label} value={value} className={className} onClick={onClick} disabled={disabled}>
        {label}
    </StyledButton>
    </>
  );
};

export default NormalTechButtons;