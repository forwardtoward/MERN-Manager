import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label } from 'reactstrap'
import { actionPlanAddAction, subGoalsAddAction, subGoalsEditAction } from '../../taskngoals/store/actions'
import { useDispatch } from 'react-redux'

function RecordSubGoalModal({ toggle, modal, goal, parentId,workspaceId }) {
  const [progress, setProgress] = useState({})
  const dispatch = useDispatch();
  const checker = (goal) => {
    if (goal.progressType === "CompletedTasks" || goal.progressType === "SubGoals") {
      return (false)
    }
    if (goal.progressType === "AllTasks" || goal.progressType === "CurrentProgress") {
      return (true)
    }
    return (null);
  }
  const handleComplete = () => {
    const payload = { status: "Complete" }
    const id = goal?._id
    dispatch(subGoalsEditAction(id, payload, parentId))
    dispatch(actionPlanAddAction(parentId,workspaceId,{title:goal?.name,action:"Complete",status:"Completed"}))
    toggle()

  }
  const handleUpdate = () => {
    if ((parseInt(progress.currentProgress)+parseInt(goal?.currentProgress))>= parseInt(goal?.measureTo)) {
        const id = goal?._id;
        let payload = {};
        payload.currentProgress = parseInt(progress.currentProgress)+parseInt(goal?.currentProgress)
        payload.status = "Complete";
        dispatch(subGoalsEditAction(id, payload, parentId))
        dispatch(actionPlanAddAction(parentId,workspaceId,{title:goal?.name,action:"Edit",status:"Complete"}))
        // toggle();
    }
    else {
      const id = goal?._id
      let payload={};
      payload.currentProgress=parseInt(progress.currentProgress)+parseInt(goal?.currentProgress)
      dispatch(subGoalsEditAction(id, payload, parentId))
      dispatch(actionPlanAddAction(parentId,workspaceId,{title:goal?.name,action:"Edit",status:progress.currentProgress}))
      toggle();
    }
  }
  return (
    <Modal isOpen={modal} centered={true} toggle={toggle}>
      <ModalHeader toggle={toggle}>Record Progress</ModalHeader>
      <ModalBody>
        {goal && checker(goal) ? <>
          <h4>Your Target is to reach - {goal?.measureTo}{' '}{goal?.measureLabel}</h4>
          <p className="text-secondary">Current Progress is {goal?.currentProgress || 0}</p>
          <Input placeholder={"Enter Achieved ~"+goal?.measureLabel} name="currentProgress" className="mt-2" type="number" onChange={(e) => setProgress({ [e.target.name]: e.target.value })}></Input></> :
          <h4>Mark this Goal as Complete!</h4>
        }
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
        {goal && checker(goal) ?
          <Button color="primary" onClick={handleUpdate}>Update</Button> :
          <Button color="primary" onClick={handleComplete}>Complete</Button>
        }
      </ModalFooter>
    </Modal>
  )
}

export default RecordSubGoalModal