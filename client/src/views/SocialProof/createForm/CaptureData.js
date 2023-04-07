import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap';
import { ArrowLeft, ArrowRight, ChevronDown, MoreVertical } from 'react-feather';
import DataTable from 'react-data-table-component';
import 'react-tagsinput/react-tagsinput.css';
import '../../../assets/styles/SocialProof.scss';
import { addDisplayUrl, getDisplayUrlList } from '../../../requests/userproof';

const columns = [
  {
    name: 'URL List',
    // selector: 'getData',
    selector: (row) => row.getData,
    sortable: true
    // cell: (row) => {
    //   return (
    //     <Link to={`/submit/${row?._id}`} className="hovertext">{`${row?.campaign_name}`}</Link>
    //   );
    // }
  },
  {
    name: 'ACTION',
    sortable: true,
    selector: (row) => row,
    cell: (row) => {
      return (
        <div className="d-flex cursor-pointer">
          <UncontrolledDropdown>
            <DropdownToggle className="pe-" tag="span">
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem
                tag="h6"
                className="w-100"
                // onClick={(e) => handleEditCampaign(row)}
              >
                <span className="align-middle ms-50">Edit</span>
              </DropdownItem>
              <DropdownItem
                tag="h6"
                className="w-100"
                // onClick={(e) => handleDeleteCampaign(row._id)}
              >
                <span className="align-middle ms-50">Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      );
    }
  }
];

const CaptureData = ({ stepper }) => {
  const [modal, setModal] = useState(false);
  const [getData, setGetData] = useState([]);
  const [displayUrl, setDisplayUrl] = useState();
  const [leads, setLeads] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = {
      displayUrl
    };
    addDisplayUrl(payload).then((response) => {
      setLeads(response.data.data);
      setDisplayUrl('');
      setModal(!modal);
    });
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const DisplayURl = () => {
    getDisplayUrlList().then((resp) => {
      setGetData(resp?.data);
    });
  };
  useEffect(() => {
    DisplayURl();
  }, [leads]);

  const tableData = getData?.map((ele) => ({ getData: ele?.displayUrl }));
  return (
    <>
      <div className="AddUrlBtn">
        <Button color="primary" onClick={toggleModal} className="btn-block">
          <Modal isOpen={modal} toggle={() => setModal(!modal)} centered>
            <ModalHeader toggle={() => setModal(!modal)} className="">
              Auto Lead Capture
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md="12">
                    <Input
                      value={displayUrl}
                      onChange={(e) => setDisplayUrl(e.target.value)}
                      name="url"
                      placeHolder="Enter Display Url"
                    />
                  </Col>
                  <Col>
                    <div className="add-task">
                      <Button block className="btn-block my-1" color="primary">
                        Add Url
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
          </Modal>
          Auto Lead Capture
        </Button>
      </div>
      <DataTable
        className="react-dataTable"
        pagination
        selectableRows
        paginationPerPage={7}
        sortIcon={<ChevronDown size={10} />}
        data={tableData}
        columns={columns}
        noHeader
      />
      <Row>
        <div className="d-flex justify-content-between mt-3 ">
          <Button color="primary" className="btn-prev" outline onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">Previous</span>
          </Button>
          <Button color="primary" className="btn-next" onClick={() => stepper.next()}>
            <span className="align-middle d-sm-inline-block d-none">Next</span>
            <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
          </Button>
        </div>
      </Row>
    </>
  );
};
export default CaptureData;
