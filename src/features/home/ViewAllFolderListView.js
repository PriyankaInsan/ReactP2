/* eslint-disable max-len */
import React from "react";
import { Row, Col, Card, Dropdown} from "react-bootstrap";
import { ViewAllFolderListViewStyled } from "./ViewAllFolderListViewStyled";
import FolderIcon from "../../common/icons/FolderIcon";
import MoreVertIcon from "../../common/icons/MoreVertIcon";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useLazyGetAllDataQuery } from "../../services/apiConfig";
import { updateLeftpanel } from "../menu/SideMenuSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Folderbtnlist, FolderupdateLoader,FolderTempbtnlist,sortData,sortFolderData } from "../home/ViewAllFolderSlice";
import ShortUpArrow from "../../common/icons/ShortUpArrow";
import SortDownArrow from "../../common/icons/SortDownArrow";
import {FolderProjectID,updatetitle} from "../menu/FolderProjectSlice";
import { updateFlag } from "./CardListSlice";
import { updateProjectInfo } from "../../common/ProjectInfoSlice";
import { useNavigate } from "react-router-dom";
import CustomHeading from "../../common/styles/components/headings/CustomHeading";
import StyledCard from "../../common/styles/components/cards/CustomCard";
import { colors } from "../../common/styles/Theme";

const ViewAllFolderListView = () => {
  const UserInfoStore=useSelector((state)=>state.userInfo.data);
  const userID =UserInfoStore?UserInfoStore.UserId:1;
  const dispatch = useDispatch();
  dispatch(updateLeftpanel("masterdata/api/v1/FolderList"));
  const [Cardstate, setCard] = useState([]);
  const StoreSidLeftpanel=useSelector((state)=>state.leftpanel.data);
  const FolderStoreData = useSelector((state) => state.Folderview.data);
  const FolderTempStoreData = useSelector((state) => state.Folderview.Temdata);
  const {title,order,pTitle} =useSelector((state) => state.Folderview);
  const [selectedfolderID, setselectedfolderID] = useState();
  const [activeMenuItem, setActiveMenuItem] = useState("recent");
  const[getData,responsedata] = useLazyGetAllDataQuery();
  const ProjectInfoStore = useSelector((state) => state.projectInfo.data);
  const navigate= useNavigate();

  
  useEffect(()=>{    
    if(responsedata.status!=="fulfilled"){
      getData(`${StoreSidLeftpanel}?userID=${userID}`);
    }
    else
    {      
      dispatch(Folderbtnlist(responsedata.data));
      dispatch(FolderTempbtnlist(responsedata.data));
      dispatch(FolderupdateLoader(false));
      dispatch(sortFolderData({flag:pTitle,data:responsedata.data}));

    }    
  },[responsedata,StoreSidLeftpanel]);

  
  useEffect(()=>{
    LoadRecord();
  },[FolderStoreData]);
  const LoadRecord=()=>{
    setCard([]);
    if(FolderStoreData===0)
    {
      <div>Loading....</div>;
    }
    else
    {
      setCard([]);
      FolderStoreData.forEach(element => {
        
        setCard(current => [...current, {folderID:element.folderID,folderName:element.folderName,createdDate:element.createdDate,updatedDate:element.updatedDate,modifiedDuration:element.modifiedDuration,createdDateDuration:element.createdDateDuration}]);
      });
    }
  };
  const btnFolderProject = (listName,e,Folder) => {
    dispatch(updateLeftpanel("masterdata/api/v1/FolderProject"));
    dispatch(FolderProjectID(e));
    dispatch(updatetitle(Folder));    
    setselectedfolderID(e);
    setActiveMenuItem(listName);
    dispatch(FolderupdateLoader(false));
  }; 

  const handleSort1 = ()=>{
    dispatch(sortData("PN"));
    if(order === "D"){
      dispatch(updateFlag("Folder Name (ascending)"));
    }
    else{
      dispatch(updateFlag("Folder Name (descending)"));
    }
  };

  const handleSort2 = ()=>{
    dispatch(sortData("CD"));
    dispatch(updateFlag("Date Created"));
  };


  return (
    <>
      <ViewAllFolderListViewStyled>
          {!FolderStoreData.length ? <h6 className="error-msg">Records not found</h6>:
            <>
              <div className="folder_header_section">
                <div className="folder_name_title">
                  <CustomHeading fontSize={"18px"} color={colors.blackTransparency045} onClick={handleSort1}>Folder Name</CustomHeading>
                    {title==="PN"?
                      <div>
                        {order==="D"?
                          <div className="arrow-updown-icon">
                            <ShortUpArrow/>
                          </div>
                          :
                          <div className="arrow-updown-icon">
                            <SortDownArrow/>
                          </div>
                        }
                      </div>
                      :""}
                </div>
                <div className="folder_created_title">
                  <CustomHeading fontSize={"18px"} color={colors.blackTransparency045} onClick={handleSort2}>Created</CustomHeading>
                    {title==="CD"?
                      <div>
                        {order==="D"?
                          <div className="arrow-updown-icon" >
                            <ShortUpArrow />
                          </div>
                          :
                          <div className="arrow-updown-icon">
                            <SortDownArrow/>
                          </div>
                        }
                      </div>
                      :""}
                </div>
                <div className="hidden"></div>
              </div>
              <div className="folder_cards_wrapper" >
              {Cardstate?.map((u,i) => {
                return (
                  <StyledCard className="folder_list_view_card" key={i}>
                    <div className="folder_name" onClick={() => btnFolderProject("FolderProject",u.folderID,u.folderName)}>
                      <FolderIcon/>
                      <CustomHeading fontFamily="NotoSansRegular" fontSize={"16px"}>{u.folderName}</CustomHeading>
                    </div>
                    <div className="folder_created" onClick={() => btnFolderProject("FolderProject",u.folderID,u.folderName)}>
                      <CustomHeading fontFamily="NotoSansRegular" fontSize={"16px"}>{u.modifiedDuration}</CustomHeading>
                    </div>
                    <div className="folder_option">
                      <Dropdown className="project-option-dropdown">
                        <Dropdown.Toggle variant="">
                          <MoreVertIcon />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item href="#/action-1">
                            <a href="#" onClick={() => btnFolderProject("FolderProject",u.folderID,u.folderName)}>Open Folder</a>
                          </Dropdown.Item>
                          {/* <Dropdown.Item href="#/action-3">
                            <a href="#">Duplicate this Folder</a>
                          </Dropdown.Item>
                          <Dropdown.Item href="#/action-3">
                            <a href="#">Delete Folder</a>
                          </Dropdown.Item>
                          <Dropdown.Item href="#/action-3">
                            <a href="#">Rename Folder</a>
                          </Dropdown.Item> */}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </StyledCard>
                );
              })}
              </div>
            </>}
      </ViewAllFolderListViewStyled>
      
    </>
  );
};

export default ViewAllFolderListView;