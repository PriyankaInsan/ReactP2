/* eslint-disable max-len */
/* eslint-disable react/jsx-key */
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Card, Dropdown, Modal } from "react-bootstrap";
import CardListStyled, { ErrorMessageStyled, NewStyledCard } from "./CardListStyled";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLazyGetAllDataQuery } from "../../services/apiConfig";
import {
  useDeleteDataMutation,
  useDeleteDataRecordMutation,
  useUpdateDataMutation,
} from "../../services/apiConfig";
import {
  btnlist,
  updateLoader,
  Tempbtnlist,
  updateOrder,
  updatetitle,
  sortData,
  updateFlag,
  sortData2,
} from "../home/CardListSlice";
import MoreVertIcon from "../../common/icons/MoreVertIcon";
import FavoriteIcon from "../../common/icons/FavoriteIcon";
import { useDispatch } from "react-redux";
import CloseIcon from "../../common/icons/CloseIcon";
import { Overlay } from "../modals/CreateFolderStyled";
import CreateFolderStyled from "../modals/CreateFolderStyled";
import { Button, Form } from "react-bootstrap";
import ShortUpArrow from "../../common/icons/ShortUpArrow";
import SortDownArrow from "../../common/icons/SortDownArrow";
import CreatedProjectSuccessStyled from "../modals/CreatedProjectSuccessStyled";
import DeleteProjectPopup from "./DeleteProjectPopup";
import { MyError } from "../../common/utils/ErrorCreator";
import { useNavigate } from "react-router-dom";
import CustomHeading from "../../common/styles/components/headings/CustomHeading";
import { colors } from "../../common/styles/Theme";
import InputWithIcon from "../../common/styles/components/inputs/InputWithIcon";
import CloseCircleRedIcon from "../../common/icons/CloseCircleRedIcon";
import CloseCircleGreenIcon from "../../common/icons/CloseCircleGreenIcon";
import ErrorMessage from "../../common/styles/components/headings/ErrorMessage";
import StandardSecondaryButton from "../../common/styles/components/buttons/standard/StandardSecondaryButton";
import StandardPrimaryButton from "../../common/styles/components/buttons/standard/StandardPrimaryButton";
import { updateProjectInfo } from "../../common/ProjectInfoSlice";
import StyledModal from "../../common/styles/components/modals/CustomModal";
import CloseBlackIcon from "../../common/icons/CloseBlackIcon";
import {
  Folderbtnlist,
  FolderupdateOrder,
  Folderupdatetitle,
} from "./ViewAllFolderSlice";
import CustomLabel from "../../common/styles/components/headings/CustomLabel";
import StyledCard from "../../common/styles/components/cards/CustomCard";
import FavRemovePopup from "../../common/utils/FavRemovePopup";
import SendProjectModal from "../modals/SendProjectModal";
import CreateNewProjectIcon from "../../common/icons/CreateNewProjectIcon";
import CreateNewProjectModal from "../modals/CreateNewProjectModal";
import PlusIcon from "../../common/icons/PlusIcon";
import styled from "styled-components";
import CreateNewProjectPlusIcon from "../../common/icons/CreateNewProjectPlusIcon";
// import cardData from "./cardListSlice.json" ;

const CardList = () => {
  const dispatch = useDispatch();
  const UserInfoStore = useSelector((state) => state.userInfo.data);
  const ProjectInfoStore = useSelector((state) => state.projectInfo.data);
  const userId = UserInfoStore ? UserInfoStore.UserId : 1;
  const [Cardstate, setCard] = useState([]);
  const [flagstate, setflagstate] = useState(true);
  const navigate = useNavigate();
  const userID = userId;
  const StoreData = useSelector((state) => state.cardlist.data);
  const loader = useSelector((state) => state.cardlist.loader);
  const title = useSelector((state) => state.cardlist.title);
  const order = useSelector((state) => state.cardlist.order);

  const {flag,pFlag,pTitle} = useSelector((state) => state.cardlist);
  const StoreSidLeftpanel = useSelector((state) => state.leftpanel.data);
  
  const FolderProjectIDLeftpanel = useSelector(
    (state) => state.FolderProjectleftpanel.data
  );
  const FolderTempStoreData = useSelector((state) => state.Folderview.Temdata);

  const TempStoreData = useSelector((state) => state.cardlist.Temdata);
  const [isPreviewShown, setPreviewShown] = useState(false);
  const [getData, responseInfo] = useLazyGetAllDataQuery();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);
  const [inputValue, setInputValue] = useState({
    projectID: "",
    projectName: "",
    prevProjectName:"",
  });
  const [Message, setMessage] = useState("");
  const [GetRenameData, { data }] = useUpdateDataMutation("");
  const [deleteSuccessModal, setDeleteSuccessModal] = useState(false);
  const [lblMessage, setlabelMesg] = useState(null);
  const [idDel, setIdDel] = useState(null);
  const [MethodName, setMethodName] = useState(null);
  const [IsDeleted, setIsDeleted] = useState(null);
  const [isFocused, setIsFocused] = useState(null);
  const [selectTitle, setSelectTitle] = useState("");
  const [popupOperator, setPopupOperator] = useState({
    message: "",
    show: false,
    type: "",
    subtext: "",
  });
  const [sendProject, setSendProject] = useState({
    show: false,
    projectName: "",
    projectId: 0,
  });
  const handleFocus = (id) => {
    setIsFocused(id);
  };
  const handleBlur = () => {
    setIsFocused(null);
  };
  const handleOpen = (id) => {
    // setIdDel(id);
    // setDeleteSuccessModal(true);
    setIdDel(id);
    const objMethod = {
      Method: "masterdata/api/v1/DeleteProject",
      userID: userId,
      projectID: id,
    };
    setMethodName(objMethod);
    setDeleteSuccessModal(true);
    setlabelMesg("Are you sure you want to delete this project?");
    setIsDeleted("D");
  };
  const handleOpenPermanentDelete = (id) => {
    setIdDel(id);
    const objMethod = {
      Method: "masterdata/api/v1/PermanentlyDeleteProject",
      userID: userId,
      projectID: id,
    };
    setMethodName(objMethod);
    setDeleteSuccessModal(true);
    setlabelMesg("Are you sure you want to delete this project?");
    setIsDeleted("D");
  };
  const handleOpenRestoreProject = (id) => {
    setIdDel(id);
    const objMethod = {
      Method: "masterdata/api/v1/RestoreProject",
      userID: userId,
      projectID: id,
    };
    setMethodName(objMethod);
    setDeleteSuccessModal(true);
    setlabelMesg("Are you sure you want to Restore this project?");
    setIsDeleted("R");
  };
  const handleOpenRenameProject = (ProjectId, title) => {
    setIsOpen(true);
    setInputValue({ projectID: ProjectId, projectName: title ,prevProjectName:title});
    document.body.classList.add("disable");
  };
  const handleCloseRenameProject = () => {
    setIsOpen(false);
    document.body.classList.remove("disable");
  };
  const handleOpenSendProject = (ProjectId, title) => {
    setSendProject({ show: true, projectName: title, projectId: ProjectId });
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
      setInputValue({ ...inputValue,projectID: ProjectId, projectName: Rename });
      setMessage("Project Name,Three Minimum Length Required !!");
      setError(true);
      return;
    } else if (index > -1) {
      setInputValue({ ...inputValue,projectID: ProjectId, projectName: Rename });
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
        userID: userId,
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
        );
      }

      // setInputValue(undefined);
      setIsOpen(false);
      document.body.classList.remove("disable");
    }
  };
  useEffect(() => {
    if (StoreSidLeftpanel == "masterdata/api/v1/FolderProject") {
      getData(`${StoreSidLeftpanel}?folderID=${FolderProjectIDLeftpanel}`);
    } else {
      getData(`${StoreSidLeftpanel}?userID=${userID}`);
    }
  }, [StoreSidLeftpanel, FolderProjectIDLeftpanel]);
  useEffect(() => {
    if (responseInfo.isLoading) {
      dispatch(updateLoader(true));
    } else {
      if (responseInfo.isSuccess === true) {
        // if (TempStoreData.length > 0) {
        //   dispatch(updatetitle("MD"));
        //   dispatch(updateOrder("D"));
        //   let Result = TempStoreData.slice().sort(function (a, b) {
        //     return new Date(b.lastModified) - new Date(a.lastModified);
        //   });
        //   dispatch(btnlist(Result));
        // } else {
        //   dispatch(btnlist(responseInfo.data));
        // }
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
  const [deletePost, response] = useDeleteDataMutation();
  const [FavouritePost, responseFavorite] = useDeleteDataRecordMutation();
  useEffect(() => {
    if (response.isSuccess) {
      toast.success("Project deleted successfully !", {
        position: toast.POSITION.TOP_CENTER,
        className: "toast-center",
      });
      if (StoreSidLeftpanel == "masterdata/api/v1/FolderProject") {
        getData(`${StoreSidLeftpanel}?folderID=${FolderProjectIDLeftpanel}`);
      } else {
        getData(`${StoreSidLeftpanel}?userID=${userID}`);
      }
      LoadRecord();
    }
  }, [response]);
  useEffect(() => {
    try {
      if (responseFavorite.isSuccess) {
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
  const FavouriteRecord = (ProjectId, favorite,name) => {
    dispatch(updateLoader(false));
    setSelectTitle(name);
    var flag = favorite === true ? false : true;
    setflagstate(flag);
    const data1 = {
      Method: "masterdata/api/v1/FavoriteProject",
      userID: userId,
      projectID: ProjectId,
      favorite: flag,
    };
    FavouritePost(data1);
  };

  useEffect(() => {
    LoadRecord();
  }, [StoreData]);
  const LoadRecord = () => {
    setCard([]);
    if (StoreData === 0) {
      <div>Loading....</div>;
    } else {
      dispatch(updateLoader(true));
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
            image: "./images/list-view-icon.svg",
            tagName: element.tagName,
            isDeleted: element.isDeleted,
            folderName: element.folderName,
          },
        ]);
      });
    }
  };


  const handleOnclick2 = (item) => {
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

  const handleOnclick = (projectId, CaseId) => {
    const obj = { ...ProjectInfoStore };
    obj.projectID = projectId ? projectId : 1;
    obj.caseId = CaseId;
    dispatch(updateProjectInfo(obj));
  };
  const updateCreateprojc = (e) => {
    e.preventDefault();
    setPreviewShown(false);
  };

  const handleSort = () => {
    dispatch(sortData("CD"));
    dispatch(updateFlag("Date Created"));
  };
  const handleSort2 = () => {
    dispatch(sortData("MD"));
    dispatch(updateFlag("Last Modified"));
  };
  const handleSort3 = () => {
    dispatch(sortData("PN"));

    if (order === "A") {
      dispatch(updateFlag("Project Name (descending)"));
    } else {
      dispatch(updateFlag("Project Name (ascending)"));
    }
  };
  const btnCreateprojct = (e) => {
    e.preventDefault();
    setPreviewShown(true);
  };
  const handleCLoseOperator = () => {
    setPopupOperator({
      show: false,
      message: "",
      type: "",
    });
  };
  return (
    <>
    {[ "masterdata/api/v1/ProjectDeleted","masterdata/api/v1/FolderProject"].includes(StoreSidLeftpanel)?("") :(
      <NewStyledCard className="create_new_project_list_view" onClick={btnCreateprojct}>
        <Card.Body className="create-project">
          <div className="create-project-icon">
            <CreateNewProjectPlusIcon />
          </div>
          <div className="project_name">
            <CustomHeading fontFamily="NotoSansSemiBold" fontWeight={"700"}>
              {"Create New Project"}
            </CustomHeading>
          </div>
        </Card.Body>
      </NewStyledCard>)}

      {isPreviewShown ? (
        <CreateNewProjectModal
          CPmodal={updateCreateprojc}
          show={isPreviewShown}
          close={setPreviewShown}
        />
      ) : (
        ""
      )}
      {responseInfo?.data?.length == 0 ? (
        <ErrorMessageStyled className="error-msg">Records not found</ErrorMessageStyled>
      ) : (
        <>
          <CardListStyled>
            {!StoreData.length ? (
              ""
            ) : (
              <>
                <div className="list-view-header">
                  <div className="project_hidden"></div>
                  <div className="project_name_header_title">
                    <CustomHeading
                      className={"list_header_sort_title"}
                      fontSize={"18px"}
                      color={colors.blackTransparency045}
                      onClick={handleSort3}
                    >
                      Project Name
                    </CustomHeading>
                    {title === "PN" ? (
                      <div>
                        {order === "D" ? (
                          <div className="arrow-updown-icon">
                            <SortDownArrow />
                          </div>
                        ) : (
                          <div className="arrow-updown-icon">
                            <ShortUpArrow />
                          </div>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="created_date_header_title">
                    <CustomHeading
                      className={"list_header_sort_title"}
                      fontSize={"18px"}
                      color={colors.blackTransparency045}
                      onClick={handleSort}
                    >
                      Date Created
                    </CustomHeading>
                    {title === "CD" ? (
                      <div>
                        {order === "D" ? (
                          <div className="arrow-updown-icon">
                            <SortDownArrow />
                          </div>
                        ) : (
                          <div className="arrow-updown-icon">
                            <ShortUpArrow />
                          </div>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="last_modified_header_title">
                    <CustomHeading
                      className={"list_header_sort_title"}
                      fontSize={"18px"}
                      color={colors.blackTransparency045}
                      onClick={handleSort2}
                    >
                      Last Modified
                    </CustomHeading>
                    {title === "MD" ? (
                      <div>
                        {order === "D" ? (
                          <div className="arrow-updown-icon">
                            <SortDownArrow />
                          </div>
                        ) : (
                          <div className="arrow-updown-icon">
                            <ShortUpArrow />
                          </div>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="projects_tags_header">
                    <CustomHeading
                      fontSize={"18px"}
                      color={colors.blackTransparency045}
                    >
                      Tags
                    </CustomHeading>
                  </div>
                  <div className="project_hidden"></div>
                </div>
                {
                  <DeleteProjectPopup
                    show={deleteSuccessModal}
                    close={() => setDeleteSuccessModal(false)}
                    id={idDel}
                    methodName={MethodName}
                    IsDeleted={IsDeleted}
                    lblMessage={lblMessage}
                  />
                }
                {Cardstate?.map((e) => (
                  <StyledCard className="list-view">
                    {e.isDeleted ? (
                      <div className={
                          e.favorite
                            ? "project_favorite favorite-icon"
                            : "project_favorite"
                        }></div>
                    ) : (
                      <div
                        className={
                          e.favorite
                            ? "project_favorite favorite-icon"
                            : "project_favorite"
                        }
                        onClick={() => FavouriteRecord(e.ProjectId, e.favorite)}
                      >
                        {e.favorite && (
                          <div className="star-icon">
                            <FavoriteIcon />
                          </div>
                        )}
                      </div>
                    )}
                    {StoreSidLeftpanel == "masterdata/api/v1/ProjectDeleted" ? (
                    <div
                      className="project_name"
                      // onClick={() => {
                      //   handleOnclick2(e);
                      //   navigate("/FeedWaterHome", {
                      //     state: { ...e, projectID: e.ProjectId, caseID: 0 },
                      //   });
                      // }}
                    >
                      <CustomHeading
                        fontFamily="NotoSansSemiBold"
                        fontWeight={"700"}
                      >
                        {e.title.length > 25
                          ? `${e.title.substring(0, 25)}...`
                          : e.title}
                      </CustomHeading>
                    </div>
                    ):(<div
                      className="project_name"
                      onClick={() => {
                        handleOnclick2(e);
                        navigate("/FeedWaterHome", {
                          state: { ...e, projectID: e.ProjectId, caseID: 0 },
                        });
                      }}
                    >
                      <CustomHeading
                        fontFamily="NotoSansSemiBold"
                        fontWeight={"700"}
                      >
                        {e.title.length > 25
                          ? `${e.title.substring(0, 25)}...`
                          : e.title}
                      </CustomHeading>
                    </div>)}
                    {StoreSidLeftpanel == "masterdata/api/v1/ProjectDeleted" ? (
                    <div
                      className="project_created_date"
                      // onClick={() => {
                      //   handleOnclick2(e);
                      //   navigate("/FeedWaterHome", {
                      //     state: { ...e, projectID: e.ProjectId, caseID: 0 },
                      //   });
                      // }}
                    >
                      <CustomHeading fontFamily="NotoSansRegular">
                        {e.createDate}{" "}
                      </CustomHeading>
                    </div>
                    ):(
                      <div
                      className="project_created_date"
                      onClick={() => {
                        handleOnclick2(e);
                        navigate("/FeedWaterHome", {
                          state: { ...e, projectID: e.ProjectId, caseID: 0 },
                        });
                      }}
                    >
                      <CustomHeading fontFamily="NotoSansRegular">
                        {e.createDate}{" "}
                      </CustomHeading>
                    </div>
                    )}
                     {StoreSidLeftpanel == "masterdata/api/v1/ProjectDeleted" ? (
                    <div
                      className="project_modified_date"
                      // onClick={() => {
                      //   handleOnclick2(e);
                      //   navigate("/FeedWaterHome", {
                      //     state: { ...e, projectID: e.ProjectId, caseID: 0 },
                      //   });
                      // }}
                    >
                      <CustomHeading fontFamily="NotoSansRegular">
                        {e.description}{" "}
                      </CustomHeading>
                    </div>
                     ):( <div
                      className="project_modified_date"
                      onClick={() => {
                        handleOnclick2(e);
                        navigate("/FeedWaterHome", {
                          state: { ...e, projectID: e.ProjectId, caseID: 0 },
                        });
                      }}
                    >
                      <CustomHeading fontFamily="NotoSansRegular">
                        {e.description}{" "}
                      </CustomHeading>
                    </div>)}
                    {StoreSidLeftpanel == "masterdata/api/v1/ProjectDeleted" ? (
                    <div
                      className="project-tags sample-project-tag"
                    >
                      {e.tagName == "" ? (
                        ""
                      ) : (
                        <a className="tag-name" style={{ marginRight: "10px" }}>
                          {e.tagName}
                        </a>
                      )}
                      {e.folderName == "" ? (
                        ""
                      ) : (
                        <a className="tag-name" href="#">
                          {e.folderName}
                        </a>
                      )}
                    </div>
                    ):(<div
                      className="project-tags sample-project-tag"
                      onClick={() => {
                        handleOnclick2(e);
                        navigate("/FeedWaterHome", {
                          state: { ...e, projectID: e.ProjectId, caseID: 0 },
                        });
                      }}
                    >
                      {e.tagName == "" ? (
                        ""
                      ) : (
                        <a className="tag-name" style={{ marginRight: "10px" }}>
                          {e.tagName}
                        </a>
                      )}
                      {e.folderName == "" ? (
                        ""
                      ) : (
                        <a className="tag-name" href="#">
                          {e.folderName}
                        </a>
                      )}
                    </div>)}
                    <div className="project-option">
                      <Dropdown className="project-option-dropdown">
                        <Dropdown.Toggle variant="">
                          <MoreVertIcon />
                        </Dropdown.Toggle>
                        {e.isDeleted ? (
                          <Dropdown.Menu>
                            <Dropdown.Item href="#/action-2">
                              <a
                                href="#"
                                onClick={() =>
                                  handleOpenRestoreProject(e.ProjectId)
                                }
                              >
                                Restore Project
                              </a>
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-2">
                              <a
                                href="#"
                                onClick={() =>
                                  handleOpenPermanentDelete(e.ProjectId)
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
                                  handleOnclick(e.ProjectId, 0);
                                  navigate("/FeedWaterHome", {
                                    state: {
                                      ...e,
                                      projectID: e.ProjectId,
                                      caseID: 0,
                                    },
                                  });
                                }}
                              >
                                Open Project
                              </a>
                            </Dropdown.Item>
                            {/* {e.folderName==""?
                                <Dropdown.Item href="#/action-1">
                                  <a href="#">Add to Folder</a>
                                </Dropdown.Item>:
                                <Dropdown.Item href="#/action-1">
                                  <a href="#">Move to Folder</a>
                                </Dropdown.Item>} */}
                            {e.favorite ? (
                              <Dropdown.Item>
                                <a
                                  href="#"
                                  onClick={() =>
                                    FavouriteRecord(
                                      e.ProjectId,
                                      e.favorite,
                                      e.title
                                    )
                                  }
                                >
                                  {" "}
                                  Remove from Favourite
                                </a>
                              </Dropdown.Item>
                            ) : (
                              <Dropdown.Item>
                                <a
                                  href="#"
                                  onClick={() =>
                                    FavouriteRecord(
                                      e.ProjectId,
                                      e.favorite,
                                      e.title
                                    )
                                  }
                                >
                                  {" "}
                                  Add to Favourite
                                </a>
                              </Dropdown.Item>
                            )}
                            {/* <Dropdown.Item href="#/action-3">
                                <a href="#">Duplicate this Project</a>
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-3">
                                <a href="#">Share Project</a>
                              </Dropdown.Item> */}
                            {e.isDeleted ? (
                              ""
                            ) : (
                              <Dropdown.Item>
                                <a
                                  href="#"
                                  onClick={() => handleOpen(e.ProjectId)}
                                >
                                  Delete Project
                                </a>
                              </Dropdown.Item>
                            )}
                            {/* <Dropdown.Item href="#/action-3">
                                <a href="#">Remove from Recent</a>
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-3">
                                <a href="#">View Summary Report</a>
                              </Dropdown.Item> */}
                            <Dropdown.Item>
                              <a
                                href="#"
                                onClick={() =>
                                  handleOpenRenameProject(e.ProjectId, e.title)
                                }
                              >
                                Rename Project
                              </a>
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <a
                                href="#"
                                onClick={() =>
                                  handleOpenSendProject(e.ProjectId, e.title)
                                }
                              >
                                Send Project
                              </a>{" "}
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        )}
                      </Dropdown>
                    </div>
                  </StyledCard>
                ))}
              </>
            )}
          </CardListStyled>
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
                <CloseBlackIcon />
              </div>
            </Modal.Header>
            <Modal.Body>
              <CustomLabel label="Project Name" />
              <InputWithIcon
                disabled={false}
                isError={error}
                onClick
                isWarning={false}
                type="text"
                onBlur={handleBlur}
                onFocus={() => handleFocus(1)}
                isFocused={isFocused === 1}
                maxlength="200"
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
          <FavRemovePopup
            operator={popupOperator}
            close={handleCLoseOperator}
          />
          <SendProjectModal
            show={sendProject.show}
            projectId={sendProject.projectId}
            projectName={sendProject.projectName}
            close={() =>
              setSendProject({ show: false, projectName: "", projectId: 0 })
            }
          />
        </>
      )}
    </>
  );
};

export default CardList;
