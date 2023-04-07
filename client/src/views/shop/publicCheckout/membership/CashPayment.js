import { useState } from 'react';

// ** Reactstrap Imports
import { Form, Label, Input, Button, Row, Col } from 'reactstrap';
import useMessage from '../../../../lib/useMessage';
import { checkoutPublicMembership } from '../../store';
import { validateMembership } from '../../../../utility/Utils';
const CashPayment = (props) => {
  const { customer, total, membershipDetail, dispatch, isPaid, setIsPaid } = props;
  const [selectedMethod, setSelectedMethod] = useState('cash');
  const [isloading, setLoadingStatus] = useState(false);
  const [cashNumber, setCashNumber] = useState('');
  const [state, setState] = useState({
    chequenumber: ''
  });
  const { error, success } = useMessage();
  const submitHandler = () => {
    if (selectedMethod === 'cheque') {
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
    const err = validateMembership(membershipDetail);
    if (Object.keys(err).length) {
      error('membership info mush be correct.');
      return;
    } 
    
    if (!isPaid) {
      setLoadingStatus(true);
      checkoutMembershipByCard();
    }
  };

  const checkoutMembershipByCard = () => {
    
    delete membershipDetail._id

    const data = {
      pay_type: selectedMethod,
      holderName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cashNumber: cashNumber,
      membership: membershipDetail,
      email: customer.email,
      name: customer.name,
      phone: customer.phone,
      isSave: customer.isSave,
      userId: membershipDetail.userId,
      total_price: total
    };
    dispatch(checkoutPublicMembership(data)).then((res, err) => {
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
      }
    });
  };

  return (
    <div className="card-payment">
      <Form className="form">
        <Row>
          <Label className="form-label mb-1" for="payment-input-name">
            Choose a payment method
          </Label>
          <Col sm="12" className="mb-3">
            <div className="d-flex">
              <div className="form-check me-3">
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
                  value="cheque"
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  id="ex1-inactive"
                />
                <Label className="form-check-label" for="ex1-inactive">
                  Check
                </Label>
              </div>
            </div>
          </Col>
          {selectedMethod && selectedMethod === 'cheque' ? (
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

          <div className=" row justify-content-center mt-3">
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
