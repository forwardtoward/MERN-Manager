import React, { useState } from 'react';
import { Button, Card, CardBody, Form, Nav, Navbar, NavItem, NavLink } from 'reactstrap';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
// import { addPaymentToInvoiceAction } from '../store/action';
import { Link } from 'react-router-dom';

export default function Checkout({ dispatch }) {
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsPrcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsPrcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-confirm/invoice/1111`
      },
      redirect: 'always'
    });
    setIsPrcessing(false);
  };
  return (
    <>
      <div style={{ width: '100vw', height: '100vh' }}>
        <Navbar className="shadow">
          <h5 className="text-primary">My Manager</h5>
          <Nav>
            <NavItem>
              <NavLink tag={Link} to="/register">
                Register
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/login">
                Login
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        <Card className="col-md-4 col-sm-12" style={{ marginLeft: '35%', marginTop: '20vh' }}>
          <CardBody>
            <Form onSubmit={handleSubmit} id="payment-form">
              <PaymentElement />
              <Button type="submit" color="primary" className="mt-1">
                <span>{isProcessing ? 'Processing...' : 'Pay Now'}</span>
              </Button>
              <p> {message}</p>
            </Form>
          </CardBody>
        </Card>
        <p className="text-center text-secondary">Powered by My Manager</p>
      </div>
    </>
  );
}
