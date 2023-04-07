/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Card, Button, Alert, CardBody } from 'reactstrap';

import '@styles/react/libs/formBuilder/funnel.scss';
import { isEmpty } from '@firebase/util';
import { setFormAndDataDefaultReducer } from '../store/reducer';
import { AlignLeft, Filter, TrendingUp, Users } from 'react-feather';

const FunnelInformation = ({ stepper, form, setForm }) => {
  // ** STATES
  const [activeType, setActiveType] = useState('leads');
  // ** FUNCTIONS
  const handleSetForm = (e) => {
    if(e.target.name==='automateEntry'){
      setForm({ ...form, automateEntry: e.target.checked });
    }
    else{
      setForm({ ...form, [e.target.name]: e.target.value });
    }
    
  };

  const handleSetFormType = (val) => {
    setForm({ ...form, formType: val });
    setActiveType(val);
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Add Funnel Details</h5>
        <small>Fill details about your funnel</small>
      </div>
      <Form onSubmit={(e) => e.preventDefault()}>
        <div className="h-100">
          <Row>
            <Col md="12" className="mb-1">
              <Row>
                <Col md="10">
                  <Label>Form Name</Label>
                  <Input
                    name="name"
                    onChange={handleSetForm}
                    placeholder="Form Name"
                    type="text"
                    required
                  />
                </Col>
                <Col className="mb-0 mt-auto" md="2">
                  <Input type="checkbox" name="automateEntry" onChange={handleSetForm}/>
                  <Label className="ps-50">Automate Entry</Label>
                </Col>
              </Row>
              <div style={{display:`${form?.automateEntry===true?'block':'none'}`}}>
              <Row >
                <Col md="4">
                  <Label for="memberType">Contact Type</Label>
                  <Input name="memberType" type="select" onChange={handleSetForm} required>
                    <option value="Active Member" selected>
                      Client
                    </option>
                    <option value="employees">Employee</option>
                    <option value="leads">Leads</option>
                    <option value="relationships">Relationships</option>
                    <option value="vendors">Vendor</option>
                    <option value="members">Member</option>
                  </Input>
                </Col>
                <Col md="4">
                  <Label for="smartList">Select Smart List</Label>
                  <Input
                    name="smartLists"
                    placeholder="with"
                    type="select"
                    onChange={handleSetForm}
                  />
                </Col>
                <Col md="4">
                  <Label for="subCategory">Sub Category</Label>
                  <Input
                    name="subCategory"
                    placeholder="Sub Category"
                    type="select"
                    onChange={handleSetForm}
                  />
                </Col>
              </Row>
              </div>
             
              <div className="my-2">
                <Row>
                  <Col>
                    <Card
                      onClick={() => handleSetFormType('sales')}
                      className={activeType === 'sales' ? 'border-primary' : ''}
                      style={{cursor:'pointer'}}
                    >
                      <CardBody className="text-primary text-center">
                        <Filter size={35} />
                        <h6 className="pt-2">Sales</h6>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col>
                    <Card
                      onClick={() => handleSetFormType('leads')}
                      className={activeType === 'leads' ? 'border-primary' : ''}
                      style={{cursor:'pointer'}}
                    >
                      <CardBody className="text-primary text-center">
                        <TrendingUp size={35} />
                        <h6 className="pt-2">Leads</h6>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col>
                    <Card
                      onClick={() => handleSetFormType('forms')}
                      className={activeType === 'forms' ? 'border-primary' : ''}
                      style={{cursor:'pointer'}}
                    >
                      <CardBody className="text-primary text-center">
                        <Users size={35} />
                        <h6 className="pt-2">Forms</h6>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col>
                    <Card
                      onClick={() => handleSetFormType('website')}
                      className={activeType === 'website' ? 'border-primary' : ''}
                      style={{cursor:'pointer'}}
                    >
                      <CardBody className="text-primary text-center">
                        <AlignLeft size={35} />
                        <h6 className="pt-2">Website</h6>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
              <Row>
                <Col className="d-flex flex-row-reverse">
                  <Button color="primary" type="submit" onClick={() => stepper.next()}>
                    NEXT
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Form>
    </Fragment>
  );
};

export default FunnelInformation;
