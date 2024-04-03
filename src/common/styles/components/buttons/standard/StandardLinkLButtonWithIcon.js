import React from "react";
import styled from "styled-components";
import { colors, fontStyles } from "../../../Theme";

const StyledLinkButtonWithIcon = styled.button`
  height: 53px;
  display: inline-flex;
  padding: 16px 48px;
  justify-content: center;
  align-items: center;
  ${fontStyles.diodrum14}
  color: ${colors.Black};
  border-radius: 100px;
  border: none;
  background-color: transparent;
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
const StandardLinkLButtonWithIcon = ({id, label, onClick, disabled}) => {
  return (
    <>
      <StyledLinkButtonWithIcon id={id} onClick={onClick} disabled={disabled}>{label}</StyledLinkButtonWithIcon>
    </>
  );
};

export default StandardLinkLButtonWithIcon;