import styled from "styled-components";
import { colors, fontStyles } from "../../../../common/styles/Theme";

const TableWrapper = styled.div`
  width:  100%;
  /* margin-top: 30px; */
  overflow-x: auto;
  .table {
    width:100%;
    border-collapse: collapse;
    .th {
      ${fontStyles.notoSans14SemiBold};
      background-color: ${colors.GreyE1};
      color: ${colors.Black};
      height: 60px;
      width: fit-content;
      padding: 8px 10px;
      text-align: left;
    }
    .td {
      padding: 6px;
      border-bottom: 1px solid #e1e1e1;
      font-family: ${fontStyles.diodrum10};
      color: ${colors.Black};
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
    }
  }

 /* @media (max-width: 800px) { 
    .table {
      overflow-x:auto;
      background-color:yellow;
    }
  
  }  */
`;
export default TableWrapper;
