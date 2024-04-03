import React from "react";
import styled from "styled-components";
import { colors, fontStyles } from "../../Theme";

const StyledPrimaryButton = styled.button`
  height: 24px;
  display: inline-flex;
  padding:5px 10px;
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
const StandardPrimarySButton = ({id, label, onClick, disabled}) => {
  return (
    <>
      <StyledPrimaryButton id={id} onClick={onClick} disabled={disabled}>{label}</StyledPrimaryButton>
    </>
  );
};

export default StandardPrimarySButton;