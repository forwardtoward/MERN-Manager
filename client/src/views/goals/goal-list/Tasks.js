// ** React Imports
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// ** Custom Components
import DataTable from 'react-data-table-component';

// ** Third Party Components
import { ReactSortable } from 'react-sortablejs';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Menu,
  Search,
  MoreVertical,
  ChevronDown,
  Edit,
  Trash2,
  Star,
  Copy,
  Trash,
  Info,
  Share2,
  Plus,
  Filter,
  Users,
  Columns,
  Calendar,
  List,
  CheckCircle
} from 'react-feather';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

// ** Reactstrap Imports
import {
  Input,
  Button,
  Badge,
  InputGroup,
  DropdownMenu,
  DropdownItem,
  InputGroupText,
  DropdownToggle,
  UncontrolledDropdown,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Progress
} from 'reactstrap';

// ** Import Components
import NewModal from './NewModal';

// ** Styles
import '@styles/react/libs/drag-and-drop/drag-and-drop.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import useColumns from './useColumns';
import { useDispatch } from 'react-redux';
import { setGoalsReducer } from '../store/reducer';
import CreateNewModal from '../createNew/CreateNewModal';

import AddGoalModal from '../goal-view/AddGoalModal';
import EditGoalModal from '../goal-view/EditGoalModal';
import withReactContent from 'sweetalert2-react-content';

const badgeColor = ['danger', 'primary', 'success', 'warning', 'info', 'secondary'];

// ** EXPANDED COMPONENT
const ExpandedComponent = ({ data, store }) => {
  const dispatch = useDispatch();
  //const store = useSelector((state) => state.myGoals);
  const statusObj = {
    pending: 'light-warning',
    active: 'light-success',
    inactive: 'light-secondary'
  };
  const convertDate = (date) => {
    const d = new Date(date);
    return (
      <span>
        {d.getUTCMonth() + 1}/{d.getDate()}/{d.getUTCFullYear()}
      </span>
    );
  };
  const handleStatusClicked = (row) => {
    let temp = row;
    if (row.progress < row.total) {
      temp = { ...row, progress: row.total };
      if (temp.progress === temp.total) {
        temp = { ...temp, status: 'done' };
      }
    }
    let goalTemp = store.goals.find((x) => {
      for (const i of x.subGoals) {
        if (i._id === row._id) {
          return x;
        }
      }
    });

    let tempSubGoals = goalTemp.subGoals?.map((x) => {
      if (x._id === temp._id) {
        return temp;
      }
      return x;
    });

    goalTemp = {
      ...goalTemp,
      subGoals: tempSubGoals,
      progress: tempSubGoals.filter((x) => x.status === 'done').length
    };
    const tempStore = store.goals.map((x) => {
      if (x._id === goalTemp._id) {
        return goalTemp;
      }
      return x;
    });
    dispatch(setGoalsReducer(tempStore));
  };
  const columns = [
    {
      name: 'GOAL NAME',
      selector: (row) => row.name
    },
    {
      name: 'GOAL TYPE',
      selector: (row) => row.name
    },
    {
      name: 'TARGET',
      selector: (row) => row.target
    },

    // {
    //   name: 'Start Date',
    //   selector: (row) => <span>{convertDate(row.startDate)}</span>
    // },
    {
      name: 'END',
      selector: (row) => <span>{convertDate(row.endDate)}</span>
    },
    {
      name: 'PROGRESS',
      selector: (row) => row.progress,
      cell: (row) => <Progress className="w-100" value={row.status === 'done' ? 100 : 0}></Progress>
    },
    {
      name: 'STATUS',
      width: '120px',
      sortable: true,
      sortField: 'status',
      selector: (row) => row.status,
      cell: (row) => (
        <Badge className="text-capitalize" color={statusObj[row.status]} pill>
          {row.status}
        </Badge>
      )
    },
    {
      name: 'ACCOMPLISH',
      width: '140px',
      // center: true,
      selector: (row) => row.isCompleted,
      cell: (row) =>
        row.status !== 'done' ? (
          <Button color="primary" size="sm" onClick={() => handleStatusClicked(row)}>
            <span className="text-small" style={{ fontSize: '11px' }}>
              Accomplish
            </span>
          </Button>
        ) : (
          <Button disabled="true" color="secondary" size="sm">
            <span style={{ fontSize: '11px' }}>Accomplish</span>
          </Button>
        )
    }
  ];
  return (
    <div className="container">
      <DataTable
        noHeader
        sortServer
        pagination
        responsive
        columns={columns}
        className="react-dataTable"
        data={data.subGoals}
        paginationPerPage={5}
        paginationRowsPerPageOptions={[2, 5, 10]}
      />
    </div>
  );
};

const TaskList = (props) => {
  // ** Props
  const {
    store,
    collapse,
    labelColors,
    dispatch,
    getTasks,
    updateTask,
    selectedWorkspace,
    selectTask,
    // reOrderTasks,
    handleTaskSidebar,
    handleMainSidebar,
    handleWorkspaceCollapse
  } = props;

  // ** States
  const [modalType, setModalType] = useState();
  const [newGoalModal, setNewGoalModal] = useState(false);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('');
  const [taskSearchResult, setTaskSearchResult] = useState([]);
  const [deleteTaskArr, setDeleteTaskArr] = useState([]);
  const [openHabitDetails, setOpenHabitDetails] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const [openAddSubHabit, setOpenAddSubHabit] = useState(false);
  const [openEditHabit, setOpenEditHabit] = useState(false);
  const [type, setType] = useState('sub'); //sub || origin

  const paramsURL = useParams();

  const MySwal = withReactContent(Swal);

  // ** TOGGLERS
  const toggleNewGoalModal = () => setNewGoalModal(!newGoalModal);
  const toggleHabitDetails = (task) => {
    setSelectedTask(task);
    setOpenHabitDetails(!openHabitDetails);
  };
  const handleOpenAddSubHabit = (row, type) => {
    setSelectedTask(row);
    setType(type);
    setOpenAddSubHabit(!openAddSubHabit);
  };
  //{handleOpenAddSubHabit},{handleOpenEdit},{handleOpenDelete}
  const handleOpenEdit = (row, type) => {
    setSelectedTask(row);
    setType(type);
    setOpenEditHabit(!openEditHabit);
  };
  const handleOpenDelete = async (row) => {
    const result = await MySwal.fire({
      title: 'Delete?',
      text: 'Are you sure you want to delete the habit?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    });
    if (result.value) {
      //handle deleting data
      toast.success('Habit deleted successfully!');
    }
  };
  useEffect(() => {
    // setTaskSearchResult(store.goals);
  }, [store]);
  var params = {
    filter: paramsURL.filter || '',
    q: '',
    sortBy: '',
    tag: paramsURL.tag || ''
  };

  // ** Function to selectTask on click
  const handleTaskClick = (obj) => {
    //dispatch(selectTask(obj));
    //handleTaskSidebar();
  };

  // ** Search Tasks
  const taskSearch = (searchParams) => {
    let resultData = store.tasks;
    if (searchParams.q) {
      resultData = store.tasks.filter((x) => {
        let searchTxt = `${x.title}${x.description}${x.labels}`;
        x.assignedTo.forEach((element) => {
          searchTxt += element.title;
        });
        return searchTxt.toLowerCase().indexOf(searchParams.q) > -1;
      });
    }
    setTaskSearchResult(resultData);
  };

  const { columns } = useColumns(
    { toggleHabitDetails },
    { handleOpenAddSubHabit },
    { handleOpenEdit },
    { handleOpenDelete }
  );

  // ** Render Goals
  const renderListTasks = () => {
    return (
      <PerfectScrollbar
        className="list-group task-task-list-wrapper"
        options={{ wheelPropagation: false }}
        containerRef={(ref) => {
          if (ref) {
            ref._getBoundingClientRect = ref.getBoundingClientRect;

            ref.getBoundingClientRect = () => {
              const original = ref._getBoundingClientRect();

              return {
                ...original,
                height: Math.floor(original.height)
              };
            };
          }
        }}
      >
        {taskSearchResult.length ? (
          <ReactSortable
            tag="ul"
            list={taskSearchResult}
            handle=".drag-icon"
            className="task-task-list media-list"
            setList={(newState) => handleSetList(newState)}
            overFlow="auto"
          >
            <DataTable
              className="react-dataTable"
              responsive
              columns={columns}
              data={taskSearchResult}
              //onRowClicked={()=>handleTaskClick}
              style={{ cursor: 'pointer' }}
              sortIcon={<ChevronDown size={14} />}
              expandableRows
              expandableRowsComponent={ExpandedComponent}
              expandableRowsComponentProps={{ store: store }}
              pagination
            />
            {/* {taskSearchResult.map((item) => {
              return (
                <li
                  key={item.id}
                  onClick={() => handleTaskClick(item)}
                  className={classnames('task-item', {
                    completed: item.isCompleted
                  })}
                >
                  <div className="task-title-wrapper">
                    <div className="task-title-area">
                      <MoreVertical className="drag-icon" />
                      <div className="form-check">
                        <Input
                          type="checkbox"
                          id={item.title}
                          checked={item.isCompleted}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => {
                            updateTaskSelection({
                              ...item,
                              isChecked: e.target.checked
                            });
                          }}
                        />
                      </div>
                      <span className="task-title">{item.title}</span>
                    </div>
                    <div className="task-item-action mt-lg-0 mt-50">
                      {item.labels.length ? (
                        <div className="badge-wrapper me-1">{renderTags(item.labels)}</div>
                      ) : null}
                      {item.dueDate ? (
                        <small className="text-nowrap text-muted me-1">
                          {new Date(item.dueDate).toLocaleString('default', { month: 'short' })}{' '}
                          {new Date(item.dueDate).getDate().toString().padStart(2, '0')}
                        </small>
                      ) : null}
                      {item.assignedTo ? renderAvatar(item) : null}
                    </div>
                  </div>
                </li>
              );
            })} */}
          </ReactSortable>
        ) : (
          <div className="no-results show">
            <h5>No Items Found</h5>
          </div>
        )}
      </PerfectScrollbar>
    );
  };

  // ** Function to taskSearch based on search query
  const handleFilter = (e) => {
    setQuery(e.target.value);
    params.q = e.target.value;
    params.sortBy = sort;
    taskSearch(params);
  };

  // ** Function to taskSearch based on sort
  const handleSort = (e, val) => {
    e.preventDefault();
    setSort(val);
    params.query = query;
    params.sortBy = val;
    taskSearch(params);
  };

  const handleSetList = (e) => {};
  return (
    <div className="task-app-list">
      <div className="app-fixed-search d-flex align-items-center">
        <div
          className="sidebar-toggle cursor-pointer d-block d-lg-none ms-1"
          onClick={handleMainSidebar}
        >
          <Menu size={21} />
        </div>
        <div className="d-flex align-content-center justify-content-between w-100">
          <InputGroup className="input-group-merge">
            <InputGroupText>
              <Search className="text-muted" size={14} />
            </InputGroupText>
            <Input placeholder="Search Task" value={query} onChange={handleFilter} />
          </InputGroup>
        </div>
        <div className="d-flex">
          <Button.Ripple
            className="btn-icon me-1"
            outline
            color="primary"
            onClick={() => setModalType(1)}
            disabled={
              store.selectedWorkspace.title === 'Personal' ||
              store.selectedWorkspace.title === 'Business'
            }
          >
            <Columns size={16} />
          </Button.Ripple>
          <Button.Ripple
            className="btn-icon me-1"
            outline
            color="primary"
            onClick={toggleNewGoalModal}
            disabled={!store.boards.length}
          >
            <Plus size={16} />
          </Button.Ripple>
          {/* <Button.Ripple
            className="btn-icon me-1"
            outline
            color="primary"
            onClick={() => setModalType(3)}
            disabled={!delBtnEnable}
          >
            <Trash size={16} />
          </Button.Ripple> */}
          {/* <Button color="flat-dark" className="d-flex">
            <Filter size={14} />
            <span className="align-middle ms-25">Filters</span>
          </Button>
          <Button color="flat-dark" className="d-flex">
            <Users size={14} />
            <span className="align-middle ms-25">Assignee</span>
          </Button> */}
        </div>
        <NewModal
          store={store}
          dispatch={dispatch}
          modalType={modalType}
          deleteTaskArr={deleteTaskArr}
          setDeleteTaskArr={setDeleteTaskArr}
          setModalType={setModalType}
        />
        <CreateNewModal open={newGoalModal} toggle={toggleNewGoalModal} />
        {/* {store && (
          <GoalDetails open={openHabitDetails} toggle={toggleHabitDetails} task={selectedTask} />
        )} */}
        {selectedTask && (
          <AddGoalModal
            toggle={handleOpenAddSubHabit}
            open={openAddSubHabit}
            task={selectedTask}
            type={type}
          />
        )}
        {selectedTask && (
          <EditGoalModal
            toggle={handleOpenEdit}
            open={openEditHabit}
            task={selectedTask}
            type={type}
          />
        )}
      </div>

      <PerfectScrollbar
        className="list-group task-list-wrapper bg-dark bg-opacity-10"
        options={{ wheelPropagation: false }}
      >
        {renderListTasks()}
      </PerfectScrollbar>
    </div>
  );
};

export default TaskList;
