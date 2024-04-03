import React,{useState} from "react";
import { Button, Col, Container, Form, InputGroup, Row,} from "react-bootstrap";
import CreateProjectPageOneStyled from "./CreateProjectPageoneStyled";
import CreateProjectRightArrowIcon from "../../common/icons/CreateProjectRightArrowIcon";
import RequiredFieldIcon from "../../common/icons/RequiredFieldIcon";
import CloseIcon from "../../common/icons/CloseIcon";
import {Overlay} from "./CreateFolderStyled";
const CreateProjectPageOne = () => {
  const [activeCell, setActiveCell] = useState([]);

  const toggleCellSelection = (cellIndex) => {
    if (activeCell.includes(cellIndex)) {
      setActiveCell(activeCell.filter((index) => index !== cellIndex));
    } else {
      setActiveCell([...activeCell, cellIndex]);
    }
  };

  const isCellSelected = (cellIndex) => activeCell.includes(cellIndex);

  const[validated, setValidated]= useState(false);
  const [inputTouched, setInputTouched] = useState(false);

 
  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if(form.checkValidity() === false){
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
  };
  return (
    <>
      
        
      <CreateProjectPageOneStyled noValidate validated={validated} action="action" className="" onSubmit={handleSubmit}>
        <Form.Group controlId="validationCustom01">
          <Row className='project-details-information'>
            <Col className="project-column" lg={3} md={3} sm={3} xs={3}>
              <div className="label-input-box">
                <label htmlFor="uname" className="form-label"><RequiredFieldIcon/>Project No</label>
                <Form.Control disabled type="text" className="form-control-sm" id="uname" placeholder="xyz default" name="uname" required/>
                <div className="valid-feedback">Valid.</div>
                <Form.Control.Feedback type="invalid" className="invalid-feedback">Please fill out this field.</Form.Control.Feedback>
              </div>
            </Col>
            <Col className="project-column" lg={3} md={3} sm={3} xs={3}>
              <div className="label-input-box">
                <label htmlFor="uname" className="form-label">Date Created</label>
                <Form.Control type="date" disabled className="form-control-sm" id="uname" placeholder="Enter date" name="uname" required/>
                <div className="valid-feedback">Valid.</div>
                <div className="invalid-feedback">Please fill out this field.</div>
              </div>
            </Col>
            <Col className="project-column" lg={6} md={6} sm={6} xs={6}>
              <div className="label-input-box">
                <label htmlFor="uname" className="form-label"><RequiredFieldIcon/>Project Name</label>
                <Form.Control type="text" className="form-control-sm" id="uname" placeholder="Enter project Name" name="uname" required/>
                <div className="valid-feedback">Valid.</div>
                <div className="invalid-feedback">Please fill out this field.</div>
              </div>
            </Col>
            <Col className="project-column" lg={3} md={3} sm={5} xs={5}>
              <div className="mb-3 mt-2 label-input-box">
                <label htmlFor="uname" className="form-label">Project Market Segment</label>
                <Form.Select className="form-select-sm market-segment-selector">
                  <option selected disabled value="">Choose a Technology</option>
                  <option>Bio-processing</option>
                  <option>Bio-processing</option>
                  <option>Bio-processing</option>
                </Form.Select>
              </div>
            </Col>
            <Col className="project-column" lg={3} md={2} sm={2} xs={2}>
              <div className="mb-3 mt-2 label-input-box">
                <label htmlFor="uname" className="form-label"><RequiredFieldIcon/>Case No</label>
                <input type="text" className="form-control form-control-sm" id="uname" placeholder="Enter username" name="uname" required/>
                <div className="valid-feedback">Valid.</div>
                <div className="invalid-feedback">Please fill out this field.</div>
              </div>
            </Col>
            <Col className="project-column" lg={6} md={5} sm={5} xs={5}>
              <div className="mt-2 label-input-box">
                <label className="mb-2 " htmlFor="comment">Project Notes</label>
                <textarea className="form-control" rows="2" id="comment" name="text"></textarea>
              </div>
            </Col>
          </Row>
          <Row className="technology-preference">
            <Col lg={6} md={6} sm={6} xs={6} className="technology-preference-column">
              <RequiredFieldIcon/>
              <h6>Technology Preferences</h6>
            </Col>
            <Col lg={6} md={6} sm={6} xs={6} className="default-technology-preference-column">
              <h6>Make as New Default</h6>
              <div className="right-arrow-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M12.5781 6.62163L6.675 1.49819C6.62969 1.45913 6.57188 1.43726 6.51094 1.43726H5.12813C5.0125 1.43726 4.95938 1.58101 5.04688 1.65601L10.5188 6.40601H1.375C1.30625 6.40601 1.25 6.46226 1.25 6.53101V7.46851C1.25 7.53726 1.30625 7.59351 1.375 7.59351H10.5172L5.04531 12.3435C4.95781 12.4201 5.01094 12.5623 5.12656 12.5623H6.55625C6.58594 12.5623 6.61563 12.5513 6.6375 12.531L12.5781 7.37788C12.6322 7.33084 12.6756 7.27275 12.7053 7.20752C12.735 7.14229 12.7504 7.07144 12.7504 6.99976C12.7504 6.92807 12.735 6.85723 12.7053 6.79199C12.6756 6.72676 12.6322 6.66867 12.5781 6.62163Z" fill="black"/>
                </svg>
              </div>
            </Col>
          </Row>
          <Row className="check-box-row">
            <Col lg={9} md={3} sm={3} xs={3} className="check-box-column">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="validationFormCheck1" name="check1" value="" required/>
                <label className="form-check-label" htmlFor="defaultCheck1">
                    UF
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="validationFormCheck2" name="check1" value="" required/>
                <label className="form-check-label" htmlFor="defaultCheck1">
                    RO
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" required/>
                <label className="form-check-label" htmlFor="defaultCheck1">
                    IX
                </label>
              </div>
              <div className="invalid-feedback">Please fill out this field.</div>
            </Col>
            <Col lg={6} md={6} sm={6} xs={6} className="checkbox-description-column">
              <p>It can be changed from inside the project</p>
            </Col>
          </Row>
          <Row className="technology-used-row">
            <Col lg={3} md={3} sm={3} xs={3} className="pre-treatment process">
              <h6>Pre-treatment</h6>
              <div className="technology-btn">
                <Button className={isCellSelected(1) ? "selected-btn" : "default-btn"} onClick={() => toggleCellSelection(1)}>UF</Button>
                <Button className={isCellSelected(2) ? "selected-btn" : "default-btn"} onClick={() => toggleCellSelection(2)}>IXS/D</Button>
                <Button className={isCellSelected(3) ? "selected-btn" : "default-btn"} onClick={() => toggleCellSelection(3)}>IXOS</Button>
              </div>
            </Col>
            <Col lg={4} md={3} sm={3} xs={3} className="bulk-demineralization process">
              <h6>Bulk Demineralization</h6>
              <div className="technology-btn">
                <Button className={isCellSelected(4) ? "selected-btn" : "default-btn"} onClick={() => toggleCellSelection(4)}>RO</Button>
                <Button className={isCellSelected(5) ? "selected-btn" : "default-btn"} onClick={() => toggleCellSelection(5)}>CCRO</Button>
                <Button className={isCellSelected(6) ? "selected-btn" : "default-btn"} onClick={() => toggleCellSelection(6)}>ROSC</Button>
                <Button className={isCellSelected(7) ? "selected-btn" : "default-btn"} onClick={() => toggleCellSelection(7)}>IXD</Button>
              </div>
            </Col>
            <Col lg={2} md={3} sm={3} xs={3} className="trace-removal process">
              <h6>Trace Contaminants Removal</h6>
              <div className="technology-btn"> 
                <Button className={isCellSelected(8) ? "selected-btn" : "default-btn"} onClick={() => toggleCellSelection(8)}>IXN</Button>
                <Button className={isCellSelected(9) ? "selected-btn" : "default-btn"} onClick={() => toggleCellSelection(9)}>IXB</Button>
              </div>
            </Col>
            <Col lg={3} md={3} sm={3} xs={3} className="polishing process">
              <h6>Polishing</h6>
              <div className="technology-btn">
                <Button className={isCellSelected(10) ? "selected-btn" : "default-btn"} onClick={() => toggleCellSelection(10)}>UF</Button>
                <Button className={isCellSelected(11) ? "selected-btn" : "default-btn"} onClick={() => toggleCellSelection(11)}>IXD</Button>
                <Button className={isCellSelected(12) ? "selected-btn" : "default-btn"} onClick={() => toggleCellSelection(12)}>IXOS</Button>
              </div>
            </Col>
          </Row>
        </Form.Group>
        <Row className='create-page-footer'>
          <Col md={12} className='next-btn'>
            <Button className='bt' type="submit">Next</Button>
          </Col>
        </Row>
      </CreateProjectPageOneStyled>
    </>
  );
};

export default CreateProjectPageOne;