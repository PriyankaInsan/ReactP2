import React, { useEffect, useState } from "react";
import Routing from "./Routing";
import Header from "./common/header/Header";
import Footer from "./common/footer/Footer";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const App = () => {
  const feedCheck = useSelector((state) => state.tabData.tab);
  // checking tablet size 
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [showMenuIcon, setShowMenuIcon] = useState(false);
  const handleResize = ()=>{
    setShowSideMenu(window.innerWidth<= 1200); //show side menu for width >=1300
  };
  useEffect(()=>{
    handleResize(); // set initial state based on window size
    window.addEventListener("resize", handleResize);
    return ()=> window.removeEventListener("resize", handleResize);
  },[showSideMenu]);
  const locationCheck = useLocation();
  const exactLocation = locationCheck.pathname;
  console.log("check tab location: " + feedCheck, exactLocation);
  return (
    <>  
      {/* <Header showSideMenu ={showSideMenu} setShowMenuIcon={setShowMenuIcon} setShowSideMenu={setShowSideMenu}/> */}
      <Routing/>
      <Footer locationCheck={exactLocation} tabCheck={feedCheck}/>
    </>
  );
};

export default App;