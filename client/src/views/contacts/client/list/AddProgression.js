import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

import NewProgressionWizard from './NewProgressionWizard';

const AddProgression = (props) => {
  const { openAddProgression, setOpenAddProgression, selectedRowDataProg } = props;

  return (
    <Modal
      isOpen={openAddProgression}
      toggle={() => setOpenAddProgression(false)}
      className="modal-dialog-centered"
      size="lg"
      style={{ maxWidth: '1200px', width: '100%' }}
    >
      <ModalHeader toggle={() => setOpenAddProgression(false)}>Add Event</ModalHeader>
      <ModalBody>
        <NewProgressionWizard selectedRowDataProg={selectedRowDataProg} />
      </ModalBody>
    </Modal>
  );
};
export default AddProgression;
