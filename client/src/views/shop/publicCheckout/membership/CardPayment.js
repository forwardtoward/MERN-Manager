// ** Third Party Components
import Cleave from 'cleave.js/react';
import useMessage from '../../../../lib/useMessage';
import { useSelector } from 'react-redux';
import { Fragment, useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Check, X } from 'react-feather';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  Badge,
  Label,
  Input,
  Button,
  CardBody,
  CardTitle,
  ModalBody,
  CardHeader,
  InputGroup,
  ModalHeader,
  FormFeedback,
  InputGroupText
} from 'reactstrap';

// ** Card Images
import jcbCC from '@src/assets/images/icons/payments/jcb-cc.png';
import amexCC from '@src/assets/images/icons/payments/amex-cc.png';
import uatpCC from '@src/assets/images/icons/payments/uatp-cc.png';
import visaCC from '@src/assets/images/icons/payments/visa-cc.png';
import dinersCC from '@src/assets/images/icons/payments/diners-cc.png';
import maestroCC from '@src/assets/images/icons/payments/maestro-cc.png';
import discoverCC from '@src/assets/images/icons/payments/discover-cc.png';
import mastercardCC from '@src/assets/images/icons/payments/mastercard-cc.png';

const cardsObj = {
  jcb: jcbCC,
  uatp: uatpCC,
  visa: visaCC,
  amex: amexCC,
  diners: dinersCC,
  maestro: maestroCC,
  discover: discoverCC,
  mastercard: mastercardCC
};

import { checkoutPublicMembership } from '../../store';
import { validateMembership } from '../../../../utility/Utils';

const CardPayment = (props) => {
  const { customer, total, membershipDetail, dispatch, isPaid, setIsPaid } = props;
  const [status, setStatus] = useState(false);
  const [cardType, setCardType] = useState('');
  const [isloading, setLoadingStatus] = useState(false);

  const [card, setCard] = useState({
    _id: '',
    cardType: '',
    isPrimary: false,
    cardHolder: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const [state, setState] = useState({
    holderName: '',
    cardNumber: 0,
    expiryDate: '',
    cvv: ''
  });

  const { error, success } = useMessage();

  function detectCardType(number) {
    var re = {
      electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
      maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
      dankort: /^(5019)\d+$/,
      interpayment: /^(636)\d+$/,
      unionpay: /^(62|88)\d+$/,
      visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      mastercard: /^5[1-5][0-9]{14}$/,
      amex: /^3[47][0-9]{13}$/,
      diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
      discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
      jcb: /^(?:2131|1800|35\d{3})\d{11}$/
    };
    for (var key in re) {
      if (re[key].test(number)) {
        return key;
      }
    }
    return 'unknown';
  }

  const checkoutMembershipByCard = (card, customer, total) => {

    delete membershipDetail._id
    
    const data = {
      type: 'card',
      cardType: card.cardType,
      cardHolder: card.cardHolder,
      cardNumber: card.cardNumber,
      expiryDate: card.expiryDate,
      cvv: card.cvv,
      membership: membershipDetail,
      total: total,
      email: customer.email,
      name: customer.name,
      phone: customer.phone,
      isSave: customer.isSave,
      userId: membershipDetail.userId,
    };
    dispatch(checkoutPublicMembership(data)).then((res, err) => {
      setLoadingStatus(false);
      if (res && res.payload) {
        const result = res.payload.data;
        if (result.status === 'success') {
          setIsPaid(true);
          setStatus(true);
          success('payment successfully done.');
        } else {
          const msg = result.msg;
          error(msg);
        }
      }
    });
  };

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      cardInput: ''
    }
  });

  const onSubmit = (data) => {
    if (data.cardInput.length <= 0) {
      setError('cardInput', {
        type: 'manual',
        message: 'Please Enter Valid Card Number'
      });
    }
  };

  const submitHandler = () => {
    if (isPaid) {
      return;
    }
    const err = validateMembership(membershipDetail);
    if (Object.keys(err).length) {
      error('membership info mush be correct.');
      return;
    } else {
      if (customer.name === '') {
        error('customer name must not be empty!');
        return;
      }
      if (customer.email === '') {
        error('customer email must not be empty!');
        return;
      }
      if (card.cardHolder === '') {
        error('holder name must not be empty!');
        return;
      }
      if (card.cardNumber === 0) {
        error('card number must not be empty!');
        return;
      }
      if (card.expiryDate === '') {
        error('expiry date must not be empty!');
        return;
      }
      if (card.cvv === '') {
        error('cvv must not be empty!');
        return;
      }
      setLoadingStatus(true);
      checkoutMembershipByCard(card, customer, total);
      setCard({
        _id: '',
        cardType: '',
        isPrimary: false,
        cardHolder: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
      });
    }
  };
  return (
    <Fragment>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">Input card info</CardTitle>
        </CardHeader>
        <CardBody className="my-1 py-25">
          <Row className="gx-4">
            <Col>
              <Row tag={Form} className="gx-2 gy-1" onSubmit={handleSubmit(onSubmit)}>
                <Fragment>
                  <Row
                    tag={Form}
                    className="gy-1 gx-2 mt-75"
                    // onSubmit={handleSubmit(onSubmit)}
                  >
                    <Col xs={12}>
                      <Label className="form-label" for="credit-card">
                        Card Number
                      </Label>
                      <InputGroup className="input-group-merge">
                        <Input
                          id="credit-card"
                          placeholder="1356 3215 6548 7898"
                          value={card.cardNumber}
                          onChange={(e) => {
                            setCardType(String(detectCardType(parseInt(e.target.value))));
                            setCard((p) => ({
                              ...p,
                              cardNumber: e.target.value,
                              cardType: String(detectCardType(parseInt(e.target.value)))
                            }));
                          }}
                        />
                        {/* {cardType !== '' && cardType !== 'unknown' ? (
                          <InputGroupText className="cursor-pointer">
                            <img height="24" alt="card-type" src={cardsObj[cardType]} />
                          </InputGroupText>
                        ) : null} */}
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <Label className="form-label" for="card-name">
                        Name On Card
                      </Label>
                      <Input
                        value={card.cardHolder}
                        onChange={(e) => {
                          setCard((p) => ({
                            ...p,
                            cardHolder: e.target.value
                          }));
                        }}
                        id="card-name"
                        placeholder="John Doe"
                        // defaultValue={selectedCondition ? selected.name : ''}
                      />
                    </Col>
                    <Col xs={6} md={3}>
                      <Label className="form-label" for="exp-date">
                        Exp. Date
                      </Label>
                      <Cleave
                        id="exp-date"
                        placeholder="MM/YY"
                        className="form-control"
                        options={{ delimiter: '/', blocks: [2, 2] }}
                        value={card.expiryDate}
                        onChange={(e) => {
                          setCard((p) => ({
                            ...p,
                            expiryDate: e.target.value
                          }));
                        }}
                      />
                    </Col>
                    <Col xs={6} md={3}>
                      <Label className="form-label" for="cvv">
                        CVV
                      </Label>
                      <Cleave
                        id="cvv"
                        placeholder="654"
                        className="form-control"
                        options={{ blocks: [3] }}
                        value={card.cvv}
                        onChange={(e) => {
                          setCard((p) => ({
                            ...p,
                            cvv: e.target.value
                          }));
                        }}
                      />
                    </Col>
                  </Row>
                </Fragment>
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
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default CardPayment;
