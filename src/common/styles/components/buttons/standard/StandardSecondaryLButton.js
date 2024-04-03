import React from "react";
import styled from "styled-components";
import { colors, fontStyles } from "../../Theme";

const StyledSecondaryButton = styled.button`
  height: 53px;
  display: inline-flex;
  padding: 16px 48px;
  justify-content: center;
  align-items: center;
  ${fontStyles.diodrum14};
  color: ${colors.Black};
  border-radius: 100px;
  border: 1px solid ${colors.Black};
  background-color: ${colors.White};
  :hover{
    color: ${colors.SecondaryElfGreen};
    background-color: ${colors.White};
    border: 1px solid ${colors.SecondaryElfGreen};
  }
  :disabled{
    background-color: ${colors.GreyF8};
    border: 1px solid ${colors.GreyD9};
    color: ${colors.blackTransparency025};
  }
`;
const StandardSecondaryLButton = ({id, label, onClick, disabled}) => {
  return (
    <>
      <StyledSecondaryButton id={id} onClick={onClick} disabled={disabled}>{label}</StyledSecondaryButton>
    </>
  );
};

export default StandardSecondaryLButton;