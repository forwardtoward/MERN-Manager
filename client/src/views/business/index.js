// ** React Imports
import { Fragment, useState, useEffect } from 'react';
// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane, Card } from 'reactstrap';
// ** Icons Imports
import { ArrowRightCircle, ChevronLeft, ChevronRight, Share, UserPlus } from 'react-feather';
import { GiRank2 } from 'react-icons/gi';
import { FiSettings } from 'react-icons/fi';
import { BsUiChecks } from 'react-icons/bs';
import { BsListCheck } from 'react-icons/bs';
import { MdOutlineNotifications } from 'react-icons/md';
import { RiFilePaperLine } from 'react-icons/ri';
import { Code } from 'react-feather';
import { CiCircleList } from 'react-icons/ci';
import { Button, Col, Collapse, Row } from 'reactstrap';

// ** User Components
// Todo: move tab folders to tabs folder
import Dashboard from '@src/views/business/statistics';
import Retention from '@src/views/business/retention';
import Birthday from '@src/views/business/birthday';
import Expired from '@src/views/business/expired';
import Progression from '@src/views/business/progression';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkspaceApi, getSelectedWorkspaceData, addWorkspace } from '../apps/workspace/store';
import { fetchLabelsApi } from '../tasks/label-management/store';

// ** Styles
import '@src/assets/styles/tasks.scss';
import '@src/assets/styles/dark-layout.scss';
import CalendarComponent from '../calendar';

const Statistics = () => {
  const [active, setActive] = useState('1');

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <>
      <Row >
        {/* <Row > */}
        <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }}>
          {/* <Col xl="12"> */}
          <Fragment>
            <Nav pills className="mb-2 tab-header">
              <NavItem>
                <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
                  <FiSettings className="font-medium-1 me-50" />
                  <span className="fs-6">Dashboard</span>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
                  <GiRank2 className="font-medium-1 me-50 " />
                  <span className="fs-6">Retention</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
                  <BsListCheck className="font-medium-1 me-50" />
                  <span className="fs-6">Birthday</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={active === '4'} onClick={() => toggleTab('4')}>
                  <BsListCheck className="font-medium-1 me-50" />
                  <span className="fs-6">Expired</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={active === '5'} onClick={() => toggleTab('5')}>
                  <BsListCheck className="font-medium-1 me-50" />
                  <span className="fs-6">Progression</span>
                </NavLink>
              </NavItem>
            </Nav>
            <div className="tasks-border">
              <TabContent className='w-100' activeTab={active}>
                <TabPane tabId="1">
                  <div className="overflow-hidden email-application">
                    <div className="content-overlay"></div>
                    <div className="content-area-wrapper animate__animated animate__fadeIn" style={{height: "77vh"}}>
                      <Dashboard />
                    </div>
                  </div>
                </TabPane>
                <TabPane tabId="2">
                  <div className="overflow-hidden email-application">
                    <div className="content-overlay"></div>
                    <div className="content-area-wrapper animate__animated animate__fadeIn">
                      <Retention />
                    </div>
                  </div>
                </TabPane>
                <TabPane tabId="3">
                  <div className="overflow-hidden email-application">
                    <div className="content-overlay"></div>
                    <div className="content-area-wrapper animate__animated animate__fadeIn">
                      <Birthday />
                    </div>
                  </div>
                </TabPane>
                <TabPane tabId="4">
                  <div className="overflow-hidden email-application">
                    <div className="content-overlay"></div>
                    <div className="content-area-wrapper animate__animated animate__fadeIn">
                      <Expired />
                    </div>
                  </div>
                </TabPane>
                <TabPane tabId="5">
                  <Progression />
                </TabPane>
              </TabContent>
            </div>
          </Fragment>
        </Col>
      </Row>
    </>
  );
};
export default Statistics;
