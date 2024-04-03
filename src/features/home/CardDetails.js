/* eslint-disable max-len */
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Col, Row, Dropdown, Modal, Toast } from "react-bootstrap";
import { useState } from "react";
import CardDetailsStyled from "./CardDetailsStyled";
import MoreVertIcon from "../../common/icons/MoreVertIcon";
import FavoriteIcon from "../../common/icons/FavoriteIcon";
import CreateNewProjectIcon from "../../common/icons/CreateNewProjectIcon";
import { useDeleteDataMutation } from "../../services/apiConfig";
import LockProjectIcon from "../../common/icons/LockProjectIcon";
import SharedFileIcon from "../../common/icons/SharedFileIcon";
import { useDispatch } from "react-redux";
import DeleteProjectPopup from "./DeleteProjectPopup";
import tempVesselImg from "../../common/assets/images/Temp-vessel-image.svg";
import {
  btnlist,
  updateLoader,
  Tempbtnlist,
  updatetitle,
  updateOrder,
  updateSubTechnology,
  updateFlag,
  sortData2,
} from "../home/CardListSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../common/utils/Loader";
import {
  useLazyGetAllDataQuery,
  useDeleteDataRecordMutation,
  useUpdateDataMutation,
} from "../../services/apiConfig";
import CloseIcon from "../../common/icons/CloseIcon";
import { Overlay } from "../modals/CreateFolderStyled";
import CreateFolderStyled from "../modals/CreateFolderStyled";
import CreateNewProjectModal from "../modals/CreateNewProjectModal";

import { Button, Form } from "react-bootstrap";
import { Draggable, Droppable } from "react-drag-and-drop";
import ShareProjectPageOne from "../modals/ShareProjectPageOne";
import CreatedProjectSuccessStyled from "../modals/CreatedProjectSuccessStyled";
import { useNavigate } from "react-router-dom";
import { MyError } from "../../common/utils/ErrorCreator";
import CustomHeading from "../../common/styles/components/headings/CustomHeading";
import { colors, fontStyles } from "../../common/styles/Theme";
import InputWithIcon from "../../common/styles/components/inputs/InputWithIcon";
import CloseCircleGreenIcon from "../../common/icons/CloseCircleGreenIcon";
import CloseCircleRedIcon from "../../common/icons/CloseCircleRedIcon";
import ErrorMessage from "../../common/styles/components/headings/ErrorMessage";
import StandardSecondaryButton from "../../common/styles/components/buttons/standard/StandardSecondaryButton";
import StandardPrimaryButton from "../../common/styles/components/buttons/standard/StandardPrimaryButton";
import { updateProjectInfo } from "../../common/ProjectInfoSlice";
import StyledCard from "../../common/styles/components/cards/CustomCard";
import StyledModal from "../../common/styles/components/modals/CustomModal";
import CloseBlackIcon from "../../common/icons/CloseBlackIcon";
import CustomeMessagePopup from "../../common/utils/CustomeMessagePopup";
import DefaultValueSaved from "../feedwater/modals/DefaultValueSaved";
import FavRemovePopup from "../../common/utils/FavRemovePopup";
import CustomLabel from "../../common/styles/components/headings/CustomLabel";
import SendProjectModal from "../modals/SendProjectModal";
import { ErrorMessageStyled } from "./CardListStyled";
const CardTiles = () => {
  const ProjectInfoStore = useSelector((state) => state.projectInfo);
  console.log("ProjectInfoStore", ProjectInfoStore);
  const UserInfoStore = useSelector((state) => state.userInfo.data);
  const userID = UserInfoStore ? UserInfoStore.UserId : 0;
  const TempStoreData = useSelector((state) => state.cardlist.Temdata);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Cardstate, setCard] = useState([]);
  const StoreData = useSelector((state) => state.cardlist.data);
  const StoreSidLeftpanel = useSelector((state) => state.leftpanel.data);
  const {flag,pFlag,pTitle} = useSelector((state) => state.cardlist);  const FolderProjectIDLeftpanel = useSelector(
    (state) => state.FolderProjectleftpanel.data
  );
  console.log("FolderProjectIDLeftpanel", FolderProjectIDLeftpanel);
  const [flagstate, setflagstate] = useState(true);
  const [getData, responseInfo] = useLazyGetAllDataQuery();
  const [getSubTechnology, responseSubTechnology] = useLazyGetAllDataQuery();
  const [isOpen, setIsOpen] = useState(false);
  const [sendProject, setSendProject] = useState({
    show: false,
    projectName: "",
    projectId: 0,
  });
  const [error, setError] = useState(false);
  const [inputValue, setInputValue] = useState({
    projectID: "",
    projectName: "",
    prevProjectName:"",
  });
  const [deleteSuccessModalGrid, setDeleteSuccessModalGrid] = useState(false);
  const [idDel, setIdDel] = useState(null);
  const [MethodName, setMethodName] = useState(null);
  const [IsDeleted, setIsDeleted] = useState(null);
  const [lblMessage, setlabelMesg] = useState(null);
  const [isFocused, setIsFocused] = useState(null);
  const handleFocus = (id) => {
    setIsFocused(id);
  };
  const handleBlur = () => {
    setIsFocused(null);
  };
  const handleOpenDelete = (id) => {
    setIdDel(id);
    const objMethod = {
      Method: "masterdata/api/v1/DeleteProject",
      userID: userID,
      projectID: id,
    };
    setMethodName(objMethod);
    setDeleteSuccessModalGrid(true);
    setlabelMesg("Are you sure you want to delete this project?");
    setIsDeleted("D");
  };
  const handleOpenPermanentDelete = (id) => {
    setIdDel(id);
    const objMethod = {
      Method: "masterdata/api/v1/PermanentlyDeleteProject",
      userID: userID,
      projectID: id,
    };
    setMethodName(objMethod);
    setDeleteSuccessModalGrid(true);
    setlabelMesg("Are you sure you want to delete this project?");
    setIsDeleted("D");
  };
  const handleOpenRestoreProject = (id) => {
    setIdDel(id);
    const objMethod = {
      Method: "masterdata/api/v1/RestoreProject",
      userID: userID,
      projectID: id,
    };
    setMethodName(objMethod);
    setDeleteSuccessModalGrid(true);
    setlabelMesg("Are you sure you want to Restore this project?");
    setIsDeleted("R");
  };
  const [Message, setMessage] = useState("");
  const [GetRenameData, { data }] = useUpdateDataMutation("");
  const [isPreviewShown, setPreviewShown] = useState(false);
  const [selectTitle, setSelectTitle] = useState("");
  const [popupOperator, setPopupOperator] = useState({
    message: "",
    show: false,
    type: "",
    subtext: "",
  });
  const handleOpen = () => {
    setShow(true);
  };

  const handleOpenRenameProject = (ProjectId, title) => {
    setIsOpen(true);
    setInputValue({ projectID: ProjectId, projectName: title,prevProjectName:title });
    document.body.classList.add("disable");
  };
  const handleOpenSendProject = (ProjectId, title) => {
    setSendProject({ show: true, projectName: title, projectId: ProjectId });
  };
  const handleCloseRenameProject = () => {
    setIsOpen(false);
    // document.body.classList.remove("disable");
  };
  const handleInputChange = (e) => {
    var myvalus = e.target.value;
    const Rename = e.target.value;
    const ProjectId = inputValue.projectID;
    const index = Cardstate.findIndex((item) => item.title === myvalus);
    if (myvalus.trim() === "") {
      setInputValue({...inputValue, projectID: ProjectId, projectName: Rename });
      setMessage("This field cannot be empty, please enter a project name.");
      setError(true);
      return;
    } else if (myvalus.length < 3) {
      setInputValue({...inputValue, projectID: ProjectId, projectName: Rename });
      setMessage("Project Name,Three Minimum Length Required !!");
      setError(true);
      return;
    } else if (index > -1) {
      setInputValue({...inputValue, projectID: ProjectId, projectName: Rename });
      setMessage("Data Exist !!");
      setError(true);
      return;
    } else {
      setInputValue({...inputValue, projectID: ProjectId, projectName: Rename });
      setMessage("");
      setError(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.projectName.trim() === "") {
      setError(true);
      return;
    }
    if (inputValue.length < 3) {
      setPopupOperator({
        type: "warning",
        show: true,
        message: "Minimum 3 characters required !!",
        subtext: "",
      });
      setError(true);
      return;
    } else {
      const newData = {
        Method: "masterdata/api/v1/RenameProject",
        userID: userID,
        projectID: inputValue.projectID,
        projectName: inputValue.projectName,
      };

      let ResponseValues = await GetRenameData(newData);
      if (ResponseValues.data.responseMessage == "Success") {
   
        setPopupOperator({
          type: "success",
          show: true,
          message: `Project Name ${inputValue.prevProjectName} has been successfully renamed to ${inputValue.projectName}.`,
          subtext: "",
        });
        setIsOpen(false);
        if (StoreSidLeftpanel == "masterdata/api/v1/FolderProject") {
          getData(`${StoreSidLeftpanel}?folderID=${FolderProjectIDLeftpanel}`);
        } else {
          getData(`${StoreSidLeftpanel}?userID=${userID}`);
        }
        LoadRecord();
      } else {
        toast.success(
          ResponseValues.data.responseMessage,
          "Record not Update !!",
          {
            position: toast.POSITION.TOP_CENTER,
            className: "toast-center",
          }
          // setPopupOperator({
          //   type:"error",
          //   show:true,
          //   message:ResponseValues.data.responseMessage,
          //   subtext:"Record not Update !!"
          // });
        );
      }

      // setInputValue(undefined);
      setIsOpen(false);
      document.body.classList.remove("disable");
    }
  };
  const loader = useSelector((state) => state.cardlist.loader);
  useEffect(() => {
    try {
      getSubTechnology(`${"masterdata/api/v1/SubTechnology"}?userID=${userID}`);
    } catch {
      console.log("Error in get SubTechnology");
    }
  }, []);
  useEffect(() => {
    if (responseSubTechnology.isLoading) {
      // dispatch(updateLoader(true));
      // setLoading(true);
    } else {
      if (responseSubTechnology.isSuccess === true) {
        dispatch(updateSubTechnology(responseSubTechnology.data));
      }
    }
    if (responseSubTechnology.isError) {
      throw new MyError(
        "responseSubTechnology Api Error",
        responseSubTechnology.error.status,
        "ApiError"
      );
    }
  }, [responseSubTechnology]);
  useEffect(() => {
    if (StoreSidLeftpanel == "masterdata/api/v1/FolderProject") {
      getData(`${StoreSidLeftpanel}?folderID=${FolderProjectIDLeftpanel}`);
    } else {
      if (userID !== 0) {
        getData(`${StoreSidLeftpanel}?userID=${userID}`);
      }
    }
  }, [StoreSidLeftpanel, FolderProjectIDLeftpanel, userID]);
  useEffect(() => {
    if (responseInfo.isLoading) {
      dispatch(updateLoader(true));
    } else {
      if (responseInfo.isSuccess === true) {
        console.log("pawan???????----"+responseInfo.data.length);

        console.log("TempStoreData.length ....", TempStoreData.length);
        // if (TempStoreData.length > 0) {
        //      console.log("TempStoreData.length ....", TempStoreData.length);
        //   dispatch(updatetitle("MD"));

          // dispatch(updateOrder("D"));

        //   let Result = TempStoreData.slice().sort(function (a, b) {
        //     return new Date(b.lastModified) - new Date(a.lastModified);
        //   });

        //   dispatch(btnlist(Result));
        // } else {
        //   console.log("responseInfo.data....", responseInfo.data);
        //   dispatch(btnlist(responseInfo.data));
        // }
      //  dispatch(btnlist(responseInfo.data));
        dispatch(Tempbtnlist(responseInfo.data));
        dispatch(sortData2({flag:pTitle,data:responseInfo.data}));
        dispatch(updateLoader(false));

      }
    }
    if (responseInfo.isError) {
      throw new MyError(
        "responseInfo Api Error",
        responseInfo.error.status,
        "ApiError"
      );
    }
  }, [responseInfo]);
  const [FavouritePost, responseFavorite] = useDeleteDataRecordMutation();
  useEffect(() => {
    if (responseInfo.isSuccess) {
      if (StoreSidLeftpanel == "masterdata/api/v1/FolderProject") {
        getData(`${StoreSidLeftpanel}?folderID=${FolderProjectIDLeftpanel}`);
      } else {
        getData(`${StoreSidLeftpanel}?userID=${userID}`);
      }
      LoadRecord();
    }
  }, [StoreSidLeftpanel, userID]);

  useEffect(() => {
    try {
      if (responseFavorite.isSuccess) {
        console.log("responseFavorite", responseFavorite);
        if (flagstate === true) {
          setPopupOperator({
            message: "Project added to Favourite Projects successfully! ",
            show: true,
            type: "success",
            subtext: `${selectTitle} has been added to Favourite Projects successfully.`,
          });
        } else {
          setPopupOperator({
            message: "Project removed from Favourite Projects successfully!.",
            show: true,
            type: "success",
            subtext: `${selectTitle} has been removed from Favourite Projects successfully.`,
          });
        }
        if (StoreSidLeftpanel == "masterdata/api/v1/FolderProject") {
          getData(`${StoreSidLeftpanel}?folderID=${FolderProjectIDLeftpanel}`);
        } else {
          getData(`${StoreSidLeftpanel}?userID=${userID}`);
        }
        LoadRecord();
      }
    } catch {
      console.log("Error in use effect responseFavorite");
    }
  }, [responseFavorite]);
  const handleOnclick = (item) => {
    console.log("DHGDG", item);
    const obj = {};
    const _projectId = item.ProjectId ? item.ProjectId : 0;
    if (_projectId !== 0) {
      obj.projectID = _projectId;
      obj.caseId = 0;
      obj.projectName = item.title;
      obj.Tchnology = item.technologyName;
      console.log("cardRedati", item);
      dispatch(updateProjectInfo(obj));
    }
  };
  const FavouriteRecord = (ProjectId, favorite, name) => {
    dispatch(updateLoader(false));
    setSelectTitle(name);
    var flag = favorite == true ? false : true;
    setflagstate(flag);
    const data1 = {
      Method: "masterdata/api/v1/FavoriteProject",
      userID: userID,
      projectID: ProjectId,
      favorite: flag,
    };
    FavouritePost(data1);
  };

  useEffect(() => {
    LoadRecord();
  }, [StoreData]);
  const btnCreateprojct = (e) => {
    e.preventDefault();
    setPreviewShown(true);
  };
  const updateCreateprojc = (e) => {
    e.preventDefault();
    setPreviewShown(false);
  };
  const LoadRecord = () => {
    setCard([]);
    if (StoreData === 0) {
      <div>Loading....</div>;
    } else {
      setCard([]);
      StoreData.forEach((element) => {
        setCard((current) => [
          ...current,
          {
            favorite: element.favorite,
            ProjectId: element.projectID,
            title: element.projectName,
            description: element.modifiedDuration,
            createDate: element.createDateDuration,
            image: tempVesselImg,
            isLocked: false,
            tagName: element.tagName,
            isDeleted: element.isDeleted,
            folderName: element.folderName,
            technologyName: element.technologyName,
          },
        ]);
      });
    }
  };
  // if (!TempStoreData.length) return "";
  const handleCLoseOperator = () => {
    setPopupOperator({
      show: false,
      message: "",
      type: "",
    });
  };
  
  return !loader ? (
    <>
      <CardDetailsStyled>
        {StoreSidLeftpanel == "masterdata/api/v1/FolderProject" ||
        StoreSidLeftpanel == "masterdata/api/v1/ProjectDeleted" ? (
          ""
        ) : (
          <StyledCard borderRadius="4px" className="spc_card">
            <Card.Body className="create-project">
              <div onClick={btnCreateprojct} className="create-project-icon">
                <CreateNewProjectIcon />
              </div>
              <div className="create-project-text">
                <CustomHeading
                  fontFamily="DiodrumSemiBold"
                  fontSize="16px"
                  fontWeight="600"
                  label="Create New Project"
                  color={colors.Black}
                />
              </div>
            </Card.Body>
          </StyledCard>
        )}
          {isPreviewShown ? (
        <CreateNewProjectModal
          CPmodal={updateCreateprojc}
          show={isPreviewShown}
          close={setPreviewShown}
        />
      ) : (
        ""
      )}
        <DeleteProjectPopup
          show={deleteSuccessModalGrid}
          close={() => setDeleteSuccessModalGrid(false)}
          id={idDel}
          methodName={MethodName}
          IsDeleted={IsDeleted}
          lblMessage={lblMessage}
        />
        {responseInfo?.data?.length == 0 ? (
        <ErrorMessageStyled className="error-msg"></ErrorMessageStyled>
      ) :(Cardstate?.map((item, index) => (
          <>
            <Draggable
              className="spc_card"
              type="item"
              data={[item.ProjectId, item.title, item.folderName,item.isDeleted]}
              key={item.ProjectId}
            >
              <StyledCard
                borderRadius="4px"
                className={
                  item.isLocked ? "main-card normal-card" : "normal-card"
                }
              >
                {item.isLocked && (
                  <Card className="locked-project">
                    <div className="lock-icon">
                      <LockProjectIcon />
                    </div>
                  </Card>
                )}

                <div className="project-header-part">
                {StoreSidLeftpanel == "masterdata/api/v1/ProjectDeleted" ? (
                  <div 
                    // onClick={() => {
                    //   handleOnclick(item);
                    //   navigate("/FeedWaterHome", {
                    //     state: {
                    //       ...item,
                    //       projectID: item.ProjectId,
                    //       caseID: 0,
                    //     },
                    //   });
                    // }}
                    className="title-wrapper"
                  >
                    <div>
                      <CustomHeading
                        className="project-title-name"
                        fontFamily="DiodrumSemiBold"
                        fontSize="16px"
                        fontWeight="600"
                        label={
                          item.title.length > 20
                            ? `${item.title.substring(0, 20)}...`
                            : item.title
                        }
                        color={colors.Black}
                      />
                    </div>
                    <div>
                      <CustomHeading
                        fontFamily="NotoSansRegular"
                        fontSize="14px"
                        fontWeight="400"
                        color={colors.blackTransparency045}
                        label={item.description}
                      />
                      <div
                        className={item.isShared ? "shared-project-icon" : ""}
                      >
                        {item.isShared && <SharedFileIcon />}
                      </div>
                    </div>
                    <div className="project-inside-tags">
                      {item.tagName == "" ? (
                        ""
                      ) : (
                        <a className="folder-tag">{item.tagName}</a>
                      )}
                      {item.folderName == "" ? (
                        ""
                      ) : (
                        <a className="sample-project-tag">{item.folderName}</a>
                      )}
                    </div>
                  </div>
                ):(<div 
                  onClick={() => {
                    handleOnclick(item);
                    navigate("/FeedWaterHome", {
                      state: {
                        ...item,
                        projectID: item.ProjectId,
                        caseID: 0,
                      },
                    });
                  }}
                  className="title-wrapper"
                >
                  <div>
                    <CustomHeading
                      className="project-title-name"
                      fontFamily="DiodrumSemiBold"
                      fontSize="16px"
                      fontWeight="600"
                      label={
                        item.title.length > 20
                          ? `${item.title.substring(0, 20)}...`
                          : item.title
                      }
                      color={colors.Black}
                    />
                  </div>
                  <div>
                    <CustomHeading
                      fontFamily="NotoSansRegular"
                      fontSize="14px"
                      fontWeight="400"
                      color={colors.blackTransparency045}
                      label={item.description}
                    />
                    <div
                      className={item.isShared ? "shared-project-icon" : ""}
                    >
                      {item.isShared && <SharedFileIcon />}
                    </div>
                  </div>
                  <div className="project-inside-tags">
                    {item.tagName == "" ? (
                      ""
                    ) : (
                      <a className="folder-tag">{item.tagName}</a>
                    )}
                    {item.folderName == "" ? (
                      ""
                    ) : (
                      <a className="sample-project-tag">{item.folderName}</a>
                    )}
                  </div>
                </div>)}
                  <div>
                    <Dropdown className="project-option-dropdown">
                      <Dropdown.Toggle variant="">
                        <MoreVertIcon />
                      </Dropdown.Toggle>
                      {item.isDeleted ? (
                        <Dropdown.Menu>
                          <Dropdown.Item>
                            <a
                              href="#/action-3"
                              onClick={() =>
                                handleOpenRestoreProject(item.ProjectId)
                              }
                            >
                              Restore Project
                            </a>
                          </Dropdown.Item>
                          {/* <Dropdown.Item
                              href="#/action-2"
                              id="projects-options"
                            >
                              <a href="#">Permanently Delete</a>
                            </Dropdown.Item> */}
                          <Dropdown.Item>
                            <a
                              href="#"
                              onClick={() =>
                                handleOpenPermanentDelete(item.ProjectId)
                              }
                            >
                              Permanently Delete
                            </a>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      ) : (
                        
                        <Dropdown.Menu>
                          <Dropdown.Item>
                            <a 
                              onClick={() => {
                                handleOnclick(item);
                                navigate("/FeedWaterHome", {
                                  state: {
                                    ...item,
                                    projectID: item.ProjectId,
                                    caseID: 0,
                                  },
                                });
                              }}
                            >
                              Open Project
                            </a>
                          </Dropdown.Item>
                          {item.favorite ? (
                            <Dropdown.Item>
                              <a
                                href="#"
                                onClick={() =>
                                  FavouriteRecord(
                                    item.ProjectId,
                                    item.favorite,
                                    item.title
                                  )
                                }
                              >
                                Remove from Favourite
                              </a>
                            </Dropdown.Item>
                          ) : (
                            <Dropdown.Item href="#/action-2">
                              <a
                                href="#"
                                onClick={() =>
                                  FavouriteRecord(
                                    item.ProjectId,
                                    item.favorite,
                                    item.title
                                  )
                                }
                              >
                                Add to Favourite
                              </a>
                            </Dropdown.Item>
                          )}
                          {/* <Dropdown.Item href="#/action-3">
                              <a href="#">Duplicate this Project</a>
                            </Dropdown.Item> */}
                          {/* <Dropdown.Item href="#/action-3">
                              <a href="#" onClick={handleOpen}>
                                Share Project
                                <ShareProjectPageOne
                                  show={show}
                                  close={handleClose}
                                />
                              </a>
                            </Dropdown.Item> */}
                          {item.isDeleted ? (
                            ""
                          ) : (
                            <Dropdown.Item href="#/action-3">
                              <a
                                href="#"
                                onClick={() => handleOpenDelete(item.ProjectId)}
                              >
                                Delete Project
                              </a>
                            </Dropdown.Item>
                          )}
                          {/* <Dropdown.Item href="#/action-3">
                              <a href="#">Remove from Recent</a>
                            </Dropdown.Item> */}
                          {/* <Dropdown.Item href="#/action-3">
                              <a href="#">View Summary Report</a>
                            </Dropdown.Item> */}
                          <Dropdown.Item href="#/action-3">
                            <a
                              href="#"
                              onClick={() =>
                                handleOpenRenameProject(
                                  item.ProjectId,
                                  item.title
                                )
                              }
                            >
                              Rename Project
                            </a>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <a
                              href="#"
                              onClick={() =>
                                handleOpenSendProject(
                                  item.ProjectId,
                                  item.title
                                )
                              }
                            >
                              Send Project
                            </a>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      )
                      
                      }
                    </Dropdown>
                  </div>
                </div>
                <div className="project-snippet">
                {StoreSidLeftpanel == "masterdata/api/v1/ProjectDeleted" ? (
                  <Card.Img
                    src={item.image}
                    alt="project-thumbnail"
                  />):(
                    <Card.Img
                      onClick={() => {
                        handleOnclick(item);
                        navigate("/FeedWaterHome", {
                          state: {
                            ...item,
                            projectID: item.ProjectId,
                            caseID: 0,
                          },
                        });
                      }}
                      src={item.image}
                      alt="project-thumbnail"
                    />)}
                  {item.isDeleted ? (
                    ""
                  ) : (
                    <div
                      className={item.favorite ? "favorite-icon" : ""}
                      onClick={() =>
                        FavouriteRecord(
                          item.ProjectId,
                          item.favorite,
                          item.title
                        )
                      }
                    >
                      {item.favorite && <FavoriteIcon />}
                    </div>
                  )}
                </div>
              </StyledCard>
            </Draggable>
          </>
        ))
        )
        }
      </CardDetailsStyled>
      <StyledModal
        show={isOpen}
        onHide={handleCloseRenameProject}
        backdrop="static"
        keyboard="false"
        centered
        maxWidth="572px"
        backgroundColor={colors.GreyF8}
      >
        <Modal.Header backgroundColor={colors.GreyF8}>
          <CustomHeading
            fontFamily="DiodrumSemiBold"
            fontSize="16px"
            fontWeight="600"
            color={colors.PrimaryDarkAquaMarine}
            label="Rename this Project"
          />
          {/* <h1> </h1> */}
          <div className="close-icon" onClick={handleCloseRenameProject}>
            <CloseIcon />
          </div>
        </Modal.Header>
        <Modal.Body>
          <CustomLabel label="Project Name" />
          <InputWithIcon
            disabled={false}
            isError={error}
            isWarning={false}
            onClick
            type="text"
            onBlur={handleBlur}
            onFocus={() => handleFocus(1)}
            isFocused={isFocused === 1}
            minLength="3"
            maxLength="200"
            inputText={
              error ? <CloseCircleRedIcon /> : <CloseCircleGreenIcon />
            }
            unitBgColor="transparent"
            minlength="3"
            value={inputValue.projectName}
            onChange={handleInputChange}
          />
          <ErrorMessage
            errorIcon={true}
            style={{ visibility: error ? "visible" : "hidden" }}
            texMsg={Message}
          />
        </Modal.Body>
        <Modal.Footer>
          <StandardSecondaryButton
            variant="light"
            onClick={handleCloseRenameProject}
            id="canBtn"
            label="Cancel"
          />
          <StandardPrimaryButton
            type="submit"
            id=""
            variant="light"
            disabled={error ? "true" : ""}
            onClick={handleSubmit}
            label="Submit"
          />
        </Modal.Footer>
      </StyledModal>
      <FavRemovePopup operator={popupOperator} close={handleCLoseOperator} />
      <SendProjectModal
        show={sendProject.show}
        projectId={sendProject.projectId}
        projectName={sendProject.projectName}
        close={() =>
          setSendProject({ show: false, projectName: "", projectId: 0 })
        }
      />{" "}
    </>
  ) : (
    <Loader />
  );
};

export default CardTiles;
