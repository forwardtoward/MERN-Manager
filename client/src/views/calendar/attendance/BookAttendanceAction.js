// ** React Imports
import React, { useState } from 'react';
import { Badge, Button, Col, Modal, ModalBody, ModalHeader, Row, Label } from 'reactstrap';
import { Trash2, Calendar } from 'react-feather';
import Flatpickr from 'react-flatpickr';
import { useDispatch } from 'react-redux';
import Reschedule from './reschedule';
import { deleteBooking, getClassbooking } from './store';

const BookAttendanceAction = (props) => {
  const dispatch = useDispatch();
  const { bookingRow } = props;
  const [bookRescheduleModal, setBookRescheduleModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div>
      <div className="d-flex">
        {bookingRow?.status === 'no' && (
          <div className="cursor-pointer" onClick={() => setBookRescheduleModal(true)}>
            <Calendar size={18} style={{ color: '#625f6e', marginLeft: '5px' }} />
          </div>
        )}
        <div className="cursor-pointer" onClick={() => setDeleteModal(true)}>
          <Trash2 size={18} style={{ color: '#625f6e', marginLeft: '5px' }} />
        </div>
      </div>
      <Modal
        toggle={() => setBookRescheduleModal(false)}
        className="modal-dialog-centered"
        isOpen={bookRescheduleModal}
      >
        <ModalHeader
          className="text-center bg-transparent d-flex"
          toggle={() => setBookRescheduleModal(false)}
        >
          <h3> Reschedule Booking</h3>
        </ModalHeader>
        <ModalBody className="mx-50 pb-5">
          <Reschedule bookingRow={bookingRow} setBookRescheduleModal={setBookRescheduleModal} />
        </ModalBody>
      </Modal>
      <Modal
        toggle={() => setDeleteModal(false)}
        className="modal-dialog-centered"
        isOpen={deleteModal}
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setDeleteModal((p) => !p)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <h3 className="text-center mb-1">Are you sure to Delete ?</h3>
          <Row>
            <Col className="text-center mt-1" xs={12}>
              <Button className="mt-1 me-3" outline onClick={() => setDeleteModal(false)}>
                Cancel
              </Button>
              <Button
                //  disabled={deleteLoading}
                className="mt-1"
                color="primary"
                onClick={() => {
                  dispatch(deleteBooking(bookingRow?._id));
                  if (bookingRow?.classId !== undefined && bookingRow?.classId !== '') {
                    dispatch(getClassbooking(bookingRow?.classId));
                  }
                  setDeleteModal(false);
                }}
              >
                Confirm
              </Button>{' '}
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default BookAttendanceAction;
