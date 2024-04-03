import styled from "styled-components";
import { colors, fontStyles } from "../../../common/styles/Theme";
const UFStyled = styled.div`
  .uf-tablist-column {
    position: fixed;
    width: 100%;
    top: 0;

    .wrapper {
      margin-top:${({headerMenuIconStatus})=>headerMenuIconStatus?"0%":"13%"};
      width: ${({tabletView})=>tabletView?"36%":"24%"};
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
    .react-tabs__tab-list {
      display: flex;
      flex-direction: column;
      border-bottom: none;
      .selected {
        border-right: 3px solid ${colors.PrimaryDarkAquaMarine};
        background-color: ${colors.Pale20PaleTeal};
        border-radius: 0%;
        border-bottom: none;
        border-top: none;
        border-left: none;
      }
      .tab {
        padding: 9px 10px 9px 32px;
        cursor: pointer;
        h4 {
          ${fontStyles.notoSans16};
          color: ${colors.Black};
          margin-bottom: 0;
        }
      }
    }
  }
  .uf-tabPanel-column {
    width: ${({ tabletView }) => (tabletView ? "100%" : "76%")};
    margin-left: ${({ tabletView }) => (tabletView ? "0" : "24%")};
    /* margin-top:3.2%; */
    min-height: 100vh;
  }
  @media (min-width: 670px) and (max-width: 1200px) {
    .tablist_overlay {
      display: ${({ headerMenuIconStatus }) =>headerMenuIconStatus ? "block" : "none"};
      width: 100% !important;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      top: 0;
      z-index: 5;
    }
  }
  @media (min-width: 1201px){
    .wrapper{
      margin-top:11.2rem !important;
    }
  }
  /* @media (min-width: 1290px) and (max-width: 1360px){
    .wrapper{
      margin-top: 13.2% !important;
    }
  }
  @media (min-width: 1360px) and (max-width: 1500px){
    .wrapper{
      margin-top: 13% !important;
    }
  }
  @media (min-width: 1500px) and (max-width: 1599px){
    .wrapper{
      margin-top: 11.7% !important;
    }
  }
  @media (min-width: 1600px) and (max-width: 1699px){
    .wrapper{
      margin-top: 10.9% !important;
    }
  }
  @media (min-width: 1700px) and (max-width: 1919px){
    .wrapper{
      margin-top: 9.4% !important;
    }
  }
  @media (min-width: 1920px) and (max-width: 2500px){
    .wrapper{
      margin-top: 7.3% !important;
    }
  }
  @media (min-width: 2501px) and (max-width: 3860px){
    .wrapper{
      margin-top: 4.7% !important;
    }
  } */
`;
export default UFStyled;
