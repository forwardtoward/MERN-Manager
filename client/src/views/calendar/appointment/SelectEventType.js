import { Fragment, useState } from 'react';

import {
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  ButtonGroup,
  Button
} from 'reactstrap';

const SelectEventType = (props) => {
  const { isOpen, setIsOpen, setCalendarEventType, setAddAppointmentSidebarOpen } = props;
  const [rSelected, setrSeleted] = useState(0);

  const cancleBtnClicked = () => {
    setIsOpen(false);
  };

  const onRadioBtnClick = (rSelected) => {
    setCalendarEventType(rSelected == 1 ? 'Appointment' : 'Class');
    setIsOpen(false);
    setAddAppointmentSidebarOpen(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => cancleBtnClicked()}
      className="modal-dialog-centered"
      size="sm"
    >
      <ModalBody style={{ padding: 0 }}>
        <Fragment>
          <div className="d-flex flex-column">
            <Button
              color="primary"
              outline
              onClick={() => onRadioBtnClick(1)}
              // active={rSelected === 1}
            >
              New Appointment
            </Button>
            <Button
              color="primary"
              outline
              onClick={() => onRadioBtnClick(2)}
              // active={rSelected === 2}
            >
              New Class
            </Button>
          </div>
        </Fragment>
      </ModalBody>
    </Modal>
  );
};

export default SelectEventType;
