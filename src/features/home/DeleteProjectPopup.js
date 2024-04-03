/* eslint-disable max-len */
import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import CreatedProjectSuccessStyled from "../modals/CreatedProjectSuccessStyled";
import WarningIcon from "../../common/icons/WarningIcon";
import CloseIcon from "../../common/icons/CloseIcon";
import {
  useDeleteDataMutation,
  useUpdateDataMutation,
} from "../../services/apiConfig";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  btnlist,
  updateLoader,
  Tempbtnlist,
  deleteData,
} from "./CardListSlice";
import DeleteProjectSuccessfulPopup from "./DeleteProjectSuccessfulPopup";
import StandardSecondaryButton from "../../common/styles/components/buttons/standard/StandardSecondaryButton";
import StandardPrimaryButton from "../../common/styles/components/buttons/standard/StandardPrimaryButton";
import CustomHeading from "../../common/styles/components/headings/CustomHeading";
import { colors } from "../../common/styles/Theme";
import StyledModal from "../../common/styles/components/modals/CustomModal";
const DeleteProjectPopup = (props) => {
  const dispatch = useDispatch();
  const [deletePost, response] = useDeleteDataMutation();
  const [RestorPost, response1] = useUpdateDataMutation();
  const StoreData = useSelector((state) => state.cardlist.data);
  // const [show, setShow] = useState(true);
  const [deleteSuccess, setdeleteSuccess] = useState(false);
  const [closeParentModal, setCloseParentModal] = useState(true);
  const [openModal, setOpenModal] = useState(true);
  useEffect(() => {
    if (props.show === true) {
      setOpenModal(true);
      close(false);
    }
  }, [openModal]);


  const DeleteRecord = (id, methodName, IsDeleted) => {
    dispatch(updateLoader(false));
    const data = methodName;
    if (IsDeleted === "I") {
      // RestorPost(data)
      //   .then((response) => {
      //     dispatch(btnlist(newData));
      //   })
      //   .catch((error) => {
      //     console.log("Error deleting data: ", error);
      //   });
    }
   else if (IsDeleted === "R") {
    const newData = StoreData.filter((item) => item.projectID !== id);
      RestorPost(data)
        .then((response) => {
          dispatch(btnlist(newData));
        })
        .catch((error) => {
          console.log("Error deleting data: ", error);
        });
    } else {
      const newData = StoreData.filter((item) => item.projectID !== id);
      deletePost(data)
        .then((response1) => {
          dispatch(btnlist(newData));
        })
        .catch((error) => {
          console.log("Error deleting data: ", error);
        });
    }
    setdeleteSuccess(true);
    props.close(false);
    // setTimeout(() => {
    //   window.location.reload();
    // }, 3000);
  };
  return (
    <>
      <StyledModal
         show={props.show && openModal}
         onHide={()=>close(false)}
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
              label="Note that you can’t undo this action." className="delete-warning-des"/>
            </div>
          </div>
          
          
        </Modal.Body>
        <Modal.Footer>
            <StandardSecondaryButton
              className=""
              id="canBtn"
              onClick={()=>props.close(false)}
              label="Cancel"
            />
            <StandardPrimaryButton
              label="OK"
              className=""
              onClick={() =>
                DeleteRecord(props.id, props.methodName, props.IsDeleted)
              }
            />
            <DeleteProjectSuccessfulPopup
              show={deleteSuccess}
              close ={()=>setdeleteSuccess(false)}
              childParentModal={()=>close(false)}
            
            />
          </Modal.Footer>
      </StyledModal>
    </>
  );
};

export default DeleteProjectPopup;
