// ** React Imports
import { Fragment} from 'react';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
} from 'reactstrap';

import Payment from './payment/Payment';

const CardPayment = (props) => {
  // ** Props
  const { total, products, client, dispatch, isCart, isPaid, setIsPaid } = props;

  return (
    <Fragment>
      <Card>
        <CardBody className="my-1 py-25">
          <Row className="gx-4">
            <Col>
              <Payment 
                products={products}
                total_price={total}
                isCart={isCart}
                client={client}
                dispatch={dispatch}
                isPaid={isPaid}
                setIsPaid={setIsPaid}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default CardPayment;
