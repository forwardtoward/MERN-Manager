import React from 'react';
import { MoreVertical, Trash } from 'react-feather';
import { AiOutlineDelete, AiOutlineMail } from 'react-icons/ai';
import { GoLocation } from 'react-icons/go';
import { MdAddIcCall } from 'react-icons/md';
import DataTable from 'react-data-table-component';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  UncontrolledDropdown
} from 'reactstrap';
import { FiEdit } from 'react-icons/fi';

const data = [
  {
    id: 1, 
    date: 'Mon Feb 20 2023 17:41:29 GMT+0530 (India Standard Time)',
    followUpType: 'General', 
    response: 'Left Message',
    note: 'sdadakdhskad'
  },
  {
    id: 2, 
    date: 'Mon Feb 20 2023 17:41:29 GMT+0530 (India Standard Time)',
    followUpType: 'Birthday', 
    response: 'No Answer',
    note: 'sdadakdhskad'
  },
  {
    id: 3, 
    date: 'Mon Feb 20 2023 17:41:29 GMT+0530 (India Standard Time)',
    followUpType: 'Miss You', 
    response: 'Answer',
    note: 'sdadakdhskad'
  }
]

function NotesView() {
  const columnsdata = [
    {
      name: 'Date',
      selector: (row) => row.date
    },
    {
      name: 'Follow Up Type',
      selector: (row) => row.followUpType
    },
    {
      name: 'Response',
      selector: (row) => row.response
    },
    {
      name: 'Note',
      selector: (row) => row.note
    },
    {
      name: 'Action',
      selector: (row) => row.mode,
      cell: (row) => (
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem tag="span" className="w-100">
              <FiEdit size={14} className="me-50" />
              <span className="align-middle">Edit</span>
            </DropdownItem>
            <DropdownItem
              tag="span"
              // href="/"
              className="w-100"
            >
              <AiOutlineDelete size={14} className="me-50" />
              <span className="align-middle">Remove</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      )
    }
  ];

  return (
    <>
      <Row>
        <Col xl="5" lg="5">
          <Row>
            <Col xl="6" md="6">
              <Card
                style={{
                  width: '100',
                  boxShadow: 'none'
                }}
              >
                <img class="rounded" alt="Sample" src="https://picsum.photos/300/200" />

                <Button className="mt-2 color-primary" color="primary">
                  Add Appointment
                </Button>
              </Card>
            </Col>
            <Col xl="6" md="6">
              <div className="mb-1">
                <MdAddIcCall size={20} className="" />
                <Label className="px-1">516-543-9671 </Label>
              </div>
              <div className="mb-1">
                <AiOutlineMail size={20} />
                <Label className="px-1"> N/A</Label>
              </div>
              <div>
                <GoLocation size={20} className="mb-4" />
                <Label className="px-1">
                  {' '}
                  1040 46th Road. <br />
                  long island city,
                  <br />
                  NewYork-11101
                </Label>
              </div>
              <p className="mx-2">Primary Note : N/A</p>
            </Col>
            <Col xl="12">
              <Form row>
                <Row>
                  <span>
                    <b>New Note</b>
                  </span>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleSelect" sm={2}></Label>
                      <Col sm={12}>
                        <Label for="exampleText">
                          <b>Follow Up Type</b>
                        </Label>
                        <Input
                          id="exampleSelect"
                          name="followUpType"
                          type="select"
                          placeholder="Select Notes"
                        >
                          <option value="">Select</option>
                          <option value="General">General</option>
                          <option value="Birthday">Birthday</option>
                          <option value="Miss You">Miss You</option>
                          <option value="Renewal">Renewal</option>
                          <option value="Other">Other</option>
                        </Input>
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleSelect" sm={2}></Label>
                      <Col sm={10}>
                        <Label for="exampleText">
                          <b>Response*</b>
                        </Label>
                        <Input id="exampleSelect" name="response" type="select">
                          <option value="">Select</option>
                          <option value="Left Message">Left Message</option>
                          <option value="No Answer">No Answer</option>
                          <option value="Answer">Answer</option>
                          <option value="Other">Other</option>
                        </Input>
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col xl="11">
                    <FormGroup>
                      <Label for="exampleText">
                        <b>Notes*</b>
                      </Label>
                      <Input id="exampleText" name="note" type="textarea" />
                    </FormGroup>
                  </Col>
                  <Col xl="11">
                    <div className="d-flex mt-0 justify-content-end">
                      <Button type="submit" color="primary">
                        Save Note
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Col>
        <Col xl="7" lg="7">
          <DataTable columns={columnsdata} data={data} pagination />
        </Col>
      </Row>
    </>
  );
}

export default NotesView;
