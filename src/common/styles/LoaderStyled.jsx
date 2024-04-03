import styled from "styled-components";
import "../../common/styles/notoSansFont.css";
import "../../common/styles/diodrumFont.css";
import { fontStyles } from "./Theme";
const LoaderStyled = styled.div`
    /* position: absolute; */
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
    justify-content: center;
    margin-top:10%;
    width: 100%;
    z-index:20;
    p{
        font-family: DiodrumSemiBold;
        font-size:16px;
        font-weight:bold;
        color:#007672;
    }
    /* position: absolute;
    top: 50%;
    left: 50%;
    bottom: 50vh; */
    /* .water-loader{
        position: relative;
        top: 5px;
        margin: auto;
        width: 200px;
        height:100px;
        ${fontStyles.diodrum32SemiBold};
        text-align:center;
        line-height:90px;
        text-shadow:0px 2px 2px rgba(0,0,0,0.2), 0px 2px 2px rgba(255, 255, 255, 0.3);
        background-image:-webkit-radial-gradient(center 10px, 80px 100px, #E4001C 50%, #007672 51%);
        background-size:40px 110px;
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
        -webkit-animation-name:water-loader;
        -webkit-animation-duration:3s;
        -webkit-animation-iteration-count:infinite;
        -webkit-animation-timing-function:linear;
    }
    @keyframes water-loader{
        0%{
            background-position:200px 10px;
        }
        50%{
            background-position:100px -20px;
        }
        100%{
            background-position:0px -40px;
        }
    } */
`;
export default LoaderStyled;