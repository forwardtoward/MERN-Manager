// ** React Imports
import { Fragment, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
// ** Custom Components
import Wizard from '@components/wizard';
import BreadCrumbs from '@components/breadcrumbs';

// import '@styles/react/libs/react-select/_react-select.scss';
// ** Styles
import '@styles/react/apps/app-ecommerce.scss';
import { Button, Card, Col, Row } from 'reactstrap';
import Logo from '../../../../assets/images/logo/logo.png';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { getPublicProduct} from '../../store';

// ** Route
import { useParams } from 'react-router-dom';

// ** Third Party Components
import { ShoppingCart, Home, CreditCard } from 'react-feather';

// ** Steps
import Customer from './steps/Customer';
import Payment from './steps/Payment';

const Checkout = () => {
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
  const [isPaid, setIsPaid] = useState(false);

  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.shop);
  const { productId } = useParams();

  // ** Get Cart Items on mount
  useEffect(() => {
    if (productId) {
      dispatch(getPublicProduct(productId));
    }
  }, []);

  let steps;
  const [amount, setAmount] = useState(1);
  steps = [
    {
      id: 'Customer',
      title: 'Customer',
      subtitle: 'Customer Info',
      icon: <Home size={18} />,
      content: (
        <Customer
          products={[
            {
              product: store.productDetail,
              amount: amount,
              _id: store.productDetail._id
            }
          ]}
          stepper={stepper}
          customer={customer}
          setCustomer={setCustomer}
          setAmount={setAmount}
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
          products={[
            {
              product: store.productDetail,
              amount: amount,
              _id: store.productDetail._id,
              userId: store.productDetail.userId
            }
          ]}
          isPaid={isPaid}
          setIsPaid={setIsPaid}
          dispatch={dispatch}
          customer={customer}
        />
      )
    }
  ];
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
              </div>
            </Row>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};
export default Checkout;
