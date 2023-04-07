import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import {
  Button,
  Col,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  Progress,
  Row,
  TabContent,
  TabPane
} from 'reactstrap';
// ** CUSTOM COMPONENTS
import Calendar from '../components/Calendar';
import { convertDate } from '../helpers/converters';
import { generateDate } from '../helpers/generate';
import { calculateStreak } from '../helpers/calculateStreak';
import RecordHabit from './RecordHabit';
import './../../../assets/styles/goals.scss';
import './../../../assets/styles/task-list.scss';
import { X } from 'react-feather';
import AddGoal from '../goal-view/AddGoal';
import EditGoal from '../goal-view/EditGoal';
import { setGoalsReducer } from '../store/reducer';
import ActionPlanTab from './../goal-view/details/tabs/ActionPlanTab'
import GoalRecord from '../goal-list/GoalRecord';
import SettingsTab from './SettingsTab';
import HabitActionPlanTab from './ActionPlanTab';
import { useSelector } from 'react-redux';
import { calculatePerGoal, calculateScore, goalProgress } from '../helpers/goalCalculators';
export default function HabitDetails({ toggle, open, closeMain, task, dispatch, store, workspaceId,subHabit}) {
  // ** STATEs
  const subGoalsList = useSelector((state) => state.goals.subGoalsList);
  const [isHabitRecordOpen, setIsHabitRecordOpen] = useState(false);
  const [tab, setTab] = useState('1');
  const [selectedTask, setSelectedTask] = useState();
  const [disable, setDisable] = useState(false);
  const [fullDate, setFullDate] = useState(null);
  // ** TOGGLE
  const toggleHabitRecord = (task, fullDate) => {
    setFullDate(fullDate)
    setIsHabitRecordOpen(!isHabitRecordOpen);
  }
  // ** DATA CONNECTION
  // ** FUNCTIONS
  const handleStatusClicked = () => {
    const temp = selectedTask;
    setSelectedTask({ ...selectedTask, progress: temp.progress + 1 });
    const t = store.goals.map((x) => {
      if (x._id === selectedTask._id) {
        return { ...selectedTask, progress: temp.progress + 1 };
      }
      return x;
    });
    dispatch(setGoalsReducer(t));
  };
  useEffect(() => {
    if (selectedTask) {

      if (selectedTask.progress === selectedTask.total) {
        setDisable(true);
      }
      else {
        setDisable(false);
      }
    }
  }, [selectedTask]);
  useEffect(() => {
    if (task) {
      setSelectedTask(task);
    }
  }, [task]);
  // ** CHART OPTIONS
  const options = {
    chart: {
      sparkline: {
        enabled: false
      }
    },
    // width: '400px',
    // height:'400px',
    colors: ['#7367f0'],
    plotOptions: {
      radialBar: {
        offsetY: 0,
        // startAngle: -120,
        // endAngle: 200,
        hollow: {
          size: '70%'
        },
        dataLabels: {
          name: {
            show: true,
            color: '#4F4F4F',

            fontSize: '0.8em',
            offsetY: -17
          },

          value: {
            show: true,
            color: '#7367f0',

            fontSize: '1.4em',

            offsetY: -10
          }
        }
      }
    },
    stroke: {
      lineCap: 'round'
    },
    labels: [`Goal Met`]
  };
  const series = [75];
  const generateSeries=(task,option)=>
  {
    const number=parseInt(task?.actionPlans?.length)/parseInt(task?.repetition)*100
    const shortNumber=parseInt(number,10)
    const arr=[shortNumber]
    return (
      option?arr:shortNumber
    )
  }
  return (
    <Offcanvas
      scrollable
      offcanvasClassName="offCanvas"
      toggle={() => {
        toggle(!open);
      }}
      direction="end"
      isOpen={open}
      className="border-start shadow offcanvas"
    >
      {selectedTask && (
        <>
          <OffcanvasBody className="p-0">
            <>
              <div className="bg-light py-50">
                <div className="d-flex justify-content-between">
                  <Nav tabs className="my-auto">
                    <NavItem>
                      <NavLink active={tab === '1'} onClick={() => setTab('1')}>
                        RECORD
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink active={tab === '3'} onClick={() => setTab('3')}>
                        HISTORY
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink active={tab === '4'} onClick={() => setTab('4')}>
                        SETTING
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <Button color="link" onClick={() => toggle(!open)}>
                    <X />
                  </Button>
                </div>
              </div>
              <TabContent activeTab={tab} >
                <TabPane tabId="1">
                  {task.type === 'target' && (
                    <>
                      <div className='mt-50'>
                        <div className="px-1"></div>
                        <div className="d-flex justify-content-between bg-light-secondary p-1">
                          <h5 className="py-0 my-0">
                            Goal Type : <span className="text-primary">TARGET</span>
                          </h5>
                          <h5 className="py-0 my-0">
                            Sub Goals: <span className="text-primary">{subGoalsList?.length || 0}</span>
                          </h5>
                        </div>
                        <div className="d-flex w-100 justify-content-between  p-1">
                          <div>
                            <h5>Category </h5>
                            <span className="text-primary d-block text-center">{workspaceId?.title}</span>
                          </div>
                          {/* <div>
                            <h5>Current</h5>
                            <span className="text-primary d-block text-center">System</span>
                          </div> */}
                          <div>
                            <h5>Goal Met</h5>
                            <span className="text-primary d-block text-center">{subGoalsList&&goalProgress(subGoalsList)}</span>
                          </div>
                        </div>
                        <div className="d-flex w-100 justify-content-between bg-light-secondary p-1">
                          <h5 className='my-0 py-0'>
                            Start Date:{' '}
                            <span className="text-primary">
                              {task && convertDate(task?.startDate)}
                            </span>
                          </h5>
                          <h5 className='my-0 py-0'>
                            End Date:{' '}
                            <span className="text-primary">{task && convertDate(task?.endDate)}</span>
                          </h5>
                        </div>
                        <div className="p-1">
                          <h5 className="text-primary">Goal Type Daily</h5>
                          <Row>
                            <Col sm="7" className="my-auto mx-0 px-0">
                              <div>
                                <Chart
                                  width="100%"
                                  options={options}
                                  series={subGoalsList.length>=1?calculatePerGoal(subGoalsList,"chart"):[0]}
                                  type="radialBar"
                                  height="100%"
                                />
                              </div>
                            </Col>
                            <Col sm="5" className="mx-0 px-0">
                              <h6 style={{ paddingRight: '2px' }}>GOAL STATISTICS</h6>
                              <h6>
                                <span className="text-primary">{task?.progress} </span>
                                <span className="text-secondary">DAYS</span>
                              </h6>
                              <hr />
                              <h5>ACCOMPLISHMENT</h5>
                              <h5>
                                {/* <span className="text-primary">{task?.total}</span>{' '} */}
                                <span className="text-secondary">Accomplished in 20 days</span>
                              </h5>
                            </Col>
                          </Row>
                        </div>
                        <div className="d-flex justify-content-between p-1 bg-light">
                          <h5 className='my-0 py-0'>
                            COMPLETION : <span className="text-primary">{subGoalsList&&calculatePerGoal(subGoalsList)}%</span>
                          </h5>
                          <h5 className='my-0 py-0'>
                            SCORE : <span className="text-primary">{subGoalsList&&calculateScore(subGoalsList)}</span>
                          </h5>
                        </div>
                      </div>
                      <GoalRecord workspaceId={workspaceId._id}  subHabit={subHabit} task={task} store={store} dispatch={dispatch} row={selectedTask} />
                    </>
                  )}
                  {task.type === 'habit' && (
                    <>
                      <div className="px-1 pt-50">
                        {task && (
                          <div>
                            <Calendar toggleHabitRecord={toggleHabitRecord} task={task} />
                          </div>
                        )}
                      </div>
                      <div className='mt-50'>
                        <div className="px-1"></div>
                        <div className="d-flex justify-content-between bg-light-secondary p-1">
                          <h5 className="py-0 my-0">
                            Habit : <span className="text-primary">{task?.name}</span>
                          </h5>
                          <h5 className="py-0 my-0">
                            {/* Sub Goal: <span className="text-primary">{task?.subGoals?.length || 0}</span> */}
                          </h5>
                        </div>
                        <div className="d-flex w-100 justify-content-between  p-1">
                          <div>
                            <h5>Category </h5>
                            <span className="text-primary d-block text-center">{task?.frequency}</span>
                          </div>
                          {/* <div>
                            <h5>Current</h5>
                            <span className="text-primary d-block text-center">System</span>
                          </div> */}
                          <div>
                            <h5>Current Status</h5>
                            <span className="text-primary d-block text-center">{task?.actionPlans?.length}/{task?.repetition}</span>
                          </div>
                        </div>
                        <div className="d-flex w-100 justify-content-between bg-light-secondary p-1">
                          <h5 className='my-0 py-0'>
                            Start Date:{' '}
                            <span className="text-primary">
                              {task && convertDate(task?.createdAt)}
                            </span>
                          </h5>
                          <h5 className='my-0 py-0'>
                            End Date:{' '}
                            <span className="text-primary">{task && generateDate(task?.createdAt, task?.repetition)}</span>
                          </h5>
                        </div>
                        <div className="p-1">
                          {/* <h5 className="text-primary">Habit Type</h5> */}
                          <Row>
                            <Col sm="7" className="my-auto mx-0 px-0">
                              <div>
                                <Chart
                                  width="100%"
                                  options={options}
                                  series={generateSeries(task,true)}
                                  type="radialBar"
                                  height="100%"
                                />
                                <span
                                  className="text-center text-secondary"
                                  style={{
                                    position: 'absolute',
                                    left: '43%',
                                    top: '58%',
                                    fontSize: '0.8em'
                                  }}
                                >
                                  {task?.actionPlans?.length}/{task?.repetition} days
                                </span>
                              </div>
                            </Col>
                            <Col sm="5" className="mx-0 px-0">
                              <h6 style={{ paddingRight: '2px' }}>CURRENT STREAK</h6>
                              <h6>
                                <span className="text-primary">{task?.progress} </span>
                                <span className="text-secondary">{task&&calculateStreak(task,"current")}</span>
                              </h6>
                              <hr />
                              <h5>BEST STREAK</h5>
                              <h5>
                                <span className="text-primary">{task?.total}</span>{' '}
                                <span className="text-secondary">{task&&calculateStreak(task,"best")}</span>
                              </h5>
                            </Col>
                          </Row>
                        </div>
                        <div className="d-flex justify-content-between p-1 bg-light">
                          <h5 className='my-0 py-0'>
                            Completion : <span className="text-primary">{generateSeries(task,false)}%</span>
                          </h5>
                          <h5 className='my-0 py-0'>
                            Score : <span className="text-primary">{task?.actionPlans?.length}/{task?.repetition} days</span>
                          </h5>
                        </div>
                        {task && (
                          <RecordHabit
                            closeMain={closeMain}
                            workspaceId={workspaceId}
                            toggle={toggleHabitRecord}
                            isOpen={isHabitRecordOpen}
                            task={task}
                            fullDate={fullDate}
                          />
                        )}
                      </div>
                    </>
                  )}
                </TabPane>
                <TabPane tabId="3">
                  {task && task?.type === 'target' ? (<ActionPlanTab  subGoalsList={subGoalsList} task={task} />) : (<HabitActionPlanTab task={task} />)}
                </TabPane>
                <TabPane tabId="4">
                  <SettingsTab task={task} />
                </TabPane>
              </TabContent>
            </>
          </OffcanvasBody>
        </>
      )}
    </Offcanvas>
  );
}
