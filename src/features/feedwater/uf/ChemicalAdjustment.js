/* eslint-disable max-len */
import { Card, Form, Modal } from "react-bootstrap";
import React, {useState} from "react";
import CustomHeading from "../../../common/styles/components/headings/CustomHeading";
import StandardLinkButtonWithIcon from "../../../common/styles/components/buttons/standard/StandardLinkButtonWithIcon";
import CloseBlackIcon from "../../../common/icons/CloseBlackIcon";
import { colors } from "../../../common/styles/Theme";
import ChemicalAdjustmentStyled from "./ChemicalAdjustmentStyled";
import TechButtons from "../../../common/styles/components/buttons/techButtons/TechButtons";
import BigVerticalLineLIcon from "../../../common/icons/BigVerticalLineLIcon";
import BigVerticalLineRIcon from "../../../common/icons/BigVerticalLineRIcon";
import StyledCard from "../../../common/styles/components/cards/CustomCard";
import CustomSelect from "../../../common/styles/components/selects/CustomSelect";
import InputWithText from "../../../common/styles/components/inputs/InputWithText";
import InfoIcon from "../../../common/icons/InfoIcon";
import RightLongArrowPhIcon from "../../../common/icons/RightLongArrowPhIcon";
import ArrowRightIcon from "../../../common/icons/ArrowRightIcon";
import ArrowDownBlackIcon from "../../../common/icons/ArrowDownBlackIcon";
import StandardPrimaryButton from "../../../common/styles/components/buttons/standard/StandardPrimaryButton";
import ToggleSwitch from "../../../common/styles/components/switches/CustomSwitch";
const ChemicalAdjustment = ({show, close}) => {
    const[isFocused, setIsFocused] = useState(null);
    const handleBlur = ()=> {
        setIsFocused(null);
    };
    const handleFocus = (id)=> {
        setIsFocused(id);
    };
  return (
    <>
    <ChemicalAdjustmentStyled show={show} onHide={close} centered backdrop="static" keyboard={false}>
        <Modal.Header>
            <div className="main-title-wrapper">
                <CustomHeading fontFamily="DiodrumSemiBold" fontSize="16px" fontWeight="600" label="Chemical Adjustment" color={colors.PrimaryDarkAquaMarine}/>
                <CustomHeading fontFamily="DiodrumRegular" fontSize="12px" fontWeight="400" 
                label="You may add chemicals/degas from here. Based on your selection table gets updated. Please note that LSI and S&DI require non zero CA and CO3 Concentrations." color={colors.blackTransparency045}/>
            </div>
            <StandardLinkButtonWithIcon className="close-icon" onClick={close} label={<CloseBlackIcon/>}/>
        </Modal.Header>
        <Modal.Body>
            <div className="product">
                <div className="product-icon">
                    <TechButtons disabled={false} label="Feed" id="product" isDraggable={false} isArrow={false}/>
                    <RightLongArrowPhIcon/>
                </div>
                <BigVerticalLineLIcon/>
            </div>
            <div>
                <div className="card-wrapper">
                    <StyledCard className="ph-card" borderRadius="4px">
                        <Card.Header>
                        <CustomHeading fontFamily="DiodrumRegular" fontSize="14px" fontWeight="400" label="pH" color={colors.PrimaryDarkAquaMarine}/>
                        </Card.Header>
                        <div className="input-select">
                            <div>
                                <CustomSelect>
                                    <option>Option1</option>
                                    <option>Option1</option>
                                </CustomSelect>
                            </div>
                            <div>
                                <InputWithText isError={false} isWarning={false} disabled={false} placeholder="0.00" defaultValue="0.00" inputText="pH" 
                                onBlur={handleBlur} onFocus={()=>handleFocus(1)} isFocused={isFocused===1}/>
                            </div>
                            <div>
                                <InputWithText isError={false} isWarning={false} disabled={false} placeholder="0.00" defaultValue="0.00" inputText="LSI" 
                                onBlur={handleBlur} onFocus={()=>handleFocus(2)} isFocused={isFocused===2}/>
                            </div>
                        </div>
                    </StyledCard>
                    <StyledCard className="oxidant-card" borderRadius="4px">
                        <Card.Header>
                        <CustomHeading fontFamily="DiodrumRegular" fontSize="14px" fontWeight="400" label="Oxidant" color={colors.PrimaryDarkAquaMarine}/>
                        <ToggleSwitch
                            small
                            id="oxidant-toggle"
                            name="oxidant"/>
                        </Card.Header>
                        <div className="input-select">
                            <div>
                                <CustomSelect>
                                    <option>Option1</option>
                                    <option>Option1</option>
                                </CustomSelect>
                            </div>
                            <div>
                                <InputWithText isError={false} isWarning={false} disabled={false} placeholder="0.00" defaultValue="0.00" inputText="mg/L" 
                                onBlur={handleBlur} onFocus={()=>handleFocus(3)} isFocused={isFocused===3}/>
                            </div>
                            <div className="arrow-down">
                                <ArrowDownBlackIcon/>
                            </div>
                        </div>
                    </StyledCard>
                    <StyledCard className="coagulant-card" borderRadius="4px">
                        <Card.Header>
                        <CustomHeading fontFamily="DiodrumRegular" fontSize="14px" fontWeight="400" label="Coagulant" color={colors.PrimaryDarkAquaMarine}/>
                        <ToggleSwitch small id="coagulant" name="coagulant"/>
                        </Card.Header>
                        <div className="input-select">
                            <div>
                                <CustomSelect>
                                    <option>Option1</option>
                                    <option>Option1</option>
                                </CustomSelect>
                            </div>
                            <div>
                                <InputWithText isError={false} isWarning={false} disabled={false} placeholder="0.00" defaultValue="0.00" inputText="mg/L" 
                                onBlur={handleBlur} onFocus={()=>handleFocus(3)} isFocused={isFocused===3}/>
                            </div>
                        </div>
                    </StyledCard>
                    <StyledCard className="temp-card" borderRadius="4px">
                        <Card.Header>
                        <CustomHeading fontFamily="DiodrumRegular" fontSize="14px" fontWeight="400" label="Temperature" color={colors.PrimaryDarkAquaMarine}/>
                        <InfoIcon/>
                        </Card.Header>
                        <div className="input-select">
                            <div>
                                <CustomSelect>
                                    <option>Design</option>
                                </CustomSelect>
                            </div>
                            <div>
                                <InputWithText isError={false} isWarning={false} disabled={true} placeholder="0.00" defaultValue="0.00" inputText="&deg;C"
                                onBlur={handleBlur} onFocus={()=>handleFocus(3)} isFocused={isFocused===3}/>
                            </div>
                        </div>
                    </StyledCard>
                </div>
                <div className="measurement">
                    <div className="heading">
                        <div>
                        <CustomHeading fontFamily="NotoSansSemiBold" fontSize="14px" fontWeight="700" label="Measurement" color={colors.Black}/>
                        </div>
                        <div>
                        <CustomHeading fontFamily="NotoSansSemiBold" fontSize="14px" fontWeight="700" label="Before Adjustment" color={colors.Black}/>
                        </div>
                        <div>
                        <CustomHeading fontFamily="NotoSansSemiBold" fontSize="14px" fontWeight="700" label="After     pH" color={colors.Black}/>
                        </div>
                    </div>
                    <div className="measurement-data">
                        <div>
                        <CustomHeading fontFamily="DiodrumRegular" fontSize="14px" fontWeight="400" label="pH" color={colors.Black}/>
                        </div>
                        <div>
                        <CustomHeading fontFamily="DiodrumRegular" fontSize="14px" fontWeight="400" label="7.20" color={colors.Black}/>
                        </div>
                        <div>
                        <CustomHeading fontFamily="DiodrumRegular" fontSize="14px" fontWeight="400" label="0.00" color={colors.Black}/>
                        </div>
                    </div>
                    <div className="measurement-data">
                        <div>
                        <CustomHeading fontFamily="DiodrumRegular" fontSize="14px" fontWeight="400" label="LSI" color={colors.Black}/>
                        </div>
                        <div>
                        <CustomHeading fontFamily="DiodrumRegular" fontSize="14px" fontWeight="400" label="1.38" color={colors.Black}/>
                        </div>
                        <div>
                        <CustomHeading fontFamily="DiodrumRegular" fontSize="14px" fontWeight="400" label="0.00" color={colors.Black}/>
                        </div>
                    </div>
                    <div className="measurement-data">
                        <div>
                        <CustomHeading fontFamily="DiodrumRegular" fontSize="14px" fontWeight="400" label="Stiff & Devis Index" color={colors.Black}/>
                        </div>
                        <div>
                        <CustomHeading fontFamily="DiodrumRegular" fontSize="14px" fontWeight="400" label="7.20" color={colors.Black}/>
                        </div>
                        <div>
                        <CustomHeading fontFamily="DiodrumRegular" fontSize="14px" fontWeight="400" label="0.00" color={colors.Black}/>
                        </div>
                    </div>
                    <div className="measurement-data">
                        <div>
                        <CustomHeading fontFamily="DiodrumRegular" fontSize="14px" fontWeight="400" label="Stiff & Devis Index" color={colors.Black}/>
                        </div>
                        <div>
                        <CustomHeading fontFamily="DiodrumRegular" fontSize="14px" fontWeight="400" label="7.20" color={colors.Black}/>
                        </div>
                        <div>
                        <CustomHeading fontFamily="DiodrumRegular" fontSize="14px" fontWeight="400" label="0.00" color={colors.Black}/>
                        </div>
                    </div>
                    <div className="measurement-data">
                        <div>
                        <CustomHeading fontFamily="DiodrumRegular" fontSize="14px" fontWeight="400" label="Stiff & Devis Index" color={colors.Black}/>
                        </div>
                        <div>
                        <CustomHeading fontFamily="DiodrumRegular" fontSize="14px" fontWeight="400" label="7.20" color={colors.Black}/>
                        </div>
                        <div>
                        <CustomHeading fontFamily="DiodrumRegular" fontSize="14px" fontWeight="400" label="0.00" color={colors.Black}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="uf">
                <BigVerticalLineRIcon/>
                <div className="uf-btn">
                    <TechButtons disabled={false} label="UF" id="product" isDraggable={false}/>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <StandardPrimaryButton label="Ok" id="okBtn" />
        </Modal.Footer>
    </ChemicalAdjustmentStyled>
    </>
  );
};

export default ChemicalAdjustment;