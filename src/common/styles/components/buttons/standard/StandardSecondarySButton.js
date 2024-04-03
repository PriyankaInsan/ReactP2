import React from "react";
import styled from "styled-components";
import { colors, fontStyles } from "../../../Theme";
import "../../../diodrumFont.css";

const StyledSecondaryButton = styled.button`
  /* height: 24px; */
  display: inline-flex;
  padding: 0.4rem 1.2rem 0.3rem 1.2rem;
  justify-content: center;
  align-items: center;
  font-size:.7rem;
  font-family: "DiodrumRegular", sans-serif;
  font-weight: 400;
  font-style: normal;
  line-height: .7rem;
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
  /* @media (min-width:1500px) and (max-width:1799px) {
    padding: 8px 15px;
  }
  @media (min-width:1800px) {
    padding: 10px 24px;
  } */
  
`;
const StandardSecondarySButton = ({id, label, onClick, disabled}) => {
  return (
    <>
      <StyledSecondaryButton id={id} onClick={onClick} disabled={disabled}>{label}</StyledSecondaryButton>
    </>
  );
};

export default StandardSecondarySButton;