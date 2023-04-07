// ** React Imports
import { Fragment, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

// ** Custom Components
import Wizard from '@components/wizard';
import BreadCrumbs from '@components/breadcrumbs';

// ** Steps
import Cart from './steps/Cart';
import Address from './steps/Address';
import Payment from './steps/Payment';

// ** Third Party Components
import { ShoppingCart, Home, CreditCard } from 'react-feather';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import {
  getCartItems,
  getProduct,
  deleteCartItem,
  deleteWishlistItem,
  updateProductAmount,
  getClientContacts,
  checkoutSetProducts,
  checkoutSetProductId,
} from '../../store';

// ** Route
import { useParams } from 'react-router-dom';

// ** Styles
import '@styles/base/pages/app-ecommerce.scss';

const Checkout = () => {
  // ** Ref & State
  const ref = useRef(null);
  const [stepper, setStepper] = useState(null);
  const [contact, setContact] = useState('');
  const [isPaid, setIsPaid] = useState(false);

  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.shop);
  const location = useLocation();
  const last_path = location.pathname.split('/').slice(-1)[0];
  const { productId } = useParams();

  // ** Get Cart Items on mount
  useEffect(() => {
    dispatch(getClientContacts());
    if (productId) {
      dispatch(getProduct(productId));
      dispatch(checkoutSetProductId(productId));
    } else {
      dispatch(getCartItems());
    }
  }, []);

  useEffect(() => {
    dispatch(checkoutSetProducts(store.cart));
  }, [store.cart]);

  let steps;
  if (last_path === 'product') {
    steps = [
      {
        id: 'cart',
        title: 'Cart',
        subtitle: 'Your Cart Items',
        icon: <ShoppingCart size={18} />,
        content: (
          <Cart
            stepper={stepper}
            dispatch={dispatch}
            products={store.cart}
            getCartItems={getCartItems}
            deleteCartItem={deleteCartItem}
            deleteWishlistItem={deleteWishlistItem}
            updateProductAmount={updateProductAmount}
          />
        )
      },
      {
        id: 'Address',
        title: 'Buyer',
        subtitle: 'Select purchaser',
        icon: <Home size={18} />,
        content: (
          <Address
            contact={contact}
            products={store.cart}
            setContact={setContact}
            stepper={stepper}
            dispatch={dispatch}
          />
        )
      },
      {
        id: 'payment',
        title: 'Payment',
        subtitle: 'Select Payment Method',
        icon: <CreditCard size={18} />,
        content: (
          <Payment
            contact={contact}
            products={store.cart}
            isPaid={isPaid}
            setIsPaid={setIsPaid}
            dispatch={dispatch}
            isCart={true}
          />
        )
      }
    ];
  } else {
    const [amount, setAmount] = useState(1);
    steps = [
      {
        id: 'Address',
        title: 'Buyer',
        subtitle: 'Select purchaser',
        icon: <Home size={18} />,
        content: (
          <Address
            contact={contact}
            products={[
              {
                product: store.productDetail,
                amount: amount,
                _id: store.productDetail._id
              }
            ]}
            setContact={setContact}
            stepper={stepper}
            setAmount={setAmount}
            dispatch={dispatch}
          />
        )
      },
      {
        id: 'payment',
        title: 'Payment',
        subtitle: 'Select Payment Method',
        icon: <CreditCard size={18} />,
        content: (
          <Payment
            contact={contact}
            products={[
              {
                product: store.productDetail,
                amount: amount,
                _id: store.productDetail._id
              }
            ]}
            isPaid={isPaid}
            setIsPaid={setIsPaid}
            dispatch={dispatch}
            isCart={false}
          />
        )
      }
    ];
  }

  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle="Checkout"
        breadCrumbParent="eCommerce"
        breadCrumbActive="Products Checkout"
      />
      <Wizard
        ref={ref}
        steps={steps}
        className="checkout-tab-steps"
        instance={(el) => setStepper(el)}
        options={{
          linear: false
        }}
      />
    </Fragment>
  );
};

export default Checkout;
