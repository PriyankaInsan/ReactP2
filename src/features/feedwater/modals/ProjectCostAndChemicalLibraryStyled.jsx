import { Modal } from "react-bootstrap";
import styled from "styled-components";
import {
  colors,
  fontStyles,
  formTextStyles,
  inputGroupStyles,
  modalStyles,
  normalCardStyle,
  normalInputBoxStyles,
  selectStyles,
  standardButtonStyles,
} from "../../../common/styles/Theme";

const ProjectCostAndChemicalLibraryStyled = styled(Modal)`
  background-color: ${colors.blackTransparency045};
  .modal-dialog {
    min-width: 1242px;
  }
  .modal-content {
    ${modalStyles.normalModalStyle}
    .modal-header {
      padding: 17px 20px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      background-color: ${colors.GreyF8};
      border: none;
      .subtitle {
        margin-top: 4px;
      }
      button {
        background-color: transparent;
        border: none;
      }
    }
    .modal-body {
      padding: 8px 20px;
      .operating-cost-card {
        border: 1px solid var(--Grey-E1, #e1e1e1);
        padding: 10px 10px 0px 10px;
        .operating-cost-title {
          display: flex;
          justify-content: space-between;
        }
        .water-type-wrapper {
          display: flex;
          .raw-water,
          .waste-water {
            margin-right: 23px;
          }
          /* .form-label {
                        ${fontStyles.diodrum14}
                        color: ${colors.Black};
                        margin-bottom:0;
                    } */
          /* .input-group{
                        ${inputGroupStyles.normalInputBoxWholeStyle}
                        .form-control{
                            ${inputGroupStyles.formControlStyles}
                            ${fontStyles.diodrum14}
                            color: ${colors.Black};
                        }
                        .input-group-text{
                            ${inputGroupStyles.defaultInputGroupTextWithoutPaddingStyles};
                            svg{
                                border: 1.8px solid ${colors.PrimaryDarkAquaMarine};
                                border-radius: 50%;
                                padding:2px;
                                path{
                                    fill: ${colors.PrimaryDarkAquaMarine};
                                }
                            }
                        }
                    }
                    .form-text{
                        ${formTextStyles.smallFormTextStyle}
                    } */
        }
      }
      .header-row {
        margin-top: 16px;
        border: 1px solid ${colors.GreyE1};
        background-color: ${colors.GreyE1};
        display: grid;
        grid-template-columns: 96px 146px 82px 169px 117px 140px 108px 83px 84px 97px 73px;
        .header-title {
          padding: 8px 6px;
        }
      }
      .chem-cost-data-wrapper {
        padding: 0;
        height: 180px;
        overflow-y: scroll;
        overflow-x: hidden;
        ::-webkit-scrollbar {
          width: 4px;
          background-color: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background-color: #969696;
          border-radius: 5px;
        }
        .chemical-details-row {
          display: grid;
          grid-template-columns: 96px 146px 82px 169px 117px 140px 108px 83px 84px 97px 73px;
          border-bottom: 1px solid ${colors.GreyE1};
          .form-check {
            padding: 10px 12px;
          }
          .chemical-label {
            padding: 6px 12px;
            display: flex;
            align-items: center;
            h3 {
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              cursor: default;
              :hover {
                color: ${colors.PrimaryDarkAquaMarine};
              }
            }
            button {
              background-color: transparent;
              padding: 0;
              border: none;
            }
            .disable-field {
              height: 31px;
              padding: 4px 10px;
              /* background-color: #e1e1e1; */
              display: flex;
              align-items: center;
              border-radius: 2px;
            }
          }
        }
        .input-field-row {
          display: grid;
          grid-template-columns: 96px 146px 82px 169px 117px 140px 108px 83px 84px 97px 73px;
          width: 100%;
          .chemical-input-field {
            padding: 10px 12px;
            button {
              background-color: transparent;
              padding: 0;
              border: none;
            }
          }
        }
      }
      
      .new-data-wrapper {
        padding: 0 4px 0 0;
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
        ::-webkit-scrollbar {
          width: 4px;
          background-color: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background-color: #969696;
          border-radius: 5px;
        }

        .input-field-row {
          display: grid;
          grid-template-columns: 96px 146px 82px 169px 117px 140px 108px 83px 84px 97px 73px;
          width: 100%;
          margin-left: 8px;
          .cross_tick_icon{
            display: flex;
            gap: 5px;
          }
          .chemical-input-field {
            padding: 10px 4px;
            
            button {
              background-color: transparent;
              padding: 0;
              border: none;
              svg{
                path{
                  fill: #000;
                }
              }
              :hover{
                svg{
                  path{
                    fill: #007672;
                  }
                }
              }
            }
          }
        }
      }
      .add-btn-div {
        margin-top: 10px;
        .add-chemical-button {
          width: 100%;
        }
      }
    }
    .modal-footer {
      display: flex;
      justify-content: space-between;
      background-color: ${colors.White};
    }
  }
`;

export default ProjectCostAndChemicalLibraryStyled;
