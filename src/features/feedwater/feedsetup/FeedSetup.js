import React, {useState, useEffect} from "react";
import ChargeBalanceAdjustment from "./ChargeBalanceAdjustment";
import StreamDefinition from "./StreamDefinition";
import FormEntry from "./FormEntry";
import Footer from "../../../common/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { setScrollDirection } from "../activitymonitor/activityMonitorSlice";

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";
      console.log("sdhhjd",lastScrollY,scrollY);
      // if (direction !== scrollDirection && (scrollY - lastScrollY > 0 || scrollY - lastScrollY < 0)) {
        setScrollDirection(scrollY);
      // }
      // lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // clean up
    };
  }, [scrollDirection]);

  return scrollDirection;
}
const FeedSetup = () => {
  const dispatch = useDispatch();
  const scrollDirection = useScrollDirection();
  localStorage.setItem("set scroll", scrollDirection);
  useEffect(()=>{
    dispatch(setScrollDirection(scrollDirection));
  }, [scrollDirection]);

  const currentWidth = window.innerWidth;
  console.log("check feed setup current width", currentWidth);
  return (
    <>
      <div style={{minHeight:"100vh"}}>
        <ChargeBalanceAdjustment/>
        <StreamDefinition scrollDirection={scrollDirection}/>
        <FormEntry/>
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default FeedSetup;