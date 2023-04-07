import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// ** Icon Imports
import { PlusCircle, Plus } from 'react-feather';
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

const Payment = (props) => {
  const { dispatch, membershipDetail, stepper, customer, isPaid, setIsPaid } = props;
  const [active, setActive] = useState('1');

  // ** Store
  const store = useSelector((state) => state.shop);

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  let total = 0;
  if (membershipDetail.payment_type === 'PIF') {
    total = Number(membershipDetail.total_price) + Number(membershipDetail.register_fees);
  } else {
    total = Number(membershipDetail.down_payment) + Number(membershipDetail.register_fees);
  }

  return (
    <Form
      className="list-view product-checkout"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
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
                  <span className="align-middle">CASH OR CHECK</span>
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent className="py-50" activeTab={active}>
              <TabPane tabId="1">
                <CardPayment
                  total={total}
                  membershipDetail={membershipDetail}
                  customer={customer}
                  dispatch={dispatch}
                  isPaid={isPaid}
                  setIsPaid={setIsPaid}
                />
              </TabPane>
              <TabPane tabId="2">
                <CashPayment
                  total={total}
                  membershipDetail={membershipDetail}
                  customer={customer}
                  dispatch={dispatch}
                  isPaid={isPaid}
                  setIsPaid={setIsPaid}
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
              <li className="price-detail">
                <div className="details-title">Total Price</div>
                <div className="detail-amt">
                  <strong>${membershipDetail.total_price}</strong>
                </div>
              </li>
            </ul>
            <hr />
            <ul className="list-unstyled price-details">
              <li className="price-detail">
                <div className="details-title">
                  <strong>Pay Now</strong>
                </div>
              </li>
            </ul>
            <ul className="list-unstyled price-details">
              <li className="price-detail">
                <div className="details-title">Down Payment</div>
                <div className="detail-amt">
                  <strong>${membershipDetail.down_payment}</strong>
                </div>
              </li>
              <li className="price-detail">
                <div className="details-title">Registration Fee</div>
                <div className="detail-amt">
                  <strong>
                    ${membershipDetail.register_fees ? membershipDetail.register_fees : 0}
                  </strong>
                </div>
              </li>
            </ul>
            <hr />
            <ul className="list-unstyled price-details">
              <li className="price-detail">
                <div className="details-title d-flex">
                  <Plus size={18} color="#7367f0" />
                  <h5 className="text-primary">
                    <strong>Add products to checkout</strong>
                  </h5>
                </div>
              </li>
            </ul>
            <hr />
            {membershipDetail.paytype != 'PIF' && (
              <div>
                <ul className="list-unstyled price-details">
                  <li className="price-detail">
                    <div className="details-title">
                      <strong>Pay Later</strong>
                    </div>
                  </li>
                </ul>
                <ul className="list-unstyled price-details">
                  <li className="price-detail">
                    <div className="details-title">Total Due</div>
                    <div className="detail-amt">
                      <strong>${membershipDetail.balance}</strong>
                    </div>
                  </li>
                  <li className="price-detail">
                    <div className="details-title">
                      {membershipDetail.payment_time} monthly Payments,
                      <br />
                      of ${membershipDetail.payment_money} due every{' '}
                      {membershipDetail.due_every === 1
                        ? membershipDetail.due_every + 'st'
                        : membershipDetail.due_every + 'th'}{' '}
                      of the month
                    </div>
                  </li>
                </ul>
                <hr />
              </div>
            )}
            <ul className="list-unstyled price-details">
              <li className="price-detail">
                <div className="details-title">
                  <strong>Total</strong>
                </div>
                <div className="detail-amt">
                  <strong>${total}</strong>
                </div>
              </li>
            </ul>
          </CardBody>
        </Card>
      </div>
    </Form>
  );
};

export default Payment;
