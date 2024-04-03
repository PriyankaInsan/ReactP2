/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import React from "react";
import { useSelector } from "react-redux";
import  { useState } from "react";
import ComonStyled from "./ComonStyled";
import ProjectHeadline from "./ProjectHeadline";

const CommonSection = () => {
  const StoreSidLeftpanel=useSelector((state)=>state.leftpanel.data);
  const Foldertitel=useSelector((state)=>state.FolderProjectleftpanel.title);
  const[modal, setModel]= useState(false);
  const toggleModel = () => {
    setModel(!modal);
  };
  const[isCarouselOpen, setCarouselOpen] = useState(true);
  const handleCloseCarousel =()=>{
    setCarouselOpen(false);
  };
  
  return (
    <> 
      
      <ComonStyled>
        {(() => {

          if(StoreSidLeftpanel === "masterdata/api/v1/ProjectRecent"){
            return(<ProjectHeadline/>);
          }
          else if(StoreSidLeftpanel === "masterdata/api/v1/ProjectAll"){
            return ( <div className="all-project-headline"> {handleCloseCarousel}
              <h6>One stop place with all your projects. Utilise search and filter to find the desire project.</h6>
            </div>);
          }
          else if(StoreSidLeftpanel ==="masterdata/api/v1/ProjectFavorite"){
            return ( <div className="favorite-project-headline">
              <h6>The collection have all the projects starred by you. To remove a project from this collection, click on the three-dot menu and remove the project from favourites.</h6>
            </div>);
          }
          else if(StoreSidLeftpanel ==="masterdata/api/v1/ProjectDeleted"){
            return (<div className="deleted-project-headline">
              <h6>Note that projects show the date of deletion. The projects can be retained for 30 days, after which they will be permanently deleted.</h6>
            </div>);
          }
          else if(StoreSidLeftpanel ==="masterdata/api/v1/FolderList"){
            return (<div className="all-folder-headline">
              <h6 className="page-heading">All Folders</h6>
              <p className="page-sub-heading">Select the folders to see the projects under them..</p>              
            </div>);
          }
          else if(StoreSidLeftpanel ==="masterdata/api/v1/FolderProject"){
            return (<div className="all-folder-headline">
              <h6 className="page-heading">{Foldertitel}</h6>             
            </div>);
          }
        })()}
      </ComonStyled>

    </>
  );
};

export default CommonSection;