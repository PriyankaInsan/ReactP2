import {Row } from "react-bootstrap";
import styled from "styled-components";
import { colors, fontStyles } from "../../../common/styles/Theme";

const ConfigurationStyled = styled(Row)`
  min-height: 100vh;
  padding: 14px 14px 32px 14px;
  display: flex;
  flex-direction: column;
  .configuration{
    .system-module-wrapper{
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      .system-configuration-card, .module-selection-card{
        padding: 14px;
        flex:0 0 35%;
        flex-basis: 350px;
        .card-header{
          display: flex;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .standby_radios{
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .storage-tank{
          margin-top: 23px;
        }
        .module-select{
          margin-top: 17px;
        }
      }
    }
  }
  .selected-configuration{
    margin-top:14px;
    .selected-configuration-card{
      padding:16px;
      .card-header{
        display: flex;
        justify-content: space-between;
        margin-bottom: 16px;
      }
      .rack-wrapper{
        padding-bottom: 24px;
      }
      .rack-wrapper.hideRack{
        display:none;
      }
      .rack-wrapper, .unit-wrapper{
        .track-design, .unit-header{
          margin-bottom:5px;
        }
        .rack-module, .unit-group, .unit-description{
          display: flex;
          /* flex-wrap: wrap; */
          gap: 9px;
          align-items: end;
          .racks{
            width: 14.5%;
          }
          .radio{
            margin-right: 40px;
          }
        }
      }
    }
  }
  .card-wrapper-four {
      margin-top: 14px;
      width: 100%; //1074px
      height: auto; //497px
      .recomm-config {
        padding: 16px;
        .card-header{
          display: flex;
          justify-content: space-between;
          margin-bottom: 11px;
        }
      }
      .limit{
        margin-top: 5px;
      }
      .tracks-wrapper {
        display: flex;
        flex-direction: row;
        margin-top: 15px;
        padding-bottom: 30px;
        gap: 9px;
        .slider-bar{
          margin: 0px 4px;
          width: 200px;
          margin-top: -17px;
          .progress{
            position: relative;
            background-color: transparent;
            --bs-progress-bg: none;
            --bs-progress-bar-color: none;
            --bs-progress-bar-bg: none;
            ${fontStyles.diodrum12};
            height: 12px;
            .progress-bar{
              position: absolute;
              top: 2px;
              /* left: 30px; */
              height: 12px;
            }
          }
          .slider-label-wrapper{
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .rc-slider{
            .rc-slider-track{
              background-color: ${colors.LightLightTeal};
            }
            .rc-slider-handle{
              border-color: ${colors.LightLightTeal};
              box-shadow: ${colors.LightLightTeal};
            }
          }
        }
        .slider {
          display: flex;
          align-items: center;
          .round {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            border: 2px solid ${colors.LightLightTeal};
            background: #fff;
            display: flex;
            padding: 7px;
            justify-content: center;
            align-items: center;
          }
          .line1 {
            width: 130px;
            height: 4px;
            background: ${colors.LightLightTeal};
          }
          .line2 {
            width: 128px;
            height: 4px;
            background: ${colors.GreyE1};
          }
        }
      }
      .tracks-wrapper.hideRack{
        display:none;
      }
    }
  @media(max-width:1024px) {
    .rack-module, .unit-group{
      flex-wrap: wrap;
    }
  }
`;
export default ConfigurationStyled;