import React from "react";
import ExploreStyled from "./ExploreStyled";
import  { useState } from "react";
import CloseIcon from "../../common/icons/CloseIcon";
import { useEffect } from "react";


export const Explore =({show, open}) => {
  const [isOpen, setIsOpen] = useState(true);
  
  const onClose = () => {
    setIsOpen(false);
  };
  useEffect(()=>{
    if(open===true){
      setIsOpen(true);
      show(false);
    }
  },[isOpen]);
  return (
    <>
      <ExploreStyled show={isOpen && open} onHide={onClose}>
        <div className="d-flex justify-content-between">
          <h1>Explore</h1>
          <div onClick={onclose}><CloseIcon/></div>
        </div>  
        <div>
          <h3>Working together for a clean‑water future</h3>
          <p>We offer a broad portfolio of globally recognized, industry-leading solutions to help you produce, purify, and extract some of the world’s most commercially important products.</p>
               
        </div>
      </ExploreStyled>
    </>
  );
};
