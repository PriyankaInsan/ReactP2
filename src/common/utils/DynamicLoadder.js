import React from "react";
import Loader from "./Loader";

const DynamicLoadder = (props) => {
  if (props.isLoading) {
    return <Loader />;
  } else {
    return props.children;
  }
};

export default DynamicLoadder;
