// ** React Imports
import { Fragment } from 'react';

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap';

// ** Custom Components
import StatsCard from './StatsCard';

// ** Icons Imports
import Progression from './Progression';
import MemberContracts from './MemberContracts';
import LTVChart from './LTV_Chart';

const OverviewTab = () => {
  return (
    <Fragment>
      <Row>
        <Col lg="12" sm="12">
          <StatsCard cols={{ md: '3', sm: '6', xs: '12' }} />
        </Col>
      </Row>
      <Row>
        <Col lg="12" sm="12">
          <MemberContracts />
        </Col>
      </Row>
      <Row>
        <Col lg="12" sm="12">
          <Progression id="memberRank" />
        </Col>
      </Row>
      <Row>
        <Col lg="12" sm="12">
          <LTVChart id="memberLTV" />
        </Col>
      </Row>
    </Fragment>
  );
};

export default OverviewTab;
