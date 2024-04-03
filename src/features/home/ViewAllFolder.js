/* eslint-disable max-len */
import React from "react";
import { Card, Col, Row, Dropdown} from "react-bootstrap";
import { useState } from "react";
import { ViewAllFolderStyled } from "./ViewAllFolderStyled";
import FolderIcon from "../../common/icons/FolderIcon";
import MoreVertIcon from "../../common/icons/MoreVertIcon";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLazyGetAllDataQuery } from "../../services/apiConfig";
import { useDispatch } from "react-redux";
import { Folderbtnlist, FolderupdateLoader,FolderTempbtnlist, sortFolderData } from "../home/ViewAllFolderSlice";
import { updateLeftpanel } from "../menu/SideMenuSlice";
import {FolderProjectID,updatetitle} from "../menu/FolderProjectSlice";
import StyledCard from "../../common/styles/components/cards/CustomCard";

const ViewAllFolder = () => {
  // const userID = 1;  
  const dispatch = useDispatch();
  const UserInfoStore=useSelector((state)=>state.userInfo.data);
  const userID =UserInfoStore?UserInfoStore.UserId:1;
  const [Cardstate, setCard] = useState([]);
  const StoreSidLeftpanel=useSelector((state)=>state.leftpanel.data);
  const FolderStoreData = useSelector((state) => state.Folderview.data);
  const FolderTempStoreData = useSelector((state) => state.Folderview.Temdata);
  const [selectedfolderID, setselectedfolderID] = useState();
  const [activeMenuItem, setActiveMenuItem] = useState("recent");
  const {title,order,pTitle} =useSelector((state) => state.Folderview);

  
  const[getData,responsedata] = useLazyGetAllDataQuery(); 
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
  
  return (
    <>
      <ViewAllFolderStyled>
      {!FolderStoreData.length ? <h6 className="error-msg">Records not found</h6>:
          Cardstate?.map((u,i) => {
            return (
              <>
                <StyledCard className="folder_card" key={i}>
                  <Card.Body>
                    <Card.Title className="d-flex justify-content-between" >
                      <h6 onClick={() => btnFolderProject("FolderProject",u.folderID,u.folderName)}>{u.folderName}</h6>
                      <Dropdown className="project-option-dropdown">
                        <Dropdown.Toggle variant="">
                          <MoreVertIcon/>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item href="#/action-1">
                            <a href="#" onClick={() => btnFolderProject("FolderProject",u.folderID,u.folderName)}>Open Folder</a>
                          </Dropdown.Item>                          
                          {/* <Dropdown.Item href="#/action-3">
                            <a href="#">Duplicate this Folder</a>
                          </Dropdown.Item>                          
                          <Dropdown.Item href="#/action-3">
                            <a href="#" onClick={()=>DeleteRecord(u.folderID)}>Delete Folder</a> 
                          </Dropdown.Item>                
                          <Dropdown.Item href="#/action-3">
                            <a href="#">Rename Folder</a>
                          </Dropdown.Item> */}
                        </Dropdown.Menu>
                      </Dropdown>
                    </Card.Title>
                    <Card.Text>
                      <p>{u.modifiedDuration}</p>
                    </Card.Text>
                  </Card.Body> 
                  <Card.Body className="folder-card-body" onClick={() => btnFolderProject("FolderProject",u.folderID,u.folderName)}>
                    <FolderIcon/>
                  </Card.Body>               
                </StyledCard>   
              </>
            );
          })
        }
      </ViewAllFolderStyled>
           
    </>
  );
};

export default ViewAllFolder;