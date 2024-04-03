/* eslint-disable max-len */
import React from "react";
import { Modal } from "react-bootstrap";
import FinalPhAdjustmentStyled from "./FinalPhAdjustmentStyled";
import CloseBlackIcon from "../../../common/icons/CloseBlackIcon";
import CloseCircleGreenIcon from "../../../common/icons/CloseCircleGreenIcon";
import CustomHeading from "../../../common/styles/components/headings/CustomHeading";
import { colors } from "../../../common/styles/Theme";
import CustomButton from "../../../common/styles/components/buttons/standard/CustomButton";
import StyledModal from "../../../common/styles/components/modals/CustomModal";
import StyledSelect from "../../../common/styles/components/selects/CustomSelect";
import InputWithText from "../../../common/styles/components/inputs/InputWithText";
import { useState } from "react";
import BigVerticalLinePhIcon from "../../../common/icons/BigVerticalLinePhIcon";
import RightLongArrowPhIcon from "../../../common/icons/RightLongArrowPhIcon";
import TechButtons from "../../../common/styles/components/buttons/techButtons/TechButtons";
import StandardPrimaryButton from "../../../common/styles/components/buttons/standard/StandardPrimaryButton";

const FinalPhAdjustment = ({ show, close }) => {
  const [isFocus, setIsFocus] = useState(false);
  const handleFocus = () => {
    setIsFocus(true);
  };
  const handleBlur = () => {
    setIsFocus(false);
  };
  return (
    <>
      <StyledModal
        show={show}
        onHide={close}
        centered
        backdrop="static"
        keyboard="false"
        padding="16px 30px 10px 30px"
        modalBgColor={colors.White}
        backgroundColor={colors.GreyF8}
      >
        <Modal.Header>
          <CustomHeading
            label="Final pH Adjustment"
            color={colors.PrimaryDarkAquaMarine}
            fontFamily="DiodrumRegular"
            fontSize="16px"
            fontWeight="600"
          />
          <CustomButton onClick={close} label={<CloseBlackIcon />} />
        </Modal.Header>
        <FinalPhAdjustmentStyled>
          <div className="wrapper">
            <div className="acid">
              <CustomHeading
                label="If acid is needed"
                color={colors.Black}
                fontFamily="DiodrumRegular"
                fontSize="14px"
                fontWeight="400"
              />
              <StyledSelect isError={false} disabled={false}>
                <option>Select acid</option>
                <option>Select acid</option>
              </StyledSelect>
            </div>
            <div className="alkali">
              <CustomHeading
                label="If alkali is needed"
                color={colors.Black}
                fontFamily="DiodrumRegular"
                fontSize="14px"
                fontWeight="400"
              />
              <StyledSelect isError={false} disabled={false}>
                <option>Select alkali</option>
                <option>Select alkali</option>
              </StyledSelect>
              <InputWithText/>
            </div>
            <div className="final">
              <CustomHeading
                label="Target final pH"
                color={colors.Black}
                fontFamily="DiodrumRegular"
                fontSize="14px"
                fontWeight="400"
              />
              <InputWithText
                inputText={<CloseCircleGreenIcon />}
                isError={false}
                disabled={false}
                value="finalPh"
                defaultValue="0.00"
                onFocus={handleFocus}
                onBlur={handleBlur}
                isFocused={isFocus}
                unitBgColor="transparent"
              />
            </div>
          </div>
          <div className="vertical-line">
            <BigVerticalLinePhIcon />
          </div>
          <div className="product">
            <RightLongArrowPhIcon />
            <TechButtons
              disabled={false}
              label="Product"
              id="product"
              isDraggable={false}
            />
          </div>
        </FinalPhAdjustmentStyled>
        <Modal.Footer>
          <StandardPrimaryButton label="Ok" disabled={false} id="okBtn" />
        </Modal.Footer>
      </StyledModal>
    </>
  );
};

export default FinalPhAdjustment;
