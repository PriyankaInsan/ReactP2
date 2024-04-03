import React from "react";
import { Card, Form, InputGroup, Row } from "react-bootstrap";
import SystemDiagram from "./SystemDiagram";
import EquipmentStyled from "./EquipmentStyled";
import InfoIcon from "../../../common/icons/InfoIcon";
import IconWithTooltip from "../../../common/styles/components/headings/IconWithTooltip";
import StyledCard from "../../../common/styles/components/cards/CustomCard";
import CustomHeading from "../../../common/styles/components/headings/CustomHeading";
import { colors } from "../../../common/styles/Theme";
import InputWithText from "../../../common/styles/components/inputs/InputWithText";
import { useState } from "react";
import CustomLabel from "../../../common/styles/components/headings/CustomLabel";
import InputReferenceText from "../../../common/styles/components/headings/InputReferenceText";
const Equipment = () => {
  const [isFocused, setIsFocused] = useState(null);
  const handleFocus = (id) => {
    setIsFocused(id);
  };
  const handleBlur = () => {
    setIsFocused(null);
  };
  return (
    <>
      <EquipmentStyled className="g-0">
        <SystemDiagram/>
        <StyledCard className="equipment-settings-card">
          <Card.Header>
            <CustomHeading fontFamily="DiodrumRegular" fontSize="14px" fontWeight="400" 
            color={colors.PrimaryDarkAquaMarine} label="Equipment Settings"/>
            <Card.Title className="info-icon"><IconWithTooltip label="Provide typical values for piping and distributor pressure drop, and the required outlet pressure." icon={<InfoIcon />}/></Card.Title>
          </Card.Header>
          <Card.Body className="equipment-body">
            <div>
              <CustomLabel label="Typical Pressure Drop of Internal Distributors:" disabled={false}/>
              <div className="input-field">
                <InputWithText isError={false} isWarning={false} disabled={false} type="text" id="typicalPressureDropInput" 
                defaultValue="0.05" inputText="bar/distributor" onBlur={handleBlur} onFocus={()=>handleFocus(1)}
                isFocused={isFocused===1}/>
                <InputReferenceText refText="Lorem ipsum dolor sit amet, ranges XXX-YYY, sed do ei"/>
              </div>
            </div>
            <div>
              <CustomLabel label="Typical Pressure Drop of External Piping:" disabled={false}/>
              <div className="input-field">
                <InputWithText isError={false} isWarning={false} disabled={false} type="text" id="typicalPressureDropInput" 
                  defaultValue="0.05" inputText="bar/vessel" onBlur={handleBlur} onFocus={()=>handleFocus(2)}
                  isFocused={isFocused===2}/>
                <InputReferenceText refText="Lorem ipsum dolor sit amet, ranges XXX-YYY, sed do ei"/>
              </div>
            </div>
            <div>
              <CustomLabel label="Effluent Pressure" disabled={false}/>
              <div className="input-field">
                <InputWithText isError={false} disabled={false} isWarning={false} type="text" id="typicalPressureDropInput" 
                  defaultValue="0.05" inputText="bar" onBlur={handleBlur} onFocus={()=>handleFocus(3)}
                  isFocused={isFocused===3}/>
                <InputReferenceText refText="Lorem ipsum dolor sit amet, ranges XXX-YYY, sed do ei"/>
              </div>
            </div>
            <div>
              <CustomLabel label="Bulk Chemical Storage Tank Temperature" disabled={false}/>
              <div className="input-field">
                <InputWithText isError={false} disabled={false} isWarning={false} type="text" id="typicalPressureDropInput" 
                  defaultValue="0.05" inputText="&deg;C" onBlur={handleBlur} onFocus={()=>handleFocus(4)}
                  isFocused={isFocused===4}/>
                <InputReferenceText refText="Lorem ipsum dolor sit amet, ranges XXX-YYY, sed do ei"/>
              </div>
            </div>
          </Card.Body>
        </StyledCard>
      </EquipmentStyled>
    </>
  );
};

export default Equipment;