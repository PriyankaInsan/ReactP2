import React from "react";
import CloseIconWhite from "../../common/icons/CloseIconWhite";

const Dismiss = ({onClose}) => {
  return (
    <div>
      <a href={"#"} className='text-right' onClick={onClose}>
        Dismiss<CloseIconWhite/> 
      </a>
    </div>
  );
};

export default Dismiss;