// ** React Imports
import { Link } from 'react-router-dom';

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form';

import InputNumber from 'rc-input-number';
import { X, Heart, Star, Plus, Minus, Check } from 'react-feather';
import Select from 'react-select';

import classnames from 'classnames';

import { Fragment, useEffect, useRef, useState } from 'react';

import { useGetClientContacts } from '../../../../../requests/contacts/client-contacts';
import useMessage from '../../../../../lib/useMessage';

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

// ** Utils
import { selectThemeColors } from '@utils';

const Customer = (props) => {
  // ** Props
  const { stepper, products, setAmount, customer, setCustomer} = props;
  const { error, success } = useMessage();
  // ** Store
  const store = useSelector((state) => state.shop);

  const setProductAmount = (val) => {
    setAmount(val);
  };

  // ** Renders products
  const renderDetailProducts = () => {
    return (
      products &&
      products.map((item) => {
        return (
          <li className="price-detail">
            <div className="details-title">
              {item.product.product_name} (Qty: {item.amount})
            </div>
            <div className="detail-amt">
              <strong>${item.product.product_price * item.amount}</strong>
            </div>
          </li>
        );
      })
    );
  };
  const totalOutput = () => {
    let sum = 0;
    products &&
      products.map((item, i) => {
        sum += item.amount * item.product.product_price;
      });
    return sum;
  };
  // ** Renders products
  const renderProducts = () => {
    return (
      products &&
      products.length == 1 &&
      products.map((item, index) => {
        return (
          <Card key={item.product.product_name} className="ecommerce-card">
            <div className="item-img">
              <Link to="#">
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
  return (
    <Form className="list-view product-checkout">
      <Card>
        <CardHeader className="flex-column align-items-start">
          <CardTitle tag="h4">Input Customer</CardTitle>
          <CardText className="text-muted mt-25">
            Input the name, mail and phone of the customer for purchasing the products below.
          </CardText>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="10" sm="12">
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
                    <Label className="form-label" for="Mail">
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
        </CardBody>
      </Card>
      <div className="amount-payable checkout-options">
        <Card>
          <CardHeader>
            <CardTitle tag="h4">Price Details</CardTitle>
          </CardHeader>
          <CardBody>
            <ul className="list-unstyled price-details">
              {products.length ? renderDetailProducts() : ''}
              <li className="price-detail">
                <div className="details-title">Delivery Charges</div>
                <div className="detail-amt discount-amt text-success">Free</div>
              </li>
            </ul>
            <hr />
            <ul className="list-unstyled price-details">
              <li className="price-detail">
                <div className="details-title">Amount Payable</div>
                <div className="detail-amt fw-bolder">${totalOutput()}</div>
              </li>
            </ul>
            <div className=" row justify-content-center">
              <Col className="d-grid" sm="6">
                <Button
                  block
                  type="button"
                  color="primary"
                  onClick={() =>
                    customer.email == '' || customer.name == '' || customer.phone == ''
                      ? error('customer info must not be empty!')
                      : stepper.next()
                  }
                  className="btn-next delivery-address mt-2"
                >
                  Next
                </Button>
              </Col>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="checkout-items">{products.length ? renderProducts() : ''}</div>
    </Form>
  );
};

export default Customer;
