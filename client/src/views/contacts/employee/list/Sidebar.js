// ** React Import
import { useMemo, useEffect, useRef, useState } from 'react';

// ** Custom Components
import Sidebar from '@components/sidebar';
// import AddPositionModal from './AddPositionModal'

// ** Utils
import { selectThemeColors } from '@utils';

// ** Third Party Components
import Select, { components } from 'react-select'; //eslint-disable-line

// import classnames from 'classnames'
import { useForm } from 'react-hook-form';
// ** Reactstrap Imports
import {
  Button,
  Label,
  FormText,
  Form,
  Input,
  FormGroup,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  Accordion,
  Row,
  Col
} from 'reactstrap';
import useMessage from '../../../../lib/useMessage';
// ** Store & Actions
import { addUser } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { addContactAction } from '../store/actions';

import { addEmployeeReset } from '../store/reducer';
import AddPositionModal from './AddPositionModal';
import { useQuery } from 'react-query';
import ToastPositions from '../../../extensions/toastify/ToastPositions';
import {
  useGetEmployeePosition,
  useGetAllEmployees,
  useGetAllRole
} from '../../../../requests/contacts/employee-contacts';
import InputPasswordToggle from '../../../../@core/components/input-password-toggle';
import { ChevronDown, ChevronUp } from 'react-feather';

import { useAddContacts } from '../../../../requests/contacts/contacts';

const defaultValues = {
  email: '',
  contact: '',
  company: '',
  fullName: '',
  username: '',
  country: null,
  password: '',
  role: ''
};

//prettier-ignore
const checkIsValid = (data) => {
  return Object.values(data).every(function (field) {
    return typeof field === 'object' ? field !== null : field.length > 0
  })
}

const statusOptions = [
  { value: 'remote', label: 'Remote' },
  { value: 'home', label: 'In house' }
];

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  const { error, success } = useMessage();
  // ** Store Vars
  const dispatch = useDispatch();

  // ** States
  const [data, setData] = useState(null);
  const [plan, setPlan] = useState('basic');
  const [role, setRole] = useState('subscriber');
  // const [positionOptions, setPositionOptions] = useState([
  //   { value: '', label: 'Select Position' },
  //   { value: 'Owner', label: 'Owner' },
  //   { value: 'Assistant', label: 'Assistant' },
  //   { value: 'Billing', label: 'Billing' }
  // ]);

  const [modal, setModal] = useState(false);
  const [positionsArray, setPositionsArray] = useState([]);
  const [openAccordion, setOpenAccordion] = useState('1');

  const [active, setActive] = useState(false);
  const [height, setHeight] = useState('0px');
  const [rolesArray, setRolesArray] = useState([]);

  const [existingEmails, setExistingEmails] = useState([]);
  const [existingPhones, setExistingPhones] = useState([]);
  const [contactTypes, setContactTypes] = useState([]);

  const { contactTypeList } = useSelector((state) => state?.totalContacts);

  const { mutate } = useAddContacts();

  const content = useRef(null);
  // get position data from db
  const { data: positions, refetch, isLoading: positionLoading } = useGetEmployeePosition();
  // default positions
  const newPositions = [{ position: 'Owner' }, { position: 'Assistant' }, { position: 'Billing' }];

  // merge default positions and severe positions
  positions?.map((p) => {
    newPositions.push(p);
  });

  const positionOptions = [
    { value: '', label: 'Select...' },
    { value: 'Owner', label: 'Owner' },
    { value: 'Assistant', label: 'Assistant' },
    { value: 'Billing', label: 'Billing' }
  ];

  positions?.map((p) => {
    const value = p.position;
    const label = p.position;
    const roles = { value, label };
    positionOptions.push(roles);
  });
  // get role data from db
  const { data: roles } = useGetAllRole();
  const { addEmployee } = useSelector((state) => state.employeeContact);
  const { loading: isLoading, success: isSuccess, error: addError } = addEmployee;

  useEffect(() => {
    setRolesArray(roles);
  }, [roles]);

  // get employees data from db
  const {
    data: employees,
    refetch: fetchEmployees,
    isLoading: employeesLoading
  } = useGetAllEmployees();

  const allEmployeeemail = () => {
    const empEmail = [];
    const empPhone = [];
    employees?.map((employee) => {
      empEmail.push(employee.email);
      empPhone.push(employee.phone);
    });
    setExistingEmails(empEmail);
    setExistingPhones(empPhone);
  };

  useEffect(allEmployeeemail, [employees]);
  // ** Vars
  const {
    // control,
    // setValue,
    setError,
    handleSubmit
    // formState: { errors }
  } = useForm({ defaultValues });
  //validate position
  const onlyPositions = () => {
    let tmp = [];
    positions?.map((position) => {
      if (position.position) {
        tmp.push({
          value: position._id,
          label: position.position
        });
      }
    });
    setPositionsArray(tmp);
  };
  useEffect(onlyPositions, [positions]);
  // ** Handlers
  const blockInvalidChar = (e) => ['+', '-'].includes(e.key) && e.preventDefault();

  const toggle = () => setModal(!modal);
  useMemo(() => {
    if (addError) {
      error(addError);

      // reset
      dispatch(addEmployeeReset());
    }
  }, [addError]);

  const handleSidebarClosed = () => {
    //
  };

  // ** state manage
  const [state, setState] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: 'owner',
    workType: 'remote',
    password: Math.random().toString(36).slice(2, 18),
    willSendEmail: false
  });

  function submitHandler() {
    const { fullName, email, phone, position, willSendEmail, workType } = state;

    const validateEmail = state?.email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (fullName === '') {
      error('full name must not be empty !');
      return;
    }
    if (!validateEmail) {
      error('Enter a valid email');
      return;
    }
    if (email !== '' && existingEmails.includes(email)) {
      let index = existingEmails.indexOf(email);
      if (employees[index].isDelete !== true) {
        error('email already exists!');
        return;
      }
    }
    if (existingPhones.includes(phone)) {
      error('phone already exists!');
      return;
    }
    if (phone === '' || phone.length < 8 || !isNaN) {
      error('enter a valid phone number');
      return;
    }

    if (position === '') {
      error('position must not be empty !');
      return;
    }

    const newContact = {
      ...state,
      address: {
        street: state?.address,
        city: state?.city,
        state: state?.state,
        zipCode: state?.zip,
        country: state?.country
      },
      type: workType
    };

    delete newContact['state'];
    delete newContact['city'];
    delete newContact['zip'];
    delete newContact['workType'];
    // console.log(newContact);
    mutate(newContact);

    // dispatch(addContactAction(state));
  }

  useMemo(() => {
    if (isSuccess) {
      dispatch(addEmployeeReset());
      success('New Employee Added successfully !');
      toggleSidebar();
    }
  }, [isSuccess]);

  // const toggleAccordion = (id) => {
  //   openAccordion === id ? setOpenAccordion() : setOpenAccordion(id);
  // };

  function toggleAccordion() {
    setActive(!active);
    setHeight(active ? '0px' : `40vh`);
  }

  const ContactTypeComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex align-items-center">
          <p className="mb-0">{data.label}</p>
        </div>
      </components.Option>
    );
  };

  const contactTypeOptions = contactTypeList
    ? contactTypeList?.map((contactType) => {
        return { value: contactType._id, label: contactType.name, img: contactType.icon };
      })
    : null;

  return (
    <Sidebar
      size="lg"
      open={open}
      title="New Employee"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(submitHandler)}>
        <div className="mb-1" value={plan} onChange={(e) => setPlan(e.target.value)}>
          <Label className="form-label" for="select-plan">
            Select Contact Type
          </Label>
          <Select
            isMulti
            id="contactType"
            value={contactTypes}
            isClearable={false}
            className="react-select"
            classNamePrefix="select"
            options={contactTypeOptions}
            theme={selectThemeColors}
            onChange={(data) => {
              setState((prev) => ({ ...prev, contactType: data.map((x) => x.value) }));
              setContactTypes(data);
            }}
            components={{ Option: ContactTypeComponent }}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="fullName">
            Full Name <span className="text-danger">*</span>
          </Label>
          <Input
            onChange={(e) => {
              setState((p) => ({
                ...p,
                fullName: e?.target?.value
              }));
            }}
            id="fullName"
            placeholder="John Doe"
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="userEmail">
            Email <span className="text-danger">*</span>
          </Label>
          <Input
            type="email"
            id="userEmail"
            placeholder="john.doe@example.com"
            onChange={(e) => {
              setState((p) => ({
                ...p,
                email: e?.target?.value
              }));
            }}
          />
          <FormText color="muted">You can use letters, numbers & periods</FormText>
        </div>
        <div className="mb-1">
          <Label className="form-label" for="contact">
            Contact <span className="text-danger">*</span>
          </Label>
          <Input
            type="number"
            id="contact"
            placeholder="(397) 294-5153"
            onKeyDown={blockInvalidChar}
            onChange={(e) => {
              setState((p) => ({
                ...p,
                phone: e?.target?.value
              }));
            }}
          />
        </div>

        <div className="mb-1">
          <Label className="form-label" for="address">
            Address <span className="text-danger">*</span>
          </Label>
          <Input
            type="text"
            id="contact"
            placeholder="Address"
            onKeyDown={blockInvalidChar}
            onChange={(e) => {
              setState((p) => ({
                ...p,
                address: e?.target?.value
              }));
            }}
          />
        </div>
        <Row>
          <Col md={5}>
            <div className="mb-1">
              <Label className="form-label" for="city">
                City<span className="text-danger">*</span>
              </Label>
              <Input
                type="text"
                id="city"
                placeholder="city"
                onKeyDown={blockInvalidChar}
                onChange={(e) => {
                  setState((p) => ({
                    ...p,
                    city: e?.target?.value
                  }));
                }}
              />
            </div>
          </Col>
          <Col md={4} style={{ paddingLeft: '0px' }}>
            <div className="mb-1">
              <Label className="form-label" for="state">
                State<span className="text-danger">*</span>
              </Label>
              <Input
                type="text"
                id="state"
                placeholder="state"
                onKeyDown={blockInvalidChar}
                onChange={(e) => {
                  setState((p) => ({
                    ...p,
                    state: e?.target?.value
                  }));
                }}
              />
            </div>
          </Col>
          <Col md={3} style={{ paddingLeft: '0px' }}>
            <div className="mb-1">
              <Label className="form-label" for="zip">
                Zip <span className="text-danger">*</span>
              </Label>
              <Input
                type="number"
                id="zip"
                placeholder="zip"
                onKeyDown={blockInvalidChar}
                onChange={(e) => {
                  setState((p) => ({
                    ...p,
                    zip: e?.target?.value
                  }));
                }}
              />
            </div>
          </Col>
        </Row>

        <div className="mb-1">
          <Label className="form-label" for="contact">
            WorkType <span className="text-danger">*</span>
          </Label>
          <Select
            theme={selectThemeColors}
            isClearable={false}
            className="react-select"
            classNamePrefix="select"
            options={statusOptions}
            // value={admin.adminType}
            onChange={(e) => {
              console.log(e.label);
              setState((p) => ({
                ...p,
                workType: e.label
              }));
            }}
          />
        </div>

        <div className="mb-1">
          <Label className="form-label" for="user-role">
            Position
          </Label>
          <div className="container">
            <div className="row d-flex justify-content-between">
              <div className="col-9 p-0">
                <Select
                  className="flex-fill"
                  isClearable={false}
                  classNamePrefix="select"
                  options={positionOptions}
                  theme={selectThemeColors}
                  onChange={(e) => {
                    setState((p) => ({
                      ...p,
                      position: e.value
                    }));
                  }}
                />
              </div>
              <div className="col-3 ps-2">
                <Button onClick={toggle}>Add</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-1">
          <Label className="form-label" for="contact">
            Role <span className="text-danger">*</span>
          </Label>
          <Input
            type="select"
            id="role"
            name="role"
            defaultValue={'Staff'}
            onChange={(e) => {
              setState((p) => ({
                ...p,
                role: e.target.value
              }));
            }}
          >
            <option value="">Selecting...</option>
            {rolesArray?.map((r, i) => {
              return (
                <option key={i} value={r._id}>
                  {r.roleName}
                </option>
              );
            })}
          </Input>
        </div>

        {/* Custom Accordion */}
        <div className="custom_accordion__section">
          <div
            className={`custom_accordion ${
              active ? 'custom_active' : ''
            } d-flex justify-content-between`}
            onClick={toggleAccordion}
          >
            <p className="custom_accordion__title">Create Access (Optional)</p>
            <span>{active ? <ChevronDown /> : <ChevronUp />}</span>
          </div>
          <div
            ref={content}
            style={{ maxHeight: `${height}` }}
            className="custom_accordion__content"
          >
            <div className="mb-1">
              <Label className="form-label" for="contact">
                User Name
              </Label>
              <Input
                type="text"
                id="contact"
                placeholder="username"
                onKeyDown={blockInvalidChar}
                onChange={(e) => {
                  setState((p) => ({
                    ...p,
                    username: e?.target?.value
                  }));
                }}
              />
            </div>
            <div className="mb-1">
              <Label className="form-label" for="contact">
                Password
              </Label>
              <InputPasswordToggle
                className="input-group-merge"
                id="login-password"
                name="password"
                value={state.password}
                onChange={(e) => {
                  setState((p) => ({
                    ...p,
                    password: e?.target?.value
                  }));
                }}
              />
            </div>
            <div className="mb-1">
              <Label className="form-label" for="contact">
                Send Invite <span className="text-danger">*</span>
              </Label>
              <FormGroup check>
                <Input
                  type="checkbox"
                  name="willSendEmail"
                  onChange={(e) => {
                    setState((p) => ({
                      ...p,
                      willSendEmail: e.target.checked
                    }));
                  }}
                />
                <Label check>Send email invitation to activate employee account</Label>
              </FormGroup>
            </div>
          </div>
        </div>

        {/* <div className="custom_accordion__section" style={{ margin: '7px' }}>
          <div
            className={`custom_accordion ${
              active ? 'custom_active' : ''
            } d-flex justify-content-between`}
            onClick={toggleAccordion}
          >
            <p className="custom_accordion__title"></p>
            <span style={{ marginLeft: '10px' }}>{active ? <ChevronDown /> : <ChevronUp /> }</span>
          </div>
          <div
            ref={content}
            style={{ maxHeight: `${height}` }}
            className="custom_accordion__content"
          >
            
          </div>
        </div> */}

        {/* <Accordion className="me-1" open={openAccordion} toggle={toggleAccordion}>
          <AccordionItem>
            <AccordionHeader targetId="3">Create Access (Optional)</AccordionHeader>
            <AccordionBody accordionId="3">
              <div className="mb-1">
                <Label className="form-label" for="contact">
                  User Name
                </Label>
                <Input
                  type="text"
                  id="contact"
                  placeholder="username"
                  onKeyDown={blockInvalidChar}
                  onChange={(e) => {
                    setState((p) => ({
                      ...p,
                      username: e?.target?.value
                    }));
                  }}
                />
              </div>
              <div className="mb-1">
                <Label className="form-label" for="contact">
                  Password
                </Label>
                <InputPasswordToggle
                  className="input-group-merge"
                  id="login-password"
                  name="password"
                  value={state.password}
                  onChange={(e) => {
                    setState((p) => ({
                      ...p,
                      password: e?.target?.value
                    }));
                  }}
                />
              </div>
              <div className="mb-1">
                <Label className="form-label" for="contact">
                  Send Invite <span className="text-danger">*</span>
                </Label>
                <FormGroup check>
                  <Input type="checkbox" name="willSendEmail" onChange={(e) => {
                    setState((p) => (
                      {
                        ...p,
                        willSendEmail: e?.target?.checked
                      }))
                  }} />
                  <Label check>Send email invitation to activate employee account</Label>
                </FormGroup>
              </div>
            </AccordionBody>
          </AccordionItem>
        </Accordion> */}

        <Button onClick={submitHandler} className="me-1" color="primary" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Submit'}
        </Button>

        <Button type="reset" color="secondary" outline onClick={toggleSidebar}>
          Cancel
        </Button>
      </Form>
      <AddPositionModal
        modal={modal}
        setState={setState}
        toggle={toggle}
        // setPositionOptions={setPositionOptions}
        positions={positions}
        positionsArray={positionsArray}
        refetch={refetch}
        newPositions={newPositions}
      ></AddPositionModal>
    </Sidebar>
  );
};

export default SidebarNewUsers;
