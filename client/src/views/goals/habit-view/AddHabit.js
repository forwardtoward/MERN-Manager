import React, { Fragment, useState } from 'react';
import {
  Button,
  Input,
  Label,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap';
import { goalsAddAction } from '../../taskngoals/store/actions';
import { useDispatch } from 'react-redux';
export default function AddHabit({ task, toggle,workspaceId, type }) {
  const dispatch = useDispatch();
  // ** STATES
  const [activeTab, setActiveTab] = useState('1');
  const [frequency, setFrequency] = useState('day');
  const [repetition, setRepetition] = useState(21);

  const handleRepetationChanged = (e) => setRepetition(e.target.value)
  const handleFrequencyChanged = (e) => setFrequency(e.target.value)
  const [habitPayload, setHabitPayload] = useState({frequency:"Every day",repetition:"21",workSpace:workspaceId})
  const onHabitSubmit = (e) => {
    e.preventDefault();
    dispatch(goalsAddAction(workspaceId,"habit",habitPayload,))
    toggle();
  
  }
  const handleInput = (e) => {
    setHabitPayload({ ...habitPayload, [e.target.name]: e.target.value })
  }
  return (
    <Fragment>
      {type === 'sub' ? (
        <ModalHeader toggle={toggle}>Add A New Sub Habit For {task.name}</ModalHeader>
      ) : (
        <ModalHeader toggle={toggle}>Add A New Habit</ModalHeader>
      )}
      <ModalBody>
        <Form onSubmit={onHabitSubmit}>
          <Label>Habit Name</Label>
          <Input name="name" type="text" placeholder="What is your new habit?" onChange={handleInput} required />
          <Label>Frequency</Label>
          <Input name="frequency" type="select" onChange={handleInput} required >
            <option>Every day</option>
            <option>Every week</option>
            <option>Every month</option>
          </Input>
          {habitPayload?.frequency === 'Every week' || habitPayload?.frequency === 'Every month'? (
            <>
              <Label>Days per {habitPayload?.frequency.slice(6)}   </Label>
              <Input type="text" />
            </>
          ):null}
          <Label>Repetation</Label>
          <Input type='text' disabled value={habitPayload?.repetition || 21} required />
          <Input name="repetition" className='my-1' type="range" defaultValue={21} max={100} color="primary" step="1" value={habitPayload?.repetition} onChange={handleInput} required/>

          <Label>Goal</Label>
          <Input type="select">
            <option>Goal 1</option>
            <option>Goal 2</option>
            <option>Goal 3</option>
          </Input>
  
          <div className="d-flex justify-content-end mt-2">
            <Button type="submit" color="primary">Save Habit</Button>
          </div>
        </Form>
      </ModalBody>


    </Fragment>
  );
}
