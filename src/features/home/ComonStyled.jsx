import styled from "styled-components";
import "../../common/styles/notoSansFont.css";
import "../../common/styles/diodrumFont.css";
import { colors, fontStyles } from "../../common/styles/Theme";

const HeroStyled = styled.div`
    /* margin-top: 4.5rem; */
    padding-left: 0px;
    .main-section{
        background-color:lightgrey;
    }
    .carousel{
        padding:10 15px;
        position: relative;
    }
    .carousel-indicators{
        position: absolute;
        /* z-index: 2.3; */
        background-color:${colors.carouselPointerColor};
        margin-left: 0.1%;
        margin-right: 0.1%;
        border-radius: 0px 0px 5px 5px;
        margin-bottom: 0rem;
    }
    .carousel-indicators [data-bs-target]{
        width: 10px;
        height: 10px;
        border-radius: 50%;   
    }
    .carousel-control-next, .carousel-control-prev{
        position: absolute;
        top: 87%;
        z-index: 5;
        width: 13px;
        height: 13px;
        color: #fff;
        opacity: 1;    
    }
  
    @media(max-width:768px){
        .carousel-control-next{
            margin-top: -14px;
            margin-left: 19px;
        }
        .carousel-control-prev{
            margin-top: -14px;
            margin-left: -26px;
            margin-bottom: 10px;
        }
    }
    @media(max-width:820px){
        .carousel-control-next{
            margin-top: -9px;
            margin-left: 11px;
        }
        .carousel-control-prev{
            margin-top: -8px;
            margin-left: -15px;
            margin-bottom: 10px;
        }
    }
    /* @media(max-width:1024px){
        .carousel-control-next{
            margin-top: -6px;
            margin-left: 9px;
        }
        .carousel-control-prev{
            margin-top: -6px;
            margin-left: -10px;
        }
    } */
    /* @media(max-width:1420px){
        .carousel-control-next{
            top: 87.5%;
            left: 53%;
        }
        .carousel-control-prev{
            top: 87.5%;
            left: 45.3%;
        }
    } */
    @media(min-width:1750px){
        .carousel-control-next{
            margin-top: 9px;
            margin-left: -8px; 
        }
        .carousel-control-prev{
            margin-top: 9px;
            margin-left: 14px; 
        }
    }
    .carousel-control-next {
        position: absolute;
        top: 91%;
        left: 52.2%;
        z-index: 5;
        width: 13px;
        height: 13px;
        color: #fff;
        opacity: 1;
    }
    .carousel-control-prev {
        position: absolute;
        top: 91%;
        left:46.4%;
        z-index: 5;
        width: 13px;
        height: 13px;
        color: #fff;
        text-align: center;
        opacity: 1;
    }  
    .carousel-caption{
        text-align: left;
        top: 20px;
        left: 49px;
        h3{
            ${fontStyles.diodrum32};
            letter-spacing: 0.005em;
            color:${colors.White};
        }
        h3.dupont-water-tag{
            color: ${colors.PrimaryDarkAquaMarine};
        }
        p{
            ${fontStyles.notoSans16};
            color:${colors.White};
        }
        h6{
            ${fontStyles.diodrum16};
            color:${colors.White};
        }
        a{
            text-decoration: none;
            margin-bottom: 18px;
            padding: 4px 19px;
            border-radius: 25px;
            background-color: transparent;
            border: 1px solid ${colors.White};
            box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.016);
            ${fontStyles.notoSans14};
            color:${colors.White};
        }
    }
    .all-project-headline, .favorite-project-headline, .deleted-project-headline, .shared-project-headline{
        h6{
            ${fontStyles.diodrum10};
            color:${colors.Black};
            margin-bottom:0;
            padding-left:6px;
        }
    }
    .all-folder-headline{
        .page-heading{
            color:${colors.PrimaryDarkAquaMarine};
            ${fontStyles.diodrum32};
            margin-bottom: 0;
            padding-left:6px;
        }
        .page-sub-heading{
            color:${colors.Black};
            ${fontStyles.diodrum10};
            line-height: 13.5px;
            margin-bottom: 0;
            padding-left:6px;
        }
    }
`;
export default HeroStyled;