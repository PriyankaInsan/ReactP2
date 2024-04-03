import { useCallback, memo, useState } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import "../../../../common/styles/notoSansFont.css";
import "../../../../common/styles/diodrumFont.css";
import styled from "styled-components";
import DragButtonIcon from "../../../../common/icons/DragButtonIcon";
import { colors } from "../../../../common/styles/Theme";
import FinalPhAdjustment from "../FinalPhAdjusment";

function TechnologyNode({ id, data, selected, deletable = true }) {
  const [openPhAdjustment, setOpenPhAdjustment] = useState(false);

  const handleOpenPhAdjustment = () => {
    if (data.label === "Adjust Final pH") {
      setOpenPhAdjustment(true);
    }
  };

  const handleClosePhAdjustment = () => {
    setOpenPhAdjustment(false);
  };
  return (
    <TechnologyNodeStyled>
      <FinalPhAdjustment
        show={openPhAdjustment}
        close={handleClosePhAdjustment}
      />
      <div className="tab_value">{data.value}</div>
      <div>
        <div
          className={
            data.label == "Adjust Final pH"
              ? "technology-btn adjustPh"
              : "technology-btn"
          }
          style={{ backgroundColor: selected ? "#6dd8cd" : "#e2f7f5" }}
          
        >
          {" "}
          {data.label == "Adjust Final pH" ? (
            <>
              <div className={"pin-icon"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M12.724 5.12949L8.874 1.27949C8.77244 1.17793 8.63962 1.12793 8.50681 1.12793C8.374 1.12793 8.24119 1.17793 8.13962 1.27949L5.62244 3.79824C5.43181 3.77637 5.23962 3.76699 5.04744 3.76699C3.90369 3.76699 2.75994 4.14355 1.82087 4.89668C1.76401 4.94234 1.7174 4.99947 1.68408 5.06434C1.65077 5.12922 1.63149 5.20038 1.62751 5.2732C1.62353 5.34602 1.63493 5.41886 1.66098 5.48698C1.68703 5.5551 1.72713 5.61697 1.77869 5.66855L4.61775 8.50762L1.25212 11.8701C1.21088 11.9111 1.18543 11.9653 1.18025 12.0232L1.12712 12.6045C1.11306 12.7514 1.23025 12.8764 1.37556 12.8764C1.38337 12.8764 1.39119 12.8764 1.399 12.8748L1.98025 12.8217C2.03806 12.817 2.09275 12.7904 2.13337 12.7498L5.499 9.38418L8.33806 12.2232C8.43962 12.3248 8.57243 12.3748 8.70525 12.3748C8.85681 12.3748 9.00681 12.3092 9.10994 12.1811C9.98962 11.0826 10.3552 9.70762 10.2068 8.37793L12.724 5.86074C12.9256 5.66074 12.9256 5.33262 12.724 5.12949ZM9.40994 7.58574L9.02712 7.96855L9.0865 8.50605C9.17961 9.33741 9.01371 10.1772 8.6115 10.9107L3.09431 5.39043C3.29587 5.27949 3.50525 5.18574 3.724 5.11074C4.149 4.96387 4.59431 4.89043 5.04744 4.89043C5.19744 4.89043 5.349 4.89824 5.499 4.91543L6.0365 4.9748L6.41931 4.59199L8.50837 2.50293L11.5006 5.49512L9.40994 7.58574Z"
                    fill="white"
                  />
                </svg>
              </div>
            </>
          ) : (
            ""
          )}
          <DragButtonIcon />
          <Handle
            type="target"
            className="handleNode"
            position={Position.Left}
          />
          <div className="text" id={id} onClick={handleOpenPhAdjustment}>
            {data.label}
          </div>
          <Handle
            type="source"
            className="handleNode"
            position={Position.Right}
          />
        </div>
      </div>
    </TechnologyNodeStyled>
  );
}

export default memo(TechnologyNode);

const TechnologyNodeStyled = styled("div")`
  .tab_value {
    font-size: 12px;
    position: absolute;
    top: -15px;
    right: 50%;
  }

  .technology-btn {
    width: auto;
    height: auto;
    border: 0.5px solid #e1e1e1;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
    border-radius: 2px;
    font-family: "NotoSansRegular";
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 22px;
    display: flex;
    align-items: center;
    color: ${colors.PrimaryDarkAquaMarine};
    padding: 4px 10px;
    svg {
      margin-right: 4px;
    }
  }
  .adjustPh {
    position: relative;
    text-decoration-line: underline;
    svg{
      margin-right: 6px;
    }
    .pin-icon {
      position: absolute;
      width: 19px;
      height: 19px;
      border-radius: 11px;
      border: 1px solid var(--Grey-E1, #e1e1e1);
      background: var(--Primary-Aquamarine-007672, #007672);
      display: flex;
      justify-content: center;
      align-items: center;
      bottom: 21px;
      left: 3px;
      svg {
        margin: 1px;
      }
    }
  }

  .button {
    position: absolute;
    bottom: 20;
    right: 0px;
    width: 20px;
    height: 20px;
    background-color: white;
    color: blue;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 1;
  }
  .handleNode {
    width: 7px;
    height: 7px;
    flex-shrink: 0;
    stroke-width: 1px;
    stroke: ${colors.PrimaryDarkAquaMarine};
    background-color: ${colors.Pale20PaleTeal};
    border: 1px solid ${colors.PrimaryDarkAquaMarine};
  }
`;
