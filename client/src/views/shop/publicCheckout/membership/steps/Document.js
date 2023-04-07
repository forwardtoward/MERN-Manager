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
  Form,
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
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from 'reactstrap';

// ** Utils
import { selectThemeColors } from '@utils';
import { getUsers } from '../../../store';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import MembershipsHeader from '../../../shop/memberships/MembershipsHeader';

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

const Document = (props) => {
  // ** States
  const { success, error } = useMessage();

  // ** Props

  // ** Vars
  // ** On form submit if there are no errors then go to next step
  const location = useLocation();
  const last_path = location.pathname.split('/').slice(-1)[0];

  const nextStep = () => {
    setMembershipDetail({ ...membership });
    const err = validateMembership(membership);
    if (err.membership_name) {
      error('membership name must not be empty!');
      return;
    }
    if (err.total_price) {
      error('total price must not be empty!');
      return;
    }
    if (err.down_payment) {
      error('down payment must not be empty!');
      return;
    }
    if (err.register_fees) {
      error('register fee must not be empty!');
      return;
    }
    if (err.payment_time === 'empty') {
      error('# of payments value must not be empty.');
      return;
    }
    if (err.payment_time === 'invalid') {
      error('# of payments value must be lower than duration time.');
      return;
    }
    stepper.next();
  };

  return (
    <Form className="list-view product-checkout">
      <Card>
        <CardHeader className="flex-column align-items-start">
          <CardTitle tag="h4">Create Document</CardTitle>
          <CardText className="text-muted mt-25">Edit document details</CardText>
        </CardHeader>
        <CardBody></CardBody>
      </Card>
    </Form>
  );
};

export default Document;
