// ** React Imports
import React, { useState } from 'react';
import { Calendar, Trash2 } from 'react-feather';
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { deleteClass } from './store';
import { useDispatch } from 'react-redux';

const AttendanceAction = (props) => {
  const dispatch = useDispatch();
  const { classRow , actionFrom, setOpenAddClass } = props;
  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <div>
      <div className="d-flex">
        {/*   <div className="cursor-pointer">
                    <Calendar size={16} style={{ color: '#625f6e' }} />
    </div> */}
    {actionFrom === 'classModel' ? ( 
                    <Button
                      className="me-1 d-flex"
                      onClick={() => setDeleteModal(true)}
                      color="danger"
                      outline
                     > {`Delete`} 
                     <div className="cursor-pointer" onClick={() => setDeleteModal(true)}>
                     <Trash2 size={16} style={{ color: '#dc3545', marginLeft: '5px' }} />
                     </div>
                   </Button>)
                   : (
        <div className="cursor-pointer" onClick={() => setDeleteModal(true)}>
          <Trash2 size={16}  />
        </div>
        )}
      </div>
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
              { classRow?.seriesId ? (<>
              <Button className="mt-1 me-3" outline onClick={() => {
                  dispatch(deleteClass({classId: classRow?._id, type: 'single'}));
                  setDeleteModal(false);
                  if(actionFrom  === 'classModel'){
                  setOpenAddClass(false);
                  }
                }}>
                Delete Single
              </Button>
              <Button
                // disabled={deleteLoading}
                className="mt-1"
                color="primary"
                onClick={() => {
                  dispatch(deleteClass({classId: classRow?.seriesId, type: 'all'}));
                  setDeleteModal(false);
                  if(actionFrom  === 'classModel'){
                    setOpenAddClass(false);
                    }
                }}
              >
                Delete All
              </Button>

               </>) : (<>
              <Button className="mt-1 me-3" outline onClick={() => setDeleteModal(false)}>
                cancel
              </Button>
              <Button
                // disabled={deleteLoading}
                className="mt-1"
                color="primary"
                onClick={() => {
                  dispatch(deleteClass({classId: classRow?._id, type: 'single'}));
                  setDeleteModal(false);
                }}
              >
                Delete
              </Button>
               </>)}
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AttendanceAction;
