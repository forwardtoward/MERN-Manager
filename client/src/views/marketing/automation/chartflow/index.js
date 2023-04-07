import { useCallback, useState, useEffect, useMemo, useRef } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, Background, Controls } from 'react-flow-renderer';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Input, Button, Label } from 'reactstrap'
import 'reactflow/dist/style.css';
import EditContactSideBar from './components/EditContactSideBar'
import AddNewActionSideBar from './components/AddNewActionSideBar'
import CustomNode from './components/CustomNode';
import { setOffEditableContactAction, setOffShowAddNewActionSideBarAction, getSmartList } from '../store/actions'
import { RotateCcw } from 'react-feather';

const rfStyle = {
  backgroundColor: 'white',
  grid: 99999,
};


const ChartFlow = (props) => {
  // const actionsData = [
  //   { id: '1', parentId: '0', content: 'node1', isStart: true, isLast: false, isCondition: false, position: 'center' },
  //   { id: '2', parentId: '1', content: 'node2', isStart: false, isLast: false, isCondition: true, position: 'center' },
  //   { id: '3', parentId: '2', content: 'node3', isStart: false, isLast: false, isCondition: false, position: 'right' },
  //   { id: '4', parentId: '2', content: 'node4', isStart: false, isLast: false, isCondition: true, position: 'left' },
  //   { id: '5', parentId: '4', content: 'node5', isStart: false, isLast: true, isCondition: false, position: 'right' },
  //   { id: '6', parentId: '4', content: 'node6', isStart: false, isLast: true, isCondition: false, position: 'left' },
  //   { id: '7', parentId: '3', content: 'node7', isStart: false, isLast: false, isCondition: true, position: 'center' },
  //   { id: '8', parentId: '7', content: 'node8', isStart: false, isLast: true, isCondition: false, position: 'left' },
  //   { id: '9', parentId: '7', content: 'node9', isStart: false, isLast: false, isCondition: true, position: 'right' },
  //   { id: '10', parentId: '9', content: 'node10', isStart: false, isLast: true, isCondition: false, position: 'right' },
  //   { id: '11', parentId: '9', content: 'node11', isStart: false, isLast: true, isCondition: false, position: 'left' },
  // ]


  // let max=1;
  // const calculatedLastLeaves = (id, initNum) => {

  //   let leaveNum = initNum;
  //   const child = actionsData.filter(item => item.parentId == id);
  //   let childrens = []

  //   child.length != 0 && child.map(item => {
  //     if (item.isLast) {
  //       childrens.push(item)
  //       leaveNum++;
  //       console.log(leaveNum);
  //       max=leaveNum

  //     }
  //     calculatedLastLeaves(item.id, leaveNum)
  //   })
  //   return max;
  // }

  // console.log("node 9 leave", calculatedLastLeaves(9, 1))
  // // max = 1;
  // console.log("node 4 leave", calculatedLastLeaves(4, 1))
  // console.log("node 3 leave", calculatedLastLeaves(3, 1))

  // const calculateConditionNumWithId = (id, init) => {
  //   let nums = init;
  //   const child = actionsData.filter(item => item.parentId == id);
  //   child.length != 0 && child.map(node => {

  //     if (node.position == "right")
  //       if (node.isCondition == true) {
  //         // console.log(node)
  //         nums++;
  //       }
  //     calculateConditionNumWithId(node.id, nums)
  //   })

  //   return (nums)
  // }
  // // const conditionNums = calculateConditionNumWithId(4)
  // const conditionNums1 = calculateConditionNumWithId(2, 1)

  // // console.log('conditionnum of 4', conditionNums)
  // // console.log('conditionnum of 2', conditionNums1)

  // useEffect(() => {
  //   let nodesData = [];
  //   actionsData.map((item) => {
  //     let positionX = 0, positionY = 0;
  //     let data = {};
  //     data.label = item.content;
  //     if (item.isStart) {
  //       data.role = 'start';
  //       positionX = 10;
  //       positionY = 10;
  //     } else {

  //       const parentNode = actionsData.find(parent => parent.id == item.parentId);
  //       // console.log('this is parent', parentNode)
  //       if (parentNode.isCondition) {

  //         const containConditionNum = calculateConditionNumWithId(parentNode.id, 1);
  //         // console.log('this is parent condition and condition num', containConditionNum,'---', parentNode)
  //         if (item.position == "right") {
  //           const calcul = calculatedLastLeaves(item.id, 1)
  //           if (containConditionNum > 1) {
  //             data.role = item.isLast ? 'last' : '';
  //             positionX = calcul *100 * calcul;
  //             positionY = 200;
  //           } else {
  //             data.role = item.isLast ? 'last' : '';
  //             positionX = 100;
  //             positionY = 200;
  //           }
  //         } else if (item.position == "left") {
  //           if (containConditionNum > 1) {
  //             data.role = item.isLast ? 'last' : '';
  //             positionX = -100 * containConditionNum;
  //             positionY = 200;
  //           } else {
  //             data.role = item.isLast ? 'last' : '';
  //             positionX = -100;
  //             positionY = 200;
  //           }
  //         }
  //         if (item.isCondition) {
  //           data.role = 'videoCondition';
  //         }
  //       } else {
  //         if (item.isLast) {
  //           data.role = 'last';
  //           positionX = 0;
  //           positionY = 200;
  //         } else {
  //           data.role = '';
  //           positionX = 0;
  //           positionY = 200;
  //         }
  //         if (item.isCondition) {
  //           data.role = 'videoCondition';
  //         }
  //       }
  //     }
  //     const newNode = item.isStart ? {
  //       id: item.id,
  //       type: 'circle',
  //       data: data,
  //       position: {
  //         x: positionX,
  //         y: positionY
  //       }
  //     } : {
  //       id: item.id,
  //       type: 'circle',
  //       parentNode: item.parentId,
  //       // extent: 'parent',
  //       draggable: false,
  //       data: data,
  //       position: {
  //         x: positionX,
  //         y: positionY
  //       }
  //     }

  //     nodesData.push(newNode);
  //   })
  //   // setNodes(nodesData)
  // }, [])

  const dispatch = useDispatch();
  const WIDTH = 100;
  const HEIGHT = 170;
  const selectedAutomation = useSelector(state => state.automation.selectedAutomation);
  const { isEditContact, showAddNewSideBar } = useSelector(state => state.automation)
  const [automationName, setAutomationName] = useState('');
  // console.log("this is check for isEditContact", showAddNewSideBar)

  const actionsData = selectedAutomation.actions;

  useEffect(() => {
    if (actionsData.length > 0) {
      const treeObj = {};

      for (let item of actionsData) {
        treeObj[item.id] = { ...item, children: [], leafCount: 0, posX: 0, posY: HEIGHT };
      }

      for (let item of actionsData) {
        if (item.parentId == "0") continue;
        treeObj[item.parentId].children.push(item.id);
      }

      function calcLeaf(id) {
        if (treeObj[id].isLast) {
          treeObj[id].leafCount = 1;
          return 1;
        }

        let result = 0;
        for (let item of treeObj[id].children) {
          result += calcLeaf(item);
        }
        treeObj[id].leafCount = result;
        return result;
      }

      calcLeaf(actionsData[0].id);

      function calcPos(id) {
        if (treeObj[id].isLast) {
          return;
        }
        if (treeObj[id].children.length === 1) {
          const childId = treeObj[id].children[0];
          treeObj[childId].posX = 0;
          treeObj[childId].posY = HEIGHT;
          calcPos(childId);
          return;
        }
        const leftId = treeObj[id].children[0];
        const rightId = treeObj[id].children[1];

        calcPos(leftId);
        calcPos(rightId);

        treeObj[leftId].posX =
          (-(treeObj[leftId].leafCount + treeObj[rightId].leafCount) * WIDTH) / 2;
        treeObj[leftId].posY = HEIGHT;

        treeObj[rightId].posX =
          ((treeObj[leftId].leafCount + treeObj[rightId].leafCount) * WIDTH) / 2;
        treeObj[rightId].posY = HEIGHT;

      }

      calcPos(actionsData[0].id);

      const result = [{ id: '0', data: { id: '0', actionType: 'editContact', isLast: false, label: 'EditContact', content: 'EditContact', }, type: 'circle', position: { x: 0, y: 0 } }];
      for (let key in treeObj) {
        result.push({
          id: treeObj[key].id,
          data: treeObj[key],
          position: { x: treeObj[key].posX, y: treeObj[key].posY },
          parentNode: treeObj[key].parentId,
          type: "circle",
        });
      }

      setNodes(result)
    } else {
      setNodes([{ id: '0', data: { id: '0', actionType: 'editContact', isLast: true, label: 'EditContact', content: 'EditContact', }, type: 'circle', position: { x: 0, y: 0 } }])
    }
  }, [actionsData])

  const [actionSum, setActionSum] = useState(0)

  useEffect(() => {
   let actionCount = 0;
    if (actionsData.length > 0) {
      let edgesData = [];
      actionsData.map((item, index) => {


        const edgeItem = {
          id: item.id + '-' + item.parentId,
          source: item.parentId,
          target: item.id
        }
        // console.log(edgeItem)
        edgesData.push(edgeItem)
        if (item.actionType != 'condition') actionCount++;

      })
      setEdges(edgesData)
      setActionSum(actionCount)
    }
  }, [actionsData])


  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );


  const nodeTypes = { circle: CustomNode }


  const toggleContactSideBar = () => {
    dispatch(setOffEditableContactAction())
  }

  const toggleNewActionSideBar = () => {
    dispatch(setOffShowAddNewActionSideBarAction())
  }

  const save = () => {
    if (isEdit) {
      dispatch(updateAutomation);
    }
  };

  const [zoomLevel, setZoomLevel] = useState(1);
  const handleZoomIn = () => {
    setZoomLevel((zoomLevel) => zoomLevel + 0.1);
  };
  const handleZoomOut = () => {
    setZoomLevel((zoomLevel) => zoomLevel - 0.1);
  };

  useEffect(() => {
    dispatch(getSmartList());
    // if (selectedAutomation != null) {
    //   setShowingAutomation(selectedAutomation);
    //   setAutomationName(selectedAutomation.automationName);
    // }
  }, []);


  return (
    <>
      <Row className="m-1 pb-1 border-bottom">
        <Label style={{ fontWeight: 'bold' }}>AUTOMATION NAME</Label>
        <Col sm="5" lg="5" md="5">
          <Input
            type="text"
            id="basicInput"
            placeholder="Enter Automation Name"
            value={automationName}
            onChange={(e) => setAutomationName(e.target.value)}
          />
        </Col>

        <Col sm="3" lg="3" md="3"></Col>
        <Col sm="2" lg="2" md="2">
          <Button color="success" block outline onClick={() => save()}>
            Save
          </Button>
        </Col>
        <Col sm="2" lg="2" md="2">
          <Button color="primary" block outline onClick={() => props.goBackToTable()}>
            Go back
          </Button>
        </Col>
        <Col sm="1" lg="1" md="1"></Col>
      </Row>
      <div style={{ background: 'white', position: 'absolute', top: '140px', left: '30px', textAlign: 'center', zIndex: '1000', width: '80px', height: '120px', textAlign: 'center' }}>
        <label className='text-uppercase'>Actions</label>
        <div style={{
          border: '1px solid blue',
          borderRadius: '50%',
          width: "60px",
          height: "60px",
          margin: 'auto'
        }}>
          <p style={{ fontSize: '24px', padding: '19px 0px' }}>{actionSum}</p>
        </div>

        <div className="d-flex justify-content-around gaps border-1 mt-1 w-70">
          <div
            style={{
              border: '1px solid black',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              cursor: 'pointer'
            }}
          // onClick={handleZoomIn}
          >
            <p style={{ fontSize: '18px', textAlign: 'center' }} className="font-weight-bold">
              +
            </p>
          </div>
          <div
            style={{
              border: '1px solid black',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              marginLeft: '3px',
              cursor: 'pointer'
            }}
          // onClick={handleZoomOut}
          >
            <p style={{ fontSize: '18px', textAlign: 'center' }} className="font-weight-bold">
              -
            </p>
          </div>
          <div
            style={{
              border: '1px solid black',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              marginLeft: '3px',
              cursor: 'pointer'
            }}
          // onClick={handleRotation}
          >
            <p style={{ fontSize: '14px', textAlign: 'center' }} className="font-weight-bold">
              <RotateCcw size={13} style={{ marginBottom: '5px' }} />
            </p>
          </div>
        </div>
      </div>

      <div style={{ width: '100vm', height: '100vh', margin: 'auto', background: 'white', transform: `scale(${zoomLevel})` }}>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onConnect={onConnect}
          fitView
          style={rfStyle}
          snapToGrid={false}
          nodeTypes={nodeTypes}
        >
          <Background />

        </ReactFlow>
      </div>
      {isEditContact&&<EditContactSideBar open={isEditContact} toggleSidebar={toggleContactSideBar} />}
      <AddNewActionSideBar open={showAddNewSideBar} toggleSidebar={toggleNewActionSideBar} />
    </>
  );
}

export default ChartFlow;
