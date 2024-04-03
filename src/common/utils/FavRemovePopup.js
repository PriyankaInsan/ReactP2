import React from "react";
import { Button, Col, Modal, ModalBody, Row } from "react-bootstrap";
import CustomHeading from "../styles/components/headings/CustomHeading";
import CheckCircleIcon from "../icons/CheckCircleIcon";
import StyledModal from "../styles/components/modals/CustomModal";
import { colors } from "../styles/Theme";
import WarningIcon from "../icons/WarningIcon";
import ErrorSmallIcon from "../icons/ErrorSmallIcon";
import { useEffect } from "react";
const FavRemovePopup = ({ operator, close }) => {
  const getType = (type) => {
    switch (type) {
      case "error":
        return <ErrorSmallIcon />;
      case "success":
        return <CheckCircleIcon />;
      case "warning":
        return <WarningIcon />;
      default:
        break;
    }
  };
  const handleClose = ()=>{
    close(false);
  };
  useEffect(()=>{
    if(operator){
      const timer = setTimeout(()=>{
        handleClose();
      },3000);

      return () => clearTimeout(timer);
    }
  }, [operator]);

  return (
    <>
      <StyledModal
        show={operator.show}
        onHide={close}
        centered
        isSuccessPopUp={true}
        maxWidth="416px"
      >
        <Modal.Body>
          <div className="success-pop-up">
            <div>
              <div>{getType(operator.type)}</div>
            </div>
            <div>
              <CustomHeading
                fontFamily="DiodrumSemiBold"
                fontSize="16px"
                fontWeight="600"
                color={colors.Black}
                label={operator.message}
              />
               <CustomHeading
                fontFamily="NotoSansRegular"
                fontSize="16px"
                fontWeight="400"
                color={colors.Black}
                label={operator.subtext}
              />
            </div>
                
          </div>
        </Modal.Body>
      </StyledModal>
    </>
  );
};

export default FavRemovePopup;
