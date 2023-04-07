import React, { useState } from 'react';
import { Button, Card, CardBody, Form, Col } from 'reactstrap';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';

import {
  updateMembership,
  checkoutClear
} from '../../../store';

import useMessage from '../../../../../lib/useMessage';

export default function Checkout(props) {
  const [message, setMessage] = useState(null);
  const { error, success } = useMessage();
  const [isProcessing, setIsProcessing] = useState(false);
  const { dispatch, membership, clientSecret, subscriptionId } = props;

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/ecommerce/checkout/payment-confirm`
      },
      redirect: 'if_required'
    });
  
    if (result.error) {
      error(result.error.message);
    } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {

      setMessage(result.paymentIntent.status);

      if (result.paymentIntent.status === 'succeeded') {
        const data = {
          membershipId: membership._id,
          pay_type: 'card',
          update: {
            paymentMethod: result.paymentIntent.payment_method,
            subscription_id: subscriptionId
          }
        };
        dispatch(updateMembership(data)).then((res) => {
          if (res && res.payload) {
            const result = res.payload.data;
            if (result.status === 'success') {
              success('payment successfully done.');
              dispatch(checkoutClear());
              setIsProcessing(false);
            } else {
              const msg = result.msg;
              error(msg);
            }
          } else if (res.error) {
            error('Something went wrong');
          }
        });
      }
    
    }
    setIsProcessing(false);
  };

  return (
    <>
      <div className=" row justify-content-center">
        <Card className="col-md-6 col-sm-12">
          <CardBody>
            <Form onSubmit={handleSubmit} id="payment-form">
              <PaymentElement />
              <div className='row justify-content-center'>
                <Col className="d-grid" sm="4">
                  <Button color="primary" className="mt-1" type="submit">
                    <span>{isProcessing ? 'Processing...' : 'Pay Now'}</span>
                  </Button>
                  <p> Payment {message} 🎉</p>
                </Col>
              </div>
            </Form>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
