import React from "react";
import { Button, Col, Modal, ModalBody, Row } from "react-bootstrap";
import ProjectSavePopupStyled from "./ProjectSavePopupStyled";
import WarningIcon from "../../../common/icons/WarningIcon";
import CheckCircleIcon from "../../../common/icons/CheckCircleIcon";
import CustomHeading from "../../../common/styles/components/headings/CustomHeading";
import StandardPrimaryButton from "../../../common/styles/components/buttons/standard/StandardPrimaryButton";
import StyledModal from "../../../common/styles/components/modals/CustomModal";
const ProjectSavePopup = ({ show, close, message }) => {
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
            <CheckCircleIcon />
            </div>
            <div>
              <CustomHeading
                fontFamily="DiodrumSemiBold"
                fontSize="16px"
                fontWeight="600"
                label={message}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <StandardPrimaryButton
            label="Ok"
            className="ok-btn"
            onClick={close}
          />
        </Modal.Footer>
      </StyledModal>
    </>
  );
};

export default ProjectSavePopup;


// import React from "react";
// import ProjectSavePopupStyled from "./ProjectSavePopupStyled";
// import { Button, Col, Row } from "react-bootstrap";
// import { useState } from "react";
// import { useEffect } from "react";
// import WarningIcon from "../../../common/icons/WarningIcon";
// import CloseIcon from "../../../common/icons/CloseIcon";
// import StandardSecondaryButton from "../../../common/styles/components/buttons/standard/StandardSecondaryButton";
// import StandardPrimaryButton from "../../../common/styles/components/buttons/standard/StandardPrimaryButton";

// const ProjectSavePopup = ({ show, close }) => {
//   const [openModal, setOpenModal] = useState(true);

//   const handleClose = () => {
//     setOpenModal(false);
//   };
//   useEffect(() => {
//     console.log("testingsn");
//     if (show === true) {
//       setOpenModal(true);
//       close(false);
//     }
//   }, [openModal]);

//   return (
//     <>
//       <ProjectSavePopupStyled
//         show={show && openModal}
//         onHide={handleClose}
//         keyboard="false"
//         centered
//       >
//         <Row>
//           <Col sm={1}>
//             <WarningIcon />
//           </Col>
//           <Col sm={10} xs={10}>
//             <h6>Project saved successfully!!!!</h6>
//           </Col>
//           <Col sm={12} className="error-msg-btn">
//             <StandardSecondaryButton
//               className=""
//               id=""
//               onClick={handleClose}
//               label="Ok"
//             />
//           </Col>
//         </Row>
//       </ProjectSavePopupStyled>
//     </>
//   );
// };

// export default ProjectSavePopup;
