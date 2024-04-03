import React from "react";
import styled from "styled-components";
import { colors, fontStyles } from "../../../Theme";

const StyledPrimaryButton = styled.button`
  height: 32px;
  display: inline-flex;
  padding: 10px 24px 7.5px 24px;
  justify-content: center;
  align-items: center;
  ${fontStyles.diodrum14}
  color: ${colors.White};
  border-radius: 25px;
  border: 1px solid ${colors.PrimaryDarkAquaMarine};
  background-color: ${colors.PrimaryDarkAquaMarine};
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
const StandardPrimaryButton = ({id, label, onClick, disabled, type, className}) => {
  return (
    <>
      <StyledPrimaryButton className={className} id={id} type={type} onClick={onClick} disabled={disabled}>{label}</StyledPrimaryButton>
    </>
  );
};

export default StandardPrimaryButton;