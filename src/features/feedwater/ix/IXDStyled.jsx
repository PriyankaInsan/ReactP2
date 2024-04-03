import styled from "styled-components";
import { colors, fontStyles } from "../../../common/styles/Theme";

const IXDStyled = styled.div`
  .ix-container {
    background-color: ${colors.White};
  }
  .ixd-steps-column {
    width:24%;
    position: fixed;
    top:0;
    .wrapper {
      margin-top: ${({ headerMenuIconStatus }) =>
        headerMenuIconStatus ? "0%" : "13%"};
      width: ${({ tabletView }) => (tabletView ? "36%" : "100%")};
      border-right: 0.5px solid ${colors.GreyE1};
      background-color: ${colors.White};
      height: 100vh;
      .tablet_menu_view {
        display: flex;
        padding: 8.5px 10px 15px 15px;
        gap: 15px;
        .close_icon_btn {
          border: none;
          outline: none;
          background-color: transparent;
        }
        .global_header_logo1 {
          display: flex;
          flex-direction: column;
          gap: 10px;
          .dupont_logo {
            width: fit-content;
            height: 18px;
            display: flex;
            a {
              display: flex;
            }
          }
        }
        .global_header_logo2 {
          display: flex;
          gap: 8px;
          align-items: center;
          cursor: pointer;
        }
      }
    }
  }

  .ixd__tabs__details__view {
    width: ${({ tabletView }) => (tabletView ? "100%" : "76%")};
    margin-left: ${({ tabletView }) => (tabletView ? "0" : "24%")};
    min-height: 100vh;
    padding-bottom: 16px;
  }

  .selectedTab {
    border-right: 3px solid ${colors.PrimaryDarkAquaMarine};
    background-color: ${colors.Pale20PaleTeal};
    border-radius: 0%;
    border-bottom: none;
    border-top: none;
    border-left: none;
  }
  .react-tabs__tab-list {
    display: flex;
    flex-direction: column;
    border-bottom: none;
    .react-tabs__tab {
      padding: 9px 10px 9px 32px;
      h4 {
        ${fontStyles.notoSans16};
        color: ${colors.Black};
        margin-bottom: 0;
      }
    }
  }
  @media (min-width: 670px) and (max-width: 1200px) {
    .tablist_overlay {
      display: ${({ headerMenuIconStatus }) =>
        headerMenuIconStatus ? "block" : "none"};
      width:100% !important;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      top: 0;
      z-index: 5;
    }
  }
  @media (min-width: 1201px){
    .wrapper{
      margin-top:11.1rem !important;
    }
  }
`;
export default IXDStyled;
