import React from "react";
import styled from "styled-components";
import { colors, fontStyles } from "../../../Theme";

const StyledLinkButtonWithIcon = styled.button`
  height: 24px;
  display: inline-flex;
  padding: 7px 10px;
  justify-content: center;
  gap: 5px;
  align-items: center;
  ${fontStyles.diodrum14}
  color: ${colors.Black};
  border-radius: 25px;
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
const StandardLinkSButtonWithIcon = ({id, label, onClick, disabled, icon}) => {
  return (
    <>
      <StyledLinkButtonWithIcon id={id} onClick={onClick} disabled={disabled}>{label}{icon}</StyledLinkButtonWithIcon>
    </>
  );
};

export default StandardLinkSButtonWithIcon;