/* eslint-disable max-len */
import React, { useEffect, useState } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import CloseIcon from "../../../common/icons/CloseIcon";
import ManageCaseStyled, { WarningMessageStyled } from "./ManageCaseStyled";
import styled from "styled-components";
import DeleteCaseIcon from "../../../common/icons/DeleteCaseIcon";
import DragButtonIcon from "../../../common/icons/DragButtonIcon";
import WarningIcon from "../../../common/icons/WarningIcon";
import EditSavedMessage from "./EditSavedMessage";
import CustomHeading from "../../../common/styles/components/headings/CustomHeading";
import { useDispatch, useSelector } from "react-redux";
import {
  useLazyGetAllDataQuery,
  useUpdateDataMutation,
} from "../../../services/apiConfig";
import {
  updateCaseConfig,
  updateCaseName,
} from "../../../common/ProjectInfoSlice";
import { colors } from "../../../common/styles/Theme";
import InputWithIcon from "../../../common/styles/components/inputs/InputWithIcon";
import CustomTextArea from "../../../common/styles/components/inputs/CustomTextArea";
import StandardDashedButton from "../../../common/styles/components/buttons/standard/StandardDashedButton";
import StandardPrimaryButton from "../../../common/styles/components/buttons/standard/StandardPrimaryButton";
import CloseCircleGreenIcon from "../../../common/icons/CloseCircleGreenIcon";
import { MyError } from "../../../common/utils/ErrorCreator";
import CloseIconBlack from "../../../common/icons/CloseBlackIcon";
import StandardSecondaryButton from "../../../common/styles/components/buttons/standard/StandardSecondaryButton";
import CustomeMessagePopup from "../../../common/utils/CustomeMessagePopup";
import ErrorMessage from "../../../common/styles/components/headings/ErrorMessage";
import { useLocation, useNavigate } from "react-router-dom";
const ManageCase = ({ show, close }) => {
  const [openWarningMessage, setOpenWarningMessage] = useState(false);
  const [editSaved, setEditSaved] = useState(false);
  const [openModal, setOpenModal] = useState(true);
  const [showNewAdd, setShowNewAdd] = useState(false);
  const [isFocused, setIsFocused] = useState(null);
  const [caseList, setCaseList] = useState([]);
  const ProjectInfoStore = useSelector((state) => state.projectInfo.data);
  const UserInfoStore = useSelector((state) => state.userInfo.data);
  const caseFlag = useSelector((state) => state.IXStore?.caseFlag);
  const userID = UserInfoStore ? UserInfoStore.UserId : 1;
  const dispatch = useDispatch();
  const [getData, response] = useLazyGetAllDataQuery();
  const [isAdding, setIsAdding] = useState(false);
  const [popupOperator, setPopupOperator] = useState({
    type: "",
    message: "",
    show: false,
  });
  const location = useLocation();
  const [disabeldSave, setDisabeldSave] = useState(false);
  const [sameNameError, setSameNameError] = useState(false);
  const [nulValueError, setNulValueError] = useState(false);
  const [updateCase, setUpdateCase] = useState(false);
  const [newCase, setNewCase] = useState({
    caseID: 0,
    caseName: "",
    displayOrder: 1,
    isDeletedCase: false,
    caseNote: "",
  });
  const [updateData, responseUpdate] = useUpdateDataMutation();
  // const projectID = 1;
  const [selectedCase, setSelectedCase] = useState({
    caseID: 0,
    caseName: "",
    displayOrder: 1,
    isDeletedCase: false,
    caseNote: "",
    index: 0,
  });
  const navigate = useNavigate();
  const handleCloseSave = () => {
    setEditSaved(false);
    
    const obj = { ...ProjectInfoStore };

    navigate("/FeedWaterHome", {
      state: {
        title: location.state.title,
        projectID: obj.projectID,
        technologyName: obj.technologyName,
        caseID: caseList.find((item)=>item.displayOrder==1)?.caseID,
      },
    });
  };
  let term = 0;
  const handleClose = () => {
    setNewCase({
      caseID: 0,
      caseName: "",
      displayOrder: 0,
      isDeletedCase: false,
      caseNote: "",
    });
    setIsAdding(false);
    setOpenModal(false);
  };
  useEffect(() => {
    if (show === true) {
      setOpenModal(true);
      close(false);
    }
  }, [openModal]);

  useEffect(() => {
    if (show == true) {
      getData(
        `masterdata/api/v1/CaseType?projectID=${ProjectInfoStore.projectID}`
      );
    }
  }, [show]);

  useEffect(() => {
    if (response.isFetching) {
      console.log("Manege case is in Loading");
    } else if (response.isLoading) {
      console.log("Manege case is in Loading");
    } else if (response.isSuccess) {
      console.log("response.data", response.data);
      let reorderData = JSON.parse(JSON.stringify(response.data));
      // let reorderData=[];
      // if(caseFlag===true){
      //   let lastRecord=response.data[response.data.length-1];
      //   reorderData.push({...lastRecord,displayOrder:1});
      //   response.data.map((item, index) => {
      //     reorderData.push({ ...item, displayOrder: index + 2 });
      //   });
      //   reorderData.pop();
      // }else{
      // reorderData = JSON.parse(JSON.stringify(response.data));
      // }
      setCaseList(reorderData.sort((a, b) => a.displayOrder - b.displayOrder));
      dispatch(
        updateCaseName(reorderData.find((a) => a.displayOrder == 1).caseName)
      );
      dispatch(
        updateCaseConfig(
          reorderData.sort((a, b) => a.displayOrder - b.displayOrder)
        )
      );
    }

    if (response.isError) {
      throw new MyError(
        "CaseType Api Error",
        response.error.status,
        "ApiError"
      );
    }
  }, [response]);

  const handleClosWarningMessage = () => {
    setOpenWarningMessage(false);
  };
  const handleOpenWarningMessage = (index) => {
    console.log("open warning", caseList, index, selectedCase);
    if (caseList.length > 1) {
      setSelectedCase({ ...caseList[index], index: index });
      setOpenWarningMessage(true);
    }
  };

  useEffect(() => {
    console.log("dnd", responseUpdate);
    if (responseUpdate.isSuccess) {
      setEditSaved(true);
      setDisabeldSave(false);
    }
    if (responseUpdate.isError) {
      setDisabeldSave(false);
    }
  }, [responseUpdate]);

  const handleCLoseOperator = () => {
    setPopupOperator({
      show: false,
      message: "",
      type: "",
    });
  };
  const handleChangeList = (e, index) => {
    const { value, name } = e.target;
    let newData = JSON.parse(JSON.stringify(caseList));
    newData[index][name] = value;
    console.log(newData);
    setCaseList(newData);
  };
  const handleFocus = (id) => {
    setIsFocused(id);
  };
  const handleBlur = () => {
    setIsFocused(null);
  };
  //----------------

  const addNewCase = () => {
    let len = caseList.filter((item) => !item.isDeletedCase).length;

    let hasError = caseList.find((item) => item.caseName == `Case ${len + 1}`);
    setCaseList([
      ...caseList,
      {
        projectID: ProjectInfoStore.projectID,
        caseID: 0,
        caseName: `Case ${len + 1}`,
        displayOrder: len + 1,
        isDeletedCase: false,
        error: hasError ? true : false,
        caseNote: "",
      },
    ]);
    if (hasError || disabeldSave) {
      setUpdateCase(!updateCase);
    }

    setDisabeldSave(hasError || disabeldSave);
  };

  const handleChangeCaseName = (e) => {
    const { name, value, id } = e.target;

    console.log("meraError", name, value, id);
    const testReg = /[!@#$%^&*(),.?":{}|<>[\]\-+_=]/;
    if (!testReg.test(value)) {
      setCaseList((prev) =>
        prev.map((item, index) => {
          if (index == id) {
            return { ...item, caseName: value };
          } else {
            return { ...item };
          }
        })
      );
      setUpdateCase(!updateCase);
    }
  };

  useEffect(() => {
    console.log("checkCase()", checkCase());
    setDisabeldSave(checkCase());
  }, [updateCase]);

  const checkCase = () => {
    let hasError = false;
    let counter = 0;
    let newData = caseList.map((item) => {
      let caseNameHave = caseList.filter((term) => {
        if (term.isDeletedCase) {
          return false;
        } else {
          return (
            term.caseName.trim().toLowerCase().replace(/\s/g, "") ==
            item.caseName.trim().toLowerCase().replace(/\s/g, "")
          );
        }
      }).length;
      console.log("gsjjhshj", item.caseName, "|", caseNameHave);
      if (caseNameHave > 1) {
        hasError = true;
        counter += 1;
        return {
          ...item,
          sameNameError: true,
          notFill: false,
          displayOrder: counter,
        };
      } else {
        if (item.isDeletedCase) {
          return {
            ...item,
            sameNameError: false,
            notFill: false,
            displayOrder: 1,
          };
        } else {
          if (item.caseName.trim().toLowerCase().replace(/\s/g, "") == "") {
            hasError = true;
            counter += 1;
            return {
              ...item,
              sameNameError: false,
              notFill: true,
              displayOrder: counter,
            };
          } else {
            counter += 1;
            return {
              ...item,
              sameNameError: false,
              notFill: false,
              displayOrder: counter,
            };
          }
        }
      }
    });
    setCaseList(newData);
    return hasError;
  };

  const saveCases = () => {
    let hasError = checkCase();
    // caseList.filter((item) => {
    //   if (!item.isDeletedCase) {
    //     return item.error || !item.caseName;
    //   } else {
    //     return false;
    //   }
    // }).length > 0;
    console.log("dnd", hasError);
    if (!hasError) {
      let counter = 0;
      setDisabeldSave(true);
      updateData({
        Method: "masterdata/api/v1/CaseType",
        userID: userID,
        projectID: ProjectInfoStore.projectID,
        responseCases: [
          ...caseList.map((item) => {
            return {
              caseID: item.caseID,
              projectID: item.projectID,
              caseName: item.caseName,
              caseNote: item.caseNote,
              displayOrder: item.displayOrder,
              isDeletedCase: item.isDeletedCase,
            };
          }),
        ],
      });
      dispatch(updateCaseName(caseList[0].caseName));
      dispatch(updateCaseConfig(caseList));
    } else {
      setDisabeldSave(true);
    }
  };

  const deleteCase = () => {
    let canBeDelete = caseList.filter((item) => !item.isDeletedCase).length > 1;
    console.log("meraError", canBeDelete, selectedCase);
    if (canBeDelete) {
      let count = 0;
      setCaseList((prev) =>
        prev.map((item, index) => {
          if (index == selectedCase.index) {
            return {
              ...item,
              caseName: "",
              isDeletedCase: true,
              error: false,
              displayOrder: 1,
            };
          } else if (!item.isDeletedCase) {
            count += 1;
            return { ...item, displayOrder: count };
          } else {
            return item;
          }
        })
      );
      // reorderList();
      setOpenWarningMessage(false);
      setUpdateCase(!updateCase);
    } else {
      setOpenWarningMessage(false);
    }
  };

  const handleDragStart = (e, rowIndex) => {
    e.dataTransfer.setData("DraggedData", rowIndex);
    console.log("dragStart", rowIndex);
  };

  const handleDropOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    console.log("dragDrop", index);
    const rowIndex = e.dataTransfer.getData("DraggedData");

    let temp = JSON.parse(JSON.stringify(caseList));
    let excludeCase = temp.splice(rowIndex, 1);
    console.log(temp, excludeCase);
    setCaseList([
      ...temp.slice(0, index),
      ...excludeCase,
      ...temp.slice(index),
    ]);
    setUpdateCase(!updateCase);
  };

  return (
    <>
      <ManageCaseStyled
        size="lg"
        centered
        show={show && openModal}
        onHide={handleClose}
        dialogClassName="primary-modal"
        backdropClassName="dark-backdrop"
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <CustomeMessagePopup
          operator={popupOperator}
          close={handleCLoseOperator}
        />
        <Modal.Header>
          <div className="header-create-project">
            <div className="heading">
              <CustomHeading
                label="Case Management"
                fontFamily="DiodrumSemiBold"
                fontSize="16px"
                fontWeight="600"
                color={colors.PrimaryDarkAquaMarine}
              />
              <CustomHeading
                className="manage-case-sub-heading"
                label="You can add, edit, delete and reorder Cases here based on your
                preference. To reorder move the rows up and down from the
                right handles."
                fontFamily="DiodrumRegular"
                fontSize="12px"
                fontWeight="400"
                color={colors.blackTransparency045}
              />
            </div>
            <div className="close-icon">
              <Button id="btnClose" onClick={handleClose}>
                <CloseIcon />
              </Button>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="case-container g-0">
            <div className="case-title-column">
              <div className="case-no title">
                <CustomHeading
                  label="Case No."
                  color={colors.Black}
                  fontFamily="NotoSansSemiBold"
                  fontSize="14px"
                  fontWeight="700"
                />
              </div>
              <div className="case-name title">
                <CustomHeading
                  label="Case Name"
                  color={colors.Black}
                  fontFamily="NotoSansSemiBold"
                  fontSize="14px"
                  fontWeight="700"
                />
              </div>
              <div className="case-notes title">
                <CustomHeading
                  label="Case Notes"
                  color={colors.Black}
                  fontFamily="NotoSansSemiBold"
                  fontSize="14px"
                  fontWeight="700"
                />
              </div>
              <div className="delete title">
                <CustomHeading
                  label="Delete"
                  color={colors.Black}
                  fontFamily="NotoSansSemiBold"
                  fontSize="14px"
                  fontWeight="700"
                />
              </div>
              <div className="reorder title">
                <CustomHeading
                  label="Reorder"
                  color={colors.Black}
                  fontFamily="NotoSansSemiBold"
                  fontSize="14px"
                  fontWeight="700"
                />
              </div>
            </div>
            <div
              onDragOver={handleDropOver}
              className="cases-list"
              tabIndex="0"
            >
              {caseList.map((item, index) => {
               
                if (!item.isDeletedCase) {
                  term += 1;
                  return (
                    <div className="case-details-data" key={index}>
                      <div className="case-no">
                        <CustomHeading
                          label={term}
                          color={colors.Black}
                          fontFamily="DiodrumRegular"
                          fontSize="14px"
                          fontWeight="400"
                        />
                      </div>
                      <div className="case-name">
                        <InputWithIcon
                          disabled={false}
                          isError={item?.notFill || item?.sameNameError}
                          type="text"
                          onBlur={handleBlur}
                          onFocus={() => handleFocus(index)}
                          isFocused={isFocused === index}
                          placeholder="Case Name"
                          inputText={<CloseCircleGreenIcon />}
                          name="caseName"
                          id={index}
                          unitBgColor="transparent"
                          onChange={handleChangeCaseName}
                          value={item.caseName}
                        />

                        {item?.notFill ? (
                          <ErrorMessage
                            errorIcon={true}
                            texMsg="This field cannot be empty"
                          />
                        ) : (
                          item?.sameNameError && (
                            <ErrorMessage
                              errorIcon={true}
                              texMsg="Case Name Already Exists"
                            />
                          )
                        )}
                      </div>

                      <div className="case-notes">
                        <CustomTextArea
                          className="cases_notes"
                          type="text"
                          rows={1}
                          cols={50}
                          placeholder="Case Note"
                          name="caseNote"
                          onChange={(e) => handleChangeList(e, index)}
                          value={item.caseNote}
                        />
                      </div>
                      <div className="delete">
                        {item.isDeletedCase ? (
                          "Deleted"
                        ) : (
                          <Button
                            data-bs-target="#deleteModal"
                            id="btnDelete"
                            disabled={
                              caseList.filter((item) => !item.isDeletedCase)
                                .length == 1
                            }
                            onClick={() => handleOpenWarningMessage(index)}
                          >
                            <DeleteCaseIcon />
                          </Button>
                        )}
                      </div>
                      <div
                        className="reorder"
                        onDragStart={(e) => handleDragStart(e, index)}
                        draggable
                        onDrop={(e) => handleDrop(e, index)}
                      >
                        <DragButtonIcon />
                      </div>
                    </div>
                  );
                }
              })}
            </div>

            {/* {showNewAdd && (
              <Col lg={12} className="case-details-data">
                <div className="case-no">
                  <CustomHeading
                    label={caseList && caseList.length + 1}
                    color={colors.Black}
                    fontFamily="DiodrumRegular"
                    fontSize="14px"
                    fontWeight="400"
                  />
                </div>
                <div className="case-name">
                  <InputWithIcon
                    type="text"
                    disabled={false}
                    isError={false}
                    placeholder="Case Name"
                    name="caseName"
                    onChange={handleChange}
                    value={newCase.caseName}
                    unitBgColor="transparent"
                    inputText={<CloseCircleGreenIcon />}
                  />
                  {sameNameError && (
                    <ErrorMessage
                      errorIcon={true}
                      texMsg="Case Name Already Exists"
                    />
                  )}
                  {nulValueError && (
                    <ErrorMessage
                      errorIcon={true}
                      texMsg="This field cannot be empty"
                    />
                  )}
                </div>
                <div className="case-notes">
                  <CustomTextArea
                    type="text"
                    placeholder="Case Note"
                    name="caseNote"
                    onChange={handleChange}
                    value={newCase.caseNote}
                  />
                </div>
                <div className="delete">
                  <Button data-bs-target="#deleteModal" id="btnDelete">
                    <DeleteCaseIcon />
                  </Button>
                </div>
                <div className="reorder">
                  <span>
                    <DragButtonIcon />
                  </span>
                </div>
              </Col>
            )} */}
            <Col lg={12} className="add-button-column">
              <StandardDashedButton
                label="Add Case"
                id="btnAdd"
                onClick={addNewCase}
              />
            </Col>
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-save-footer">
          <StandardPrimaryButton
            label="Save"
            disabled={disabeldSave}
            onClick={saveCases}
          />
          <EditSavedMessage
            show={editSaved}
            close={handleCloseSave}
            parentModal={setOpenModal}
          />
        </Modal.Footer>
      </ManageCaseStyled>

      <WarningMessageStyled
        show={openWarningMessage}
        onHide={handleClosWarningMessage}
        centered
        backdrop="static"
        id="deleteModal"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <div className="warning-header">
          <WarningIcon />
          <div>
            <CustomHeading
              fontFamily="DiodrumSemiBold"
              fontSize="16px"
              fontWeight="600"
              color={colors.Black}
              label={`Are you sure you want to delete case ${selectedCase.caseName}?`}
            />
          </div>
        </div>
        <Modal.Body className="warning-body">
          <CustomHeading
            fontFamily="NotoSansRegular"
            fontSize="16px"
            fontWeight="400"
            color={colors.Black}
            label="This step is irreversible and all your data within that case will be lost."
          />
        </Modal.Body>
        <Modal.Footer>
          <StandardSecondaryButton
            onClick={handleClosWarningMessage}
            id=""
            label="No"
          />
          <StandardPrimaryButton id="" onClick={deleteCase} label="Yes" />
        </Modal.Footer>
      </WarningMessageStyled>
    </>
  );
};

export default ManageCase;
