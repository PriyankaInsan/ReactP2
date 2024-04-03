/* eslint-disable max-len */
import { Accordion, Button, InputGroup, Form, Modal } from "react-bootstrap";
import SideMenuUL from "./SideMenuStyled";
import { useEffect, useState } from "react";
import {
  useLazyGetAllDataQuery,
  useCreateDataMutation,
  useUpdateDataMutation,
} from "../../services/apiConfig";
import { useDispatch } from "react-redux";
import StarIcon from "../../common/icons/StarIcon";
import FileIcon from "../../common/icons/FileIcon";
import DeleteIcon from "../../common/icons/DeleteIcon";
import SharedFileIcon from "../../common/icons/SharedFileIcon";
import RecentProjectIcon from "../../common/icons/RecentProjectIcon";
import PlusIcon from "../../common/icons/PlusIcon";
import CloseIcon from "../../common/icons/CloseIcon";
import ArrowRightIcon from "../../common/icons/ArrowRightIcon";
import CustomHeading from "../../common/styles/components/headings/CustomHeading";
import { toast } from "react-toastify";
import { updateLeftpanel } from "./SideMenuSlice";
import { btnlist, updateLoader } from "../home/CardListSlice";
import { FolderProjectID, updatetitle } from "../menu/FolderProjectSlice";
import { Draggable, Droppable } from "react-drag-and-drop";
import CreatedProjectSuccessStyled from "../modals/CreatedProjectSuccessStyled";
import AlertPopUp from "../../common/notifications/AlertPopUp";
import RecentProjectTealIcon from "../../common/icons/RecentProjectTealIcon";
import FileTealIcon from "../../common/icons/FileTealIcon";
import StarTealIcon from "../../common/icons/StarTealIcon";
import DeleteTealIcon from "../../common/icons/DeleteTealIcon";
import { colors } from "../../common/styles/Theme";
import StandardPrimaryButton from "../../common/styles/components/buttons/standard/StandardPrimaryButton";
import InputWithIcon from "../../common/styles/components/inputs/InputWithIcon";
import ErrorMessage from "../../common/styles/components/headings/ErrorMessage";
import CloseCircleRedIcon from "../../common/icons/CloseCircleRedIcon";
import CloseCircleGreenIcon from "../../common/icons/CloseCircleGreenIcon";
import { useSelector } from "react-redux";
import StyledModal from "../../common/styles/components/modals/CustomModal";
import CloseBlackIcon from "../../common/icons/CloseBlackIcon";
import CustomLabel from "../../common/styles/components/headings/CustomLabel";
import StandardSecondaryButton from "../../common/styles/components/buttons/standard/StandardSecondaryButton";
import TabletCloseMenuIcon from "../../common/icons/TabletCloseMenuIcon";
import { useNavigate } from "react-router-dom";
import DuPont_logo_Red from "../../common/assets/images/1280px-DuPont_logo_Red.svg";
import Wave_PRO_UF_Logo from "../../common/assets/images/Wave-PRO-UF-Logo-02.svg";
import { updateGUnitConversion } from "../../common/utils/GlobalUnitConversionSlice";
import { MyError } from "../../common/utils/ErrorCreator";
import { updateTabAvailable } from "../../common/ReportIXDSlice";
import { updateTabAvailableForUF } from "../../common/ReportUFSlice";
const SideMenu = ({showSideMenu, setShowMenuIcon}) => {   
  const UserInfoStore=useSelector((state)=>state.userInfo.data);
  const userID =UserInfoStore?UserInfoStore.UserId:1;
  const [error, setError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showAlert, setAlertVisibility] = useState(false);
  const [alertData, setAlert] = useState({ type: "", message: "" });
  const [isFocused, setIsFocused] = useState(null);
  const handleFocus = (id) => {
    setIsFocused(id);
  };
  const handleBlur = () => {
    setIsFocused(null);
  };
  const handleShowAlert = (type, message) => {
    setAlert({ type, message });
    setAlertVisibility(true);
  };
  const handleHideAlert = () => {
    setAlert({ type: "", message: "" });
    setAlertVisibility(false);
  };
  const handleOpenCreateNewFolder = () => {
    const newFolderList = FoldersName.data.filter(
      (folder) => folder.folderName.startsWith("Untitled Folder") === true
    );
    newFolderList.sort(
      (x, y) => y.folderName.substring(16) - x.folderName.substring(16)
    );
    let value =
      newFolderList.length !== 0
        ? newFolderList[0].folderName.substring(16)
        : 0;
    const folderValue = parseInt(value) + 1;
    setFolderCount(folderValue);
    setInputValue("Untitled Folder-" + folderValue);
    setError(false);
    setIsOpen(true);
    document.body.classList.add("disable");
  };
  const handleCloseCreateNewFolder = () => {
    setIsOpen(false);
    document.body.classList.remove("disable");
  };
  const [activeMenuItem, setActiveMenuItem] = useState("recent");
  const dispatch = useDispatch();
  const [changeIcon, setChangeIcon] =useState(null);
  const[getData,responsedata] = useLazyGetAllDataQuery();
  const[getDataupdate,updateresponsedata] = useLazyGetAllDataQuery();
  
  const [FoldersName,setFoldersName] =useState("");
  const [folderCount,setFolderCount] =useState("Untitled Folder-");
  const [getUnitConversion, unitConversionResponse] = useLazyGetAllDataQuery();
  useEffect(()=>{
      // getUnitConversion(
      //     `${"masterdata/api/v1/UnitConversion"}?FromUnit=${FromUnit}&ToUnit=${ToUnit}&Inputvalue=${Inputvalue}`);
      getUnitConversion(
          `${"masterdata/api/v1/UnitConversion"}?userID=${1}`);
       console.log("PK function flow",);
  },[]);
  useEffect(() => {
      if (unitConversionResponse.isLoading) {
        // console.log(" system desing category api is Loading");
      }
      if (unitConversionResponse.isError) {
        // console.log(" system desing category api got error" ,response.error );
        throw new MyError(
          "SystemDesig Api Error",
          unitConversionResponse.error.status,
          "ApiError"
        );
      }
  
      if (unitConversionResponse.isSuccess) {
        console.log("PK unit conversion unitConversionResponse.data",unitConversionResponse.data);
        dispatch(updateGUnitConversion(unitConversionResponse.data));
        console.log("PK after dispatch");
      }
    }, [unitConversionResponse]);
  useEffect(()=>{
    if(responsedata.status!=="fulfilled")
    {
       getData(`masterdata/api/v1/FolderList?userID=${userID}`);
    }
    else
    {
      setFoldersName(responsedata); 
    }
  }, [responsedata, FoldersName]);
  useEffect(()=>{
    if(userID>0){
      getData(`masterdata/api/v1/FolderList?userID=${userID}`);
      }

  }, [userID]);

  useEffect(()=>{  
    if(updateresponsedata.status=="fulfilled")
    {
      dispatch(btnlist(updateresponsedata));
    }   
  }, [updateresponsedata]);


  

  const btnRecentProject = (listName) => {
    dispatch(updateLeftpanel("masterdata/api/v1/ProjectRecent"));
    setActiveMenuItem(listName);
    dispatch(updateLoader(false));
  };
  const btnAllProject = (listName) => {
    dispatch(updateLeftpanel("masterdata/api/v1/ProjectAll"));
    setActiveMenuItem(listName);
    dispatch(updateLoader(false));
  };
  const btnfProject = (listName) => {
    dispatch(updateLeftpanel("masterdata/api/v1/ProjectFavorite"));
    setActiveMenuItem(listName);
    dispatch(updateLoader(false));
  };
  const btndeleteProject = (listName) => {
    dispatch(updateLeftpanel("masterdata/api/v1/ProjectDeleted"));
    setActiveMenuItem(listName);
    dispatch(updateLoader(false));
  };
  const btnFolderList = (listName) => {
    dispatch(updateLeftpanel("masterdata/api/v1/FolderList"));
    setActiveMenuItem(listName);
  };
  const btnFolderProject = (listName, e, Folder) => {
    dispatch(updateLeftpanel("masterdata/api/v1/FolderProject"));
    dispatch(FolderProjectID(e));
    dispatch(updatetitle(Folder));
    setselectedfolderID(e);
    setActiveMenuItem(listName);
    dispatch(updateLoader(false));
  };
  const [CreatePost, { data }] = useCreateDataMutation();
  const [MovefoldeprojectData, { getdata }] = useUpdateDataMutation();
  const [inputValue, setInputValue] = useState("");
  const [Message, setMessage] = useState("");
  const getValues = (e) => {
    setFolderCount(e.target.value);
    var myvalus = e.target.value;
    const index = FoldersName.data.findIndex(
      (item) => item.folderName.toLowerCase().trim() === myvalus.toLowerCase().trim()
    );

    if (myvalus.trim() === "") {
      setInputValue(myvalus);
      setMessage("The Foldername field is required!");
      setError(true);
      return;
    } else if (myvalus.length < 3) {
      setInputValue(myvalus);
      setMessage("Folder Name,Three Minimum Length Required!");
      setError(true);
      return;
    } else if (index > -1) {
      setInputValue(myvalus);
      setMessage("Foldername already exist!");
      setError(true);
      return;
    } else {
      setInputValue(myvalus);
      setMessage("");
      setError(false);
    }
   
  };
  const saveAndSubmit = async () => {
    if (inputValue.trim() === "") {
      setError(true);
      return;
    }       
    else
    { const newData = {
      Method: "masterdata/api/v1/Folder",
      userID: userID,
      folderName: inputValue.trim()
    };      
    let ResponseValues = await CreatePost(newData);   
    if (ResponseValues.data.responseMessage =="Success") {
      const message ="Record Created successfully";
      handleShowAlert("success", message);  
      LoadRecord();
    }
    else {
      const errorMessage =`${ResponseValues.data.responseMessage} Records not Created!`;
      handleShowAlert("error", errorMessage);
    }           
    LoadRecord();
    setIsOpen(false);  
    document.body.classList.remove("disable");
    }          
  };

  const LoadRecord = () => {
    getData(`masterdata/api/v1/FolderList?userID=${userID}`);
  };
  const [folderID, setfolderID] = useState("");
  const [selectedfolderID, setselectedfolderID] = useState();
  const [dropdata, setdrodata] = useState([]);  
  const TempStoreData = useSelector((state) => state.cardlist.Temdata);
  const StoreData = useSelector((state) => state.cardlist.data);
  const FolderTempStoreData = useSelector((state) => state.Folderview.Temdata);

  const handleMouseMove = (e) => {
    setfolderID("");
    if (dropdata.length > 0) {
      if (e !== folderID) {
        DragandDrop(e);
        setdrodata("");
      } else {
        console.log("else", e);
        console.log("values", folderID);
      }
      setfolderID(e);
    }
  };
  const DragandDrop = async (e) => {
    const IndexData = FoldersName.data.filter((item) => item.folderID === e);
    console.log("IndexData",dropdata);
    if(dropdata[3] == "false"){
      if (dropdata[2] == "") {
        const DropData = {
          Method: "masterdata/api/v1/ProjectFolderID",
          userID: userID,
          projectID: dropdata[0],
          folderID: e,
        };
        let DropResponseValues = await CreatePost(DropData);
        if (DropResponseValues.data.responseMessage == "Success") {
          const message = `Project '${dropdata[1]}' has been added to '${IndexData[0]?.folderName}'.`;
          handleShowAlert("success", message);
          if(activeMenuItem=="recent"){
            getDataupdate(`masterdata/api/v1/ProjectRecent?userID=${userID}`);
          }
          if(activeMenuItem=="allProject"){
            getDataupdate(`masterdata/api/v1/ProjectAll?userID=${userID}`);
          }
          if(activeMenuItem=="favProject"){
            getDataupdate(`masterdata/api/v1/ProjectFavorite?userID=${userID}`);
          }
          
        } else if (
          DropResponseValues.error.Controldata.responseMessage == "Failure"
        ) {
          const errorMessage = `${DropResponseValues.error.data.responseMessage}`;
          handleShowAlert("error", errorMessage);
        } else {
          const warningMessage = `${DropResponseValues.data.responseMessage}`;
          handleShowAlert("warning", warningMessage);
        }
      } else {
        const MoveData = {
          Method: "masterdata/api/v1/ProjectFolderIDMapping",
          userID: userID,
          projectID: dropdata[0],
          newFolderID: e,
        };
  
        let MoveResponseValues = await MovefoldeprojectData(MoveData);
        if (MoveResponseValues.data.responseMessage == "Success") {            
          const message = `Project '${dropdata[1]}' has been moved to '${IndexData[0].folderName}'.`;
          handleShowAlert("success", message);         
          if(activeMenuItem=="recent"){
            getDataupdate(`masterdata/api/v1/ProjectRecent?userID=${userID}`);
          }
          if(activeMenuItem=="allProject"){
            getDataupdate(`masterdata/api/v1/ProjectAll?userID=${userID}`);
          }
          if(activeMenuItem=="favProject"){
            getDataupdate(`masterdata/api/v1/ProjectFavorite?userID=${userID}`);
          }
       
         
        } else if (MoveResponseValues.error.data.responseMessage == "Failure") {
          const errorMessage = `${MoveResponseValues.error.data.responseMessage}`;
          handleShowAlert("error", errorMessage);
        } else {
          const warningMessage = `${MoveResponseValues.data.responseMessage}`;
          handleShowAlert("warning", warningMessage);
        }
      }
    }
  };
  const onItemDrop = async (data) => {
    const answer_array = data.item.split(",");
    setdrodata(answer_array);
  };

  const handleCloseMenu = () => {
    setShowMenuIcon(false);
  };
  const navigate = useNavigate();
  const handleNavigate = () => {
      navigate("/home");
      dispatch(updateTabAvailable({"FeedSetup":false,"IXD":false}));
      dispatch(updateTabAvailableForUF({"FeedSetup":false,"UF":false}));
  };
  return (
    <>
      <SideMenuUL showSideMenu={showSideMenu}>
      {!showSideMenu?"":
        <div className="tablet_menu_view">
          <div> 
            <button className="close_icon_btn" onClick={handleCloseMenu}><TabletCloseMenuIcon/></button>
          </div>
          <div className="global_header_logo1">                
                <div className="dupont_logo">
                  <a href="https://www.dupont.com/" target="__blank">
                    <img src={DuPont_logo_Red} alt="logo" />
                  </a>
                </div>
                <div>
                  <CustomHeading fontFamily="DiodrumSemiBold" fontSize={"8px"} fontWeight={"600"} label="Water Solutions"/>
                </div>
          </div>
          <div className="global_header_logo2" onClick={handleNavigate}>
            <div>
              <img src={Wave_PRO_UF_Logo} alt="logo" />
            </div>
            <div className="application_name">
              <CustomHeading fontFamily="DiodrumSemiBold" fontSize={"16px"} fontWeight={"600"} color={colors.BrandTagLineColor} label={"WAVE PRO"}/>
            </div>
          </div>
        </div>}
        <div className="import-div">
          <StandardSecondaryButton href='#' className='import-project-btn' disabled={true} label="Import Project" />
        </div>
        <div className="project_navigation_menu">
          <ul className="project_navigation_menu_list">
            <li className={activeMenuItem === "recent" ? "li-active" : ""} onClick={() => btnRecentProject("recent")} onMouseEnter={()=>setChangeIcon("recent")} onMouseLeave={()=>setChangeIcon(null)}>
              
              <CustomLabel label="Recent Projects">
              {activeMenuItem === "recent" || changeIcon==="recent" ? (
                <RecentProjectTealIcon />
              ) : (
                <RecentProjectIcon />
              )}
              </CustomLabel>
            </li>
            <li className={activeMenuItem === "allProject" ? "li-active" : ""} onClick={() => btnAllProject("allProject")} onMouseEnter={()=>setChangeIcon("allProject")} onMouseLeave={()=>setChangeIcon(null)}>
            <CustomLabel label="All Projects">
              {activeMenuItem === "allProject" || changeIcon=== "allProject"? (
                  <FileTealIcon />
                ) : (
                  <FileIcon />
                )}
            </CustomLabel>
            </li>
            <li className={activeMenuItem === "favProject" ? "li-active" : ""} onClick={() => btnfProject("favProject")} onMouseEnter={()=>setChangeIcon("favProject")} onMouseLeave={()=>setChangeIcon(null)}>
            <CustomLabel label="Favourite Projects">
              {activeMenuItem === "favProject" || changeIcon ==="favProject"? (
                  <StarTealIcon />
                ) : (
                  <StarIcon />
                )}
            </CustomLabel>
            </li>
            <li className={activeMenuItem === "delProject" ? "li-active" : ""} onClick={() => btndeleteProject("delProject")} onMouseEnter={()=>setChangeIcon("delProject")} onMouseLeave={()=>setChangeIcon(null)}>
            <CustomLabel label="Deleted">
              {activeMenuItem === "delProject" || changeIcon==="delProject"? (
                  <DeleteTealIcon />
                ) : (
                  <DeleteIcon />
                )}
            </CustomLabel>
            </li>
          </ul>
        </div>
        <span className="divider_line"></span>
        <div className="d-flex">
          <Accordion>
            <Accordion.Header>
              <div onClick={LoadRecord}>Folders</div>
            </Accordion.Header>
            <div className="d-flex align-items-start information">
              <p>
                {/* <span> */}
                  Note that you can add your projects into folders with our drag
                  and drop feature. Double click the folder’s title to rename
                  them.
                {/* </span> */}
              </p>
              <div
                className={activeMenuItem === "FolderList" ? "li-active" : " "}
                onClick={() => btnFolderList("FolderList")}
              >
                <a href="#" className="view-all-folder" onClick={btnFolderList}>
                  View all folders <ArrowRightIcon />
                </a>
              </div>
            </div>
            <Accordion.Body>
              <ul className="list-unstyled folder-list">
                {FoldersName.data?.map((u, ind) => {
                  return (
                    <>
                      <Droppable
                        types={["item"]}
                        onDrop={onItemDrop}
                        key={`droppable-${ind}`}
                      >
                        <li
                          key={`droppable-list-item-${ind}`}
                          onMouseOver={() => handleMouseMove(u.folderID)}
                          className={
                            activeMenuItem === "FolderProject"
                              ? u.folderID == selectedfolderID
                                ? "li-active"
                                : ""
                              : ""
                          }
                          onClick={() =>
                            btnFolderProject(
                              "FolderProject",
                              u.folderID,
                              u.folderName
                            )
                          }
                        >
                          {u.folderName}
                        </li>
                      </Droppable>
                    </>
                  );
                })}
              </ul>
            </Accordion.Body>
          </Accordion>
          <div
            className="create-folder text-right"
            onClick={handleOpenCreateNewFolder}
          >
            <PlusIcon className="create-folder-icon" />
          </div>
        </div>
      </SideMenuUL>
      {/* {isOpen && ( */}
      <StyledModal
        show={isOpen}
        onHide={handleCloseCreateNewFolder}
        backdrop="static"
        keyboard="false"
        centered
        maxWidth="572px"
        backgroundColor={colors.GreyF8}
      >
          <Modal.Header>
            <CustomHeading
              fontFamily="DiodrumSemiBold"
              fontSize="16px"
              fontWeight="600"
              color={colors.PrimaryDarkAquaMarine}
              label="Create New Folder"
            />
            <div className="close-icon" onClick={handleCloseCreateNewFolder}>
              <CloseIcon/>
            </div>
          </Modal.Header>
          <Modal.Body>
            <CustomLabel label="Folder Name"/>
            <InputWithIcon
              onBlur={handleBlur}
              onClick
              onFocus={() => handleFocus(1)}
              isFocused={isFocused === 1}
              placeholder="Folder Name"
              autoFocus={true}
              value={inputValue}
              aria-label="Small"
              disabled={false}
              isError={error}
              isWarning={false}
              maxlength="200"
             // minlength="3"
              type="text"
              aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => getValues(e)}
              required
              inputText={
                error ? <CloseCircleRedIcon /> : <CloseCircleGreenIcon />
              }
              unitBgColor="transparent"
            />
            <ErrorMessage errorIcon={true} style={{visibility:error ?"visible":"hidden"}} texMsg={Message} />
          </Modal.Body>
          <Modal.Footer>
            <StandardPrimaryButton
              variant="light"
              type="submit"
              id=""
              disabled={error ? "true" : ""}
              onClick={saveAndSubmit}
              label="Create Folder"
            />
          </Modal.Footer>
      </StyledModal>
      {showAlert ? (
        <AlertPopUp
          type={alertData?.type}
          message={alertData?.message}
          close={handleHideAlert}
        />
      ) : null}
      {/* )} */}
      {/* {isOpen && <Overlay>
        <div className="overlay" />
      </Overlay>} */}
    </>
  );
};

export default SideMenu;
