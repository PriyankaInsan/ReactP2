import React from "react";
import CreatedProjectSuccessStyled from "./CreatedProjectSuccessStyled";
import { Button, Col, Modal, Row } from "react-bootstrap";
import CheckCircleIcon from "../../../common/icons/CheckCircleIcon";
import CloseIcon from "../../../common/icons/CloseIcon";
import { useState } from "react";
import { useEffect } from "react";
import StyledModal from "../../../common/styles/components/modals/CustomModal";
import CustomHeading from "../../../common/styles/components/headings/CustomHeading";
import { colors } from "../../../common/styles/Theme";

const DefaultValueSaved = ({show, close, parentModal}) => {
  // const[openModal, setOpenModal] =useState(true);

  const handleClose = ()=>{
    // setOpenModal(false);
    close(false);
  };

  useEffect(()=>{
    // if(show===true){
    //   setOpenModal(true);
    //   close(false);
    // }

    if(show){
      const timer = setTimeout(()=>{
        handleClose();
      },3000);

      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <>
      <StyledModal show={show} onHide={handleClose} centered isSuccessPopUp={true} maxWidth="416px">
        <Modal.Body>
          <div className="success-pop-up">
            <div>
              <CheckCircleIcon/>
            </div>
            <div>
            <CustomHeading
                fontFamily="DiodrumSemiBold"
                fontSize="16px"
                fontWeight="600"
                color={colors.Black}
                label="Default values updated successfully!"
              />
            </div>
          </div>
        </Modal.Body>
      </StyledModal>
    </>
  );
};

export default DefaultValueSaved;