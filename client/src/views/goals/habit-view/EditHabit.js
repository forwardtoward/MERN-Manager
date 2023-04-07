import React, { Fragment, useState } from 'react';
import {
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  Form,
  TabContent,
  TabPane
} from 'reactstrap';
import { goalsEditAction } from '../../taskngoals/store/actions';
import { useDispatch } from 'react-redux';
export default function EditHabit({ task, toggle, type }) {
  // ** STATES
  const [activeTab, setActiveTab] = useState('1');
  const dispatch = useDispatch();

  const [habitPayload, setHabitPayload] = useState(task)
  const onHabitSubmit = (e) => {
    e.preventDefault();
    // dispatch(goalsAddAction(workspaceId, "habit", habitPayload,))
    // toggle();
    dispatch(goalsEditAction(habitPayload?._id, habitPayload?.workSpace, habitPayload))

  }
  const handleInput = (e) => {
    setHabitPayload({ ...habitPayload, [e.target.name]: e.target.value })
    
  }

  return (
    <Fragment>
      <ModalHeader toggle={toggle}>Edit Habit</ModalHeader>
      <ModalBody>
        <Form onSubmit={onHabitSubmit}>
          <Label>Habit Name</Label>
          <Input name="name" type="text" onChange={handleInput} placeholder="What is your new habit?" value={habitPayload?.name} />
          <Label>Frequency</Label>
          <Input name="frequency" onChange={handleInput} value={habitPayload?.frequency} type="select" >
            <option>Every day</option>
            <option>Every week</option>
            <option>Every month</option>
          </Input>
          {habitPayload?.frequency === 'Every week' || habitPayload?.frequency === 'Every month'? 
            <>
              <Label>Days per {habitPayload?.frequency}</Label>
              <Input  type="text" />
            </>
          :null}
          <Label>Repetation</Label>
          <div className='d-flex justify-content-between'>
          <Input type='text' value={habitPayload?.repetition } required className="w-100 my-auto me-50" />
          <Input name="repetition" type="range" value={habitPayload?.repetition} max={100} color="primary" step="1"  onChange={handleInput} required />

          </div>
          <Label>Goal</Label>
          <Input type="select">
            <option>Goal 1</option>
            <option>Goal 2</option>
            <option>Goal 3</option>
          </Input>
          <Label>Category</Label>
          <Input type="select">
            <option>Personal</option>
            <option>Business</option>
          </Input>
          <div className="d-flex justify-content-end px-1 mt-2">
            <Button type="submit" color="primary">Save Habit</Button>
          </div>
        </Form>
      </ModalBody>

    </Fragment>
  );
}
