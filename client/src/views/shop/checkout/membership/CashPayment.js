import { useState } from 'react';

// ** Reactstrap Imports
import { Form, Label, Input, Button, Row, Col } from 'reactstrap';
import useMessage from '../../../../lib/useMessage';
import { updateMembership } from '../../store';
import { validateMembership } from '../../../../utility/Utils';
const CashPayment = (props) => {
  const { client, total, membershipDetail, dispatch, setIsPaid, isPaid,setCheckoutDetails,checkoutDetails } = props;
  const [selectedMethod, setSelectedMethod] = useState();
  const [status, setStatus] = useState(false);
  const [state, setState] = useState({
    chequenumber: ''
  });
  const { error, success } = useMessage();
  const [isloading, setLoadingStatus] = useState(false);

  const submitHandler = () => {
    if (isPaid) {
      return;
    }
    if (client == null) {
      error('contact address must not be empty!');
      return;
    }
    if (selectedMethod === '') {
      error('payment type must not be empty!');
      return;
    }
    if (selectedMethod === 'cheque' && state.chequenumber === '') {
      error('checue number must not be empty!');
      return;
    }
    const err = validateMembership(membershipDetail);
    if (Object.keys(err).length) {
      error('membership information must not be correct!');
      return;
    } else {
      setLoadingStatus(true);
      const membership_detail = { ...membershipDetail, cheque_no: state.chequenumber };
      const data = {
        type: selectedMethod,
        holderName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        contact: client._id,
        membership: membership_detail,
        total: total,
        email: client.email,
        name: client.label
      };
      dispatch(updateMembership(data)).then((res, err) => {
        setLoadingStatus(false);
        if (res && res.payload) {
          const result = res.payload.data;

          if (result.status === 'success') {
            setIsPaid(true);
            setStatus(true);
            success('payment successfully done.');
            setCheckoutDetails({...checkoutDetails, membership:result.data})
          } else {
            setLoadingStatus(false);
            const msg = result.msg;
            error(msg);
          }
        }
      });
    }
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
              <div className="form-check me-5">
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
                onChange={(e) => {
                  setState((p) => ({
                    ...p,
                    type: 'check',
                    chequenumber: e.target.value
                  }));
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
