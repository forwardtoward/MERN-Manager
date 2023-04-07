// ** React Imports
import { Fragment, useEffect, useRef, useState } from 'react';

// ** Route
import { useParams } from 'react-router-dom';

// ** Custom Components
import Wizard from '@components/wizard';
import BreadCrumbs from '@components/breadcrumbs';

// ** Steps
import Customer from './steps/Customer';
import Payment from './steps/Payment';
import Document from './steps/Document';
import Membership from './steps/Membership';

// ** Third Party Components
import { ShoppingCart, CreditCard } from 'react-feather';
import { RiContactsBookLine } from 'react-icons/ri';

// ** Styles
import '@styles/react/apps/app-ecommerce.scss';
import { Button, Card, Col, Row } from 'reactstrap';
import Logo from '../../../../assets/images/logo/logo.png';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { getPublicMembership, checkoutMemberships } from '../../store';

// ** Styles
import '@styles/base/pages/app-ecommerce.scss';

const MembershipCheckout = () => {
  const initCustomer = {
    email: '',
    name: '',
    phone:'',
    isSave: true,
  };
  // ** Ref & State
  const ref = useRef(null);
  const [stepper, setStepper] = useState(null);
  const [customer, setCustomer] = useState(initCustomer);
  const [membershipDetail, setMembershipDetail] = useState({});
  const [isPaid, setIsPaid] = useState(false);

  const { membershipId } = useParams();

  // ** Store Vars
  const dispatch = useDispatch();

  let steps = [
    {
      id: 'Customer',
      title: 'Customer',
      subtitle: 'Customer Details',
      icon: <RiContactsBookLine size={18} />,
      content: <Customer customer={customer} setCustomer={setCustomer} stepper={stepper} />
    },
    {
      id: 'Membership',
      title: 'Membership',
      subtitle: 'Membership Detail',
      icon: <RiContactsBookLine size={18} />,
      content: (
        <Membership
          dispatch={dispatch}
          membershipId={membershipId}
          getPublicMembership={getPublicMembership}
          setMembershipDetail={setMembershipDetail}
          stepper={stepper}
        />
      )
    },
    {
      id: 'payment',
      title: 'Payment',
      subtitle: 'Payment Method',
      icon: <CreditCard size={18} />,
      content: (
        <Payment
          dispatch={dispatch}
          getPublicMembership={getPublicMembership}
          membershipDetail={membershipDetail}
          stepper={stepper}
          customer={customer}
          isPaid={isPaid}
          setIsPaid={setIsPaid}
        />
      )
    }
  ];
  if (isPaid) {
    steps = [
      ...steps,
      {
        id: 'document',
        title: 'Document',
        subtitle: 'Create Document',
        icon: <CreditCard size={18} />,
        content: (
          <Document
            customer={customer}
            dispatch={dispatch}
            membershipdetail={membershipDetail}
            stepper={stepper}
          />
        )
      }
    ];
  }
  return (
    <Fragment>
      <div className="">
        <Card>
          <Row className="">
            <Col sm={4} md={4} lg={4}>
              <div className="ms-1 pb-1">
                <img src={Logo} style={{ width: '250px' }} alt="logo" />
              </div>
            </Col>
            {/* <Col sm={4} md={4} lg={4}>
              <div className="pt-2 d-flex justify-content-end ">
                <Button outline>Login</Button>
                <Button outline className="mx-1">
                  Sign Up
                </Button>
              </div>
            </Col> */}
          </Row>
        </Card>
      </div>
      <div className="p-2">
        <Row className="mx-2">
          <Col>
            <Row className="mb-1">
              <div className="ecommerce-application">
                <BreadCrumbs
                  breadCrumbTitle="Checkout"
                  breadCrumbParent="eCommerce"
                  breadCrumbActive="Membership Checkout"
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
              </div>
            </Row>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};
export default MembershipCheckout;
