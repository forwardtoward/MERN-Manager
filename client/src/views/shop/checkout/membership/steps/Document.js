// ** React Imports
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ** Third Party Components
import { useForm } from 'react-hook-form';
import classnames from 'classnames';
import Flatpickr from 'react-flatpickr';
import Select from 'react-select';
import { useLocation } from 'react-router-dom';
import { truncate } from '../../../../../utility/Utils';
import useMessage from '../../../../../lib/useMessage';
import { validateMembership } from '../../../../../utility/Utils';

// ** Reactstrap Imports
import {
  Card,
  Label,
  Input,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Button,
  Row,
  Col,
} from 'reactstrap';

import ModalPayment from './ModalPayment';

// ** Utils
import { selectThemeColors } from '@utils';
import { getUsers } from '../../../store';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import MembershipsHeader from '../../../shop/memberships/MembershipsHeader';
import { getUserData } from '../../../../../auth/utils';

const contractMethods = [
  { value: 'paper', label: 'Paper' },
  { value: 'digital', label: 'Digital' },
  { value: 'document', label: 'Document' }
];

const defaultValues = {
  checkoutName: '',
  checkoutCity: '',
  checkoutState: '',
  checkoutNumber: '',
  checkoutFlatNo: '',
  checkoutPincode: '',
  checkoutLandmark: ''
};

const Document = ({
  checkoutDetails,
  setCheckoutDetails,
  contact,
  dispatch,
  membershipDetail,
  stepper
}) => {
  // ** States
  const store = useSelector((state) => state.shop);
  const { clientContacts } = store;
  const [openPayment, setOpenPayment] = useState(false);

  // ** Props

  // ** Vars
  // ** On form submit if there are no errors then go to next step
  const location = useLocation();
  const last_path = location.pathname.split('/').slice(-1)[0];

  const handleSendContract = () => {
    //save data and send contract
    const user = getUserData();
    
    let doc = checkoutDetails.template;
    let rec = doc.recipients;
    doc = {
      ...doc,
      isTemplate: false,
      relateTo: checkoutDetails?.membership?._id,
      creatorType: user.userType,
      recipients: [
        { ...rec[0], email: clientContacts[contact].email, name: clientContacts[contact].fullName }, //customer
        { ...rec[0], email: user.email, name: user.name }
      ]
    };
    setOpenPayment(true)
  };

  const handleChangeDetails = (e) => {
    let template = checkoutDetails.template;
    let docMessage = template.docMessage;
    switch (e.target.name) {
      case 'title':
        template = { ...template, title: e.target.value };
        setCheckoutDetails({ ...checkoutDetails, template: template });
        break;
      case 'subject':
        docMessage = { ...docMessage, subject: e.target.value };
        template = { ...template, docMessage: docMessage };
        setCheckoutDetails({ ...checkoutDetails, template: template });
        break;
      case 'message':
        docMessage = { ...docMessage, message: e.target.value };
        template = { ...template, docMessage: docMessage };
        setCheckoutDetails({ ...checkoutDetails, template: template });
        break;
      default:
        break;
    }
  };
  
  const client = contact !== '' ? clientContacts[contact] : null;

  return (
    <>
     {contact && checkoutDetails?.template && ( <Row>
        <Col md="8">
          <Card>
            <CardHeader className="flex-column align-items-start">
              <CardTitle tag="h4"> Contract</CardTitle>
              <CardText className="text-muted mt-25">Send Contract To Customer</CardText>
            </CardHeader>
            <CardBody>
            <iframe
            src={`/document/email-link/${checkoutDetails?.template?.recipients[0]?.hashCode}`}
            //scrolling="no"
            className="shadow-sm"
            style={{
              position: 'relative',
              //overflow: 'hidden',
              overflowY:'scroll',
              width: '100%',
              border: 'none',
              minHeight: '80vh',
              borderRadius: 10
            }}
            onClick={(e) => e.stopPropagation()}
          ></iframe>
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card>
            <CardHeader className="flex-column align-items-start">
              <CardTitle tag="h4">Email & Document Details</CardTitle>
              <CardText className="text-muted mt-25">Edit document details</CardText>
            </CardHeader>
            <CardBody>
              <div>
                <Label>Recipient</Label>
                <Input
                  type="text"
                  disabled
                  className="mb-50"
                  placeholder="Customer name"
                  value={clientContacts[contact]?.fullName}
                />
                <Input
                  type="text"
                  disabled
                  placeholder="Customer email"
                  value={clientContacts[contact]?.email}
                />
              </div>

              <div>
                <Label>Document Title</Label>
                <Input
                  type="text"
                  defaultValue={checkoutDetails?.template?.title}
                  name="title"
                  onChange={handleChangeDetails}
                />
              </div>
              <div>
                <Label>Email Subject</Label>
                <Input
                  type="text"
                  defaultValue={checkoutDetails?.template?.docMessage?.subject}
                  name="subject"
                  onChange={handleChangeDetails}
                />
              </div>
              <div>
                <Label>Email Message</Label>

                <Input
                  type="textarea"
                  id="basicInput"
                  placeholder="Enter Message"
                  name="message"
                  defaultValue={checkoutDetails?.template?.docMessage?.message}
                  onChange={handleChangeDetails}
                />
              </div>
              <div className="d-flex justify-content-end mt-50">
                <Button color="primary" onClick={handleSendContract}>
                  SEND
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>)}
      <ModalPayment
        dispatch={dispatch}
        client={client}
        membershipDetail={membershipDetail}
        openPayment={openPayment}
        setOpenPayment={setOpenPayment}
      />
    </>
  );
};

export default Document;
