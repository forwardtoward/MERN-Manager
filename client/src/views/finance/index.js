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
import Invoice from '@src/views/finance/invoice/list';
import Income from '@src/views/finance/income';
import Expense from '@src/views/finance/expense';
import ProfitAndLoss from '@src/views/finance/pnl';

import PerfectScrollbar from 'react-perfect-scrollbar';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkspaceApi, getSelectedWorkspaceData, addWorkspace } from '../apps/workspace/store';
import { fetchLabelsApi } from '../tasks/label-management/store';

// ** Styles
import '@src/assets/styles/tasks.scss';
import '@src/assets/styles/dark-layout.scss';
import CalendarComponent from '../calendar';

const Finanace = () => {
  const [active, setActive] = useState('1');

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <>
      <Row>
        {/* <Row > */}
        <Col xs={{ order: 0 }} md={{ order: 1, size: 12 }}>
          {/* <Col xl="12"> */}
          <Fragment>
            <Nav pills className="mb-2 tab-header">
              <NavItem>
                <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
                  <FiSettings className="font-medium-1 me-50 " />
                  <span className="fs-6">Invoice</span>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
                  <GiRank2 className="font-medium-1 me-50" />
                  <span className="fs-6">Income</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
                  <BsListCheck className="font-medium-1 me-50" />
                  <span className="fs-6">Expense</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={active === '4'} onClick={() => toggleTab('4')}>
                  <BsListCheck className="font-medium-1 me-50" />
                  <span className="fs-6">Profit & Loss</span>
                </NavLink>
              </NavItem>
            </Nav>

            {/* <div className="sidebar-menu-list ">
              <TabContent className='w-100' activeTab={active}>
                <TabPane tabId="1">
                  <Invoice />
                </TabPane>
              </TabContent>
            </div> */}

            <TabContent className="w-100" activeTab={active}>
              <TabPane tabId="1">
                <Invoice />
              </TabPane>
              <TabPane tabId="2">
                <Income />
              </TabPane>
              <TabPane tabId="3">
                <Expense />
              </TabPane>
              <TabPane tabId="4">
                <ProfitAndLoss />
              </TabPane>
            </TabContent>
          </Fragment>
        </Col>
      </Row>
    </>
  );
};
export default Finanace;
