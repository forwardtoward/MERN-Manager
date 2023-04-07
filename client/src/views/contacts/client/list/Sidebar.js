// ** React Import
import { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// ** Custom Components
import Sidebar from '@components/sidebar';

// ** Utils
import { selectThemeColors } from '@utils';

// ** Third Party Components
import Select, { components } from 'react-select'; //eslint-disable-line

import classnames from 'classnames';
import { useForm, Controller } from 'react-hook-form';

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input } from 'reactstrap';

// ** Store & Actions
import { addUser } from '../store';
import { newClientContact } from '../store/actions';
import useMessage from '../../../../lib/useMessage';
import { newClientContactReset } from '../store/reducer';

// import add position Modal
import AddPositionModal from './AddPositionModal';

// get client position request api function import
import { useGetClientPosition } from '../../../../requests/contacts/client-contacts';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import AddNewLeadSourceModal from '../../tags/AddNewLeadSourceModal';
import AddNewTagModal from '../../tags/AddNewTagModal';

const countryOptions = [
  { label: 'Australia', value: 'Australia' },
  { label: 'Bangladesh', value: 'Bangladesh' },
  { label: 'Belarus', value: 'Belarus' },
  { label: 'Brazil', value: 'Brazil' },
  { label: 'Canada', value: 'Canada' },
  { label: 'China', value: 'China' },
  { label: 'France', value: 'France' },
  { label: 'Germany', value: 'Germany' },
  { label: 'India', value: 'India' },
  { label: 'Indonesia', value: 'Indonesia' },
  { label: 'Israel', value: 'Israel' },
  { label: 'Italy', value: 'Italy' },
  { label: 'Japan', value: 'Japan' },
  { label: 'Korea', value: 'Korea' },
  { label: 'Mexico', value: 'Mexico' },
  { label: 'Philippines', value: 'Philippines' },
  { label: 'Russia', value: 'Russia' },
  { label: 'South', value: 'South' },
  { label: 'Thailand', value: 'Thailand' },
  { label: 'Turkey', value: 'Turkey' },
  { label: 'Ukraine', value: 'Ukraine' },
  { label: 'United Arab Emirates', value: 'United Arab Emirates' },
  { label: 'United Kingdom', value: 'United Kingdom' },
  { label: 'United States', value: 'United States' }
];

//prettier-ignore
const checkIsValid = (data) => {
    return Object.values(data).every(function (field) {
        return typeof field === 'object' ? field !== null : field.length > 0
    })
}

const INITIAL_STATE = {
  contactType: [],
  fullName: '',
  phone: '',
  email: '',
  position: '',
  company: '',
  type: 'individual',
  leadSource: '',
  tags: []
};

const SidebarNewUsers = ({
  open,
  toggleSidebar,
  tableData,
  useAddContacts,
  setCurrentPage,
  clientStore
}) => {
  // console.log(tableData)

  // ** States
  const [plan, setPlan] = useState('basic');
  const [role, setRole] = useState('subscriber');

  // New client's data state
  const [state, setState] = useState(INITIAL_STATE);
  const { fullName, email, phone, type, company, position } = state;

  const { mutate } = useAddContacts();
  // console.log(state)

  const clientEmails = [];

  // Get Previous Client's Data from db
  /* const tableData = clientStore?.contacts?.list

    tableData?.map((client) => {
        clientEmails.push(client.email)
    })

    console.log(clientEmails) */

  // ==============================

  // Get Position

  // get client position data from db
  const { data: positions, refetch } = useGetClientPosition();

  // default positions
  const newPositions = [{ position: 'Owner' }, { position: 'Assistant' }, { position: 'Billing' }];

  // merge default positions and server positions
  positions?.map((p) => {
    newPositions.push(p);
  });

  // default positions
  const positionOptions = [
    { value: '', label: 'Select...' },
    { value: 'Owner', label: 'Owner' },
    { value: 'Assistant', label: 'Assistant' },
    { value: 'Billing', label: 'Billing' }
  ];

  // merge default position options and backend positions
  positions?.map((p) => {
    const value = p.position;
    const label = p.position;
    const roles = { value, label };

    positionOptions.push(roles);
  });

  // ------------------------------------------------------

  const [tagOptions, setTagOptions] = useState([]);
  const [leadOptions, setLeadOptions] = useState([]);

  useEffect(() => {
    if (clientStore.leadSources) {
      let options = [];
      for (const lead of clientStore.leadSources) {
        options.push({ value: lead.title, label: lead.title });
      }
      setLeadOptions(options);
    }
    if (clientStore.tags) {
      let options = [];
      for (const tag of clientStore.tags) {
        options.push({ value: tag.value, label: tag.value });
      }
      setTagOptions(options);
    }
  }, [clientStore]);

  // ------------------------------------------------------
  // add client position modal state
  const [modal, setModal] = useState(false);

  // modal toggler
  const toggle = () => setModal(!modal);

  // ==========================

  // ** Store Vars
  const dispatch = useDispatch();
  const clientAdd = useSelector((state) => state.clientContact);
  const { contactTypeList } = useSelector((state) => state?.totalContacts);
  const { error, success } = useMessage();

  // console.log(clientAdd)

  useMemo(() => {
    if (clientAdd?.clientContact?.addSuccess) {
      // show Add Success Message
      dispatch(newClientContactReset());
      success('Client contact Added successfully');
      setState(INITIAL_STATE);
      toggleSidebar();
    }
    if (!clientAdd.isClientContactLoading && clientAdd?.isClientContactErrors?.error) {
      error(Object.entries(clientAdd?.isClientContactErrors?.error?.data?.errors)[0][1]?.msg);
    }
  }, [clientAdd]);

  const handleChange = (e) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSidebarClosed = () => {
    // for (const key in defaultValues) {
    //     // setValue(key, '')
    // }
    setRole('subscriber');
    setPlan('basic');
  };

  // New Client's data submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Email and Phone Validation

    console.log('handleSubmit', state);
    const isEmailExist = tableData?.find(
      (p) =>
        p?.email === state?.email ||
        p?.email.toLowerCase() === state?.email.toLowerCase() ||
        /^(?=.*[A-Z])/.test(state.email)
    );

    const validateEmail = state?.email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (state?.phone?.startsWith('-')) {
      return toast.error('Please Provide a valid phone Number');
    }

    const isPhoneExist = tableData?.find((p) => p?.phone === state?.phone);

    if (isEmailExist) {
      return toast.error('Email already exist');
    } else if (!validateEmail) {
      return toast.error('Please input a valid email');
    } else if (isPhoneExist) {
      return toast.error('Please Provide a valid phone Number');
    } else {
      setCurrentPage(1);
      // dispatch(newClientContact(state));

      mutate(state);
    }
  };

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

  const [isTagOpen, setIsTagOpen] = useState(false);
  const [isLeadOpen, setIsLeadOpen] = useState(false);
  const [contactTypes, setContactTypes] = useState([]);

  const toggleTags = () => setIsTagOpen(!isTagOpen);
  const toggleLeads = () => setIsLeadOpen(!isLeadOpen);

  return (
    <Sidebar
      size="lg"
      open={open}
      title="New Client"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit}>
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
              console.log(data);
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
            name="fullName"
            id="fullName"
            placeholder="John Doe"
            value={fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-1">
          <Label className="form-label" for="userEmail">
            Email <span className="text-danger">*</span>
          </Label>
          <Input
            name="email"
            type="email"
            id="userEmail"
            placeholder="john.doe@example.com"
            value={email}
            onChange={handleChange}
            required
          />
          <FormText color="muted">You can use letters, numbers & periods</FormText>
        </div>

        <div className="mb-1">
          <Label className="form-label" for="phone">
            Phone <span className="text-danger">*</span>
          </Label>
          <Input
            type="number"
            name="phone"
            id="phone"
            placeholder="(397) 294-5153"
            value={phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-1" value={plan} onChange={(e) => setPlan(e.target.value)}>
          <Label className="form-label" for="select-plan">
            Select Client Type
          </Label>
          <Input type="select" id="select-plan" name="type" onChange={handleChange}>
            <option value="individual">Individual</option>
            <option value="company">Company</option>
          </Input>
        </div>
        {state.type === 'company' && (
          <div className="mb-1">
            <Label className="form-label" for="company">
              Company <span className="text-danger">*</span>
            </Label>
            <Input
              name="company"
              id="company"
              placeholder="Company Pvt Ltd"
              value={company}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {state.type === 'company' && (
          <div className="mb-1">
            <Label className="form-label" for="user-role">
              Position
            </Label>

            <div className="d-flex justify-content-between gap-2">
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
              <Button onClick={toggle}>Add</Button>
            </div>
          </div>
        )}

        <div className="mb-1">
          <Label className="form-label" for="user-role">
            Source
          </Label>

          <div className="d-flex justify-content-between gap-2">
            <Select
              className="flex-fill"
              isClearable={false}
              classNamePrefix="select"
              options={leadOptions}
              theme={selectThemeColors}
              onChange={(e) => {
                setState((p) => ({
                  ...p,
                  leadSource: e.value
                }));
              }}
            />
            <Button onClick={toggleLeads} color="outline-primary">
              Add
            </Button>
          </div>
        </div>
        <div className="mb-1">
          <Label className="form-label" for="user-role">
            Tags
          </Label>

          <div className="d-flex justify-content-between gap-2">
            <Select
              className="flex-fill"
              isClearable={false}
              classNamePrefix="select"
              options={tagOptions}
              theme={selectThemeColors}
              onChange={(e) => {
                let tags = [];
                for (const i of e) {
                  tags.push(i.value);
                }
                setState((p) => ({
                  ...p,
                  tags: tags
                }));
              }}
              isMulti
            />
            <Button onClick={toggleTags} color="outline-primary">
              Add
            </Button>
          </div>
        </div>

        <Button
          disabled={clientAdd?.isClientContactLoading}
          type="submit"
          className="me-1"
          color="primary"
        >
          {clientAdd?.isClientContactLoading ? 'Processing...' : 'Submit'}
        </Button>

        <Button type="reset" color="secondary" outline onClick={toggleSidebar}>
          Cancel
        </Button>
      </Form>

      <AddPositionModal
        modal={modal}
        setState={setState}
        toggle={toggle}
        positionOptions={positionOptions}
        positions={positions}
        newPositions={newPositions}
        refetch={refetch}
      ></AddPositionModal>
      <AddNewLeadSourceModal
        open={isLeadOpen}
        store={clientStore}
        dispatch={dispatch}
        toggle={toggleLeads}
      />
      <AddNewTagModal
        open={isTagOpen}
        store={clientStore}
        dispatch={dispatch}
        toggle={toggleTags}
      />
    </Sidebar>
  );
};

export default SidebarNewUsers;
