import React, { Fragment, useEffect, useState } from 'react';

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

// ** Icons Imports
import { User, Bookmark, Archive, Settings, MapPin } from 'react-feather';

import { AiOutlineSafetyCertificate, AiOutlineFilePdf, AiOutlineHistory } from 'react-icons/ai';
import OverviewTab from './tabs/OverviewTab';
import PermissionsTab from './tabs/PermissionsTab';
import PlansTab from './tabs/PlansTab';
import SettingsTab from './tabs/SettingsTab';
import LocationTab from './tabs/LocationTab';

// ** User Components

export default function OrgTabs({ active, toggleTab, selectedOrg, dispatch,setSelectedOrg }) {
  const [plans,setPlans] = useState([])

  useEffect(()=>{
    let p = selectedOrg.plan;
    let d = selectedOrg.planDetails;
    let final = [];
    for (const i of p) {
      let details = d.find(x=>x._id===i.planId)
      let x = {...i,...details,_id:i._id,createdAt:i.createdAt,updatedAt:i.updatedAt}
      final.push(x)
    }
    setPlans(final)
  },[selectedOrg])
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <AiOutlineHistory className="font-medium-3 me-50" />
            <span className="fw-bold">Overview</span>
          </NavLink>
        </NavItem>
        {/* <NavItem>
          <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">Permissions</span>
          </NavLink>
        </NavItem> */}
        <NavItem>
          <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">Plans</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '4'} onClick={() => toggleTab('4')}>
            <MapPin className="font-medium-3 me-50" />
            <span className="fw-bold">Locations</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '5'} onClick={() => toggleTab('5')}>
            <Settings className="font-medium-3 me-50" />
            <span className="fw-bold">Settings</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <OverviewTab />
        </TabPane>
        <TabPane tabId="2">
          <PermissionsTab selectedOrg={selectedOrg} setSelectedOrg={setSelectedOrg} dispatch={dispatch} />
        </TabPane>
        <TabPane tabId="3">
          <PlansTab plans={plans}/>
        </TabPane>
        <TabPane tabId="4">
          <LocationTab dispatch={dispatch}  selectedOrg={selectedOrg} />
        </TabPane>
        <TabPane tabId="5">
          <SettingsTab selectedOrg={selectedOrg} dispatch={dispatch}  />
        </TabPane>
        <TabPane tabId="6">{/* <WorkHistoryTab {...props} /> */}</TabPane>
      </TabContent>
    </Fragment>
  );
}
