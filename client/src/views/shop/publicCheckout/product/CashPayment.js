import { useState } from 'react';

// ** Reactstrap Imports
import { Form, Label, Input, Button, Row, Col } from 'reactstrap';

import { checkoutPublicProduct } from '../../store';

import useMessage from '../../../../lib/useMessage';

const CashPayment = (props) => {
  const [selectedMethod, setSelectedMethod] = useState('cash');
  const { total, products, dispatch, customer, isPaid, setIsPaid } = props;
  const [isloading, setLoadingStatus] = useState(false);
  const [cashNumber, setCashNumber] = useState('');
  const { error, success } = useMessage();

  const submitHandler = () => {
    if (selectedMethod === 'check') {
      if (cashNumber === '') {
        error('CashNumber must not be empty!');
        return;
      }
    }
    if (customer.name === '') {
      error('Coustomer Info must not be empty!');
      return;
    }
    if (customer.email === '') {
      error('Coustomer Info must not be empty!');
      return;
    }
    setLoadingStatus(true);
    checkoutProductByCard();
  };

  const checkoutProductByCard = () => {
    const currentDate = new Date();
    const productsInfo = products.map((item) => {
      let product = {
        product_name: item.product.product_name,
        product_price: item.product.product_price,
        amount: item.amount
      };
      return product;
    });

    const buyProductDetail = {
      isEMI: true,
      productsInfo,
      pay_time: currentDate
    };

    const data = {
      pay_type: selectedMethod,
      holderName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cashNumber: cashNumber,
      productDetail: buyProductDetail,
      email: customer.email,
      name: customer.name,
      phone: customer.phone,
      isSave: customer.isSave,
      userId: products[0]?.product?.userId,
      total_price: total
    };

    dispatch(checkoutPublicProduct(data)).then((res) => {
      setLoadingStatus(false);
      if (res && res.payload) {
        const result = res.payload.data;
        if (result.status === 'success') {
          setIsPaid(true);
          success('payment successfully done.');
        } else {
          const msg = result.msg;
          error(msg);
        }
      } else if (res.error) {
        error('Something went wrong');
      }
    });
  };

  return (
    <div className="card-payment">
      <Form className="form" onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Label className="form-label mb-1" for="payment-input-name">
            Choose a payment method
          </Label>
          <Col sm="12" className="mb-3">
            <div className="d-flex">
              <div className="form-check mb-2 me-5">
                <Input
                  type="radio"
                  id="ex1-active"
                  name="ex1"
                  value="cash"
                  defaultChecked="true"
                  onChange={(e) => setSelectedMethod(e.target.value)}
                />
                <Label className="form-check-label" for="ex1-active">
                  Cash
                </Label>
              </div>
              <div className="form-check">
                <Input
                  type="radio"
                  name="ex1"
                  value="check"
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  id="ex1-inactive"
                />
                <Label className="form-check-label" for="ex1-inactive">
                  Check
                </Label>
              </div>
            </div>
          </Col>
          {selectedMethod && selectedMethod === 'check' ? (
            <Col sm="12" className="mb-2">
              <Label className="form-label" for="payment-input-name">
                Check Number
              </Label>
              <Input
                placeholder="Type the cheque number here"
                id="payment-input-name"
                value={cashNumber}
                onChange={(e) => {
                  setCashNumber(e.target.value);
                }}
              />
            </Col>
          ) : (
            <></>
          )}

          <div className=" row justify-content-center">
            <Col className="d-grid" sm="4">
              <Button
                color={isPaid ? 'success' : 'primary'}
                className="me-1"
                disabled={isloading}
                onClick={submitHandler}
              >
                {isloading ? 'Processing...' : isPaid ? 'Paid' : 'Pay Now'}
              </Button>
            </Col>
          </div>
        </Row>
      </Form>
    </div>
  );
};

export default CashPayment;
