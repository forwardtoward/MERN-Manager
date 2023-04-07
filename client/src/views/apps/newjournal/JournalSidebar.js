import { useState, useEffect, useCallback } from 'react';
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Home,
  MoreVertical,
  Edit,
  Trash,
  Layers
} from 'react-feather';
import {
  Badge,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  Input,
  ListGroup,
  ListGroupItem,
  UncontrolledDropdown
} from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
  createMyJournal,
  deleteJournalCategory,
  editMyJournals,
  getMyjournalList
} from '../../../requests/myJournal/getMyJournal';
import '../../../../src/assets/styles/jaornal.scss';

const JournalSidebar = ({
  collapse,
  handleJournalCollapse,
  parentcallback,
  sideBarUpdateData,
  setSideBarUpdateData,
  setSelectedItem,
  setStatusOpen
}) => {
  const [basicModal, setBasicModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [JournallistData, setJournalData] = useState([]);
  const [newJournal, setNewJournal] = useState('');
  const [editJournal, setEditJournal] = useState('');
  const [active, setActive] = useState(0);
  const [editId, setEditId] = useState('');
  const handleClick = () => {
    console.log('DropdownItem clicked!');
    setStatusOpen('open') ? setStatusOpen('close') : setStatusOpen('open');
  };
  const handleDelete = (id) => {
    deleteJournalCategory(id);
    setSideBarUpdateData(true);
  };
  const onIdChange = (event) => {
    parentcallback(event);
    localStorage.setItem('journalId', event);
  };
  const handlemodal = () => {
    setBasicModal(false);
  };
  const handlesetJournal = (e) => {
    setNewJournal(e.target.value);
  };
  const handlesetEditJournal = (e) => {
    setEditJournal(e.target.value);
  };
  const fetchData = useCallback(async () => {
    const response = await getMyjournalList();
    setJournalData(response);
    setSideBarUpdateData(false);
    if (response.length > 0) {
      setSelectedItem(response[0]);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData, sideBarUpdateData === true]);

  return (
    <div className="project-sidebar joru-side-height" style={{ width: '250px' }}>
      <div className="sidebar-content task-sidebar journal">
        <div className="task-app-menu">
          <ListGroup
            className={`sidebar-menu-list ${collapse ? 'd-none' : 'd-block'}`}
            options={{ wheelPropagation: false }}
          >
            <div
              className="ps-1 d-flex justify-content-between align-items-center"
              style={{ marginLeft: '0.5rem', marginTop: 10 }}
            >
              <Home size={20} />
              <div style={{ fontSize: '18px', fontWeight: 700, cursor: 'pointer' }}>My Journal</div>
              <Button className="btn-icon" color="flat-dark" onClick={handleJournalCollapse}>
                {collapse ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
              </Button>
            </div>
            <div
              className="project-create-workspace-btn  btn text-center"
              style={{ width: '100%' }}
            ></div>
            <ListGroupItem className="ws-name list-item">Personal</ListGroupItem>
            <ListGroupItem className="ws-name list-item">Business</ListGroupItem>
            <div
              style={{
                padding: '12px',
                cursor: 'pointer'
              }}
            >
              <Layers size={14} style={{ marginInlineEnd: '5px' }} />
              Others
            </div>
            {JournallistData?.map((value, i) => (
              <ListGroupItem key={i} className={`ws-name list-item ${active === i && 'active'}`}>
                <div>
                  <div
                    onClick={() => {
                      onIdChange(value?._id);
                      setActive(i);
                    }}
                  >
                    <span style={{ fontWeight: '500' }}>{value?.title}</span>

                    <span className="stt-rs">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn btn-sm"
                          tag="div"
                          href="/"
                          // onClick={(e) => e.preventDefault()}
                        >
                          <MoreVertical className="text-body" size={16} />
                        </DropdownToggle>
                        <DropdownMenu end>
                          <DropdownItem
                            tag={'span'}
                            className="w-100"
                            onClick={() => {
                              setEditModal(!editModal),
                                setEditJournal(value.title),
                                setEditId(value._id);
                            }}
                          >
                            <Edit size={'14px'} style={{ marginRight: '10px' }} />
                            Edit
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => handleDelete(value?._id)}
                            tag={'span'}
                            className="w-100"
                          >
                            <Trash size={'14px'} style={{ marginRight: '10px' }} />
                            Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </span>
                    <Badge style={{ float: 'right' }} pill>
                      {value.count}
                    </Badge>
                  </div>
                </div>
              </ListGroupItem>
            ))}
            <div
              className="project-create-workspace-btn my-1 btn text-center"
              style={{ width: '100%' }}
            >
              <Button color="primary" outline onClick={() => setBasicModal(!basicModal)}>
                <Plus size={14} className="me-25" />
                New Category
              </Button>
            </div>
          </ListGroup>
        </div>
      </div>
      <Modal
        isOpen={basicModal}
        toggle={() => setBasicModal(!basicModal)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalHeader toggle={() => setBasicModal(!basicModal)}>Create New Category</ModalHeader>
        <ModalBody className="p-2">
          <Form>
            <Input
              value={newJournal}
              onChange={handlesetJournal}
              type="text "
              className="form-control mt-1"
              placeholder="New Category Name"
            />
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            disabled={!newJournal}
            onClick={() => {
              setBasicModal(!basicModal);
              createMyJournal(newJournal).then((response) => {
                setNewJournal('');
                setSideBarUpdateData(true);
              });
            }}
          >
            Create
          </Button>
          <Button color="secondary" onClick={handlemodal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Modal
        isOpen={editModal}
        toggle={() => setEditModal(!editModal)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalHeader toggle={() => setEditModal(!editModal)}>Edit Category</ModalHeader>
        <ModalBody className="p-2">
          <Form>
            <Input
              value={editJournal}
              onChange={handlesetEditJournal}
              type="text "
              className="form-control mt-1"
              placeholder="New Category Name"
            />
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            disabled={!editJournal}
            onClick={() => {
              setEditModal(!editModal);
              editMyJournals(editId, editJournal).then((response) => {
                setEditJournal('');
                setSideBarUpdateData(true);
              });
            }}
          >
            Submit
          </Button>
          <Button color="secondary" onClick={handlemodal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default JournalSidebar;
