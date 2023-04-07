import React, { useEffect, useMemo, useState } from 'react';
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import TicketComponent from './TicketComponent';
import PerfectScrollbar from 'react-perfect-scrollbar';
import OrderComponent from './OrderComponent';
import CheckoutComponent from './CheckoutComponent';
import PaymentSelection from './PaymentSelection';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Checkout from './Checkout';
import { useDispatch } from 'react-redux';
import {
  createStripePaymentIntentAction,
  getStripeConfigAction
} from '../../../finance/invoice/store/action';

const tickets = [
  {
    id: 1,
    ticketName: 'Early Bird General Admission - Tier 1 - (21+ )',
    price: 10
  },
  {
    id: 2,
    ticketName: 'Early Bird General Admission - Tier 1 - (21+ )',
    price: 10
  },
  {
    id: 3,
    ticketName: 'Early Bird General Admission - Tier 1 - (21+ )',
    price: 10
  }
];
const GetTicketModal = (props) => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const { openGetTicket, setOpenGetTicket } = props;
  const [orders, setOrders] = useState(
    tickets.map((ticket) => {
      return { ...ticket, count: 0 };
    })
  );

  const dispatch = useDispatch();

  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(0);
  }, []);

  useEffect(() => {
    dispatch(getStripeConfigAction()).then((res) => {
      console.log('public key is ', res.pk);
      setStripePromise(loadStripe(res.pk));
    });
    dispatch(createStripePaymentIntentAction({ amount: 1200, currency: 'USD' })).then((res) => {
      console.log(res);
      setClientSecret(res);
    });
  }, [dispatch]);

  const totalPrice = useMemo(() => {
    let sum = 0;
    orders.forEach((order) => {
      sum += order.price * order.count;
    });

    return sum;
  }, [orders]);

  const handleCheckout = () => {
    if (step === 0) {
      setStep(1);
      return;
    }
  };

  return (
    <Modal
      isOpen={openGetTicket}
      toggle={() => setOpenGetTicket(false)}
      className="modal-dialog-centered get-ticket-modal"
      size="lg"
      style={{ maxWidth: '1200px' }}
    >
      <ModalHeader toggle={() => setOpenGetTicket(false)}>Register Ticket</ModalHeader>
      <ModalBody className="d-flex flex-row">
        <div className="modal-ticket-view d-flex flex-column">
          <div className="modal-ticket-view-header">
            <h2>Hoboken's Best St. Patty's Day Bar Crawl on Sat, March 18</h2>
            <p>Saturday, March 18 · 12 - 6pm EDT</p>
          </div>
          <div className="ticket-view-container">
            <PerfectScrollbar
              className="ticket-view-container-scroll"
              options={{ wheelPropagation: false }}
            >
              {step === 0 &&
                tickets.map((ticket, index) => (
                  <TicketComponent
                    ticket={ticket}
                    key={index}
                    orders={orders}
                    setOrders={setOrders}
                  />
                ))}
              {step === 1 && (
                <div className="w-100">
                  <CheckoutComponent />
                  <PaymentSelection />
                  <div>
                    {stripePromise && clientSecret && (
                      <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <Checkout dispatch={dispatch} />
                      </Elements>
                    )}
                  </div>
                </div>
              )}
            </PerfectScrollbar>
          </div>
          <div className="modal-ticket-view-footer">
            <Button color="danger" onClick={() => handleCheckout()}>
              Check out
            </Button>
          </div>
        </div>
        <div className="modal-ticket-order">
          <div className="banner-image">
            <img
              alt="banner-image"
              src="https://mymanager.com/assets/images/events/default.jpg"
              height="180"
              className="w-100"
            />
          </div>
          <div className="order-container">
            <PerfectScrollbar
              className="order-container-scroll"
              options={{ wheelPropagation: false }}
            >
              <h5>Order summary</h5>
              {orders &&
                orders.length &&
                orders.map((order, index) => {
                  if (order.count) return <OrderComponent order={order} key={index} />;
                })}

              <hr />
              <Row className="mt-2 p-1">
                <Col md="7">
                  <strong>Total</strong>
                </Col>
                <Col md="5" style={{ textAlign: 'end' }}>
                  ${totalPrice}
                </Col>
              </Row>
            </PerfectScrollbar>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};
export default GetTicketModal;
