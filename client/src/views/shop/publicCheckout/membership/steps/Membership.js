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

import { Redirect } from "react-router-dom"

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

const Membership = (props) => {
  // ** States
  const { success, error } = useMessage();
  const [contractMethod, setContractMethod] = useState('digital');
  const [status, setStatus] = useState('false');
  const [types, setTypes] = useState(['Monthly', 'Weekly', 'PIF']);
  const [days, setDays] = useState([1, 5, 10, 15, 20, 25]);
  const [doctypes, setDocTypes] = useState(['Paper', 'Digital', 'Document']);
  const [paytypes, setPayTypes] = useState(['In house', 'Auto pay']);
  const [membership, setMembership] = useState({ loaded: false });
  // ** Props
  const { stepper, dispatch, getPublicMembership, setMembershipDetail, membershipId } = props;
  // ** Vars
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

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
  useEffect(() => {
    dispatch(getPublicMembership(membershipId)).then((res) => {
      if (res && res.payload) {
        const data = res.payload.data;
        if (data) {
          const currentDate = new Date();
          let endDate;
          if (data.duration_type === 'Weeks') {
            const numWeeks = data.duration_time;
            endDate = new Date();
            endDate.setDate(endDate.getDate() + numWeeks * 7);
          } else {
            const numMonths = data.duration_time;
            endDate = new Date();
            endDate.setMonth(endDate.getMonth() + numMonths);
          }
          let due_every_month = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            currentDate.getDate() + 1
          );
          let membership_detail = {
            _id: data._id,
            userId: data.userId,
            isEMI: true,
            membership_name: data.membership_name,
            membership_type: data.membership_type,
            membership_duration: data.duration_time,
            isRecurring: data.isRecurring,
            total_price: data.total_price,
            balance: data.balance,
            down_payment: data.down_payment,
            duration_type: data.duration_type,
            duration_time: data.duration_time,
            payment_type: data.payment_type,
            register_fees: 0,
            payment_time: 0,
            payment_money: 0,
            due_every_month: due_every_month,
            due_every: 1,
            start_payment_Date: currentDate,
            mactive_date: currentDate,
            expiry_date: endDate,
            membership_status: 'Active',
            ptype: 'credit card',
            pay_inout: 'In house'
          };
          setMembershipDetail({ ...membership_detail });
          if (data.payment_type === 'PIF') {
            membership_detail.isEMI = false;
            membership_detail.payment_money = 0;
            membership_detail.payment_time = 0;
            setStatus(true);
          } else {
            setStatus(false);
          }
          setMembership((membership) => ({
            ...membership,
            ...membership_detail,
            loaded: true,
          }));
        } else {
          setMembership((membership) => ({
            loaded: true,
          }));
        }
      }
    });
  }, []);
  useEffect(() => {
    setMembershipDetail({ ...membership });
  }, [membership]);
  
  return (
    <Form className="list-view product-checkout">
      <Card>
        <CardHeader className="flex-column align-items-start">
          <CardTitle tag="h4">Membership Detail</CardTitle>
          <CardText className="text-muted mt-25">Edit membership details</CardText>
        </CardHeader>
        <CardBody>
          {!membership.loaded || membership._id ? (
            <div>
              <Row>
                <Col md="3" sm="12">
                  <div className="mb-2">
                    <Label className="form-label" for="name">
                      Name <span className="text-danger">*</span>
                    </Label>
                    <></>
                    <Input
                      onChange={(e) => {
                        setMembership((p) => ({
                          ...p,
                          membership_name: e?.target?.value
                        }));
                      }}
                      id="name"
                      placeholder="Membership Name"
                      value={membership.membership_name}
                    />
                  </div>
                </Col>
                <Col md="3" sm="12">
                  <Label className="form-label" for="startDate">
                    Start Date
                  </Label>
                  <Flatpickr
                    required
                    id="startDate"
                    name="startDate"
                    className="form-control"
                    onChange={(date) => {
                      setMembership((p) => ({
                        ...p,
                        start_payment_Date: date[0]
                      }));
                    }}
                    value={membership.start_payment_Date}
                    options={{
                      enableTime: false,
                      dateFormat: 'm-d-Y'
                    }}
                  />
                </Col>
                <Col md="3" sm="12">
                  <Label className="form-label" for="startDate">
                    Expiry Date
                  </Label>
                  <Flatpickr
                    required
                    id="startDate"
                    name="startDate"
                    className="form-control"
                    onChange={(date) => {
                      setMembership((p) => ({
                        ...p,
                        expiry_date: date[0]
                      }));
                    }}
                    value={membership.expiry_date}
                    options={{
                      enableTime: false,
                      dateFormat: 'm-d-Y'
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="3" sm="12">
                  <div className="mb-2">
                    <Label className="form-label" for="name">
                      Total Price <span>($)</span>
                    </Label>
                    <Input
                      type="number"
                      id="total"
                      placeholder="Total Price"
                      value={membership.total_price}
                      onChange={(e) => {
                        setMembership((p) => ({
                          ...p,
                          total_price: Number(e.target.value),
                          balance: Number(e.target.value - p.down_payment),
                          amount: Number((e.target.value - p.down_payment) / p.payments)
                        }));
                      }}
                    />
                  </div>
                </Col>
                <Col md="3" sm="12">
                  <div className="mb-2">
                    <Label className="form-label" for="register">
                      Registeration Fee <span>($)</span>
                    </Label>
                    <Input
                      type="number"
                      id="register_fee"
                      placeholder="Register Fee"
                      value={membership.register_fees}
                      onChange={(e) => {
                        setMembership((p) => ({
                          ...p,
                          register_fees: Number(e?.target?.value)
                        }));
                      }}
                    />
                  </div>
                </Col>
                <Col md="3" sm="12">
                  <div className="mb-2">
                    <Label className="form-label" for="name">
                      Down Payment <span>($)</span>
                    </Label>
                    <Input
                      type="number"
                      id="down_payment"
                      placeholder="Down Payment"
                      value={membership.down_payment}
                      onChange={(e) => {
                        setMembership((p) => ({
                          ...p,
                          down_payment: Number(e.target.value),
                          balance: Number(p.total_price - e.target.value),
                          amount: Number((p.total_price - e.target.value) / p.payments)
                        }));
                      }}
                    />
                  </div>
                </Col>
                <Col md="3" sm="12">
                  <div className="mb-2">
                    <Label className="form-label" for="balance">
                      Balance <span>($)</span>
                    </Label>
                    <Input
                      type="number"
                      id="balance"
                      placeholder="Balance"
                      value={membership.balance}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md="3" sm="12">
                  <div className="mb-2">
                    <Label className="form-label" for="name">
                      # of Payments <span>*</span>
                    </Label>
                    <Input
                      type="number"
                      id="payments"
                      placeholder="Payments"
                      value={membership.payment_time}
                      disabled={status}
                      onChange={(e) => {
                        setMembership((p) => ({
                          ...p,
                          payment_time: Number(e?.target?.value),
                          payment_money: Number(p.balance / e.target.value)
                        }));
                      }}
                    />
                  </div>
                </Col>
                <Col md="3" sm="12">
                  <div className="mb-2">
                    <Label className="form-label" for="name">
                      Frequency<span>*</span>
                    </Label>
                    <Input
                      type="select"
                      id="type"
                      name="type"
                      value={membership.payment_type}
                      onChange={(e) => {
                        if (e.target.value === 'PIF') {
                          setMembership((p) => ({
                            ...p,
                            payment_time: 0,
                            payment_money: 0
                          }));
                          setStatus(true);
                        } else {
                          setStatus(false);
                        }
                        setMembership((p) => ({
                          ...p,
                          payment_type: e?.target?.value
                        }));
                      }}
                    >
                      {types?.map((p, i) => {
                        return (
                          <option key={i} value={p}>
                            {p}
                          </option>
                        );
                      })}
                    </Input>
                  </div>
                </Col>
                <Col md="3" sm="12">
                  <div className="mb-2">
                    <Label className="form-label" for="amount">
                      Amount<span>($)</span>
                    </Label>
                    <Input
                      type="number"
                      id="amount"
                      placeholder="Amount"
                      value={membership.payment_money}
                      disabled={status}
                    />
                  </div>
                </Col>
                <Col md="3" sm="12">
                  <div className="mb-2">
                    <Label className="form-label" for="name">
                      Due<span>*</span>
                    </Label>
                    <Input
                      type="select"
                      id="due"
                      name="due"
                      disabled={status}
                      value={membership.due_every}
                      onChange={(e) => {
                        setMembership((p) => ({
                          ...p,
                          due_every: e?.target?.value
                        }));
                      }}
                    >
                      {days?.map((p, i) => {
                        return (
                          <option key={i} value={p}>
                            {p}
                            {p === 1 ? 'st' : 'th'}
                          </option>
                        );
                      })}
                    </Input>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md="3" sm="12">
                  <Label className="form-label" for="startDate">
                    Next payment
                  </Label>
                  <Flatpickr
                    required
                    id="due_every_month"
                    name="due_every_month"
                    className="form-control"
                    onChange={(date) => {
                      setMembership((p) => ({
                        ...p,
                        due_every_month: date[0]
                      }));
                    }}
                    value={membership.due_every_month}
                    options={{
                      enableTime: false,
                      dateFormat: 'm-d-Y'
                    }}
                  />
                </Col>
                <Col md="3" sm="12">
                  <Label className="form-label" for="name">
                    Payment Type<span>*</span>
                  </Label>
                  <Input
                    type="select"
                    id="pay_inout"
                    name="pay_inout"
                    value={membership.pay_inout}
                    onChange={(e) => {
                      setMembership((p) => ({
                        ...p,
                        pay_inout: e.target.value
                      }));
                    }}
                  >
                    {paytypes?.map((p, i) => {
                      return (
                        <option key={i} value={p}>
                          {p}
                        </option>
                      );
                    })}
                  </Input>
                </Col>
              </Row>
              <Row>
                <div className="d-flex justify-content-between px-5 py-3">
                  <Button type="reset" color="secondary" outline onClick={() => stepper.previous()}>
                    Back
                  </Button>
                  <Button className="me-1" color="primary" onClick={nextStep}>
                    Next
                  </Button>
                </div>
              </Row>
          </div>
          ) : (
            <>
              <Redirect to="/misc/error"/>
            </>
          )}
        </CardBody>
      </Card>
    </Form>
  );
};

export default Membership;
