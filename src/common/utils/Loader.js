
import { CircleLoader } from "react-spinners";
import LoaderStyled from "../../common/styles/LoaderStyled";
const Loader = () => {
  return (
    <>
      <LoaderStyled className="sweet-loading">
        <CircleLoader color={"#007672"} loading={true}/>
        <p>WAVE PRO</p>
        {/* <div className="water-loader">WAVEPro</div> */}
      </LoaderStyled>
    </>
  );
};

export default Loader;