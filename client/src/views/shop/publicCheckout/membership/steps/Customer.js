// ** React Imports
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../../store';
// ** Third Party Components
import { useForm } from 'react-hook-form';
import classnames from 'classnames';
import Select from 'react-select';
import { truncate } from '../../../../../utility/Utils';
import { X, Check } from 'react-feather';

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
  DropdownMenu,
  Input
} from 'reactstrap';

import useMessage from '../../../../../lib/useMessage';

// ** Utils
import { selectThemeColors } from '@utils';

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

const Customer = (props) => {
  const invoices = [
    {
      id: 1,
      template_img: 'https://picsum.photos/id/200/100/150',
      template_title: 'membership invoice template'
    },
    {
      id: 2,
      template_img: 'https://picsum.photos/id/200/100/150',
      template_title: 'invoice template'
    },
    {
      id: 3,
      template_img: 'https://picsum.photos/id/200/100/150',
      template_title: 'invoice template'
    },
    {
      id: 4,
      template_img: 'https://picsum.photos/id/200/100/150',
      template_title: 'invoice template'
    },
    {
      id: 5,
      template_img: 'https://picsum.photos/id/200/100/150',
      template_title: 'invoice template'
    },
    {
      id: 6,
      template_img: 'https://picsum.photos/id/200/100/150',
      template_title: 'invoice template'
    }
  ];

  // ** States
  const [contractMethod, setContractMethod] = useState('digital');

  // ** Props

  const { stepper, setCustomer, customer } = props;
  const dispatch = useDispatch();

  // ** Store
  const store = useSelector((state) => state.shop);

  const { error, success } = useMessage();

  // ** Vars
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

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

  const renderInvoices = () => {
    return invoices?.map((item) => (
      <div
        key={item.id}
        className="mb-1 p-1 d-flex flex-column align-items-center hover-zoom cursor-pointer rounded border border-secondary-subtle"
      >
        <div className="mb-1">
          <img
            className="img-fluid card-img-top"
            src={item.template_img}
            alt="sample invoice template"
          />
        </div>
        <div className="d-flex align-items-center">{truncate(item.template_title, 20)}</div>
      </div>
    ));
  };

  return (
    <Form className="list-view product-checkout" onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader className="flex-column align-items-start">
          <CardTitle tag="h4">Who is buying?</CardTitle>
          <CardText className="text-muted mt-25">
            Input the name, mail and phone of the customer for purchasing the membership.
          </CardText>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="8" sm="12">
              <div className="mb-2">
                <div className="col-12 mb-1 d-flex justify-content-between">
                  <div className="col-3 mb-1">
                    <Label className="form-label" for="name">
                      Name <span className="text-danger">*</span>
                    </Label>
                    <></>
                    <Input
                      onChange={(e) => {
                        setCustomer((p) => ({
                          ...p,
                          name: e?.target?.value
                        }));
                      }}
                      id="name"
                      placeholder="Customer Name"
                    />
                  </div>
                  <div className="col-3">
                    <Label className="form-label" for="mail">
                      Mail <span className="text-danger">*</span>
                    </Label>
                    <></>
                    <Input
                      onChange={(e) => {
                        setCustomer((p) => ({
                          ...p,
                          email: e?.target?.value
                        }));
                      }}
                      id="mail"
                      placeholder="customer mail"
                    />
                  </div>
                  <div className="col-3">
                    <Label className="form-label" for="phone">
                      Phone <span className="text-danger">*</span>
                    </Label>
                    <></>
                    <Input
                      onChange={(e) => {
                        setCustomer((p) => ({
                          ...p,
                          phone: e?.target?.value
                        }));
                      }}
                      id="phone"
                      placeholder="customer phone"
                    />
                  </div>
                </div>
              </div>
            </Col>
            <Col md="4" sm="12">
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
                  onChange={(e) => setContractMethod(e.value)}
                />
              </div>
            </Col>
          </Row>
          <Row>
          <Col xs={12}>
                <div className="d-flex align-items-center">
                  <div className="form-switch w-100">
                  <Input 
                    defaultChecked 
                    type="switch" 
                    name="save-card" 
                    id="save-card" 
                    onChange={(e) =>
                      setCustomer((p) => ({
                        ...p,
                        isSave: !customer.isSave
                      }))
                    }/>
                  <Label className="form-check-label" for="save-card">
                    <span className="switch-icon-left">
                      <Check size={14}/>
                    </span>
                    <span className="switch-icon-right">
                      <X size={14} />
                    </span>
                  </Label>
                  <Label className="fw-bolder ms-1" for="save-card">
                    Add to Client?
                  </Label>
                </div>
                </div>
              </Col>
          </Row>
          <Row>
            {contractMethod === 'digital' && (
              <div>
                <CardTitle tag="h4" className="mb-0 mt-2">
                  Choose a template
                </CardTitle>
                <CardText className="text-muted mt-25">Select an Invoice Template to send</CardText>
                <div className="ecommerce-header">
                  <Row>
                    <Col sm="12">
                      <div className="ecommerce-header-items">
                        <div className="result-toggler">
                          <span className="search-results">12 Results Found</span>
                        </div>

                        <div className="view-options d-flex">
                          <UncontrolledButtonDropdown className="dropdown-sort">
                            <DropdownToggle
                              className="text-capitalize me-1"
                              color="primary"
                              outline
                              caret
                            >
                              All Categories
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem className="w-100">Membership Invoices</DropdownItem>
                              <DropdownItem className="w-100">Regular Invoices</DropdownItem>
                              <DropdownItem className="w-100">Custom Invoices</DropdownItem>
                            </DropdownMenu>
                          </UncontrolledButtonDropdown>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className={classnames('grid-view')}>{renderInvoices()}</div>
              </div>
            )}
          </Row>
        </CardBody>
      </Card>
      <div className="customer-card">
        <Card>
          <CardHeader>
            <CardTitle tag="h4">Customer Info</CardTitle>
          </CardHeader>
          <CardBody>
            {customer && (
              <div>
                <CardText tag="h4">{customer.name}</CardText>
                <CardText className="mb-0">{customer.email}</CardText>
                <div className=" row justify-content-center">
                  <Col className="d-grid" sm="6">
                    <Button
                      block
                      type="button"
                      color="primary"
                      onClick={() =>
                        customer.email == '' || customer.name == ''
                          ? error('customer info must not be empty!')
                          : stepper.next()
                      }
                      className="btn-next delivery-address mt-2"
                    >
                      Next
                    </Button>
                  </Col>
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </Form>
  );
};

export default Customer;
