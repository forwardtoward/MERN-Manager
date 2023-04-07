// ** Third Party Components
import Cleave from 'cleave.js/react';
// import useMessage from '../../../../lib/useMessage';
import { Fragment } from 'react';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
} from 'reactstrap';

import Payment from './payment/Payment';

const CardPayment = (props) => {
  const {
    client,
    membershipDetail,
    dispatch,
  } = props;

  return (
    <Fragment>
      <Card>
        <CardBody className="my-1 py-25">
          <Row className="gx-4">
            <Col>
              <Payment 
                membershipDetail={membershipDetail}
                client={client}
                dispatch={dispatch}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default CardPayment;
