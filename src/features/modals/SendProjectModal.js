import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import CloseIcon from "../../common/icons/CloseIcon";
import SendProjectModalStyled from "./SendProjectModalStyled";
import { Overlay } from "./CreateFolderStyled";
import StyledModal from "../../common/styles/components/modals/CustomModal";
import CustomHeading from "../../common/styles/components/headings/CustomHeading";
import { colors, fontStyles } from "../../common/styles/Theme";
import CustomLabel from "../../common/styles/components/headings/CustomLabel";
import CustomInput from "../../common/styles/components/inputs/CustomInput";
import CloseBlackIcon from "../../common/icons/CloseBlackIcon";
import StandardSecondaryButton from "../../common/styles/components/buttons/standard/StandardSecondaryButton";
import StandardPrimaryButton from "../../common/styles/components/buttons/standard/StandardPrimaryButton";
import StandardSecondarySButton from "../../common/styles/components/buttons/standard/StandardSecondarySButton";
import SendProjectSuccessModal from "./SendProjectSuccessModal";
import {
  useCreateDataMutation,
  useLazyGetAllDataQuery,
} from "../../services/apiConfig";
import { useSelector } from "react-redux";
import styled from "styled-components";

const SendProjectModal = ({
  show,
  close,
  projectId = 1,
  projectName = "HDGGD",
}) => {
  //css variabels
  const [openPopUp, setOpenPopUp] = useState(false);
  //user data from store
  const userID = useSelector((state) => state.userInfo.data?.UserId);

    //functional variabels
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([
    {
      userID: 1,
      firstName: "",
      lastName: "",
      email: "",
    },
  ]);
  const [alredaySentUsers, setAlredaySentUsers] = useState([
    {
      userID: 1,
      firstName: "",
      lastName: "",
      email: "",
    },
  ]);
  const [userEmail, setUserEmail] = useState("");

  //Api variabels
  const [getAllUsers, responseAllUser] = useLazyGetAllDataQuery();
  const [getAlredaySentUsers, responseAlredaySentUser] =
    useLazyGetAllDataQuery();
  const [sendProject, responseSendProject] = useCreateDataMutation();

  //API Calls and response
  useEffect(() => {
    if (userID > 0 && projectId > 0) {
      getAlredaySentUsers(
        `masterdata/api/v1/ProjAlredaySentTo?userID=${userID}&projectID=${projectId}`
      );
      getAllUsers(`masterdata/api/v1/AllUsersForSend?userID=${userID}`);
    }
  }, [projectId]);
  useEffect(() => {
    if (responseAllUser.isSuccess) {
      setAllUsers(responseAllUser.data);
      setSelectedUsers([]);
    }
  }, [responseAllUser]);
  useEffect(() => {
    if (responseAlredaySentUser.isSuccess) {
      setAlredaySentUsers(responseAlredaySentUser.data);
    }
  }, [responseAlredaySentUser]);
  useEffect(() => {
    if (responseSendProject.isSuccess) {
      setOpenPopUp(true);
    }
  }, [responseSendProject]);


//add user to selected list
  const addUser = (option) => {
    if (!selectedUsers.includes(option.userID)) {
      setSelectedUsers([...selectedUsers, option.userID]);
    }
  };

  //remove user from selected list
  const removeUser = (userID) => {
    let newData = selectedUsers.filter((user) => user !== userID);
    setSelectedUsers(newData);
  };

  //send project
  const handelSendProject = () => {
    let data = {
      Method: "masterdata/api/v1/SendProject",
      projectID: projectId,
      sendToID: selectedUsers,
      sendByID: userID,
    };
    setOpenPopUp(true);
    sendProject(data);
  };

  const handleOnClose = () => {
    setOpenPopUp(false);
    close();
  };
  return (
    <>
      <SendProjectModalStyled
        show={show}
        onHide={close}
        centered
        backdrop="static"
      >
        <div className="share-project-header">
          <div className="heading">
            <CustomHeading
              label={`Send Project - ${projectName}`}
              fontWeight={600}
              fontSize={"16px"}
              color={colors.PrimaryDarkAquaMarine}
            />
            <CustomHeading
              label={
                "You may add multiple email IDs at once and send a copy of this project."
              }
              fontSize={"12px"}
              color={colors.blackTransparency045}
            ></CustomHeading>
          </div>
          <div className="close-icon">
            <button onClick={close} className="close_btn_icon">
              <CloseIcon />
            </button>
          </div>
        </div>
        <div className="email-details">
          <CustomLabel label={"Email Address"} />
          <SearchableDropdown
            options={allUsers.filter(
              (user) =>
                !selectedUsers.includes(user.userID) && user.userID !== userID
            )}
            label={"Project previously sent to"}
            id={"custome_Dropdown"}
            selectedVal={userEmail}
            handleChange={(val) => setUserEmail(val)}
            addSelection={addUser}
          />
          {/* <CustomInput type={"email"} placeholder={"Enter email id"} /> */}
          <div className="selected_email_id_wrapper">
            {allUsers
              .filter((user) => selectedUsers.includes(user.userID))
              .map((user, index) => (
                <div className="selected_email_id" key={index}>
                  <div className="first_letter">{user.firstName[0]}</div>
                  <CustomLabel label={user.firstName} />
                  <button
                    className="cross_icon"
                    onClick={() => removeUser(user.userID)}
                  >
                    <CloseBlackIcon />
                  </button>
                </div>
              ))}
          </div>
        </div>
        <div className="previous_project_sent_header">
          <CustomLabel label={"Project previously sent to"} />
        </div>
        <div className="previously_send_details">
          {alredaySentUsers.map((user, index) => (
            <div className="user_details_wrapper" key={index}>
              <div className="previously_sent_user_name">
                <div className="user_first_letter"> {user.firstName[0]} </div>
                <CustomHeading
                  label={user.firstName}
                  fontSize={"16px"}
                  fontFamily={"NotoSansRegular"}
                  fontWeight={"400"}
                  lineHeight={"22px"}
                />
              </div>
              {/* <div className="user_email_block">
                {user.email}
              </div> */}
              <div>
                <StandardSecondarySButton
                  label={"Send Again"}
                  onClick={() => addUser(user)}
                />
              </div>
            </div>
          ))}
        </div>
        <Modal.Footer className="send-project-footer">
          <StandardPrimaryButton
            label={"Send Project"}
            onClick={handelSendProject}
            disabled={selectedUsers.length == 0}
          />
        </Modal.Footer>
      </SendProjectModalStyled>
      <SendProjectSuccessModal
        show={openPopUp}
        projectName={projectName}
        close={handleOnClose}
      />
    </>
  );
};

export default SendProjectModal;

const SearchableDropdown = ({
  options,
  label,
  id,
  selectedVal,
  handleChange,
  addSelection,
}) => {
  //funtional variabels
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [referValue, setReferValue] = useState(0);
  const outsideRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);

  const selectOption = (option) => {
    setQuery(() => "");
    addSelection(option);
    setReferValue(0);
    handleChange("");
    setIsOpen((isOpen) => !isOpen);
  };

  function toggle(e) {
    setIsOpen(e && e.target == inputRef.current);
  }

  const getDisplayValue = () => {
    if (query) return query;
    if (selectedVal) return selectedVal;

    return "";
  };

  const filter = (options) => {
    return options.filter(
      (option) =>
        option?.email?.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };


  useEffect(() => {
    function handleClickOutside(event) {
      if (outsideRef.current && !outsideRef.current.contains(event.target)) {
       
        setQuery("");
        setReferValue(0);
        setIsOpen(false);
      } 
    } // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [outsideRef]);

  useEffect(() => {
    scrollToElement(referValue);
  }, [referValue]);
  const scrollToElement = (referValue) => {
    const listItem = document.querySelector(`#${id}-${referValue}`);
    if (listItem) {
      listItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  const handelOnKeyDown = (e) => {
    switch (e.key) {
      case "Enter":
        if (filter(options).length > 0) {
          // selectOption(filter(options)[0]);
          setQuery(() => "");
          addSelection(filter(options)[referValue]);
          handleChange("");
          setReferValue(0);
          setIsOpen((isOpen) => !isOpen);
        }

        break;
      case "ArrowDown":
        if (filter(options).length >= referValue + 1) {
          // selectOption(filter(options)[0]);
          setReferValue(referValue + 1);
        }

        break;
      case "ArrowUp":
        if (referValue - 1 >= 0) {
          // selectOption(filter(options)[0]);
          setReferValue(referValue - 1);
        }

        break;

      default:
        break;
    }
  };
  return (
    <SearchableDropdownStyled>
      <div className="dropdown" ref={outsideRef}>
        <div className="control">
          <div className="selected-value">
            <input
              ref={inputRef}
              type="text"
              value={getDisplayValue()}
              className="input_bam"
              name="searchTerm"
              autoComplete="off"
              onChange={(e) => {
                setQuery(e.target.value);
                handleChange(null);
                if (!isOpen) {
                  setIsOpen(true);
                }
              }}
              onClick={toggle}
              placeholder="Enter email"
              onKeyDown={handelOnKeyDown}
              // onBlur={handleBlur()}
            />
            {/* {checkInput()} */}
          </div>
        </div>

        <div className={`options ${isOpen ? "open dropDown_select " : ""}`}>
          {filter(options).length !== 0 ? (
            filter(options).map((option, index) => {
              return (
                <div
                  onClick={() => selectOption(option)}
                  className={`option ${index === referValue ? "selected" : ""}`}
                  key={`${id}-${index}`}
                  id={`${id}-${index}`}
                >
                  {option.email}
                </div>
              );
            })
          ) : (
            <div className={"option"}>No user found</div>
          )}
        </div>
      </div>
    </SearchableDropdownStyled>
  );
};

const SearchableDropdownStyled = styled.div`
  .dropDown_select {
    margin-top: 15px;
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    max-height: 110px;
    overflow-x: hidden;
    overflow-y: auto;
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 30px;
      background: -webkit-gradient(
        linear,
        left top,
        left bottom,
        from(#128370),
        to(#007672)
      );
      box-shadow: inset 2px 2px 2px rgba(255, 255, 255, 0.25),
        inset -2px -2px 2px rgba(0, 0, 0, 0.25);
    }
  }

  .dropdown {
    position: relative;
    color: #333;
    cursor: default;
  }

  .dropdown .selected-value input {
    display: flex;
    width: 100%;
    padding: 5px 7px;
    align-items: center;
    height: 32px;
    border-radius: 2px;
    border: 1px solid;
    border-color: #e1e1e1;
    background-color: ${colors.White};
    ${fontStyles.diodrum14};
    color: ${colors.Black};
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
    ::placeholder {
      color: ${colors.Grey96};
    }

    :focus {
      box-shadow: 0px 0px 0px 4px rgba(0, 169, 224, 0.2);
      border-color: #007672;
      outline: none;
    }
  }

  .dropdown .options {
    max-height: 100px;
    width: 100%;
    padding: 5px 12px 2px 12px;
    align-items: center;
    gap: 4px;
    flex: 1 0 0;
    border-radius: 2px;
    border: 1px solid;
    border-color: #e1e1e1;
    background-color: ${colors.White};
    color:  ${colors.Black};
    box-shadow: none;
    font-family: "DiodrumRegular";
    font-weight: 400;
    font-size: 14px;

    display: none;
    margin-top: -1px;
    overflow-y: auto;
    position: absolute;
    top: 100%;
    width: 100%;
    z-index: 1000;
    -webkit-overflow-scrolling: touch;
  }

  .dropdown .options.open {
    display: block;
  }

  .dropdown .option {
    box-sizing: border-box;
    color: rgba(51, 51, 51, 0.8);
    cursor: pointer;
    display: block;
    padding: 8px 10px;
  }

  .dropdown .option.selected,
  .dropdown .option:hover {
    background-color: #f2f9fc;
    color: #333;
  }
`;
