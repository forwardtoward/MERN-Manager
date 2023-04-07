// ** React Imports

// ** Custom Hooks
import Sidebar from '@components/sidebar';
import { selectThemeColors } from '@utils';
import { useForm } from 'react-hook-form';
// ** Third Party Components
import Select, { components } from 'react-select';
import { useEffect } from 'react';
import wNumb from 'wnumb';
import classnames from 'classnames';
import { Star, Grid } from 'react-feather';
import Nouislider from 'nouislider-react';
import useMessage from '../../../../lib/useMessage';
import AddTypeModal from './AddTypeModal';
import { useGetMembershipTypes } from '../../../../requests/membership';

// ** Reactstrap Imports
import { Button, Label, Form, Input, ButtonGroup } from 'reactstrap';

// ** Styles
import '@styles/react/libs/noui-slider/noui-slider.scss';
import { useState } from 'react';
import Buttons from '../../../components/buttons';
import { addMembership } from '../../store';
const defaultValues = {
  name: '',
  price: 0
};
const MembershipSidebar = (props) => {
  // ** Props
  const [state, setState] = useState({
    name: '',
    memtype: 'Select Membership Type',
    pricing: 2,
    totalprice: 0,
    balance: 0,
    downprice: 0,
    duration: 0,
    type: 'Select Type',
    payment: 0,
    amount: 0,
    paytype: 'Select Type',
    description: ''
  });
  const { membershipSidebarOpen, toggleMembershipHandler, type, setType, dispatch } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [activeView, setActiveView] = useState('Recurring');
  const [membershiptype, setMembershipType] = useState({});
  const { data: membershipTypes, refetch } = useGetMembershipTypes();

  const types = ['Select Type', 'Months', 'Weeks'];
  let payment_types;
  if (state.pricing === 2) {
    payment_types = ['Select Type', 'Monthly', 'Weekly'];
  } else {
    payment_types = ['Select Type', 'PIF'];
  }

  let newMembershipTypes = [{ type: 'Trial' }, { type: 'Beginner' }, { type: 'BBC' }];

  // merge default positions and severe positions
  membershipTypes?.map((p) => {
    newMembershipTypes.push(p);
  });

  // default positions
  let membershipTypeOptions = [
    { value: 'Select', label: 'Select', color: 'primary' },
    { value: 'Trial', label: 'Trial', color: 'secondary' },
    { value: 'Beginner', label: 'Beginner', color: 'danger' },
    { value: 'BBC', label: 'BBC', color: 'warning' }
  ];

  // merge default position options and backend positions
  membershipTypes?.map((p) => {
    const value = p.type;
    const label = p.type;
    const color = p.color;
    const membership_type = { value, label, color };
    membershipTypeOptions.push(membership_type);
  });

  const MembershipTypeComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex align-items-center z-3">
          <p className={`mb-0 rounded-3 px-1 bg-${data.color} text-white`}>{data.label}</p>
        </div>
      </components.Option>
    );
  };

  const submitHandler = () => {
    const {
      name,
      pricing,
      totalprice,
      balance,
      downprice,
      description,
      duration,
      type,
      payment,
      amount,
      paytype
    } = state;
    if (name === '') {
      error('membership name must not be empty!');
      return;
    }
    if (membershiptype.value === 'Select') {
      error('membership type must not be empty!');
      return;
    }
    if (totalprice === 0) {
      error('total price must not be empty!');
      return;
    }
    if (balance === 0) {
      error('balance must not be empty!');
      return;
    }
    if (downprice === 0) {
      error('down price must not be empty!');
      return;
    }
    if (duration === 0) {
      error('duration must not be empty!');
      return;
    }
    if (type === 'Select Type') {
      error('duration type must not be empty!');
      return;
    }
    if (payment === 0) {
      error('payment must not be empty!');
      return;
    }
    if (amount === 0) {
      error('amount must not be empty!');
      return;
    }
    if (paytype === 'Select Type') {
      error('payment type must not be empty!');
      return;
    }
    if (description === '') {
      error('description must not be empty!');
      return;
    }
    const data = {
      membership_name: name,
      membership_type: membershiptype.value,
      color: membershiptype.color,
      duration_time: duration,
      duration_type: type,
      total_price: totalprice,
      down_payment: downprice,
      payment_type: paytype,
      balance: balance,
      isRecurring: pricing,
      description: description
    };
    dispatch(addMembership(data));
    toggleMembershipHandler();
  };

  return (
    <Sidebar
      size="lg"
      open={membershipSidebarOpen}
      title="New Membership"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleMembershipHandler}
      style={{ width: '37%' }}
    >
      <Form>
        <div className="col-12 mb-1 d-flex justify-content-between">
          <div className="col-6 mb-1">
            <Label className="form-label" for="name">
              Name <span className="text-danger">*</span>
            </Label>
            <></>
            <Input
              onChange={(e) => {
                setState((p) => ({
                  ...p,
                  name: e?.target?.value
                }));
              }}
              id="name"
              placeholder="Membership Name"
            />
          </div>
        </div>
        <div className="col-12 mb-1 d-flex justify-content-between">
          <div className="col-9 mb-1">
            <Label className="form-label" for="membership-type">
              Membership Type<span className="text-danger">*</span>
            </Label>
            <div className="col-12 p-0 d-flex justify-content-between">
              <div className="col-8">
                <Select
                  id="membership_type"
                  className="react-select"
                  classNamePrefix="select"
                  isClearable={false}
                  options={membershipTypeOptions}
                  // theme={selectThemeColors}
                  onChange={(data) => {
                    setMembershipType({ ...data });
                  }}
                  components={{ Option: MembershipTypeComponent }}
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                />
              </div>
              <div className="col-3">
                <Button onClick={toggle} className="me-1" color="primary">
                  {'Add'}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 mb-1 d-flex justify-content-between">
          <div className="col-5">
            <Label className="form-label" for="duration">
              Duration<span className="text-danger">*</span>
            </Label>
            <Input
              type="number"
              id="duration"
              placeholder="Enter time"
              onChange={(e) => {
                setState((p) => ({
                  ...p,
                  duration: e.target.value
                }));
              }}
            />
          </div>
          <div className="col-5">
            <Label className="form-label" for="payment-type">
              Duration Type<span className="text-danger">*</span>
            </Label>
            <div className="container">
              <div className="row d-flex justify-content-between">
                <div className="col-12 p-0">
                  <Input
                    type="select"
                    id="type"
                    name="type"
                    onChange={(e) => {
                      setState((p) => ({
                        ...p,
                        type: e?.target?.value
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
              </div>
            </div>
          </div>
        </div>
        <div className="mb-1">
          <Label className="form-label" for="pricing">
            Pricing<span className="text-danger">*</span>
          </Label>
          <div>
            <ButtonGroup>
              <Button
                tag="label"
                className={classnames('btn-icon view-btn grid-view-btn', {
                  active: activeView === 'Recurring'
                })}
                color="primary"
                outline
                onClick={() => {
                  setState({ ...state, pricing: 2 });
                  setActiveView('Recurring');
                }}
              >
                Recurring<span className="text-danger">*</span>
              </Button>
              <Button
                tag="label"
                className={classnames('btn-icon view-btn list-view-btn', {
                  active: activeView === 'One Time'
                })}
                color="primary"
                outline
                onClick={() => {
                  setState({ ...state, pricing: 1 });
                  setActiveView('One Time');
                }}
              >
                One Time
              </Button>
            </ButtonGroup>
          </div>
        </div>
        <div className="col-12 mb-1 d-flex justify-content-between">
          <div className="col-3">
            <Label className="form-label" for="balance">
              Total Price <span className="text-danger">*</span>
            </Label>
            <Input
              type="number"
              id="total_price"
              placeholder="$"
              onChange={(e) => {
                setState((p) => ({
                  ...p,
                  totalprice: e.target.value
                }));
              }}
            />
          </div>
          <div className="col-3">
            <Label className="form-label" for="down_payment">
              Down Payment <span className="text-danger">*</span>
            </Label>
            <Input
              type="number"
              id="down_payment"
              placeholder="$"
              onChange={(e) => {
                setState((p) => ({
                  ...p,
                  downprice: Number(e.target.value),
                  balance: Number(p.totalprice) - Number(e.target.value),
                  amount: (Number(p.totalprice) - Number(e.target.value)) / Number(p.payment)
                }));
              }}
            />
          </div>
          <div className="col-3">
            <Label className="form-label" for="balance">
              Balance<span className="text-danger">*</span>
            </Label>
            <Input type="number" id="down_payment" placeholder="$" value={state.balance} />
          </div>
        </div>
        <div className="col-12 mb-1 d-flex justify-content-between">
          <div className="col-3">
            <Label className="form-label" for="payments">
              # of Payments<span className="text-danger">*</span>
            </Label>
            <Input
              type="number"
              id="payment"
              placeholder="Payments"
              onChange={(e) => {
                setState((p) => ({
                  ...p,
                  payment: e.target.value,
                  amount: p.balance / e.target.value
                }));
              }}
            />
          </div>
          <div className="col-3">
            <Label className="form-label" for="payment-type">
              Frequency<span className="text-danger">*</span>
            </Label>
            <div className="container">
              <div className="row d-flex justify-content-between">
                <div className="col-12 p-0">
                  <Input
                    type="select"
                    id="payment-type"
                    name="payment-type"
                    onChange={(e) => {
                      setState((p) => ({
                        ...p,
                        paytype: e.target.value
                      }));
                    }}
                  >
                    {payment_types?.map((p, i) => {
                      return (
                        <option key={i} value={p}>
                          {p}
                        </option>
                      );
                    })}
                  </Input>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <Label className="form-label" for="amount">
              Amount <span className="text-danger">*</span>
            </Label>
            <Input type="number" id="amount" placeholder="$" value={state.amount} />
          </div>
        </div>
        <div className="col-12 mb-1 d-flex justify-content-between">
          <div className="col-9">
            <Label className="form-label" for="duration">
              Description<span className="text-danger">*</span>
            </Label>
            <Input
              type="text"
              id="description"
              placeholder=""
              onChange={(e) => {
                setState((p) => ({
                  ...p,
                  description: e.target.value
                }));
              }}
            />
          </div>
        </div>
        <div className="d-flex justify-content-between px-5 py-3">
          <Button onClick={submitHandler} className="me-1" color="primary">
            {'Submit'}
          </Button>
          <Button type="reset" color="secondary" outline onClick={toggleMembershipHandler}>
            Cancel
          </Button>
        </div>
      </Form>
      <AddTypeModal
        modal={modal}
        toggle={toggle}
        membershipTypes={membershipTypes}
        newMembershipTypes={newMembershipTypes}
        refetch={refetch}
      />
    </Sidebar>
  );
};

export default MembershipSidebar;
