import { Modal } from "react-bootstrap";
import styled from "styled-components";

const FinalPhAdjustmentStyled = styled(Modal.Body)`
    display: flex;
    gap: 14px;
    .wrapper{
        display: flex;
        gap: 14px;
        flex-wrap: wrap;
        /* flex-direction: row; */
        .acid, .alkali, .final{
            width: 45%;
            select{
                width: 100%;
            }
        }
    }
    .product{
        display: flex;
        align-items: center;
    }
`;
export default FinalPhAdjustmentStyled;