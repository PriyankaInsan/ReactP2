/* eslint-disable max-len */
import React from "react";
import styled from "styled-components";
import { colors, fontStyles } from "../../../Theme";

const StyledSecondaryButton = styled.button`
  height: 32px;
  display: inline-flex;
  padding: 10px 24px 7.5px 24px;
  justify-content: center;
  align-items: center;
  ${fontStyles.diodrum14};
  color: ${colors.Black};
  border-radius: 25px;
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
const StandardSecondaryButton = ({id, label, onClick, disabled, closed, className, type}) => {
  return (
    <>
      <StyledSecondaryButton className={className} type={type} id={id} onClick={onClick} disabled={disabled} closed={closed}>{label}</StyledSecondaryButton>
    </>
  );
};

export default StandardSecondaryButton;