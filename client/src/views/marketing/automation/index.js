import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from './Sidebar';
import Table from './Table';
import { updateAutomation, setAutomationDataList } from './store/actions';
import { v4 as uuidv4 } from 'uuid';
import ChartFlow from './chartflow'


// import FlowChart from './graph';

const Automation = () => {

  // const actionsData = [
  //   {
  //     id: "1",
  //     parentId: "0",
  //     content: "node1",
  //     isStart: true,
  //     isLast: false,
  //     isCondition: false,
  //     position: "center",
  //   },
  //   {
  //     id: "2",
  //     parentId: "1",
  //     content: "node2",
  //     isStart: false,
  //     isLast: false,
  //     isCondition: true,
  //     position: "center",
  //   },
  //   {
  //     id: "3",
  //     parentId: "2",
  //     content: "node3",
  //     isStart: false,
  //     isLast: false,
  //     isCondition: false,
  //     position: "right",
  //   },
  //   {
  //     id: "4",
  //     parentId: "2",
  //     content: "node4",
  //     isStart: false,
  //     isLast: false,
  //     isCondition: true,
  //     position: "left",
  //   },
  //   {
  //     id: "5",
  //     parentId: "4",
  //     content: "node5",
  //     isStart: false,
  //     isLast: true,
  //     isCondition: false,
  //     position: "right",
  //   },
  //   {
  //     id: "6",
  //     parentId: "4",
  //     content: "node6",
  //     isStart: false,
  //     isLast: true,
  //     isCondition: false,
  //     position: "left",
  //   },
  //   {
  //     id: "7",
  //     parentId: "3",
  //     content: "node7",
  //     isStart: false,
  //     isLast: false,
  //     isCondition: true,
  //     position: "center",
  //   },
  //   {
  //     id: "8",
  //     parentId: "7",
  //     content: "node8",
  //     isStart: false,
  //     isLast: true,
  //     isCondition: false,
  //     position: "left",
  //   },
  //   {
  //     id: "9",
  //     parentId: "7",
  //     content: "node9",
  //     isStart: false,
  //     isLast: false,
  //     isCondition: true,
  //     position: "right",
  //   },
  //   {
  //     id: "10",
  //     parentId: "9",
  //     content: "node10",
  //     isStart: false,
  //     isLast: true,
  //     isCondition: false,
  //     position: "right",
  //   },
  //   {
  //     id: "11",
  //     parentId: "9",
  //     content: "node11",
  //     isStart: false,
  //     isLast: true,
  //     isCondition: false,
  //     position: "left",
  //   },
  // ];

  const actionsData = []
  const [isGraphShow, setIsGraphShow] = useState(false);
  const onShowToGraph = () => {
    setIsGraphShow(true);
  };
  const onGoBackToTable = () => {
    setIsGraphShow(false);
  };
  const dispatch = useDispatch();

  const AutomationDataList = [
    {
      id: uuidv4(),
      automationName: 'New task1',
      startTime: '03/07/2023',
      contactInfo: {},
      campaign: 'a',
      contacts: 'Todo',
      status: 'active',
      activateUpon: 'Upon Entry',
      actions: actionsData
    },
    {
      id: uuidv4(),
      automationName: 'New task2',
      startTime: '03/07/2023',
      contactInfo: {},
      campaign: 'b',
      contacts: 'Todo',
      status: 'inactive',
      activateUpon: 'Criteria Met',
      actions: actionsData
    }
  ];

  useEffect(() => {
    dispatch(setAutomationDataList(AutomationDataList));
  }, []);
  const allData = useSelector((state) => state.automation);
  return (
    <div className="tasks-border" style={{ display: 'block' }}>
      {isGraphShow ? (
        <ChartFlow goBackToTable={onGoBackToTable} />
      ) : (
        <div className='d-flex'>
          <Sidebar showGraph={onShowToGraph} allData={allData.allAutomations}/>
          <Table showGraph={onShowToGraph} allData={allData.allAutomations} />
        </div>
      )}
    </div>
  );
};

export default Automation;
