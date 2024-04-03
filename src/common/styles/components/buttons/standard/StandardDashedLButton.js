import React from "react";
import styled from "styled-components";
import { colors, fontStyles } from "../../Theme";

const StyledDashedButton = styled.button`
  height: 53px;
  display: inline-flex;
  padding: 16px 48px;
  justify-content: center;
  align-items: center;
  ${fontStyles.diodrum14}
  color: ${colors.Black};
  border-radius: 100px;
  border: 1px dashed ${colors.Black};
  background-color: ${colors.White};
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.02);
  :hover{
    background-color: ${colors.White};
    border: 1px dashed ${colors.SecondaryElfGreen};
    color: ${colors.SecondaryElfGreen};
  }
  :disabled{
    background-color: ${colors.GreyF5};
    border: 1px dashed ${colors.GreyD9};
    color: ${colors.blackTransparency025};
  }
`;
const StandardDashedLButton = ({id, label, onClick, disabled}) => {
  return (
    <>
      <StyledDashedButton id={id} onClick={onClick} disabled={disabled}>{label}</StyledDashedButton>
    </>
  );
};

export default StandardDashedLButton;