/* eslint-disable quotes */
import React,{useState} from "react";
import { Container, Row, Col, Button, Dropdown, Form} from "react-bootstrap";
import CreateProjectPageTwoStyled from "./CreateProjectPageTwoStyled";
import RequiredFieldIcon from "../icons/RequiredFieldIcon";
import Michigan from "../modals/usa-flag.svg";
const countries =[
  {
    code:"US",
    label:"+1",
    path:"./images/language-pref/usa-flag.svg"
  },
  {
    code:"GB",
    label:"+91",
    path:"./images/language-pref/chinese-flag.svg"
  },
  {
    code:"GB",
    label:"+44",
    path:"./images/language-pref/chinese-flag.svg"
  },
];
const CreateProjectPageTwo = () => {
  const [selectedLabel, setSelectedLabel] = useState ("+1");
  const [selectedImage, setSelectedImage] = useState(Michigan);

  const handleChange = (path, label) =>{
    setSelectedLabel(label);
    setSelectedImage(path);
  };
  const[validated, setValidated]= useState(false);

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
      
        
      <CreateProjectPageTwoStyled noValidate validated={validated} action="action" className="" onSubmit={handleSubmit}>
        <Form.Group controlId="validationCustom01">
          <Row className='designer-details'>
            <h3>Designer Details</h3>
            <Col lg={4} md={4} sm={4} xs={4} className="designer-name">
              <div className=" mb-3 label-input-box">
                <label htmlFor="uname" className="form-label">Designer</label>
                <input type="text" className="form-control form-control-sm" id="uname" placeholder="xyz default" name="uname"/>
                
                <div className="invalid-feedback">Please fill out this field.</div>
              </div>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4} className="designer-company-name">
              <div className="mb-3 label-input-box">
                <label htmlFor="uname" className="form-label">Designer&apos;s Company</label>
                <input type="text" className="form-control form-control-sm" id="uname" placeholder="XYZ. Company" name="uname"/>
                <div className="invalid-feedback">Please fill out this field.</div>
              </div>
            </Col>
          </Row>
          <Row className="customer-details">
            <h3>Project Customer Details</h3>
            <Col lg={4} md={4} sm={4} xs={4} className="customer-name">
              <div className="mb-2 label-input-box">
                <label htmlFor="uname" className="form-label">Customer</label>
                <input type="text" className="form-control form-control-sm" id="uname" placeholder="xyz" name="uname"/>
                <div className="invalid-feedback">Please fill out this field.</div>
              </div>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4} className="country-selection">
              <label htmlFor="uname" className="mb-2 form-label"><RequiredFieldIcon/>Country</label>
              <Form.Select className="form-select-sm" id="floatingSelectGrid" required>
                <option>United State</option>
                <option value="1">India</option>
                <option value="2">China</option>
                <option value="3">Russia</option>
              </Form.Select>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4} className="state-selection">
              <label htmlFor="uname" className="mb-2 form-label">State or Province</label>
              <Form.Select className="form-select-sm" id="floatingSelectGrid">
                <option selected>Texas</option>
                <option value="1">California</option>
                <option value="2">Texas</option>
                <option value="3">California</option>
              </Form.Select> 
            </Col>
            <Col lg={4} md={4} sm={4} xs={4} className="city-selection">
              <label htmlFor="uname" className="form-label">City</label>
              <input type="text" className="form-control form-control-sm" id="uname" placeholder="city"/>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4} className="contact-number">
              <div className="label-input-box">
                <label htmlFor="uname" className="form-label">Contact</label>
                <div className="country-code-input-box">
                  <Dropdown>
                    <Dropdown.Toggle>
                      <img src={selectedImage} alt={selectedLabel} />
                      {selectedLabel}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {countries.map((option, key)=>(
                        <Dropdown.Item key={option.code} onClick={()=>handleChange(option.path, option.label)}>
                          <img src={option.path} alt={option.label} />
                          {option.label}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  <input type="tel" className="form-control" id="uname" placeholder="123456778" name="uname"/>
                </div>
                <div className="valid-feedback">Valid.</div>
                <div className="invalid-feedback">Please fill out this field.</div>
              </div>
            </Col>
          </Row>
          <Row className='create-page-footer g-0'>
            <Col md={12} className='next-btn'>
              <Button className="back-btn">Back</Button>
              <Button type="submit" className='nxt-btn'>Next</Button>
            </Col>
          </Row>
        </Form.Group>
      </CreateProjectPageTwoStyled>
    </>
  );
};

export default CreateProjectPageTwo;