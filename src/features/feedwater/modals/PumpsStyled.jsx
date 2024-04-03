import { Modal } from "react-bootstrap";
import styled from "styled-components";
import {
  colors,
  fontStyles,
  formTextStyles,
  inputGroupStyles,
  modalStyles,
  standardButtonStyles,
} from "../../../common/styles/Theme";

const PumpsStyled = styled(Modal)`
  background-color: ${colors.blackTransparency045};
  .modal-dialog {
    max-width: 900px;
  }
  .error {
    color: red;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .modal-content {
    ${modalStyles.normalModalStyle}
    .modal-header {
      padding: 17px 32px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      background-color: ${colors.GreyF8};
      border:none !important;
      .pump-heading{
        .sub-heading{
          margin-top:4px;
        }
      }
      .btnDiv {
        button {
          background-color: transparent;
          border: none;
          padding-right: 0;
        }
      }
    }
    .modal-body {
      padding: 17px 30px;
      .title-heading,
      .pump-settings {
        display: grid;
        grid-template-columns: 167px 167px 167px 167px 167px;
      }
      .title-heading {
        /* background-color: ${colors.GreyE1}; */
        background: var(--Grey-E1, linear-gradient(0deg, #E1E1E1 0%, #E1E1E1 100%), #E1E1E1);
        border: 1px solid ${colors.GreyE1};
        padding: 8px 10px;
        .title {
          display: flex;
          align-items: center;
        }
        .total-efficiency {
          display: flex;
          gap:10px;
        }
      }
      .pump-settings-container {
        /* height: 300px; */
        overflow-y: scroll;
        overflow-x: hidden;
        ::-webkit-scrollbar{
          width:4px;
          background-color:transparent;
        }
        ::-webkit-scrollbar-thumb {
          background-color: #969696;
          border-radius: 5px;
        }
        .pump-settings {
          border-bottom: 1px solid ${colors.GreyE1};
          .technology-name, .pump-efficiency, .motor-efficiency, .total-efficiency,
          .technology-pump {
            display: flex;
            align-items: center;
            padding: 12px 10px;
          }
        }
      }
      .pump-settings {
      }
    }
    .modal-footer {
      padding: 17px 32px;
      display: flex;
      justify-content: space-between;
    }
  }
  @media only screen and (max-width: 1366px){
    .modal-content{
      height: 517px;
      .pump-settings-container {
        height: 300px;
      }
    }
  }
  @media only screen and (min-width:1367px) and (max-width: 1920px){
    .modal-content{
      height: 584px;
      .pump-settings-container {
        height: 360px;
      }
    }
  }
`;
export default PumpsStyled;
