import React from "react";
import styled from "styled-components";
import { colors, fontStyles } from "../../Theme";

const StyledPrimaryButton = styled.button`
  height: 53px;
  display: inline-flex;
  padding: 16px 48px;
  justify-content: center;
  align-items: center;
  ${fontStyles.diodrum14}
  color: ${colors.White};
  border-radius: 100px;
  border: 1px solid ${colors.PrimaryDarkAquaMarine};
  background-color: ${colors.PrimaryDarkAquaMarine};
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.04);
  :hover{
    background-color: ${colors.SecondaryElfGreen};
    border: 1px solid ${colors.SecondaryElfGreen};
  }
  :disabled{
    background-color: ${colors.GreyF8};
    border: 1px solid ${colors.GreyD9};
    color: ${colors.blackTransparency025};
  }
`;
const StandardPrimaryLButton = ({id, label, onClick, disabled}) => {
  return (
    <>
      <StyledPrimaryButton id={id} onClick={onClick} disabled={disabled}>{label}</StyledPrimaryButton>
    </>
  );
};

export default StandardPrimaryLButton;