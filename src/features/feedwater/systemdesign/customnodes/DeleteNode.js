import { useCallback, memo, useState } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import "../../../../common/styles/notoSansFont.css";
import "../../../../common/styles/diodrumFont.css";
const handleStyle = { left: 10 };
import styled from "styled-components";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import FinalPhAdjustment from "../FinalPhAdjusment";
import CustomCheckbox from "../../../../common/styles/components/checkboxs/CustomRadioCheck";

import InputWithText from "../../../../common/styles/components/inputs/InputWithText";
import StandardSecondaryButton from "../../../../common/styles/components/buttons/standard/StandardSecondaryButton";
import { colors, normalCardStyle } from "../../../../common/styles/Theme";
import DeleteCaseIcon from "../../../../common/icons/DeleteCaseIcon";
import CustomHeading from "../../../../common/styles/components/headings/CustomHeading";
import StyledCard from "../../../../common/styles/components/cards/CustomCard";
import DeleteIcon from "../../../../common/icons/DeleteIcon";

function DeleteNode({ id, data }) {
  const { deleteElements } = useReactFlow();
  const [isFocus, setIsFocus] = useState(null);
  const [openPhAdjustment, setOpenPhAdjustment] = useState(false);
  const handleOpenPhAdjustment = () => {
    setOpenPhAdjustment(true);
  };

  const handleClosePhAdjustment = () => {
    setOpenPhAdjustment(false);
  };

  const handleFocus = (id) => {
    setIsFocus(id);
  };
  const handleBlur = () => {
    setIsFocus(null);
  };

  return (
    <DeleteNodeStyled>
      <div className="delete-box">
        <StyledCard className="delete-card">
          <CustomHeading
            fontFamily="NotoSansRegular"
            fontSize="16px"
            fontWeight="600"
            color={colors.PrimaryDarkAquaMarine}
            label="Drag & Drop here to Delete"
          />
          <DeleteIcon />
        </StyledCard>
      </div>
    </DeleteNodeStyled>
  );
}

export default memo(DeleteNode);

const DeleteNodeStyled = styled("div")`
  /* .delete-box {
    width:70%;
  } */
  .delete-card {
    /* display: flex; */
    width: 201.94px;
    height: 118px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 4px;
    border: 1px dashed ${colors.Grey96};
    background: ${colors.White};
    h3 {
      text-align: center;
      margin-bottom: 10px;
    }
  }
`;
