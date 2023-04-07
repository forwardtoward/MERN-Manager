// ** React Imports
import { Link } from 'react-router-dom';

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form';

import InputNumber from 'rc-input-number';
import { X, Star, Plus, Minus } from 'react-feather';

import classnames from 'classnames';

import { useEffect, useState } from 'react';

// ** Reactstrap Imports
import {
  Form,
  Input,
  Card,
  Label,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Button,
  Row,
  Col
} from 'reactstrap';

import { useSelector } from 'react-redux';

import Select from 'react-select';
// ** Utils
import { selectThemeColors } from '@utils';

const defaultValues = {
  checkoutName: '',
  checkoutCity: '',
  checkoutState: '',
  checkoutNumber: '',
  checkoutFlatNo: '',
  checkoutPincode: '',
  checkoutLandmark: ''
};

import {
  createStripePaymentIntentAction
} from '../../../store/action';
import {
  checkoutSetClient,
  checkoutSetClientSecret,
  checkoutSetTotalPrice,
  checkoutSetProducts,
} from '../../../store';

const Address = (props) => {
  // ** Props
  const { stepper, contact, setContact, products, setAmount, dispatch } = props;

  // ** Store
  const store = useSelector((state) => state.shop);

  // get all client's data from db
  // const { data: clientData } = useGetClientContacts();
  const [clients, setClients] = useState([]);
  const { clientContacts } = store;

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
  // ** Vars
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

  const setProductAmount = (val) => {
    setAmount(val);
  };

  const totalOutput = () => {
    let sum = 0;
    products &&
      products.map((item, i) => {
        sum += item.amount * item.product.product_price;
      });
    return sum;
  };

  const onNext = () => {

    const c = contact !== '' ? clientContacts[contact] : {};
    
    dispatch(checkoutSetClient(c));
    dispatch(checkoutSetProducts(products))

    let totalPrice = store.checkout.totalPrice;
    if (store.checkout.productId) {
      totalPrice = totalOutput();
      dispatch(checkoutSetTotalPrice(totalPrice));
    }

    dispatch(
      createStripePaymentIntentAction({
        amount: totalPrice,
        currency: 'USD',
      })
    ).then((res) => {
      dispatch(checkoutSetClientSecret(res));
      stepper.next();
    });
  };

  const client = contact !== '' ? clientContacts[contact] : {};

  // ** Renders products
  const renderProducts = () => {
    return (
      products &&
      products.length == 1 &&
      products.map((item, index) => {
        return (
          <Card key={`${item.product.product_name}-${index}`} className="ecommerce-card">
            <div className="item-img">
              <Link to={`/ecommerce/product-detail/${item.product._id}`}>
                <img className="img-fluid" src={item.product.product_url} alt={item.product.name} />
              </Link>
            </div>
            <CardBody>
              <div className="item-name">
                <h6 className="mb-0">
                  <Link to={`/ecommerce/product-detail/${item.product._id}`}>
                    {item.product.product_name}
                  </Link>
                </h6>
                <span className="item-company">
                  By
                  <a className="ms-25" href="/" onClick={(e) => e.preventDefault()}>
                    {item.product.product_brand}
                  </a>
                </span>
                <div className="item-rating">
                  <ul className="unstyled-list list-inline">
                    {new Array(5).fill().map((listItem, index) => {
                      return (
                        <li key={index} className="ratings-list-item me-25">
                          <Star
                            className={classnames({
                              'filled-star': index + 1 <= item.product.product_rating,
                              'unfilled-star': index + 1 > item.product.product_rating
                            })}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <span className="text-success mb-1">In Stock</span>
              <div className="item-quantity">
                <span className="quantity-title me-50">Qty</span>
                <InputNumber
                  min={1}
                  max={10}
                  upHandler={<Plus />}
                  className="cart-input"
                  defaultValue={item.amount}
                  downHandler={<Minus />}
                  onChange={(e) => setProductAmount(e)}
                />
              </div>
              {/* <div className="delivery-date text-muted">
                            Delivery by, {formatDate(item.shippingDate)}
                        </div> */}
              {/* <span className="text-success">
                            {item.discountPercentage}% off {item.offers} offers
                            Available
                        </span> */}
            </CardBody>
            <div className="item-options text-center">
              <div className="item-wrapper">
                <div className="item-cost">
                  <h4 className="item-price">${item.product.product_price * item.amount}</h4>
                  {item.hasFreeShipping ? (
                    <CardText className="shipping">
                      <Badge color="light-success" pill>
                        Free Shipping
                      </Badge>
                    </CardText>
                  ) : null}
                </div>
              </div>
            </div>
          </Card>
        );
      })
    );
  };

  const renderCustomerCard = () => {
    const { address } = client;

    return (
      <div className="customer-card">
        <Card>
          <CardHeader>
            <CardTitle tag="h4">Buyer Info</CardTitle>
          </CardHeader>
          <CardBody>
            {client._id !== undefined && (
              <div>
                <CardText tag="h4">{client.fullName}</CardText>
                <CardText className="mb-0">
                  {address ? address.street : ''}
                </CardText>
                <CardText>
                  {address ? `${address.city} ${address.state} ${address.zipCode}` : ''}
                </CardText>
                <CardText>{client.company}</CardText>
                <CardText>{client.email}</CardText>
                <CardText>{client.phone}</CardText>
                <Button
                  block
                  type="button"
                  color="primary"
                  onClick={onNext}
                  className="btn-next delivery-address mt-2"
                >
                  Next
                </Button>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    )
  }

  return (
    <Form className="list-view product-checkout">
      <Card>
        <CardHeader className="flex-column align-items-start">
          <CardTitle tag="h4">Select Buyer</CardTitle>
          <CardText className="text-muted mt-25">
            Select the name of the buyer that will be purchasing the products below. If buyer is not
            on the list, create one now.
          </CardText>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="6" sm="12">
              <div className="mb-2">
                <Label className="form-label" for="checkoutName">
                  Select Buyer
                </Label>
                <Select
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  defaultValue={clients[0]}
                  options={clients}
                  isClearable={false}
                  onChange={(e) => setContact(e.index)}
                />
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
      { renderCustomerCard() }
      <div className="checkout-items">{products.length ? renderProducts() : ''}</div>
    </Form>
  );
};

export default Address;
