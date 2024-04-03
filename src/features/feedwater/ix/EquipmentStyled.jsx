import { Row } from "react-bootstrap";
import styled from "styled-components";
import { colors, fontStyles, formTextStyles, inputGroupStyles, normalCardStyle } from "../../../common/styles/Theme";

const EquipmentStyled = styled(Row)`
    padding: 14px;
    .equipment-settings-card{
        max-width: 347px;
        padding:16px;
        .card-header{
            padding: 0;
            display: flex;
            justify-content: space-between;
            background-color:transparent;
            border:none;
            margin-bottom:18px;
            .info-icon{
                display: flex;
            }
        }
        .equipment-body{
            padding: 0;
            display: flex;
            flex-direction: column;
            gap: 5px;
            .input-field{
                width: 70%;
            }
        }
    }
`;
export default EquipmentStyled;