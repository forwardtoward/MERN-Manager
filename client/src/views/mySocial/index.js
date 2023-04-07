import React, { Fragment, useState } from 'react';
import { Nav, NavItem, TabContent, TabPane, NavLink } from 'reactstrap';
import BreadCrumbs from '../../@core/components/breadcrumbs';

import SocialConnectMain from '../marketing/SocialConnect';
import SocialProof from './../SocialProof';
import Reputation from './../apps/reputation';

export default function index() {
  const [active, setActive] = useState('1');
  const [title, setTitle] = useState('Project Manager');
  return (
    <Fragment>
      <div
        className="social"
        style={{ display: 'inline', width: '100%', overflow: 'auto', padding: '0px 20px 0px 0px' }}
      >
        <BreadCrumbs
          breadCrumbTitle="Business Tools"
          breadCrumbParent="Business Tools"
          breadCrumbActive={title}
        />
        <Nav pills>
          <NavItem>
            <NavLink
              active={active === '1'}
              onClick={() => {
                setActive('1');
                setTitle('Social Connect');
              }}
            >
              Social Connect
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={active === '2'}
              onClick={() => {
                setActive('2');
                setTitle('Social Proof');
              }}
            >
              Social Proof
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={active === '3'}
              onClick={() => {
                setActive('3');
                setTitle('Reputation');
              }}
            >
              Reputation
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={active}>
          <TabPane tabId="1">
            <SocialConnectMain />
          </TabPane>
          <TabPane tabId="2">
            <SocialProof />
          </TabPane>
          <TabPane tabId="3">
            <Reputation />
          </TabPane>
        </TabContent>
      </div>
    </Fragment>
  );
}
