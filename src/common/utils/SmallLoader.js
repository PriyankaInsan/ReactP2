
import { CircleLoader } from "react-spinners";
import SmallLoaderStyled from "../../common/styles/SmallLoaderStyled";
const SmallLoader = () => {
  return (
    <>
      <SmallLoaderStyled className="sweet-loading">
        <CircleLoader color={"#007672"} loading={true} size={20}/>
        <p>DuPont</p>
      </SmallLoaderStyled>
    </>
  );
};

export default SmallLoader;