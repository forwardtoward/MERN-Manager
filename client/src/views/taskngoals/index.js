// ** React Imports
import { Fragment, useState, useEffect, useContext } from 'react';
// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane, Card } from 'reactstrap';
// ** Icons Imports
import {
  ArrowRightCircle,
  ChevronLeft,
  ChevronRight,
  Share,
  UserPlus,
  CheckCircle
} from 'react-feather';
import { GiRank2 } from 'react-icons/gi';
import { FiSettings } from 'react-icons/fi';
import { BsUiChecks } from 'react-icons/bs';
import { toast } from 'react-toastify';
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
import WorkspaceSidebar from './WorkspaceSidebar';
import WorkspaceTitle from '../apps/workspace';
import WorkspaceTitleBar from './WorkspaceTitlebar';
import Setting from './tabs/Setting';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkspaceApi, getSelectedWorkspaceData, addWorkspace } from '../apps/workspace/store';
import { fetchTaskListAction } from '../tasks/task-reporting/store/action';
import { fetchLabelsApi } from '../tasks/label-management/store';

// ** Styles
import '@src/assets/styles/tasks.scss';
import '@src/assets/styles/dark-layout.scss';

//import GoalList from './tabs/GoalList';
import HabitList from './tabs/HabitList';
import JournalMain from '../apps/newjournal/JournalMain';

const TaskAndGoalsTabs = () => {
  const [active, setActive] = useState('1');
  const [collapse, setCollapse] = useState(false);
  const [toggleListOrBoard, setToggleListOrBoard] = useState(true);
  const [toggleGoalHabit, setToggleGoalHabit] = useState(true);

  // ** Store Vars
  const dispatch = useDispatch();
  const goalsStore = useSelector((state) => state.goals);
  const store = useSelector((state) => {
    return {
      ...state.workspace,
      ...state.label,
      ...state.myGoals
    };
  });

  useEffect(() => {
    setActive(localStorage.getItem('TaskAndGoalsTab'));
  }, []);

  useEffect(() => {
    dispatch(fetchWorkspaceApi()).then((res) => {
      if (res.payload) {
        dispatch(getSelectedWorkspaceData(res.payload[0]._id));
      }
    });
    dispatch(fetchLabelsApi());
  }, [dispatch]);
  useEffect(() => {
    goalsStore.goalsAddSuccess && toast.success('Added Successfully');
    goalsStore.goalsDeleteSuccess && toast.success('Deleted Successfully');
    goalsStore.goalsEditSuccess && toast.success('Updated Successfully');
  }, [goalsStore]);

  const toggleTab = (tab) => {
    localStorage.setItem('TaskAndGoalsTab', tab);
    if (tab === '1') {
      let taskArea = document.getElementsByClassName('tasks-area')[0];
      taskArea.style.width = '100%';
      taskArea.style.maxWidth = '100%';
    }
    if (active !== tab) {
      setActive(tab);
    }
  };

  const setToggleLB = () => {
    setToggleListOrBoard(!toggleListOrBoard);
  };

  const setToggleGH = () => {
    setToggleGoalHabit(!toggleGoalHabit);
  };

  const handleWorkspaceCollapse = () => {
    let sidebar = document.getElementsByClassName('sidebar')[0];
    let taskArea = document.getElementsByClassName('tasks-area')[0];
    if (sidebar.style.maxWidth == '260px') {
      sidebar.style.maxWidth = 0;
      taskArea.style.maxWidth = '100%';
      taskArea.style.width = '100%';
    } else {
      sidebar.style.maxWidth = '260px';
      taskArea.style.maxWidth = 'calc(100% - 260px)';
      taskArea.style.width = 'calc(100% - 260px)';
    }
    setCollapse(!collapse);
  };

  return (
    <>
      <Row style={{ width: '100%', margin: '0px', padding: '0px' }}>
        <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }} style={{ padding: '0px' }}>
          <Fragment>
            <Nav pills className="mb-2 tab-header">
              <NavItem>
                <NavLink active={active === '5'} onClick={() => toggleTab('5')}>
                  <GiRank2 className="font-medium-1 me-50" />
                  <span className="fs-6">Journal</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
                  <GiRank2 className="font-medium-1 me-50" />
                  <span className="fs-6">Tasks</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
                  <CheckCircle className="font-medium-1 me-50" />
                  <span className="fs-6">Goals</span>
                  {/* <Link to="/goals">
                    <CheckCircle className="font-medium-1 me-50" />
                    <span className="fs-6">Goals</span>
                  </Link> */}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
                  <BsUiChecks className="font-medium-1 me-50" />
                  <span className="fs-6">Reporting</span>
                </NavLink>
              </NavItem>
            </Nav>
            <div className="tasks-border">
              {['1', '2'].includes(active) ? (
                <WorkspaceSidebar
                  collapse={collapse}
                  store={store}
                  addWorkspace={addWorkspace}
                  handleWorkspaceCollapse={handleWorkspaceCollapse}
                  dispatch={dispatch}
                />
              ) : null}
              <div
                className="tasks-area"
                style={
                  ['1', '2'].includes(active)
                    ? { maxWidth: 'calc(100% - 260px)', width: 'calc(100% - 260px)' }
                    : { maxWidth: '100%', width: '100%' }
                }
              >
                {['1', '2'].includes(active) ? (
                  <WorkspaceTitleBar
                    workspace={store.selectedWorkspace}
                    handleWorkspaceCollapse={handleWorkspaceCollapse}
                    collapse={collapse}
                    setToggle={setToggleLB}
                    toggleListOrBoard={toggleListOrBoard}
                    optionLabels={['List', 'Board']}
                    selectedTab={active}
                  />
                ) : null}
                <TabContent activeTab={active} style={{overflow: "hidden"}}>
                  <TabPane tabId="1" >
                    {toggleListOrBoard ? <TaskList store={store} /> : <TaskBoard store={store} />}
                  </TabPane>
                  <TabPane tabId="2">
                    <HabitList workspaceId={store.selectedWorkspace} store={store} />
                  </TabPane>
                  <TabPane tabId="3">
                    <TaskReporting />
                  </TabPane>

                  <TabPane tabId="5">
                    <JournalMain style={{ height: '500px' }} />
                  </TabPane>
                </TabContent>
              </div>
            </div>
          </Fragment>
        </Col>
      </Row>
    </>
  );
};
export default TaskAndGoalsTabs;
