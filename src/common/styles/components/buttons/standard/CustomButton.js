import React from "react";
import styled from "styled-components";
import { colors, fontStyles } from "../../../Theme";

const StyledButton = styled.button`
  height: 32px;
  display: inline-flex;
  /* padding: 10px 24px; */
  justify-content: center;
  align-items: center;
  ${fontStyles.diodrum14}
  color: ${colors.Black};
  border-radius: 25px;
  border: none;
  background-color:transparent;
  :hover{
    background-color: transparent;
    border: none;
    color: ${colors.SecondaryElfGreen};
  }
  :disabled{
    background-color: transparent;
    border:none;
    color: ${colors.blackTransparency025};
  }
`;
const CustomButton = ({id, label, onClick, disabled, value}) => {
  return (
    <>
      <StyledButton id={id} label={label} onClick={onClick} disabled={disabled} value={value}>
        {label}
      </StyledButton>
    </>
  );
};

export default CustomButton;