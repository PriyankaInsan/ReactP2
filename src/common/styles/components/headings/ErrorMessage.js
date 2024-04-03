import React from "react";
import styled from "styled-components";
import { colors, fontStyles } from "../../Theme";
import ErrorSmallIcon from "../../../icons/ErrorSmallIcon";
import { WarningOutlined } from "@ant-design/icons";

const StyledWrapper =styled.div`
  display:flex;
  gap: 5px;
  align-items: center;
  height: 15px;
  margin-top: 4px;
  .anticon-warning{
    font-size: 13px;
    color: ${colors.DupontBrandRed};
  }
`;

const ErrorMessageStyled = styled.label`
  height: 15px;
  display: flex;
  gap: 4px;
  align-items: center;
  color: ${colors.DupontBrandRed};
  margin-bottom: 0;
  ${fontStyles.diodrum10};
  padding-top:2px;
`;
const ErrorMessage = ({texMsg,className,style, errorIcon}) => {
  return (
    <>
      <StyledWrapper style={style}>
      <WarningOutlined/>
      <ErrorMessageStyled className={className}>
      {texMsg}
      </ErrorMessageStyled>
      </StyledWrapper>
    </>
  );
};

export default ErrorMessage;