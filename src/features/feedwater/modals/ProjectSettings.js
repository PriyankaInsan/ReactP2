import React, { useState } from "react";
import { Row, Col, Form, Table, Button } from "react-bootstrap";
import RequiredFieldIcon from "../../../common/icons/RequiredFieldIcon";
import RightArrowIcon from "../../../common/icons/ArrowRightIcon";
import CloseIcon from "../../../common/icons/CloseIcon";
import DoneTickMarkIcon from "../../../common/icons/DoneTickMarkIcon";
import CurrencyUnitPopUpStyled from "./CurrencyAndUnitPopUpStyled";
import DefaultCurrencyMessage from "./DefaultCurrencyMessage";
import DefaultUnitsMessage from "./DefaultUnitsMessage";
import CurrencyAndUnitsApplied from "./CurrencyAndUnitsApplied";
import ProjectSettingsStyled from "./ProjectSettingsStyled";
const ProjectSettings = ({ parentModal }) => {
  const [activeCell, setActiveCell] = useState([]);
  const [defaultCurrency, setDefaultCurrency] = useState(false);
  const [defaultUnit, setDefaultUnit] = useState(false);
  const [currencyUnitApplied, setCurrencyUnitApplied] = useState(false);

  const toggleCellSelection = (cellIndex) => {
    if (activeCell.includes(cellIndex)) {
      setActiveCell(activeCell.filter((index) => index !== cellIndex));
    } else {
      setActiveCell([...activeCell, cellIndex]);
    }
  };

  const isCellSelected = (cellIndex) => activeCell.includes(cellIndex);

  const handleOpenDefaultCurrency = () => {
    setDefaultCurrency(true);
  };

  const handleOpenDefaultUnit = () => {
    setDefaultUnit(true);
  };

  const handleOpenCurrencyUnit = () => {
    setCurrencyUnitApplied(true);
  };

  return (
    <>
      <ProjectSettingsStyled>
        <Row className="currency-row g-0">
          <Col lg={4} md={4} sm={4} className="currency-details-first-column">
            <Col lg={12} md={7} sm={7} xs={7} className="project-setting">
              <h6>Currency Settings</h6>
              <Form.Label className="form-label">
                Select Currency for Project
              </Form.Label>
              <select
                className="form-select-sm form-select"
                id="floatingSelectGrid"
              >
                <option selected>US Dollar($)</option>
                <option value="1">Rupee</option>
                <option value="2">US Dollar($)</option>
                <option value="3">Three</option>
              </select>
            </Col>
            <Col lg={12} md={5} sm={4} xs={4} className="exchange-rate-radio">
              <div className="exchange-heading">
                <Form.Label className="form-label">
                  Currency Exchange rate
                </Form.Label>
              </div>
              <div className="wrapper-radio d-flex">
                <Form.Check
                  type="radio"
                  id="checkBox"
                  label="Use Default Rate"
                />
                <Form.Check type="radio" id="checkBox" label="Enter Manually" />
              </div>
              <div>
                <p>Its measured against USD($)</p>
              </div>
            </Col>
            <Col
              lg={12}
              md={3}
              sm={3}
              xs={3}
              className="currency-exchange-rate"
            >
              <div className="label-input-box">
                <label htmlFor="uname" className="form-label">
                  Currency Exchange rate
                </label>
                <Form.Control
                  type="text"
                  disabled
                  className="form-control form-control-sm"
                  id="uname"
                  placeholder="0"
                  name="uname"
                  required
                />
              </div>
            </Col>
            <Col lg={12} md={5} sm={5} xs={5} className="default-currency">
              <h6 onClick={handleOpenDefaultCurrency}>
                Make Currency as New Default
                <DefaultCurrencyMessage
                  show={defaultCurrency}
                  close={setDefaultCurrency}
                />
              </h6>
              <RightArrowIcon />
            </Col>
          </Col>
          <Col lg={8} className="unit-table-data-row">
            <Row className="g-0">
              <Col lg={12} className="units-metric-row">
                <Col lg={8} md={7} sm={7} xs={7} className="">
                  <h5>Select Units for Project</h5>
                  <Form>
                    <Form.Check
                      className="form-check-inline"
                      type="radio"
                      name="option1"
                      id="default-radio"
                      label="US"
                    />
                    <Form.Check
                      className="form-check-inline"
                      type="radio"
                      name="option1"
                      id="default-radio"
                      label="METRIC"
                    />
                    <Form.Check
                      className="form-check-inline"
                      type="radio"
                      name="option1"
                      id="default-radio"
                      label="User Defined"
                    />
                  </Form>
                </Col>
                <Col lg={4} md={5} sm={5} xs={5} className="default-units">
                  <h6 onClick={handleOpenDefaultUnit}>
                    Make Units New Default
                    <DefaultUnitsMessage
                      show={defaultUnit}
                      close={setDefaultUnit}
                    />
                  </h6>
                </Col>
              </Col>
              <Col lg={6} md={4} sm={4} xs={4} className="table-one">
                <Table>
                  <tbody>
                    <th></th>
                    <th>US</th>
                    <th>METRIC</th>
                    <tr>
                      <td className="unit-name">Flow</td>
                      <td
                        id="left-pill"
                        className={
                          isCellSelected(0) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(0)}
                      >
                        gpm
                      </td>
                      <td
                        id="right-pill"
                        className={
                          isCellSelected(1) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(1)}
                      >
                        m<sup>3</sup>/h
                      </td>
                    </tr>
                    <tr>
                      <td className="blank-unit"></td>
                      <td
                        id="left-pill"
                        className={
                          isCellSelected(2) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(2)}
                      >
                        gpd
                      </td>
                      <td
                        id="right-pill"
                        className={
                          isCellSelected(3) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(3)}
                      >
                        m<sup>3</sup>/d
                      </td>
                    </tr>
                    <tr>
                      <td className="blank-unit"></td>
                      <td className="blank-unit"></td>
                      <td
                        id="right-pill"
                        className={
                          isCellSelected(4) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(4)}
                      >
                        l/s
                      </td>
                    </tr>
                    <tr>
                      <td className="unit-name">Pressure</td>
                      <td
                        id="left-pill"
                        className={
                          isCellSelected(5) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(5)}
                      >
                        Psi
                      </td>
                      <td
                        id="right-pill"
                        className={
                          isCellSelected(6) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(6)}
                      >
                        bar
                      </td>
                    </tr>
                    <tr>
                      <td className="blank-unit"></td>
                      <td className="blank-unit"></td>
                      <td
                        id="right-pill"
                        className={
                          isCellSelected(7) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(7)}
                      >
                        kPa
                      </td>
                    </tr>
                    <tr>
                      <td className="unit-name">Temperature</td>
                      <td
                        id="left-pill"
                        className={
                          isCellSelected(8) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(8)}
                      >
                        &deg;F
                      </td>
                      <td
                        id="right-pill"
                        className={
                          isCellSelected(9) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(9)}
                      >
                        &deg;C
                      </td>
                    </tr>
                    <tr>
                      <td className="unit-name">Flux</td>
                      <td
                        id="left-pill"
                        className={
                          isCellSelected(10) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(10)}
                      >
                        gfd
                      </td>
                      <td
                        id="right-pill"
                        className={
                          isCellSelected(11) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(11)}
                      >
                        LMH
                      </td>
                    </tr>
                    <tr>
                      <td className="unit-name">Area</td>
                      <td
                        id="left-pill"
                        className={
                          isCellSelected(12) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(12)}
                      >
                        ft<sup>2</sup>
                      </td>
                      <td
                        id="right-pill"
                        className={
                          isCellSelected(13) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(13)}
                      >
                        m <sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td className="unit-name">Concentration(gases)</td>
                      <td
                        id="left-pill"
                        className={
                          isCellSelected(14) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(14)}
                      >
                        Psi
                      </td>
                      <td
                        id="right-pill"
                        className={
                          isCellSelected(15) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(15)}
                      >
                        LMH
                      </td>
                    </tr>
                    <tr>
                      <td className="unit-name">Conductivity</td>
                      <td className="blank-unit"></td>
                      <td
                        id="right-pill"
                        className={
                          isCellSelected(16) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(16)}
                      >
                        m<sup>3</sup>/h
                      </td>
                    </tr>
                    <tr>
                      <td className="blank-unit"></td>
                      <td className="blank-unit"></td>
                      <td
                        id="right-pill"
                        className={
                          isCellSelected(17) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(17)}
                      >
                        m<sup>3</sup>/d
                      </td>
                    </tr>
                    <tr>
                      <td className="unit-name">Density</td>
                      <td
                        id="left-pill"
                        className={
                          isCellSelected(18) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(18)}
                      >
                        Psi
                      </td>
                      <td
                        id="right-pill"
                        className={
                          isCellSelected(19) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(19)}
                      >
                        l/s
                      </td>
                    </tr>
                    <tr>
                      <td className="unit-name">Length</td>
                      <td
                        id="left-pill"
                        className={
                          isCellSelected(20) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(20)}
                      >
                        Psi
                      </td>
                      <td
                        id="right-pill"
                        className={
                          isCellSelected(21) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(21)}
                      >
                        bar
                      </td>
                    </tr>
                    <tr>
                      <td className="blank-unit"></td>
                      <td className="blank-unit"></td>
                      <td
                        id="right-pill"
                        className={
                          isCellSelected(22) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(22)}
                      >
                        kPa
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col lg={6} md={4} sm={4} xs={4} className="table-two">
                <Table>
                  <tbody>
                    <th></th>
                    <th>US</th>
                    <th>METRIC</th>

                    <tr>
                      <td className="unit-name">Power</td>
                      <td
                        id="left-pill"
                        className={
                          isCellSelected(23) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(23)}
                      >
                        &deg;F
                      </td>
                      <td
                        id="right-pill"
                        className={
                          isCellSelected(24) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(24)}
                      >
                        &deg;C
                      </td>
                    </tr>
                    <tr>
                      <td className="unit-name">Specific Velocity</td>
                      <td
                        id="left-pill"
                        className={
                          isCellSelected(25) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(25)}
                      >
                        gfd
                      </td>
                      <td
                        id="right-pill"
                        className={
                          isCellSelected(26) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(26)}
                      >
                        LMH
                      </td>
                    </tr>
                    <tr>
                      <td className="unit-name">Volume(Solution)</td>
                      <td
                        id="left-pill"
                        className={
                          isCellSelected(27) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(27)}
                      >
                        ft<sup>2</sup>
                      </td>
                      <td
                        id="right-pill"
                        className={
                          isCellSelected(28) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(28)}
                      >
                        m <sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td className="blank-unit"></td>
                      <td className="blank-unit"></td>
                      <td
                        id="right-pill"
                        className={
                          isCellSelected(29) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(29)}
                      >
                        LMH
                      </td>
                    </tr>
                    <tr>
                      <td className="unit-name">Volume(Resin)</td>
                      <td
                        id="left-pill"
                        className={
                          isCellSelected(30) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(30)}
                      >
                        gpm
                      </td>
                      <td
                        id="right-pill"
                        className={
                          isCellSelected(31) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(31)}
                      >
                        m<sup>3</sup>/h
                      </td>
                    </tr>
                    <tr>
                      <td className="blank-unit"></td>
                      <td className="blank-unit"></td>
                      <td
                        id="right-pill"
                        className={
                          isCellSelected(32) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(32)}
                      >
                        m<sup>3</sup>/d
                      </td>
                    </tr>
                    <tr>
                      <td className="unit-name">Volume(Common)</td>
                      <td className="blank-unit"></td>
                      <td
                        id="right-pill"
                        className={
                          isCellSelected(33) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(33)}
                      >
                        l/s
                      </td>
                    </tr>
                    <tr>
                      <td className="unit-name">Regeneration dose</td>
                      <td
                        id="left-pill"
                        className={
                          isCellSelected(34) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(34)}
                      >
                        Psi
                      </td>
                      <td
                        id="right-pill"
                        className={
                          isCellSelected(35) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(35)}
                      >
                        bar
                      </td>
                    </tr>
                    <tr>
                      <td className="unit-name">Linear Velocity</td>
                      <td
                        id="left-pill"
                        className={
                          isCellSelected(36) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(36)}
                      >
                        &deg;F
                      </td>
                      <td
                        id="right-pill"
                        className={
                          isCellSelected(37) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(37)}
                      >
                        kPa
                      </td>
                    </tr>
                    <tr>
                      <td className="unit-name">Weight</td>
                      <td
                        id="left-pill"
                        className={
                          isCellSelected(38) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(38)}
                      >
                        &deg;F
                      </td>
                      <td
                        id="right-pill"
                        className={
                          isCellSelected(39) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(39)}
                      >
                        &deg;C
                      </td>
                    </tr>
                    <tr>
                      <td className="unit-name">Gas Flow</td>
                      <td
                        id="left-pill"
                        className={
                          isCellSelected(40) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(40)}
                      >
                        gfd
                      </td>
                      <td
                        id="right-pill"
                        className={
                          isCellSelected(41) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(41)}
                      >
                        LMH
                      </td>
                    </tr>
                    <tr>
                      <td className="unit-name">Organics</td>
                      <td className="blank-unit"></td>
                      <td
                        id="right-pill"
                        className={
                          isCellSelected(42) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(42)}
                      >
                        m <sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td className="blank-unit"></td>
                      <td className="blank-unit"></td>
                      <td
                        id="right-pill"
                        className={
                          isCellSelected(43) ? "selected" : "water-filter-units"
                        }
                        onClick={() => toggleCellSelection(43)}
                      >
                        LMH
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="create-page-footer g-0">
          <Col md={12} className="cancel-next-btn">
            <Button className="create-btn" onClick={handleOpenCurrencyUnit}>
              Apply
              <CurrencyAndUnitsApplied
                show={currencyUnitApplied}
                close={setCurrencyUnitApplied}
                childParentModal={parentModal}
              />
            </Button>
          </Col>
        </Row>
      </ProjectSettingsStyled>
    </>
  );
};

export default ProjectSettings;
