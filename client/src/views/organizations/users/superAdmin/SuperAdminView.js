import React, { Fragment, useEffect, useState } from 'react';

import { Nav, NavItem, NavLink, TabContent, TabPane, Col, Row } from 'reactstrap';
import { Calendar, File, Plus, Settings, Users } from 'react-feather';

// ** STYLES
import '@styles/react/apps/app-users.scss'

import Organizations from '../../tabs/orgs/Organizations';
import { useDispatch, useSelector } from 'react-redux';
import Plans from '../../plans/Plans';
import { getOrgsAction, getPlansAction } from '../../store/action';


const SuperAdminView = () => {
  
  const [active, setActive] = useState('2');
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };


  //STORE
  const store = useSelector(state=>state.organizations)
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getOrgsAction())
    dispatch(getPlansAction())
  },[dispatch])
  return (
    <Fragment>
      <Row className='w-100'>
        <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }} >
        <Nav pills className="mb-2">
                
                <NavItem>
                  <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
                    <Plus className="font-medium-1 me-50" />
                    {/* <span className="fs-6">My Forms</span> */}
                    <span className="fs-6">Organizations</span>
                  </NavLink>
                </NavItem>
                
                <NavItem>
                  <NavLink active={active === '4'} onClick={() => toggleTab('4')}>
                    <File className="font-medium-1 me-50" />
                    <span className="fs-6">Plans</span>
                  </NavLink>
                </NavItem>
                
               
              </Nav>
  
              <TabContent activeTab={active}>
                
                <TabPane tabId="2">
                  <Organizations store={store} dispatch={dispatch}/>
                </TabPane>
               
                <TabPane tabId="4">
                <Plans dispatch={dispatch} store={store}/>
                </TabPane>
              
              </TabContent>
        </Col>
      </Row>
      
    </Fragment>
  );
};

export default SuperAdminView;
