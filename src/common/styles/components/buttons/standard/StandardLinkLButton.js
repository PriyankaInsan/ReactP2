import React from "react";
import styled from "styled-components";
import { colors, fontStyles } from "../../Theme";

const StyledLinkButton = styled.button`
  height: 53px;
  display: inline-flex;
  padding: 16px 48px;
  justify-content: center;
  align-items: center;
  ${fontStyles.diodrum14}
  color: ${colors.SecondaryElfGreen};
  border-radius: 100px;
  border: none;
  background-color: ${colors.White};
  :hover{
    background-color: ${colors.GreyF8};
    border: none;
    color: ${colors.PrimaryDarkAquaMarine};
  }
  :disabled{
    background-color: ${colors.White};
    border:none;
    color: ${colors.blackTransparency025};
  }
`;
const StandardLinkLButton = ({id, label, onClick, disabled}) => {
  return (
    <>
      <StyledLinkButton id={id} onClick={onClick} disabled={disabled}>{label}</StyledLinkButton>
    </>
  );
};

export default StandardLinkLButton;