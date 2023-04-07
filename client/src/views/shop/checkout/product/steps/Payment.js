import React, { useEffect, useState } from 'react';

// ** Icon Imports
import { PlusCircle } from 'react-feather';
import { BsCreditCard, BsCash } from 'react-icons/bs';

// ** Components
import CardPayment from '../CardPayment';
import CashPayment from '../CashPayment';

// ** Reactstrap Imports
import {
  Form,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

import { useSelector } from 'react-redux';

const Payment = (props) => {
  // ** Props
  const { contact, products, dispatch, isCart, setIsPaid, isPaid } = props;
  const [active, setActive] = useState('1');
  // const [paymentMethods, setPaymentMethods] = useState([]);

  // ** Store
  const store = useSelector((state) => state.shop);
  const currentUser = useSelector((state) => state.auth.userData);

  const { clientContacts, checkout } = store;

  const client = contact !== '' ? clientContacts[contact] : null;

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  // ** Renders products
  const renderProducts = () => {
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

  return (
    <div className="list-view product-checkout">
      <div className="payment-type">
        <Card>
          <CardHeader className="flex-column align-items-start">
            <CardTitle tag="h4">Payment options</CardTitle>
            <CardText className="text-muted mt-25">
              Be sure to click on correct payment option
            </CardText>
          </CardHeader>
          <CardBody>
            <Nav className="justify-content-center" tabs>
              <NavItem>
                <NavLink
                  active={active === '1'}
                  onClick={() => {
                    toggle('1');
                  }}
                >
                  <BsCreditCard size={18} />
                  <span className="align-middle">CREDIT CARD</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={active === '2'}
                  onClick={() => {
                    toggle('2');
                  }}
                >
                  <BsCash size={18} />
                  <span className="align-middle">Cash Payment</span>
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent className="py-50" activeTab={active}>
              <TabPane tabId="1">
                <CardPayment
                  products={products}
                  client={client}
                  dispatch={dispatch}
                  isPaid={isPaid}
                  setIsPaid={setIsPaid}
                  isCart={isCart}
                  user={currentUser}
                />
              </TabPane>
              <TabPane tabId="2">
                <CashPayment
                  products={products}
                  client={client}
                  isPaid={isPaid}
                  setIsPaid={setIsPaid}
                  dispatch={dispatch}
                  isCart={isCart}
                  user={currentUser}
                />
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </div>
      <div className="amount-payable checkout-options">
        <Card>
          <CardHeader>
            <CardTitle tag="h4">Price Details</CardTitle>
          </CardHeader>
          <CardBody>
            <ul className="list-unstyled price-details">
              {products.length ? renderProducts() : ''}
              <li className="price-detail">
                <div className="details-title">Delivery Charges</div>
                <div className="detail-amt discount-amt text-success">Free</div>
              </li>
            </ul>
            <hr />
            <ul className="list-unstyled price-details">
              <li className="price-detail">
                <div className="details-title">Amount Payable</div>
                <div className="detail-amt fw-bolder">
                  ${checkout.total}
                </div>
              </li>
            </ul>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Payment;
