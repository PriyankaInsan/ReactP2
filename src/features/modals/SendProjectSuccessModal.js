import React from "react";
import { Modal } from "react-bootstrap";
import StyledModal from "../../common/styles/components/modals/CustomModal";
import { colors } from "../../common/styles/Theme";
import CustomHeading from "../../common/styles/components/headings/CustomHeading";
import CheckCircleIcon from "../../common/icons/CheckCircleIcon";
const SendProjectSuccessModal = ({ show, close, projectName }) => {
  return (
    <>
      <StyledModal
        show={show}
        onHide={close}
        centered
        isSuccessPopUp={true}
        maxWidth="416px"
      >
        <Modal.Body>
          <div className="success-pop-up">
            <div>
              <div>
                <CheckCircleIcon />{" "}
              </div>
            </div>
            <div>
              <CustomHeading
                fontFamily="DiodrumSemiBold"
                fontSize="16px"
                fontWeight="600"
                color={colors.Black}
                label={"Copy of Project has been sent successfully!"}
              />
              <CustomHeading
                fontFamily="NotoSansRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.Black}
                label={`${
                  projectName.length > 30
                    ? projectName.slice(0, 30)
                    : projectName
                } has been successfully sent`}
              />
            </div>
          </div>
        </Modal.Body>
      </StyledModal>
    </>
  );
};

export default SendProjectSuccessModal;
