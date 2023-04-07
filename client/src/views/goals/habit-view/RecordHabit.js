import { useState } from 'react';

import {
  Button,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { actionPlanAddAction } from '../../taskngoals/store/actions';


const RecordHabit = ({task, toggle,isOpen,fullDate,workspaceId,closeMain}) => {
  const dispatch=useDispatch();
  const [createNewValidation, setCreateNewValidation] = useState(true);
  // const [newTitle, setNewTitle] = useState('');
  // const confirmBtnClicked = () => {
  //  toggle()
  // };

  const cancleBtnClicked = () => {
   toggle()
  };
  const handleAdd=(e)=>{
    e.preventDefault()
    let payload ={}
    payload.action="accomplised"
    payload.date=fullDate
    payload.status="done";
    dispatch(actionPlanAddAction(task._id,workspaceId._id,payload))
    cancleBtnClicked();
    closeMain(false);
  }
  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className="modal-dialog-centered"
    >
      <ModalHeader toggle={toggle}>Record a Habit</ModalHeader>
      <Form onSubmit={handleAdd}>
      <ModalBody>
        <div>
          <Label className="form-label" for="validState">
            Are you sure to record habit?
          </Label>

    
          
          <FormFeedback valid={createNewValidation}>
            {createNewValidation
              ? 'Sweet! That name is available.'
              : 'Oh no! That name is already taken.'}
          </FormFeedback>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          type="submit"
          
        >
          Submit
        </Button>
        <Button color="secondary" onClick={cancleBtnClicked}>
          Cancel
        </Button>
      </ModalFooter>
      </Form>
    </Modal>
  );
};

export default RecordHabit;
