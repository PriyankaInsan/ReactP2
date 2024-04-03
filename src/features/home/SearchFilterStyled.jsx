import styled from "styled-components";
import "../../common/styles/notoSansFont.css";
import "../../common/styles/diodrumFont.css";
import { checkBoxStyles, colors, dropdownStyles, fontStyles, radioStyles } from "../../common/styles/Theme";

const SearchFilterStyled = styled.section`
  --bs-dropdown-link-hover-bg: none;
  .search-filter {
    margin-top: 32px;
    padding-left: 0px;
    .search-box{
      width:${({showSideMenu})=>showSideMenu?"48%":"48%"};
    }
  }
  .error-msg{
        ${fontStyles.diodrum16}
        display: flex;
        align-items: center;
        color:${colors.Black};
        padding-left: 13px;
        margin-top: 24px;
    }
  .filter {
    justify-content: end;
    gap: 16px;
    div {
      /* margin-right: 8px; */
    }
    .filter-dropdown {
      .dropdown-menu {
        --bs-dropdown-border-color: rgba(0, 0, 0, 0.175);
        ${dropdownStyles.dropdownMenuStyles};
        width: 228px;
        padding: 12px;
        h6 {
          ${fontStyles.diodrum14SemiBold};
          display: flex;
          align-items: center;
          color:${colors.SecondaryElfGreen};
          margin-bottom: 4px;
        }
        .checkbox-group {
          gap:20px;
          :hover {
            :link {
              background-color: none;
            }
          }
          .form-check {
            .form-check-input[type="checkbox"]{
              ${checkBoxStyles.defaultCheckBox}
              cursor: pointer;
              :hover{
                ${checkBoxStyles.hoverCheckBox};
              }
            }
            .form-check-input[type="checkbox"]:checked{
              ${checkBoxStyles.activeCheckBox};
            }
            label {
              ${fontStyles.notoSans14SemiBold}
              display: flex;
              align-items: center;
              color:${colors.Black};
            }
          }
        }
        .input-group {
          input {
            ${fontStyles.notoSans16}
            color:${colors.Black};
            height: 32px;
          }
        }
        span {
          font-size: 12px;
          font-style: normal;
          font-weight: 300;
          color:${colors.Black};
          margin-right: 3px;
          :hover {
            color:${colors.PrimaryDarkAquaMarine};
          }
        }
        .clear-filter {
          display: flex;
          align-items: center;
          margin-top: 20px;
          height: 22px;
          button{
            ${fontStyles.notoSans12}
            color:${colors.Black};
            margin-bottom: 0;
            padding: 0;
            border: none;
          }
          svg {
            cursor: pointer;
            margin-left: 4px;
            height: 14px;
            width: 14px;
            path {
              fill:${colors.Black};
            }
          }
          :hover{
            button{
              color:${colors.PrimaryDarkAquaMarine};
            }
            svg{
              path{
                fill:${colors.PrimaryDarkAquaMarine}
              }
            }
          }
        }
        .market-segment-filter{
          
        }
        .filter-sub-dropdown {
          cursor: pointer;
          background-color:${colors.White};
          border: 1px solid ${colors.Grey96};
          box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.016);
          border-radius: 2px;
          padding: 5px 36px 5px 12px;
          option{
            cursor: pointer;
            font-family: "NotoSansRegular";
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 22px;
            color: rgba(0, 0, 0, 0.85);
          }
        }
      }
    }
    .sort-dropdown {
      .dropdown-menu {
        width: max-content;
        ${dropdownStyles.dropdownMenuStyles};
        padding: 13px 16px;
        .checkbox-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          .sort-radios{
            
          }
          .form-check-input[type="radio"]{
            cursor: pointer;
            ${radioStyles.defaultRadio}
            :hover{
              ${radioStyles.hoverRadio};
            }
          }
          .form-check-input[type="radio"]:checked{
            ${radioStyles.activeRadio}
          }
          .form-check-label{
            color:${colors.Black};
          }
          label {
            cursor: pointer;
            font-family: "NotoSansRegular";
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 22px;
            color:${colors.Black};
            :hover {
              color:${colors.PrimaryDarkAquaMarine};
            }
          }
        }
      }
    }
    .dropdown {
      button {
        height: 32px;
        ${fontStyles.notoSans16}
        background-color:${colors.White};
        color: #777777;
        outline: none;
        border: 1px solid ${colors.GreyE1};
        border-radius: 4px;
        padding: 4px 8px 5px 8px;
        ::after{
          margin-left: 15px;
        }
        :hover {
          color:${colors.PrimaryDarkAquaMarine};
        }
        .selected-option{
          ${fontStyles.notoSans16}
          margin-left:5px;
          display: inline-block;
          color:${colors.Black};
          margin-bottom: 0;
        }
      }
    }
  }
  .grid-icon {
    cursor: pointer;
    width: 32px;
    height: 32px;
    text-align: center;
    /* padding: 3px; */
    /* border: 1px solid ${colors.Black}; */
    /* svg {
      width: 30px;
      height: 30px;
      :hover {
        rect {
          fill:${colors.SecondaryElfGreen};
          stroke: ${colors.PrimaryDarkAquaMarine};
        }
      }
    } */
  }
  /* .grid-icon-active {
    svg {
      cursor: pointer;
      width: 30px;
      height: 30px;
      rect {
        fill:${colors.SecondaryElfGreen};
        stroke: ${colors.PrimaryDarkAquaMarine};
      }
    }
  } */

  .list-icon {
    width: 32px;
    height: 32px;
    text-align: center;
    cursor: pointer;
    /* svg {
      width: 30px;
      height: 30px;
      :hover {
        path,
        line {
          stroke:${colors.PrimaryDarkAquaMarine};
        }
      }
    } */
  }
  .list-icon-active {
    cursor: pointer;
    /* svg {
      width: 30px;
      height: 30px;
      path,
      line {
        fill:${colors.SecondaryElfGreen};
        stroke:${colors.PrimaryDarkAquaMarine};
      }
    } */
  } //styled of searchfilter
`;

export default SearchFilterStyled;
