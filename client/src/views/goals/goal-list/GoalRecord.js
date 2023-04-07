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
  Progress,
  Label,
  FormGroup
} from 'reactstrap';

// ** Import Components
import NewModal from './NewModal';

// ** Styles
import '@styles/react/libs/drag-and-drop/drag-and-drop.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';

import useColumns from './useColumns';
import { useDispatch, useSelector } from 'react-redux';
import { setGoalsReducer } from '../store/reducer';
import CreateNewModal from '../createNew/CreateNewModal';

import AddGoalModal from '../goal-view/AddGoalModal';
import EditGoalModal from '../goal-view/EditGoalModal';
import withReactContent from 'sweetalert2-react-content';
import { goalsEditAction, goalsEditActionMuted, subGoalsDeleteAction, subGoalsFetchAction } from '../../taskngoals/store/actions';
import RecordSubGoalModal from './RecordSubGoalModal';

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
      selector: (row) => row.name,
      width: '45%',
      cell: (row) => (
        <div className="w-100">
          <div className="d-flex justify-content-between">
            <p className="my-0 py-0">{row.name}</p>

            <Badge className="text-capitalize" color={statusObj[row.status]} pill>
              {row.status}
            </Badge>
          </div>
          <span className="text-muted">{row.target}</span>
        </div>
      )
    },
    // {
    //   name: 'GOAL TYPE',
    //   selector: (row) => row.name
    // },
    // {
    //   name: 'TARGET',
    //   selector: (row) => row.target
    // },

    // {
    //   name: 'Start Date',
    //   selector: (row) => <span>{convertDate(row.startDate)}</span>
    // },
    {
      name: 'END',
      width: '15%',
      selector: (row) => <span>{convertDate(row.endDate)}</span>
    },
    {
      name: 'PROGRESS',
      width: '20%',
      selector: (row) => row.progress,
      cell: (row) => (
        <div className="w-100">
          <span className="d-block text-center">{row.status === 'done' ? 100 : 0}%</span>
          <Progress className="w-100" value={row.status === 'done' ? 100 : 0}></Progress>
        </div>
      )
    },
    // {
    //   name: 'STATUS',
    //   minWidth:'10%',
    //   sortable: true,
    //   sortField: 'status',
    //   selector: (row) => row.status,
    //   cell: (row) => (
    //     <Badge className="text-capitalize" color={statusObj[row.status]} pill>
    //       {row.status}
    //     </Badge>
    //   )
    // },
    {
      name: 'ACCOMPLISH',
      width: '20%',
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

const GoalRecord = (props) => {
  // ** Props
  const {
    store,
    collapse,
    labelColors,
    dispatch,
    getTasks,
    workspaceId,
    updateTask,
    selectedWorkspace,
    selectTask,
    // reOrderTasks,
    handleTaskSidebar,
    handleMainSidebar,
    handleWorkspaceCollapse,
    task,
    row,
    subHabit,
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
  const [openRecordProgress, setOpenRecordProgress] = useState(false);
  const [subGoal, setSubGoal] = useState({})
  const [type, setType] = useState('sub'); //sub || origin
  const [newProgress, setNewProgress] = useState({ currentProgress: task?.currentProgress });

  const paramsURL = useParams();

  const MySwal = withReactContent(Swal);
  const subGoalsList = useSelector((state) => state.goals.subGoalsList);

  // ** TOGGLERS
  const toggleNewGoalModal = () => setNewGoalModal(!newGoalModal);
  const toggleHabitDetails = (task) => {
    setSelectedTask(task);
    setOpenHabitDetails(!openHabitDetails);
  };
  const toggleRecordProgress = (row) => {
    setOpenRecordProgress(!openRecordProgress);
    setSubGoal(row);
  }
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
      text: 'Are you sure you want to delete the Goal?',
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
      dispatch(subGoalsDeleteAction(row._id, task._id))
    }
  };
  useEffect(() => {
    // setTaskSearchResult(row.subGoals);
  }, [row]);
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
    let resultData = row.subGoals;
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
  const conditionalRowStyles = [
    {
      when: row => row.status === "Complete",
      style: {
        backgroundColor: "#cfffcf",
      }
    }
  ];
  const handleAccomplishClicked = (data) => {
    const temp = row?.subGoals?.map((x) => {
      let t = x;
      if (t._id === data._id) {
        t = { ...t, status: 'done' };
      }
      return t;
    });
    const goals = store?.goals?.map((x) => {
      let t = x;
      if (x._id === row?._id) {
        t = { ...t, subGoals: temp };
      }
      return t;
    });
    setSelectedTask(goals.find((x) => x._id === row._id));
    dispatch(setGoalsReducer(goals));
  };
  const { columns } = useColumns(
    { toggleHabitDetails },
    { handleOpenAddSubHabit },
    { handleOpenEdit },
    { handleOpenDelete },
    { handleAccomplishClicked },
    { toggleRecordProgress },
  );
  useEffect(() => {
    dispatch(subGoalsFetchAction(task._id))
  }, [])
  useEffect(() => {
    setTaskSearchResult(subGoalsList)
    dispatch(goalsEditActionMuted(task?._id,{status:subGoalsList.length}))
  }, [subGoalsList])


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
            className="task-task-list media-list p-0 m-0"
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
              conditionalRowStyles={conditionalRowStyles}
              pagination
            />
          </ReactSortable>
        ) : (
          row?.progressType === "CurrentProgress" ?
            <div className="bg-white p-2" >
              <div className=" d-flex justify-content-between">
                <h5>CurrentProgress: {newProgress.currentProgress} {task?.measureLabel}</h5>
                <h5>Target: {row.measureTo} {task?.measureLabel}</h5>
              </div>
              <div className="mt-2">
                <Input type="range" value={newProgress.currentProgress} onChange={(e) => setNewProgress({ currentProgress: e.target.value })} max={row?.measureTo
                }></Input>
              </div>
              <div className="d-flex mt-2 justify-content-end">
                <Button outline color="primary" onClick={() => { dispatch(goalsEditAction(task?._id,workspaceId,newProgress)) }} >Save</Button>
              </div>
            </div>
            :
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

  const handleSetList = (e) => { };
  return (
    <div className="tasks-area">
      <div className="content-body">
        <div className="task-app-list">
          <div className="app-fixed-search d-flex align-items-center">
            <div className="d-flex align-content-center justify-content-between w-100">
              <InputGroup className="input-group-merge py-50">
                <InputGroupText style={{ borderRadius: '0', border: 'none' }}>
                  <Search className="text-muted" size={14} />
                </InputGroupText>
                <Input
                  placeholder="Search Goal"
                  value={query}
                  onChange={handleFilter}
                  style={{ borderRadius: '0', border: 'none' }}
                />
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
                onClick={() => subHabit(task, "sub")}
                disabled={!store.boards.length || task.progressType === "CurrentProgress"}
              >
                <Plus size={16} />
              </Button.Ripple>
            </div>
            <CreateNewModal open={newGoalModal} toggle={toggleNewGoalModal} />
            <RecordSubGoalModal parentId={task?._id} goal={subGoal} toggle={toggleRecordProgress} modal={openRecordProgress} workspaceId={workspaceId} />
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
      </div>
    </div>
  );
};

export default GoalRecord;
