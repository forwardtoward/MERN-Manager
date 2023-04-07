import React, { Fragment, useState } from 'react';
import {
  Button,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Form,
} from 'reactstrap';
import { goalsAddAction, subGoalsAddAction } from '../../taskngoals/store/actions';
import { useDispatch } from 'react-redux';
export default function AddGoal({ task, toggle, type, workspaceId }) {


  //redux\
  const dispatch = useDispatch();
  // ** STATES
  const [activeTab, setActiveTab] = useState('1');
  const [trackProgress, setTrackProgress] = useState("CompletedTasks");
  const [formData, setFormData] = useState();
  const handleInput = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, file: e.target.files[0] });
      return
    }
    if (e.target.name === "measureFrom") {
      setFormData({ ...formData, measureFrom: e.target.value, currentProgress: e.target.value })
    }
    else {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  }
  const handleAdd = (e) => {
    e.preventDefault();
    const payload = new FormData();
    formData.name != undefined && payload.append('name', formData.name);
    formData.startDate != undefined && payload.append('startDate', formData.startDate);
    formData.endDate != undefined && payload.append('endDate', formData.endDate);
    formData.progressType != undefined && payload.append('progressType', formData.progressType);
    formData.vision != undefined && payload.append('vision', formData.vision);
    formData.purpose != undefined && payload.append('purpose', formData.purpose);
    formData.obstacle != undefined && payload.append('obstacle', formData.obstacle);
    formData.resource != undefined && payload.append('resource', formData.resource);
    formData.file != undefined && payload.append('file', formData.file);
    payload.append('workSpace', workspaceId)

    // payload.append('file',file);
    if (trackProgress === "AllTasks" || trackProgress === "CurrentProgress") {
      formData.measureFrom != undefined && payload.append('measureFrom', formData.measureFrom)
      formData.measureTo != undefined && payload.append('measureTo', formData.measureTo)

      formData.measureLabel != undefined && payload.append('measureLabel', formData.measureLabel)

      trackProgress === "CurrentProgress" &&
        formData.currentProgress ?
        payload.append('currentProgress', formData.currentProgress) :
        payload.append('currentProgress', formData.measureFrom)
    }

    { type === "sub" ? dispatch(subGoalsAddAction(task._id, workspaceId, "target", payload)) : dispatch(goalsAddAction(workspaceId, "target", payload)) }
    toggle(task)
  }

  const handleTrackProgressChanged = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setTrackProgress(e.target.value);
  };
  return (
    <Fragment>
      {type === 'sub' ? (
        <ModalHeader toggle={() => toggle(task)}>Add A New Sub Goal For {task.name}</ModalHeader>
      ) : (
        <ModalHeader>Add A New Goal</ModalHeader>
      )}
      <ModalBody>
        <Form onSubmit={(e) => handleAdd(e)}>
          <Label>Goal Name</Label>
          <Input type="text" name="name" placeholder="What is your goal?" onChange={handleInput} required />

          <Label>Start Date</Label>
          <Input name="startDate" min={type==="sub"&&task?.startDate} max={type==="sub"&&task?.endDate} onChange={handleInput} required type="date" />

          <Label>End Date</Label>
          <Input type="date" disabled={formData?.startDate === undefined}  max={type==="sub"&&task?.endDate} min={formData?.startDate} onChange={handleInput} required name="endDate" />
          <hr />
          <Label>Track Progress By: </Label>
          <FormGroup onChange={handleTrackProgressChanged}>
            <div>
              <Input type="radio" name="progressType" value={"CompletedTasks"} />
              <Label>{type === "sub" ? "By Completion" : "Total number of completed sub goals "} </Label>
            </div>
            {type != "sub" && <><div>
              <Input type="radio" disabled={type === 'sub' && true} name="progressType" value={"SubGoals"} />{' '}
              <Label>Total progress from all sub goals</Label>
            </div>
              <div>
                <Input disabled type="radio" name="progressType" value={"AllTasks"} />{' '}
                <Label>Total outcome from all goals</Label>
              </div></>}
            <div>
              <Input type="radio" name="progressType" value={"CurrentProgress"} />{' '}
              <Label>Manually updating current progress </Label> <Label className="text-warning">{type != "sub" && "(sub goal can not be added)"} </Label>
            </div>
          </FormGroup>

          {['AllTasks', 'CurrentProgress'].includes(trackProgress) && (
            <div>
              <div className="d-flex justify-content-between">
                <div className='d-flex justify-content-start'>
                  <Label className='my-auto pe-50'>Measure From:</Label>
                  <Input type="number" name="measureFrom" onChange={handleInput} required style={{ maxWidth: "100px" }} placeholder="1" />
                </div>
                <div className='d-flex justify-content-start'>
                  <Label className='my-auto pe-50'>to</Label>
                  <Input type="number" name="measureTo" onChange={handleInput} required style={{ maxWidth: "100px" }} placeholder="100" />
                </div>
              </div>
              <Label>Measure Label</Label>
              <Input type="text" onChange={handleInput} required name="measureLabel" placeholder="$, lbs, kg " />
            </div>
          )}
          {
            trackProgress === "CurrentProgress" && (
              <>
                <div className="mt-2">
                  <Label >Current Progress {formData?.currentProgress}</Label>
                </div>
                <div>
                  <Input type="range" value={formData?.currentProgress} min={formData.measureFrom && formData?.measureFrom} max={formData.measureFrom && formData?.measureTo} disabled={!formData?.measureFrom || !formData?.measureTo} onChange={handleInput} required name="currentProgress" style={{ maxWidth: "200px" }} />
                </div>
              </>
            )
          }
          <span>Optional</span>
          <hr />


          <div>
            <Nav tabs>
              <NavItem>
                <NavLink active={activeTab === '1'} onClick={() => setActiveTab('1')}>
                  Vision
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={activeTab === '2'} onClick={() => setActiveTab('2')}>
                  Purposes
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={activeTab === '3'} onClick={() => setActiveTab('3')}>
                  Obstacles
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={activeTab === '4'} onClick={() => setActiveTab('4')}>
                  Resources
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Input name="vision" onChange={handleInput} type="textarea" />
              </TabPane>
              <TabPane tabId="2">
                <Input name="purpose" onChange={handleInput} type="textarea" />
              </TabPane>
              <TabPane tabId="3">
                <Input name="obstacle" onChange={handleInput} type="textarea" />
              </TabPane>
              <TabPane tabId="4">
                <Input name="resource" onChange={handleInput} type="textarea" />
              </TabPane>
            </TabContent>
            <hr />
            <Label>Upload Picture</Label>
            <br />
            <Label>Picture</Label>
            <Input name="image" type="file" onChange={handleInput} />
            {/* <Label>Parent Goal</Label>
            <Input type="select">
              <option>Goal 1</option>
              <option>Goal 2</option>
              <option>Goal 3</option>
            </Input> */}
          </div>
          <div className="d-flex mt-1 justify-content-end">
            <Button type="submit" color="primary">Save</Button>
          </div>
        </Form>
      </ModalBody>

    </Fragment>
  );
}
