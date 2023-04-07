import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getsinsgleinvoice } from '../../../../requests/invoice/invoice';
import { createStripePaymentIntentAction, getStripeConfigAction } from '../store/action';
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js';
import Checkout from './Checkout';

export default function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const dispatch = useDispatch();

  const { id } = useParams();

  const getData = async () => {
    const fetdata = await getsinsgleinvoice(id);
    setInvoice(fetdata?.data);
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  useEffect(() => {
    if (invoice) {
      dispatch(getStripeConfigAction()).then((res) => {
        setStripePromise(loadStripe(res.pk));
      });
      dispatch(
        createStripePaymentIntentAction({ amount: invoice.payNow, currency: invoice.currency })
      ).then((res) => {
        console.log(res)
        setClientSecret(res);
      });
    }
  }, [dispatch, invoice]);


  return (
    <div>
      {stripePromise && clientSecret && 
     
       ( <Elements stripe={stripePromise} options={{ clientSecret }}>
          <Checkout invoice={invoice} dispatch={dispatch}/>
        </Elements>)
      
      }
    </div>
  );
}
