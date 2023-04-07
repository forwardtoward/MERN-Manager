import React, { useEffect, useState } from 'react';
import {
  getStripeConfigAction,
  createStripeCustomerAction,
  createStripeMembership,
  createStripeSubscriptionAction,
} from '../../../store/action';
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js';
import Checkout from './Checkout';
import { useSelector } from 'react-redux';
import useMessage from '../../../../../lib/useMessage';

export default function Payment(props) {
  const [stripePromise, setStripePromise] = useState(null);
  const [subscriptionData, setSubscriptionData] = useState(null);
  const { error, success } = useMessage();
  
  const { membershipDetail, client, dispatch } = props;

  // ** Store
  const store = useSelector((state) => state.shop);
  const currentUser = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (membershipDetail) {
      dispatch(getStripeConfigAction()).then((res) => {
        setStripePromise(loadStripe(res.pk));
      });
      const customerPayload = {
        userId: currentUser.id,
        customer: {
          name: client.fullName,
          email: client.email,
          phone: client.phone,
          }
      }
      dispatch(createStripeCustomerAction(customerPayload)).then((res) => {
        if (res.success) {
          const customer = res.data
          dispatch(createStripeMembership(membershipDetail)).then((res) => {
            if (res.success) {
              const product = res.data;
              const subscriptionPayload = {
                customer: customer.customerId,
                price: product.default_price
              }
              dispatch(createStripeSubscriptionAction(subscriptionPayload)).then(res => {
                if (res.success) {
                  const { subscription, clientSecret } = res.data;
                  setSubscriptionData({
                    subscriptionId: subscription.id,
                    clientSecret
                  });
                } else {
                  error(res.message)
                }
              });
            } else {
              error(res.message)
            }
          });
       } else {
        error(res.message)
       }
      })
    }
  }, [dispatch, membershipDetail]);

  return (
    <div>
      {stripePromise && subscriptionData?.clientSecret &&
       ( <Elements
            stripe={stripePromise}
            options={{ clientSecret: subscriptionData?.clientSecret }}
          >
            <Checkout
              dispatch={dispatch}
              client={client}
              subscriptionId={subscriptionData?.subscriptionId}
              clientSecret={subscriptionData?.clientSecret}
              membership={store.checkout?.buy_membership}
            />
        </Elements>)
      
      }
    </div>
  );
}
