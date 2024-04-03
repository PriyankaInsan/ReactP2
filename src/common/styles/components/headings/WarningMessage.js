import React from "react";
import styled from "styled-components";
import { colors, fontStyles } from "../../Theme";
import WarningSmallIcon from "../../../icons/WarningSmallIcon";

const StyledWrapper =styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  height: 15px;
  margin-top: 4px;
`;
const WarningMessageStyled = styled.small`
  display: flex;
  gap: 4px;
  align-items: center;
  color: ${colors.SecondaryYellowishOrange};
  /* margin-top: 4px; */
  margin-bottom: 0;
  ${fontStyles.diodrum10};
`;
const WarningMessage = ({txtMsg}) => {
  return (
    <>
    <StyledWrapper>
      <WarningSmallIcon/><WarningMessageStyled>{txtMsg}</WarningMessageStyled>
    </StyledWrapper>
    
    </>
  );
};

export default WarningMessage;