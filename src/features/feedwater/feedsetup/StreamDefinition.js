/* eslint-disable max-len */
import React, { useState } from "react";
import { Col, Row, Form, InputGroup } from "react-bootstrap";
import DeleteIcon from "../../../common/icons/DeleteIcon";
import StreamDefinitionStyled from "./StreamDefinitionStyled";
import InfoIcon from "../../../common/icons/InfoIcon";
import PencilIcon from "../../../common/icons/PencilIcon";
import WarningDeleteStreamMessage from "../modals/WarningDeleteStreamMessage";
import RightTickMarkBigIcon from "../../../common/icons/RightTickMarkBigIcon";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updatetitle } from "./FeedsetupSlice";
import { useEffect } from "react";
import IconWithTooltip from "../../../common/styles/components/headings/IconWithTooltip";
import CustomHeading from "../../../common/styles/components/headings/CustomHeading";
import { colors } from "../../../common/styles/Theme";
import InputWithText from "../../../common/styles/components/inputs/InputWithText";
import CustomRadioCheck from "../../../common/styles/components/checkboxs/CustomRadioCheck";
import StandardLinkSButtonWithIcon from "../../../common/styles/components/buttons/standard/StandardLinkSButtonWithIcon";
import PlusIconGray from "../../../common/icons/PlusIconGray";
import CustomLabel from "../../../common/styles/components/headings/CustomLabel";
import PencilIconBlack from "../../../common/icons/PencilIconBlack";
import CustomRadio from "../../../common/styles/components/radios/CustomRadio";
const StreamDefinition = ({scrollDirection}) => {
  const[selectedStream,setselectedStream]=useState("Stream1");
  const[calculateTextStream,setcalculateTextStream]=useState(0.00);
  const[openDeleteStreamMessage, setOpenDeleteStreamMessage] = useState(false);
  const [renameStream, setRenameStream] = useState(false);
  const [Stream, setStream] = useState("Stream 1");
  const [isFocused, setIsFocused] = useState(null);
  const StoreData = useSelector((state) => state.Feedsetupdetailsdatapanel.title);
  const [header, setHeader] = useState(false);
  console.log("StoreData Stream name ", StoreData);

  useEffect(()=>{   
    if (StoreData === 0 && StoreData.trim()=="") {
      <div>Loading....</div>;
    }
    else {
      setStream(StoreData);
    } 
   },[StoreData]);

  const dispatch = useDispatch();
  const handleOpenWarningMessage = () =>{
    setOpenDeleteStreamMessage(true);
  };
  const onChangStream=(e)=>{
    console.log("Stream selected"+e.target.value);
    setselectedStream(e.target.value);
  };
  const onChangTextStream=(e)=>{
    console.log("text Stream selected"+e.target.value);
    let value=parseFloat(calculateTextStream)+parseFloat(e.target.value);
    setcalculateTextStream(value);
  };

  const testchange=(e)=>{
    console.log("text "+e);
    setStream(e);
  };

  

  const renameStreamName = ()=>{
    setRenameStream(true);
  };
  const closeStreamName = ()=>{
    setRenameStream(false);
    dispatch(updatetitle(Stream));
    
  };
  const handleFocus = (id)=>{
    setIsFocused(id);
  };
  const handleBlur = ()=>{
    setIsFocused(null);
  };

  console.log("checking........................", scrollDirection);

  return (
    <>
      <StreamDefinitionStyled scrollDirection={scrollDirection}>
        <div className="stream-heading">
        <CustomHeading className="stream-definition-title" fontFamily="NotoSansSemiBold" fontSize="14px" fontWeight="700" color={colors.PrimaryDarkAquaMarine} label="Stream Definition"/>
        <IconWithTooltip label="Create multiple feed streams and blend them together. Flow percentages must sum to 100%." icon={<InfoIcon />}/>
        <StandardLinkSButtonWithIcon label="Add Stream" icon={<PlusIconGray/>} disabled={true}/>
        </div>
        <div className="stream-definition-column">
          <div className="stream-group" onChange={onChangStream}>
            <div className={selectedStream==="Stream1"?"radio-group radio-group-active":"radio-group"}>
              <CustomRadio type="radio" name="radiosort" label="Stream 1" value="Stream1" defaultChecked={true} />
              <div className="percentage-wrapper">
                  <InputWithText defaultValue="100.00" min="0" max="10" step="0.01" disabled={true}
                  onChange={onChangTextStream} inputText="&#x25;" isError={false} isWarning={false}
                    isFocused={isFocused===1} onBlur={handleBlur} onFocus={()=>handleFocus(1)}
                  />
                  
                {/* <span className="delete-icon" onClick={handleOpenWarningMessage}><DeleteIcon/>
                  <WarningDeleteStreamMessage show={openDeleteStreamMessage} close={setOpenDeleteStreamMessage}/>
                </span> */}
              </div>
            </div>
            {/* <div className={selectedStream==="Stream2"?"radio-group radio-group-active":"radio-group"}>
              <Form.Group className="mb-1" controlId="formBasicCheckbox">
                <Form.Check type="radio" name="radiosort" label="Stream 2" value="Stream2"/>
              </Form.Group>
              <div className="percentage-wrapper">
                <InputGroup>
                  <Form.Control defaultValue="0.00" onChange={onChangTextStream} aria-label="" aria-describedby="basic-addon2"/>
                  <InputGroup.Text id="basic-addon2">&#x25;</InputGroup.Text>
                </InputGroup>
                <span className="delete-icon"><DeleteIcon/></span>
              </div>
            </div>
            <div className={selectedStream==="Stream3"?"radio-group radio-group-active":"radio-group"}>
              <Form.Group className="mb-1" controlId="formBasicCheckbox">
                <Form.Check type="radio" name="radiosort" label="Stream 3" value="Stream3"/>
              </Form.Group>
              <div className="percentage-wrapper">
                <InputGroup>
                  <Form.Control defaultValue="0.00" onChange={onChangTextStream} aria-label="" aria-describedby="basic-addon2"/>
                  <InputGroup.Text id="basic-addon2">&#x25;</InputGroup.Text>
                </InputGroup>
                <span className="delete-icon"><DeleteIcon/></span>
              </div>
            </div>
            <div className={selectedStream==="Stream4"?"radio-group radio-group-active":"radio-group"}>
              <Form.Group className="mb-1" controlId="formBasicCheckbox">
                <Form.Check type="radio" name="radiosort" label="Stream 4" value="Stream4"/>
              </Form.Group>
              <div className="percentage-wrapper">
                <InputGroup>
                  <Form.Control defaultValue="0.00" onChange={onChangTextStream} aria-label="" aria-describedby="basic-addon2"/>
                  <InputGroup.Text id="basic-addon2">&#x25;</InputGroup.Text>
                </InputGroup>
                <span className="delete-icon"><DeleteIcon/></span>
              </div>
            </div>
            <div className={selectedStream==="Stream5"?"radio-group radio-group-active":"radio-group"}>
              <Form.Group className="mb-1" controlId="formBasicCheckbox">
                <Form.Check type="radio" name="radiosort" label="Stream 5" value="Stream5"/>
              </Form.Group>
              <div className="percentage-wrapper">
                <InputGroup>
                  <Form.Control defaultValue="0.00" onChange={onChangTextStream} aria-label="" aria-describedby="basic-addon2"/>
                  <InputGroup.Text id="basic-addon2">&#x25;</InputGroup.Text>
                </InputGroup>
                <span className="delete-icon"><DeleteIcon/></span>
              </div>
            </div>
            <div className={selectedStream==="Stream6"?"radio-group radio-group-active":"radio-group"}>
              <Form.Group className="mb-1" controlId="formBasicCheckbox">
                <Form.Check type="radio" name="radiosort" label="Stream 6" value="Stream6"/>
              </Form.Group>
              <div className="percentage-wrapper">
                <InputGroup>
                  <Form.Control defaultValue="0.00" onChange={onChangTextStream} aria-label="" aria-describedby="basic-addon2"/>
                  <InputGroup.Text id="basic-addon2">&#x25;</InputGroup.Text>
                </InputGroup>
                <span className="delete-icon"><DeleteIcon/></span>
              </div>
            </div>
            <div className={selectedStream==="BComposite"?"radio-group radio-group-active":"radio-group blended-composite"}>
              <Form.Group className="mb-1" controlId="formBasicCheckbox">
                <Form.Check type="radio" name="radiosort" label="Blended Composite" value="BComposite"/>
                <span className="info-icon"><InfoIcon/></span>
              </Form.Group>
              <div className="percentage-wrapper">
                <InputGroup>
                  <Form.Control aria-label="" value={calculateTextStream} aria-describedby="basic-addon2"/>
                  <InputGroup.Text id="basic-addon2">&#x25;</InputGroup.Text>
                </InputGroup>
                <span className="delete-icon"><DeleteIcon/></span>
              </div>
            </div> */}
          </div>
        </div>
        <div className="stream-indicator">
          <div>
            <CustomLabel label="You are currently viewing parameters for:"/>
          </div>
          {renameStream?(
            <div className="edit-stream">
              <CustomHeading className="feed-stream-name" lineHeight="22px" fontFamily="NotoSansSemiBold" fontSize="14px" fontWeight="700"
                color={colors.PrimaryDarkAquaMarine} label="Feed Setup -"/>
                <input type="text" placeholder="1" defaultValue={Stream} onChange={(e)=>testchange(e.target.value)}/>
                <div className="icon" onClick={closeStreamName}>
                  <RightTickMarkBigIcon/>
                </div>
            </div>):(
            <div className="normal-stream">
              <CustomHeading className="feed-stream-name" lineHeight="22px" fontFamily="NotoSansSemiBold" fontSize="14px" fontWeight="700"
               color={colors.PrimaryDarkAquaMarine} label={`Feed Setup - ${Stream}`}/>
               <div className="icon" onClick={renameStreamName}>
                <PencilIconBlack/>
               </div>
            </div>
          )}
        </div>
        
      </StreamDefinitionStyled>
    </>
  );
};

export default StreamDefinition;