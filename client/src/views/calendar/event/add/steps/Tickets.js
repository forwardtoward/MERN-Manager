// ** React Imports
import { Fragment, useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

// ** Icons Imports
import { ArrowLeft, ArrowRight } from 'react-feather';

// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button, FormText } from 'reactstrap';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { createEvent, setErrors } from '../../store';
import { getUserData } from '../../../../../auth/utils';

// ** Utils
import { selectThemeColors } from '@utils';

// ** Message Imports
import useMessage from '@src/lib/useMessage';
import Select from 'react-select';

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form';
import { getProducts } from '@src/views/shop/store';

const Tickets = ({ stepper, type, eventForm }) => {
  // ** Default Form Values
  const defaultValues = {
    ticketName: ''
  };

  const itemTypeOption = [
    { value: 'product', label: 'Sell Product' },
    { value: 'membership', label: 'Sell Membership' },
    { value: 'course', label: 'Sell Course' },
    { value: 'ticket', label: 'Ticket' },
    { value: 'none', label: 'RSVP(Free)' }
  ];

  const checkoutButtonTypes = [
    { value: 'buynow', label: 'Buy Now' },
    { value: 'registernow', label: 'Register Now' },
    { value: 'gettickets', label: 'Get Tickets' },
    { value: 'rsvp', label: 'RSVP Now' }
  ];

  // ** Register Inputs to React Hook Form
  const {
    reset,
    register,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

  // ** State
  const [ticketType, setTicketType] = useState('Paid');
  const [ticketAvailableQuantity, setTicketAvailableQuantity] = useState(0);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [pastStep, setPastStep] = useState(0);
  const [checkoutType, setCheckoutType] = useState('Product');
  const [checkoutItem, setCheckoutItem] = useState({});
  const [checkoutButtonType, setCheckoutButtonType] = useState({});
  const [items, setItems] = useState([]);
  // ** History var
  const history = useHistory();
  const { error, success } = useMessage();

  // // ** Message Vars
  // const { success, error } = useMessage()

  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => {
    return { ...state.event, ...state.shop };
  });
  const products = useSelector((state) => state.shop.products);

  useEffect(() => {
    dispatch(
      getProducts({
        q: '',
        sortBy: 'featured',
        perPage: 9,
        page: 0
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (items.length > 0 && checkoutType.value === 'product') {
      setCheckoutItem(items[0]);
    }
  }, [items, checkoutType]);

  useEffect(() => {
    if (checkoutType.value === 'none') {
      setItems([
        { value: 'three', label: 'Going, Not going, Maybe' },
        { value: 'two', label: 'Going, Not going' }
      ]);
      setCheckoutItem({ value: 'three', label: 'Going, Not going, Maybe' });
    } else {
      let list = [];
      for (const item of products) {
        list.push({
          value: item._id,
          label: item.product_name,
          name: item.product_name,
          price: item.product_price,
          desc: item.product_description
        });
      }
      setItems(list);
      setCheckoutItem(list[0]);
    }
  }, [checkoutType]);

  useEffect(() => {
    let list = [];
    for (const item of products) {
      list.push({
        value: item._id,
        label: item.product_name,
        name: item.product_name,
        price: item.product_price,
        desc: item.product_description
      });
    }
    setItems(list);
  }, [products]);

  // ** Event handlers
  const isNumeric = (str) => {
    if (typeof str != 'string') return false; // we only process strings!
    return (
      !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str))
    ); // ...and ensure strings of whitespace fail
  };

  const handleNumberChange = (value, type) => {
    if (isNumeric(value)) {
      if (type === 'Price') {
        setTicketPrice(parseFloat(value));
      } else if (type === 'Quantity') {
        setTicketAvailableQuantity(parseInt(value));
      }
    }
  };

  const handleTicketTypeChange = (value) => {
    setTicketType(value);
    if (value === 'Free') setTicketPrice(0);
    setError('ticketPrice', { type: 'manual', message: '' });
  };

  const handlePastStepHandler = () => {
    stepper.to(pastStep);
  };

  const handleCreateClickHandler = (data) => {
    eventForm.set('ticketName', data.ticketName);
    eventForm.set('ticketType', ticketType);
    eventForm.set('ticketAvailableQuantity', ticketAvailableQuantity);
    eventForm.set('ticketPrice', ticketPrice);
    eventForm.set('checkoutType', checkoutType.value);
    // dispatch(createEvent(eventForm));
    // success('New event created');
    // history.push('/events');
    stepper.next();
  };

  const handleCheckoutMethodChange = (value) => {
    setCheckoutType(value);
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Checkout</h5>
        <small>Select what is being sold</small>
      </div>
      <Form onSubmit={handleSubmit(handleCreateClickHandler)}>
        <Row>
          <Col md="4" className="mb-1">
            <Label className="form-label" for="basicInput">
              Goal of Event
            </Label>
            <Controller
              name="ticketType"
              control={control}
              render={({ field: { value, onChange } }) => (
                // <Input
                //   autoFocus
                //   placeholder="Give your tickets a name ..."
                //   value={value}
                //   onChange={onChange}
                // />
                <Select
                  isClearable={false}
                  options={itemTypeOption}
                  className="react-select"
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  value={checkoutType}
                  onChange={(value) => handleCheckoutMethodChange(value)}
                />
              )}
            />
            {/* 
            {errors.ticketName && (
              <FormText color="danger" id="validation-add-board">
                Please Enter Ticket Name
              </FormText>
            )} */}
          </Col>

          {checkoutType.value === 'ticket' && (
            <Col md="4" className="mb-1">
              <Label className="form-label" for="basicInput">
                Available Quantity
              </Label>
              <Input
                type="quantity"
                id="basicInput"
                placeholder="How many tickets are available?"
                value={ticketAvailableQuantity}
                onChange={(e) => handleNumberChange(e.target.value, 'Quantity')}
              />
            </Col>
          )}
          {!['ticket'].includes(checkoutType.value) && (
            <Col md="4" className="mb-1">
              <Label className="form-label" for="basicInput">
                Select One
              </Label>
              <Select
                isClearable={false}
                options={items}
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
                value={checkoutItem}
                onChange={(e) => setCheckoutItem(e)}
              />
            </Col>
          )}
          <Col md="4" className="mb-1">
            <Label className="form-label" for="basicInput">
              Checkout Button
            </Label>
            <Select
              isClearable={false}
              options={checkoutButtonTypes}
              className="react-select"
              classNamePrefix="select"
              theme={selectThemeColors}
              value={checkoutButtonType}
              onChange={(e) => setCheckoutButtonType(e)}
            />
          </Col>
        </Row>
        {checkoutType.value === 'ticket' && (
          <Row>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="basicInput">
                Price
              </Label>
              <Input
                type="number"
                step="any"
                id="basicInput"
                placeholder="Price per ticket"
                value={ticketPrice}
                disabled={ticketType === 'Free'}
                {...register('ticketPrice')}
                onChange={(e) => handleNumberChange(e.target.value, 'Price')}
              />
              {/* {errors.ticketPrice && (
                <FormText color="danger" id="validation-add-board">
                  {errors.ticketPrice.message}
                </FormText>
              )} */}
            </Col>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="basicInput">
                Register Form
              </Label>
              <Input type="select" id="registerForm" name="registerForm">
                <option value="1">Form 1</option>
                <option value="2">Form 2</option>
                <option value="3">Form 3</option>
                <option value="4">Form 4</option>
              </Input>
            </Col>
          </Row>
        )}

        <div className="d-flex justify-content-between">
          <Button color="primary" className="btn-prev" onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">Previous</span>
          </Button>
          <Button color="primary" className="btn-next" type="submit">
            <span className="align-middle d-sm-inline-block d-none">Next</span>
            <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
          </Button>
        </div>
      </Form>
      {/* {errors.previous && (
        <FormText color="danger" id="validation-add-board">
          You did not enter the required values in the{' '}
          <Link onClick={handlePastStepHandler} style={{ textDecoration: 'underline' }}>
            past steps
          </Link>
          .
        </FormText>
      )} */}
    </Fragment>
  );
};

export default Tickets;
