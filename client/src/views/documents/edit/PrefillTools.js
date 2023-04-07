import React, { useContext } from 'react';
import { CardBody } from 'reactstrap';
import BtnLine from './drags/line/BtnLine';
import BtnMembershipDuration from './drags/membersips/duration/BtnMembershipDuration';
import BtnMembershipDurationType from './drags/membersips/durationType/BtnMembershipDurationType';
import BtnMembershipName from './drags/membersips/name/BtnMembershipName';
import BtnMembershipType from './drags/membersips/membershipType/BtnMembershipType';
import BtnMembershipAmount from './drags/membersips/amount/BtnMembershipAmount';
import BtnMembershipBalance from './drags/membersips/balance/BtnMembershipBalance';
import BtnMembershipDesc from './drags/membersips/description/BtnMembershipDesc';
import BtnMembershipDownPay from './drags/membersips/downPayment/BtnMembershipDownPay';
import BtnMembershipFreequency from './drags/membersips/frequency/BtnMembershipFreequency';
import BtnMembershipPaymentCount from './drags/membersips/paymentCount/BtnMembershipPaymentCnt';
import BtnMembershipTotal from './drags/membersips/totalPrice/BtnMembershipTotalPrice';
import { DocumentContext } from '../../../utility/context/Document';

export default function PrefillTools() {
  const { isTemplate, templateType } = useContext(DocumentContext);
  return (
    <CardBody style={{ minHeight: '100vh' }}>
      <h5 className="text-start">Prefill Tools</h5>
      <BtnLine />
      {isTemplate === true && templateType === 'contract' && (
        <>
          <hr />
          <h6 className="text-start">Membership Contract Fields</h6>
          <BtnMembershipName />
          <BtnMembershipType />
          <BtnMembershipDuration />
          <BtnMembershipDurationType />
          <BtnMembershipAmount />
          <BtnMembershipBalance />
          <BtnMembershipDesc />
          <BtnMembershipDownPay />
          <BtnMembershipFreequency />
          <BtnMembershipPaymentCount />
          <BtnMembershipTotal />
        </>
      )}
    </CardBody>
  );
}
