import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { getOrgByIdAction, getOrgsAction, getPlansAction } from './../../store/action';
import OrgAdminCard from './components/OrgAdminCard';
import OrgInfoCard from './components/OrgInfoCard';
import OrgStatus from './components/OrgStatus';
import OrgTabs from './components/OrgTabs';

export default function OrgDetails() {
  const [org, setOrg] = useState(null);
  const [active, setActive] = useState('1');

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  // ** Storage
  const store = useSelector((state) => state.organizations);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getOrgByIdAction(id)).then((data) => {
      if(data){
        if (data[0] !== null) {
          let plans = [];
          for (const p of data[0].planDetails) {
            plans.push({
              ...p,
              createdAt: data[0].plan.find((x) => x.planId === p._id)?.createdAt,
              updatedAt: data[0].plan.find((x) => x.planId === p._id)?.updatedAt,
              isSubscribed: data[0].plan.find((x) => x.planId === p._id)?.isSubscribed,
              organizationId: data[0].plan.find((x) => x.planId === p._id)?.organizationId,
              status: data[0].plan.find((x) => x.planId === p._id)?.status,
              startDate: data[0].plan.find((x) => x.planId === p._id)?.startDate,
              expireDate: data[0].plan.find((x) => x.planId === p._id)?.expireDate,
              paymentInfo: data[0].plan.find((x) => x.planId === p._id)?.paymentInfo
            });
          }
          setOrg({ ...data[0], plans: plans });
        }
      }

    });
    //dispatch(getOrgsAction());
  }, [id, dispatch]);

  useEffect(()=>{
    dispatch(getOrgsAction())
    dispatch(getPlansAction())
  },[dispatch])

  return (
    <div className="app-user-view w-100">
      <Row>
        {org && org !== null && (
          <>
            <Col xl="4" lg="5">
              <OrgInfoCard selectedOrg={org} />
              <OrgAdminCard selectedOrg={org} dispatch={dispatch}/>
              <OrgStatus cols={{ md: '6', sm: '6', xs: '12' }} selectedOrg={org} dispatch={dispatch}/>
            </Col>
            <Col xl="8" lg="7">
              {store && <OrgTabs
                selectedOrg={org}
                active={active}
                toggleTab={toggleTab}
                dispatch={dispatch}
                store={store}
                setSelectedOrg={setOrg}
              />}
            </Col>
          </>
        )}
      </Row>
    </div>
  );
}
