/* eslint-disable max-len */
import React, { useEffect, useRef, useState } from "react";
import QuickNavStyled from "./QuickNavStyled";
import CreateProjectRightArrowIcon from "../../../common/icons/CreateProjectRightArrowIcon";
import QuickNavLeftArrowIcon from "../../../common/icons/QuickNavLeftArrowIcon";
import QuickNavRightArrowIcon from "../../../common/icons/QuickNavRightArrowIcon";
import NavigationIcon from "../../../common/icons/NavigationIcon";
import { Button } from "react-bootstrap";
import PlusIcon from "../../../common/icons/PlusIcon";
import NavigationIconHovered from "../../../common/icons/NavigationIconHovered";
import PlusIconHovered from "../../../common/icons/PlusIconHovered";
const QuickNav = () => {
  const [expanded, setExpanded] = useState(false);
  const[isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = ()=> {
    setIsHovered(true);
  };
  const handleMouseLeave = ()=> {
    setIsHovered(false);
  };

  const menuRef = useRef(null);
  useEffect(()=>{
    const handleOutsideClick = (e) => {
      if(menuRef.current && !menuRef.current.contains(e.target))
      {
        setExpanded(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  const toggleMenu = () => {
    setExpanded(!expanded);
  };
  return (
    <>
      <QuickNavStyled sm={1}>
        <div ref={menuRef} className={`quick-nav-menu ${expanded?"expanded" : ""}`}>
          <div className="quick-button">
            <div className="arrow-icon">
              <span >{expanded? <QuickNavLeftArrowIcon/> : <QuickNavRightArrowIcon/>} </span>
            </div>
            <button onClick={toggleMenu} className="menu-toggle"> Quick Nav</button>
          </div>
          <ul className="menu-items">
            <div className="wrapper">
              <h4>Wave-IXD-7/19/22022</h4> 
              <Button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {isHovered? <PlusIconHovered/>:<PlusIcon/>}
              </Button>
            </div>
            <li>
              <span>-  Case 01</span>
              <Button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {isHovered? <NavigationIconHovered/>:<NavigationIcon/>}
              </Button>
            </li>
            <li>
              <span>-  Case 01</span>
              <Button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {isHovered? <NavigationIconHovered/>:<NavigationIcon/>}
              </Button>
            </li>
            <li>
              <span>-  Case 01</span>
              <Button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {isHovered? <NavigationIconHovered/>:<NavigationIcon/>}
              </Button>
            </li>
          </ul>
        </div>
      </QuickNavStyled>
    </>
  );
};

export default QuickNav;

