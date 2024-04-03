/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useRef, useState } from "react";
import {
  Container,
  Row,
  Col,
  Dropdown,
  Form,
  Table,
  Button,
} from "react-bootstrap";
import CreateProjectPageThreeStyled from "./CreateProjectPageThreeStyled";
import { useLazyGetAllDataQuery } from "../../services/apiConfig";
import { useEffect } from "react";
import ArrowRightIcon from "../../common/icons/ArrowRightIcon";
import { useCreateDataMutation } from "../../services/apiConfig";
import { toast } from "react-toastify";
import { MyError } from "../../common/utils/ErrorCreator";
const CreateProjectPageThree = () => {
  const userID = 1;
  const [activeCell, setActiveCell] = useState([]);
  const [Currencylist, setCurrencylist] = useState();
  const [getCurrencylist, responseCurrencylist] = useLazyGetAllDataQuery();
  const [getUnitlist, responseUnitlist] = useLazyGetAllDataQuery();
  const [unitData, setunitData] = useState();

  useEffect(() => {
    if (responseUnitlist.isLoading) {
    } else {
      if (responseUnitlist.isSuccess === true) {
        setunitData(responseUnitlist.data);
      }
    }
    if (responseUnitlist.isError) {
      throw new MyError(
        "UnitOfMeassure Api Error",
        responseUnitlist.error.status,
        "ApiError"
      );
    }
  }, [responseUnitlist]);

  useEffect(() => {
    getUnitlist(`${"UnitOfMeassure"}?userID=${userID}`);
    getCurrencylist(`${"DefaultCurrency"}?userID=${userID}`);
  }, []);
  useEffect(() => {
    if (responseCurrencylist.isLoading) {
    } else {
      if (responseCurrencylist.isSuccess === true) {
        setCurrencylist(responseCurrencylist.data);
      }
    }
    if (responseCurrencylist.isError) {
      throw new MyError(
        "default currency Api Error",
        responseCurrencylist.error.status,
        "ApiError"
      );
    }
  }, [responseCurrencylist]);
  const [IsSelectCurrency, setIsSelectCurrency] = useState(false);
  const [IsSelectUnits, setIsSelectUnits] = useState();
  const isCellSelected = (cellIndex) => activeCell.includes(cellIndex);
  const CurrencyUpdateRadio = (index) => {
    if (index == "ManuallyRate") {
      setIsSelectCurrency(true);
    } else {
      setIsSelectCurrency(false);
    }
  };

  const [SelectedCurrency, setSelectedCurrency] = useState();
  const [CurrencyDataPost, { data }] = useCreateDataMutation();
  const drpChange = (e) => {
    setSelectedCurrency(
      Currencylist.filter((data) => data.currencyName == e.target.value)
    );
  };
  const MakeCurrencyNewDefault = async () => {
    if (SelectedCurrency[0].currencyID > 0) {
      const CurrencyData = {
        Method: "MakeDefaultCurrency",
        currencyID: SelectedCurrency[0].currencyID,
        userID: 1,
      };
      let PostResponseValues = await CurrencyDataPost(CurrencyData);
      if (PostResponseValues.data.responseMessage == "Success") {
        toast.success(
          "Make Currency as New Default ,Record Updated successfully !",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
      } else {
        toast.error(PostResponseValues.data.message, "Record not Update !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  const UnitsUpdateRadio = (e) => {
    if (e == "US") {
      setIsSelectUnits(e);
    } else if (e == "METRIC") {
      setIsSelectUnits(e);
    } else {
      setIsSelectUnits(e);
    }
  };
  const handleUnitType = (e) => {
    if (e == "US") {
      setIsSelectUnits(e);
    } else if (e == "METRIC") {
      setIsSelectUnits(e);
    } else {
      setIsSelectUnits(e);
    }
    const values = ["US", "METRIC"];
    const unitTypeUnSlected = values[(values.indexOf(e) + 1) % values.length];
    let unitDataTemp = unitData.map((u) => {
      let selectFirstUomSystemNameCount = 0;
      let unitKeyTemp = u.unitKey.map((x) => {
        if (x.uomsystemName === unitTypeUnSlected) {
          x = { ...x, isSelected: false };
        } else if (
          selectFirstUomSystemNameCount === 0 &&
          x.uomsystemName === e
        ) {
          selectFirstUomSystemNameCount++;
          x = { ...x, isSelected: true };
        } else if (selectFirstUomSystemNameCount > 0 && x.uomsystemName === e) {
          x = { ...x, isSelected: true };
        }
        return x;
      });
      u = { ...u, unitKey: unitKeyTemp };
      return u;
    });
    setunitData(unitDataTemp);
  };

  const handleToggelById = (id, item) => {
    if (IsSelectUnits == "User Defined") {
      if (item.isSelected === false) {
        let unitDataTemp = unitData;
        let selectedItem = unitData.filter((x) => x.uomTypeID === id);
        let selectedUomItem = selectedItem[0].unitKey.map((u, index) => {
          if (item.uomId === u.uomId) {
            u = { ...u, isSelected: true };
          }
          return u;
        });

        unitDataTemp = unitData.map((ud, index) => {
          if (ud.uomTypeID === id) {
            ud = { ...ud, unitKey: selectedUomItem };
          }
          return ud;
        });
        setunitData(unitDataTemp);
      } else {
        let unitDataTemp = unitData;
        let selectedItem = unitData.filter((x) => x.uomTypeID === id);
        let selectedUomItem = selectedItem[0].unitKey.map((u, index) => {
          if (item.uomId === u.uomId) {
            u = { ...u, isSelected: false };
          }
          return u;
        });

        unitDataTemp = unitData.map((ud, index) => {
          if (ud.uomTypeID === id) {
            ud = { ...ud, unitKey: selectedUomItem };
          }
          return ud;
        });
        setunitData(unitDataTemp);
      }
    }
  };

  const [selectedUomIdMap, setselectedUomIdMap] = useState([]);
  const [technology, setTechnology] = useState({
    Umoid: [],
  });
  const { Umoid } = technology;

  const MakeUnitNewDefault = () => {
    let uomTypeID = unitData.length;

    while (uomTypeID > 0) {
      let selectedItem = unitData.filter((x) => x.uomTypeID == uomTypeID);
      let selecteUomItem = selectedItem[0].unitKey.map((u, index) => {
        let unitKey = u.isSelected == true;
        if (unitKey == true) {
          let uomId = u.uomId;

          setTechnology({
            Umoid: [...Umoid, uomId],
          });
          setselectedUomIdMap({ ...selectedUomIdMap, uomId });
        }
      });
      uomTypeID--;
    }
  };

  return (
    <>
      <CreateProjectPageThreeStyled>
        <Row className="currency-row g-0">
          <Col lg={4} md={4} sm={4} className="currency-details-first-column">
            <Col lg={12} md={7} sm={7} xs={7} className="project-setting">
              <h6>Currency Settings</h6>
              <label htmlFor="uname" className="form-label">
                Select Currency for Project
              </label>
              <select
                className="form-select-sm form-select"
                label="select"
                id="floatingSelectGrid"
                onChange={drpChange}
              >
                {Currencylist?.map((data, i) => (
                  <option key={i}>{data.currencyName}</option>
                ))}
                ;
              </select>
            </Col>
            <Col lg={12} md={5} sm={4} xs={4} className="exchange-rate-radio">
              <div className="exchange-heading">
                <label htmlFor="uname" className="form-label">
                  Currency Exchange rate
                </label>
              </div>
              <div className="wrapper-radio d-flex">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="DupontRate"
                    onChange={() => CurrencyUpdateRadio("DupontRate")}
                    value="DupontRate"
                  />
                  <label className="form-check-label" htmlFor="exampleRadios1">
                    Use Default Rate
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="ManuallyRate"
                    onChange={() => CurrencyUpdateRadio("ManuallyRate")}
                    value="ManuallyRate"
                  />
                  <label className="form-check-label" htmlFor="exampleRadios1">
                    Enter Manually
                  </label>
                </div>
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
                {IsSelectCurrency ? (
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    id="uname"
                    placeholder="0"
                    name="uname"
                    required
                  />
                ) : (
                  <input
                    type="number"
                    disabled
                    className="form-control form-control-sm"
                    id="uname"
                    placeholder="0"
                    name="uname"
                    required
                  />
                )}
              </div>
            </Col>
            <Col lg={12} md={5} sm={5} xs={5} className="default-currency">
              <h6 onClick={MakeCurrencyNewDefault}>
                Make Currency as New Default
              </h6>
              <ArrowRightIcon />
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
                      onClick={() => handleUnitType("US")}
                    />
                    <Form.Check
                      className="form-check-inline"
                      type="radio"
                      name="option1"
                      id="default-radio"
                      label="METRIC"
                      onClick={() => handleUnitType("METRIC")}
                    />
                    <Form.Check
                      className="form-check-inline"
                      type="radio"
                      name="option1"
                      id="default-radio"
                      label="User Defined"
                      onChange={() => UnitsUpdateRadio("User Defined")}
                    />
                  </Form>
                </Col>
                <Col lg={4} md={5} sm={5} xs={5} className="default-units">
                  <h6 onClick={MakeUnitNewDefault}>Make Units New Default</h6>
                </Col>
              </Col>

              <Col lg={6} md={4} sm={4} xs={4} className="table-one">
                <Table>
                  <tbody>
                    <th></th>
                    <th>US</th>
                    <th>METRIC</th>
                    {unitData &&
                      unitData.length &&
                      unitData.map((u, index) => {
                        return (
                          // eslint-disable-next-line react/jsx-key
                          <tr>
                            {u.uomTypeID < 9 ? (
                              <>
                                <td className="unit-name" key={index}>
                                  
                                  {u.uomTypeName}
                                </td>
                                <td>
                                  {u.unitKey &&
                                    u.unitKey.length &&
                                    u.uomTypeID < 9 &&
                                    u.unitKey
                                      .filter(
                                        (item) => item.uomsystemName === "US"
                                      )
                                      .map((item) => {
                                        return (
                                          // eslint-disable-next-line react/jsx-key
                                          <table>
                                            <tr>
                                              <td
                                                onClick={() =>
                                                  handleToggelById(
                                                    u.uomTypeID,
                                                    item
                                                  )
                                                }
                                                id="left-pill"
                                                className={
                                                  item.isSelected
                                                    ? "selected"
                                                    : "water-filter-units"
                                                }
                                              >
                                                {item.uomName}
                                              </td>
                                            </tr>
                                          </table>
                                        );
                                      })}
                                </td>
                                <td>
                                  {u.unitKey &&
                                    u.unitKey.length &&
                                    u.uomTypeID < 9 &&
                                    u.unitKey
                                      .filter(
                                        (item) =>
                                          item.uomsystemName === "METRIC"
                                      )
                                      .map((item) => {
                                        return (
                                          // eslint-disable-next-line react/jsx-key
                                          <table>
                                            <tr>
                                              <td
                                                onClick={() =>
                                                  handleToggelById(
                                                    u.uomTypeID,
                                                    item
                                                  )
                                                }
                                                id="right-pill"
                                                className={
                                                  item.isSelected
                                                    ? "selected"
                                                    : "water-filter-units"
                                                }
                                              >
                                                {item.uomName}
                                              </td>
                                            </tr>
                                          </table>
                                        );
                                      })}
                                </td>
                              </>
                            ) : (
                              ""
                            )}
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </Col>
              <Col lg={6} md={4} sm={4} xs={4} className="table-two">
                <Table>
                  <tbody>
                    <th></th>
                    <th>US</th>
                    <th>METRIC</th>
                    {unitData &&
                      unitData.length &&
                      unitData.map((u, index) => {
                        return (
                          // eslint-disable-next-line react/jsx-key
                          <tr>
                            {u.uomTypeID > 8 ? (
                              <>
                                <td className="unit-name" key={index}>
                                  
                                  {u.uomTypeName}
                                </td>
                                <td>
                                  {u.unitKey &&
                                    u.unitKey.length &&
                                    u.uomTypeID > 8 &&
                                    u.unitKey
                                      .filter(
                                        (item) => item.uomsystemName === "US"
                                      )
                                      .map((item) => {
                                        return (
                                          // eslint-disable-next-line react/jsx-key
                                          <table>
                                            <tr>
                                              <td
                                                onClick={() =>
                                                  handleToggelById(
                                                    u.uomTypeID,
                                                    item
                                                  )
                                                }
                                                id="left-pill"
                                                className={
                                                  item.isSelected
                                                    ? "selected"
                                                    : "water-filter-units"
                                                }
                                              >
                                                {item.uomName}
                                              </td>
                                            </tr>
                                          </table>
                                        );
                                      })}
                                </td>
                                <td>
                                  {u.unitKey &&
                                    u.unitKey.length &&
                                    u.uomTypeID > 8 &&
                                    u.unitKey
                                      .filter(
                                        (item) =>
                                          item.uomsystemName === "METRIC"
                                      )
                                      .map((item) => {
                                        return (
                                          // eslint-disable-next-line react/jsx-key
                                          <table>
                                            <tr>
                                              <td
                                                onClick={() =>
                                                  handleToggelById(
                                                    u.uomTypeID,
                                                    item
                                                  )
                                                }
                                                id="right-pill"
                                                className={
                                                  item.isSelected
                                                    ? "selected"
                                                    : "water-filter-units"
                                                }
                                              >
                                                {item.uomName}
                                              </td>
                                            </tr>
                                          </table>
                                        );
                                      })}
                                </td>
                              </>
                            ) : (
                              ""
                            )}
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="create-page-footer g-0">
          <Col md={12} className="cancel-next-btn">
            <Button className="back-btn">Back</Button>
            <Button className="create-btn">Create New Project</Button>
          </Col>
        </Row>
      </CreateProjectPageThreeStyled>
    </>
  );
};

export default CreateProjectPageThree;
