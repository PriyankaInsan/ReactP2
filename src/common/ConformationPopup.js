/* eslint-disable max-len */
import React from "react";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import DeleteProjectSuccessfulPopup from "../features/home/DeleteProjectSuccessfulPopup";
import StandardSecondaryButton from "./styles/components/buttons/standard/StandardSecondaryButton";
import StandardPrimaryButton from "./styles/components/buttons/standard/StandardPrimaryButton";
import StyledModal from "./styles/components/modals/CustomModal";
import CustomHeading from "./styles/components/headings/CustomHeading";
import WarningIcon from "./icons/WarningIcon";
import { colors } from "./styles/Theme";
const ConformationPopup = (props) => {
  const [deleteSuccess, setdeleteSuccess] = useState(false);
  const [closeParentModal, setCloseParentModal] = useState(true);
  
  return (
    <>
      <StyledModal
        {...props}
        show={props.show && closeParentModal}
        keyboard="false"
        centered
        backdrop="static"
        isWarningPopUp={true}
        maxWidth="416px"
      >   
        <Modal.Body>
          <div className="warning-pop-up">
            <div>
              <WarningIcon />
            </div>
            <div>
                <CustomHeading
                  fontFamily="DiodrumSemiBold"
                  fontSize="16px"
                  fontWeight="600"
                  color={colors.Black}
                  label={props.lblMessage}/>
              <CustomHeading
              fontFamily="NotoSansRegular"
              fontSize="16px"
              fontWeight="400"
              color={colors.Black}
              // label="Note that you can’t undo this action." className="delete-warning-des"
              />
            </div>
          </div>
          
          
        </Modal.Body>
        <Modal.Footer>
            <StandardSecondaryButton
              className=""
              id="canBtn"
              onClick={()=>props.onHide("Cancel")}
              label="Cancel"
            />
            <StandardPrimaryButton
              label="OK"
              className=""
              onClick={()=>props.onHide("OK")}
            />
            <DeleteProjectSuccessfulPopup
              show={deleteSuccess}
              onHide={() => setShow(false)}
              propvalue={props}
            />
          </Modal.Footer>
      </StyledModal>
    </>
  );
};

export default ConformationPopup;
