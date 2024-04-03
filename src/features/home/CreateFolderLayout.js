import React from "react";
import { useState } from "react";
import { Button, InputGroup, Form } from "react-bootstrap";
import CreateFolderStyled from "./CreateFolderStyled";
import { useCreateDataMutation } from "../../services/apiConfig";
import { ToastContainer, toast } from "react-toastify";

export const CreateFolderLayout = () => {
  const [selected, setselected] = useState();
  const [modal, setModel] = useState(true);

  const getValues = (e) => {
    var myvalus = e.target.value;

    setselected(myvalus);
  };

  const [CreatePost, response] = useCreateDataMutation();
  const saveAndSubmit = () => {
    const newData = {
      Method: "Folder",
      userID: 1,
      folderName: selected,
    };

    CreatePost(newData);

    if (response.isSuccess) {
      toast.success("Record Created successfully !", {
        position: toast.POSITION.TOP_CENTER,
        className: "toast-center",
      });
    } else {
      toast.success("Record not Create !", {
        position: toast.POSITION.TOP_CENTER,
        className: "toast-center",
      });
    }

    setModel(!modal);
  };
  const cancelModal = () => {
    setModel(!modal);
  };

  return (
    <>
      {modal && (
        <CreateFolderStyled>
          <div className="d-flex justify-content-between" >
            <h1>Create New Folder</h1>
            <img
              src="./images/Close-icon.svg"
              className="close-icon"
              alt="Close-icon"
              onClick={cancelModal}
            />
          </div>

          <InputGroup size="sm" className="mb-3">
            <h6>Folder Name</h6>
            <Form.Control
              placeholder="Untitled 1"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => getValues(e)}
            />
          </InputGroup>
          <div className="btn-create-folder text-right">
            <Button
              variant="light"
              type="submit"
              id="cancelBtn"
              onClick={cancelModal}
            >
              Cancel
            </Button>
            <Button
              variant="light"
              type="submit"
              id="submitBtn"
              onClick={saveAndSubmit}
            >
              Create Folder
            </Button>
          </div>
        </CreateFolderStyled>
      )}
    </>
  );
};
