// ** React Imports
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ** Third Party Components
import { useForm } from 'react-hook-form';
import classnames from 'classnames';
import Select from 'react-select';

// ** Reactstrap Imports
import {
  Form,
  Card,
  Label,
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
import useMessage from '../../../../../lib/useMessage';

// ** Utils
import { selectThemeColors } from '@utils';
import { getTemplatesDocuments } from '../../../../../requests/documents/create-doc';
import { getUserData } from '../../../../../auth/utils';

// ** Store Actions
import {
  checkoutSetContact
} from '../../../store';

const contractMethods = [
  { value: 'paySignNow', label: 'Pay Now & Sign Now' }, // will pay on screen & sign on screen then get signed contract + invoice
  { value: 'paySignLater', label: 'Pay Later & Sign Later' }, //get contract link with sign + invoice
  { value: 'payNowSignLater', label: 'Pay Now & Sign Later' }, //pay then get sign link + invoice
  { value: 'payLaterSignNow', label: 'Pay Later & Sign Now' } //sign contract, get signed contract email +  get invoice to pay
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

const Address = (props) => {
  const [templates, setTemplates] = useState([]);
  const [allTemplates, setAllTemplates] = useState([]);
  const [contractType, setContractType] = useState('All Contracts')

  // ** Props
  const { stepper, contact, setContact, checkoutDetails, setCheckoutDetails } = props;
  const dispatch = useDispatch();
  const { success, error } = useMessage();

  // ** Store
  const store = useSelector((state) => state.shop);

  const [clients, setClients] = useState([]);
  const { clientContacts, checkout } = store;

  useEffect(() => {
    if (clientContacts && clientContacts.length > 0) {
      const clientData = clientContacts.map((client, index) => ({
        index,
        value: client._id,
        label: client.fullName,
        client: client
      }));
      setClients(() => clientData);
    }
  }, [clientContacts]);

  useEffect(() => {
    //get templates
    getTemplatesDocuments().then((res) => {
      setTemplates(res?.filter((x) => x.docType === 'contract'));
      setAllTemplates(res?.filter((x) => x.docType === 'contract'));
    });
  }, []);
  // ** Vars
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

  const client = contact !== '' ? clientContacts[contact] : {};

  // ** On form submit if there are no errors then go to next step
  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      stepper.next();
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          });
        }
      }
    }
  };

  const handleContractCategory = (cat) => {
    switch (cat) {
      case 'all':
        setTemplates(allTemplates);
        setContractType('All Contracts')
        break;
      case 'organization':
        setContractType('My Organization')
        //user organization
        //setTemplates(allTemplates?.filter((x) => x?.organizationId === 'contract'));
        break;
      case 'my':
        setContractType('My Contracts')
        setTemplates(allTemplates?.filter((x) => x.userId === getUserData().id));
        break;

      default:
        setTemplates(allTemplates?.filter((x) => x.docType === 'contract'));
        break;
    }
  };

  const renderTemplates = () => {
    return templates?.map((item) => (
      <Card className="border">
        <CardBody>
          <iframe
            src={item.documentUrl}
            scrolling="no"
            className="shadow-sm"
            style={{
              position: 'relative',
              overflow: 'hidden',
              width: '100%',
              border: 'none',
              height: '200px',
              borderRadius: 10
            }}
            onClick={(e) => e.stopPropagation()}
          ></iframe>
          <Button
            key={item._id}
            id={item._id}
            color="primary"
            outline
            className={`w-100 mx-auto`}
            onClick={() => setCheckoutDetails({ ...checkoutDetails, template: item })}
          >
            Select
          </Button>
        </CardBody>
      </Card>
    ));
  };

  const onNext = () => {
    client._id == undefined
      ? error('contact address must not be empty!')
      : stepper.next()
  }

  return (
    <Form className="list-view product-checkout" onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader className="flex-column align-items-start">
          <CardTitle tag="h4">Who is buying?</CardTitle>
          <CardText className="text-muted mt-25">Select A member from your Contacts</CardText>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="6" sm="12">
              <div className="mb-2">
                <Label className="form-label" for="checkoutName">
                  Select Member
                </Label>
                <Select
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  defaultValue={clients[0]}
                  options={clients}
                  isClearable={false}
                  onChange={(e) => {
                    setContact(e.index)
                    dispatch(checkoutSetContact(e.index))
                  }}
                />
              </div>
            </Col>
            <Col md="6" sm="12">
              <div className="mb-2">
                <Label className="form-label" for="checkoutNumber">
                  Contract Method
                </Label>
                <Select
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  defaultValue={contractMethods[1]}
                  options={contractMethods}
                  isClearable={false}
                  onChange={(e) =>
                    setCheckoutDetails({ ...checkoutDetails, contractMethod: e.value })
                  }
                />
              </div>
            </Col>
            <div>
              <CardTitle tag="h4" className="mb-0 mt-2">
                Choose a template
              </CardTitle>
              <CardText className="text-muted mt-25">
                Select a Membership Contract Template to send
              </CardText>
              <div className="ecommerce-header">
                <Row>
                  <Col sm="12">
                    <div className="ecommerce-header-items">
                      <div className="result-toggler">
                        <span className="search-results">{templates?.length} Results Found</span>
                      </div>

                      <div className="view-options d-flex">
                        <UncontrolledButtonDropdown className="dropdown-sort">
                          <DropdownToggle
                            className="text-capitalize me-1"
                            color="primary"
                            outline
                            caret
                          >
                            {contractType}
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem
                              className="w-100"
                              onClick={() => handleContractCategory('all')}
                            >
                              All Contracts
                            </DropdownItem>
                            <DropdownItem
                              className="w-100"
                              onClick={() => handleContractCategory('organization')}
                            >
                              My Organization
                            </DropdownItem>
                            <DropdownItem
                              className="w-100"
                              onClick={() => handleContractCategory('my')}
                            >
                              My Contracts
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledButtonDropdown>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className={classnames('grid-view')}>{renderTemplates()}</div>
            </div>
          </Row>
        </CardBody>
      </Card>
      <div className="customer-card">
        <Card>
          <CardHeader>
            <CardTitle tag="h4">Preview</CardTitle>
          </CardHeader>
          <CardBody>
            {client._id !== undefined && (
              <div>
                <CardText tag="h4">{client?.fullName}</CardText>
                <CardText className="mb-0">{client?.address?.street}</CardText>
                <CardText>
                  {client?.address?.city} {client?.address?.country}
                </CardText>
                <CardText>{client?.company}</CardText>
                <CardText>{client?.email}</CardText>
                <CardText>{client?.phone}</CardText>
              </div>
            )}
            <Button
              block
              type="button"
              color="primary"
              onClick={onNext}
              className="btn-next delivery-address mt-2"
            >
              Next
            </Button>
          </CardBody>
        </Card>
      </div>
    </Form>
  );
};

export default Address;
