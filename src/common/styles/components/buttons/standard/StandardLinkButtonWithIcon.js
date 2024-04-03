import React, { useState } from "react";
import styled from "styled-components";
import { colors, fontStyles } from "../../../Theme";

import ArrowRightBlackIcon from "../../../../icons/ArrowRightBlackIcon";
import PlusIcon from "../../../../icons/PlusIcon";
import PlusIconHovered from "../../../../icons/PlusIconHovered";
import PlusIconGray from "../../../../icons/PlusIconGray";


const StyledLinkButtonWithIcon = styled.button`
  height: 32px;
  display: inline-flex;
  padding: ${(props)=>props.padding ||"10px 24px"};
  justify-content: center;
  align-items: center;
  ${fontStyles.diodrum14}
  color: ${colors.Black};
  border-radius: 25px;
  border: none;
  background-color: transparent;
  gap: 5px;
  /* svg{
      margin-left: 4px;
      path, line{
        fill: ${(props)=>props.disabled?colors.blackTransparency045:colors.Black};
        stroke:${(props)=>props.disabled?colors.blackTransparency045:colors.Black};
      }
  } */
  :hover{
    background-color: transparent;
    border: none;
    color: ${colors.SecondaryElfGreen};
    /* svg{
      path, line{
        fill: ${colors.PrimaryDarkAquaMarine};
        stroke:${(props)=>props.disabled?colors.blackTransparency045:colors.PrimaryDarkAquaMarine};
      }
    } */
  }
  :disabled{
    background-color: transparent;
    border:none;
    color: ${colors.blackTransparency025};
  }
`;
const StandardLinkButtonWithIcon = ({id, label, onClick, disabled, icon, padding, plusIcon}) => {
  const [changeIcon, setChangeIcon] = useState(false);
  return (
    <>
      <StyledLinkButtonWithIcon id={id} onClick={onClick} disabled={disabled} padding={padding}
      onMouseEnter={()=>setChangeIcon(true)} onMouseLeave={()=>setChangeIcon(false)}>
      {label}{plusIcon?(<PlusIcon changeIcon={changeIcon} disabled={disabled}/>):(<ArrowRightBlackIcon changeIcon={changeIcon} disabled={disabled}/>)}
      </StyledLinkButtonWithIcon>
    </>
  );
};

export default StandardLinkButtonWithIcon;