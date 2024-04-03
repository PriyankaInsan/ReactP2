import React from "react";
import styled from "styled-components";
import { fontStyles } from "../../Theme";
const StyledWrapper = styled.div`
  display:flex;
  margin-top: 4px;
`;

const StyledRefText = styled.small`
      ${fontStyles.diodrum10}
      line-height: 15px;
      color: rgb(150, 150, 150);
      display: inherit;
      
`;
const InputReferenceText = ({refText, className}) => {
  return (
    <>
      <StyledWrapper>
        <StyledRefText className={className}>{refText}</StyledRefText>
      </StyledWrapper>
    </>
  );
};

export default InputReferenceText;