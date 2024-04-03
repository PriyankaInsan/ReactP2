/* eslint-disable max-len */
import React from "react";
import { Modal } from "react-bootstrap";
import CustomHeading from "../styles/components/headings/CustomHeading";
import StandardPrimaryButton from "../styles/components/buttons/standard/StandardPrimaryButton";
import WarningIcon from "../icons/WarningIcon";
import StyledModal from "../styles/components/modals/CustomModal";
import { colors } from "../styles/Theme";

const LoginError = ({show, close}) => {
  return (
    <>
     <StyledModal
        show={show}
        onHide={close}
        centered
        backdrop="static"
        keyboard={false}
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
                label={"Login Error"}
              />
              <CustomHeading
              fontFamily="NotoSansRegular"
              fontSize="16px"
              fontWeight="400"
              color={colors.Black}
              label="Access to your account data is restricted by policies within the organization. Please contact the administrator for more information." className="delete-warning-des"/>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <StandardPrimaryButton
            label="Contact us"
            className="ok-btn"
            onClick={close}
          />
        </Modal.Footer>
      </StyledModal>
    </>
  );
};

export default LoginError;