import React, { useEffect, useState } from 'react';
import { createStripePaymentIntentAction, getStripeConfigAction } from '../../../store/action';
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js';
import Checkout from './Checkout';
import { useSelector } from 'react-redux';

export default function Payment(props) {
  const [stripePromise, setStripePromise] = useState(null);

  const { isCart, dispatch } = props;

  // ** Store
  const store = useSelector((state) => state.shop);
  const { totalPrice, clientSecret, products, client } = store.checkout

  useEffect(() => {
    if (totalPrice) {
      dispatch(getStripeConfigAction()).then((res) => {
        setStripePromise(loadStripe(res.pk));
      });
    }
  }, [dispatch, totalPrice]);

  return (
    <div>
      {stripePromise && clientSecret && 
     
       ( <Elements
            stripe={stripePromise}
            options={{ clientSecret }}
          >
            <Checkout
              dispatch={dispatch}
              isCart={isCart}
              products={products}
              client={client}
            />
        </Elements>)
      
      }
    </div>
  );
}
