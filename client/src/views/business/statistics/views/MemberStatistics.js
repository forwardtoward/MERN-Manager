import React from 'react';
import IncomeChart from '../chart/MemberThinkerChart';
import { Card } from 'reactstrap';

function MemberStatistics() {
  return (
    <Card style={{height: "74vh"}}>
      <IncomeChart />
    </Card>
  );
}

export default MemberStatistics;
