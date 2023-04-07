// ** React Imports
import { Fragment, useEffect, useRef, useState } from 'react';
// ** Custom Components
import Wizard from '@components/wizard';
import BreadCrumbs from '@components/breadcrumbs';

// ** Steps
import Cart from './steps/Cart';
import Contact from './steps/Contact';
import Payment from './steps/Payment';
import Document from './steps/Document';
import Membership from './steps/Membership';

// ** Third Party Components
import { CreditCard } from 'react-feather';
import { RiContactsBookLine } from 'react-icons/ri';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { getMembership, getClientContacts } from '../../store';

// ** Styles
import '@styles/base/pages/app-ecommerce.scss';

const MembershipCheckout = () => {
  // ** Ref & State
  const ref = useRef(null);
  const [stepper, setStepper] = useState(null);
  const [contact, setContact] = useState('');
  const [membershipDetail, setMembershipDetail] = useState({});
  const [isPaid, setIsPaid] = useState(false);
  const [checkoutDetails, setCheckoutDetails] = useState({ contractMethod: 'payOnContract' });

  const store = useSelector((state) => state.shop);

  // ** Store Vars
  const dispatch = useDispatch();

  // ** Get Cart Items on mount
  useEffect(() => {
    dispatch(getClientContacts());
  }, [dispatch]);

  let steps = [
    {
      id: 'Contact',
      title: 'Contact',
      subtitle: 'Contact Details',
      icon: <RiContactsBookLine size={18} />,
      content: (
        <Contact
          contact={contact}
          setContact={setContact}
          stepper={stepper}
          checkoutDetails={checkoutDetails}
          setCheckoutDetails={setCheckoutDetails}
        />
      )
    },
    {
      id: 'Membership',
      title: 'Membership',
      subtitle: 'Membership Detail',
      icon: <RiContactsBookLine size={18} />,
      content: (
        <Membership
          contact={contact}
          dispatch={dispatch}
          getMembership={getMembership}
          setMembershipDetail={setMembershipDetail}
          stepper={stepper}
          checkoutDetails={checkoutDetails}
          setCheckoutDetails={setCheckoutDetails}
        />
      )
    },
    {
      id: 'document',
      title: 'Document',
      subtitle: 'Create Document',
      icon: <CreditCard size={18} />,
      content: (
        <Document
          contact={contact}
          dispatch={dispatch}
          membershipDetail={membershipDetail}
          stepper={stepper}
          checkoutDetails={checkoutDetails}
          setCheckoutDetails={setCheckoutDetails}
        />
      )
    },
/*
    {
      id: 'payment',
      title: 'Payment & Document',
      subtitle: 'Payment Method & Contract',
      icon: <CreditCard size={18} />,
      content: (
        <Payment
          contact={contact}
          dispatch={dispatch}
          getMembership={getMembership}
          membershipDetail={membershipDetail}
          stepper={stepper}
          isPaid={isPaid}
          setIsPaid={setIsPaid}
          checkoutDetails={checkoutDetails} setCheckoutDetails={setCheckoutDetails}
        />
      )
    },
*/
  ];

  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle="Checkout"
        breadCrumbParent="eCommerce"
        breadCrumbActive="Membership Checkout"
      />

      <Wizard
        ref={ref}
        steps={steps}
        className="checkout-tab-steps"
        instance={(el) => {
          setStepper(el);
        }}
        options={{
          linear: false
        }}
      />
    </Fragment>
  );
};

export default MembershipCheckout;
