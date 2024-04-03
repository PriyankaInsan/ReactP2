import React, { useState, useEffect } from "react";
import {
  useCreateDataMutation,
  useLazyGetAllDataQuery,
} from "../../../services/apiConfig";
import { MyError } from "../../../common/utils/ErrorCreator";
import { useSelector, useDispatch } from "react-redux";
import { updateViewReport, updateCalcEngData } from "../ix/IXDSlice";
import Loader from "../../../common/utils/Loader";
import ProjectErrorPopup from "../../modals/ProjectErrorPopup";
import { useNavigate } from "react-router-dom";
// import { saveAs } from "file-saver";
const ViewReport = () => {
  const dispatch = useDispatch();

  const [getData, response] = useLazyGetAllDataQuery();
  const [pdfData, setPdfData] = useState("");
  const ProjectInfoStore = useSelector((state) => state.projectInfo.data);
  const UserInfoStore = useSelector((state) => state.userInfo.data);
  const userID = UserInfoStore ? UserInfoStore.UserId : 1;
  const { reportData, error, errorMsgCode, loader } = useSelector(
    (state) => state.scrollData
  );
  const [hasError, setHasError] = useState(error);

  console.log(reportData, "PK reportData");
  useEffect(() => {
    document.body.addEventListener("keydown", handleKeyDown);
     return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
 
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setHasError(false);
    }
  };

  // useEffect(() => {
  //   getData(
  //     `ix/api/v${1}/GenerateReport?userID=${userID}&projectID=${
  //       ProjectInfoStore.projectID
  //     }`
  //   );
  // }, []);
  // useEffect(() => {
  //   console.log(response, "response");
  //   if (response.isLoading) {
  //     console.log(" view report category api is Loading");
  //   }
  //   if (response.isError) {
  //     throw new MyError("Report Api Error", response.error.status, "ApiError");
  //   }
  //   if (response.isSuccess) {
  //     console.log("responsefromapi view report", response.data);
  //     convertBase64ToPDF(response.data);
  //     dispatch(updateViewReport("true"));
  //     dispatch(updateCalcEngData("true"));
  //   }
  // }, [response]);

  useEffect(() => {
    if (reportData) {
      convertBase64ToPDF(reportData);
      dispatch(updateViewReport("true"));
      dispatch(updateCalcEngData("true"));
    }
  }, [reportData]);

  const convertBase64ToPDF = (base64String) => {
    // const byteArrayEx= JSON.parse(base64String);
    console.log("base64String", base64String);
    const byteCharacters = atob(base64String);
    console.log("byteCharacters", byteCharacters);
    const byteArray = new Uint8Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArray[i] = byteCharacters.charCodeAt(i);
    }
    const blob = new Blob([byteArray], { type: "application/pdf" });
    const pdfUrl = URL.createObjectURL(blob);
    console.log("blob", blob);
    setPdfData(pdfUrl);
    // saveAs(blob, "converted.pdf");
  };
  useEffect(() => {
    if (error) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [error]);
  if (error) {
    return (
      <div
        style={{
          width: "100%",
          height: "370px",
          minHeight:"80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ProjectErrorPopup
          show={hasError}
          close={() => {
            setHasError(false);
          }}
          message={
            "An error occurred due to an inappropriate value entered. Please ensure that you have provided valid inputs."
          }
        />
      </div>
    );
  }
  if (loader) {
    return (
      <div
        style={{
   
          height: "270px",

        }}
      >
        <Loader />;
      </div>
    );
  }

  return (
    <>
      <>
        <iframe
          src={pdfData}
          title="PDF Viewer"
          style={{ width: "100%", minHeight:"85vh", border: "none" }}
        >
        </iframe>
        {/* <a href={pdfData} download="newName.pdf"></a> */}
      </>
    </>
  );
};

export default ViewReport;
