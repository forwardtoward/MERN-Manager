// ** React Imports
import { Fragment, useState, useEffect } from 'react';
// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane, Card, ButtonGroup } from 'reactstrap';
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
import TaskReporting from './tabs/TaskReporting';
import TaskList from './tabs/TaskList';
import TaskBoard from './tabs/TaskBoard';
import TaskTable from '../leadsTable';
import TaskManagement from './tabs/TaskManagement';
import LeadSourcesSidebar from './LeadSourcesSidebar';
import WorkspaceTitleBar from './WorkspaceTitlebar';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchWorkspaceApi,
  getSelectedWorkspaceData,
  addWorkspace
} from '@src/views/apps/workspace/store';
import { fetchLabelsApi } from '../tasks/label-management/store';

// ** Styles
import '@src/assets/styles/tasks.scss';
import '@src/assets/styles/dark-layout.scss';

const TaskAndGoalsTabs = ({ store: leadStore }) => {
  const [active, setActive] = useState('2');
  const [activeSidebar, setActiveSidebar] = useState('1');
  const [previousSidebar, setPreviousSidebar] = useState('');

  const [collapse, setCollapse] = useState(false);
  // ** Store Vars
  const dispatch = useDispatch();

  const store = useSelector((state) => {
    return {
      ...state.workspace,
      ...state.label
    };
  });

  useEffect(() => {
    dispatch(fetchWorkspaceApi()).then((res) => {
      if (res && res.payload && res.payload.length > 0) {
        dispatch(getSelectedWorkspaceData(res.payload[0]._id));
      }
    });
    dispatch(fetchLabelsApi());
  }, [dispatch]);

  useEffect(() => {
    setPreviousSidebar(activeSidebar);
  }, [activeSidebar]);

  const handleWorkspaceCollapse = () => setCollapse(!collapse);

  const clientStore = useSelector((state) => {
    return {
      tags: state.totalContacts.tags,
      leadSources: state.totalContacts.leadSource
    };
  });

  const toggleTab = (tab) => {
    if (activeSidebar !== tab) {
      setActiveSidebar(tab);
    }
  };

  const activeLeadSource = clientStore?.leadSources?.find(
    (tag, index) => (index + 1).toString() === activeSidebar
  );

  const previousLeadSource = clientStore?.leadSources?.find(
    (tag, index) => (index + 1).toString() === previousSidebar
  );

  return (
    <>
      <Row style={{ width: '100%', margin: '0px', padding: '0px' }}>
        <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }} style={{ padding: '0px' }}>
          <Card className="mb-0">
            {/* <Nav pills className="mb-2 tab-header"> */}
            {/* <NavItem>
                <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
                  <FiSettings className="font-medium-1 me-50" />
                  <span className="fs-6">Task Reporting</span>
                </NavLink>
              </NavItem> */}

            {/* <NavItem>
                <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
                  <GiRank2 className="font-medium-1 me-50" />
                  <span className="fs-6">Lead List</span>
                </NavLink>
              </NavItem> */}

            {/* <NavItem>
                <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
                  <BsUiChecks className="font-medium-1 me-50" />
                  <span className="fs-6">Lead Board</span>
                </NavLink>
              </NavItem> */}

            {/* <ButtonGroup>
                <Button
                  color='primary'
                  active={active == "2"}
                  onClick={(e) => setActive("2")}
                >
                  List View
                </Button>
                <Button
                  color='primary'
                  active={active == "3"}
                  onClick={(e) => setActive("3")}
                >
                  Board View
                </Button>
              </ButtonGroup> */}

            {/* <NavItem>
                <NavLink active={active === '4'} onClick={() => toggleTab('4')}>
                  <BsListCheck className="font-medium-1 me-50" />
                  <span className="fs-6">Task Management</span>
                </NavLink>
              </NavItem> */}
            {/* </Nav> */}
            <Row>
              <Col md={2} style={{ borderRight: '1px solid #ebe9f1' }}>
                <LeadSourcesSidebar
                  toggleTab={toggleTab}
                  collapse={collapse}
                  active={activeSidebar}
                  clientStore={clientStore}
                />
              </Col>
              <Col md={10}>
                <Card>
                  <WorkspaceTitleBar
                    activeLeadName={activeLeadSource || previousLeadSource}
                    handleWorkspaceCollapse={handleWorkspaceCollapse}
                    collapse={collapse}
                    active={active}
                    setActive={setActive}
                  />
                  <TabContent activeTab={active}>
                    <TabPane tabId="1">
                      <TaskReporting />
                    </TabPane>
                    <TabPane tabId="2">
                      <TaskTable store={store} leadStore={leadStore} />
                    </TabPane>
                    <TabPane tabId="3">
                      <TaskBoard store={store} />
                    </TabPane>
                    <TabPane tabId="4">
                      <TaskManagement />
                    </TabPane>
                  </TabContent>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default TaskAndGoalsTabs;
