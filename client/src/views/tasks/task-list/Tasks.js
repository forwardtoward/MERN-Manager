// ** React Imports
import { useEffect, useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

// ** Custom Components
import Avatar from '@components/avatar';
import AvatarGroup from '@components/avatar-group';
import DataTable from 'react-data-table-component';

// ** Blank Avatar Image
import blankAvatar from '@src/assets/images/avatars/avatar-blank.png';

// ** Third Party Components
import classnames from 'classnames';
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
  ModalFooter
} from 'reactstrap';

// ** Import Components
import Workspace from '../../apps/workspace/index';
import NewModal from './NewModal';

// ** Styles
import '@styles/react/libs/drag-and-drop/drag-and-drop.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';

const badgeColor = ['danger', 'primary', 'success', 'warning', 'info', 'secondary'];

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
  const [newGoalModal, setNewGoalModal] = useState(false);
  const [delBtnEnable, setDelBtnEnable] = useState(false);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('');
  const [taskSearchResult, setTaskSearchResult] = useState([]);
  const [deleteTaskArr, setDeleteTaskArr] = useState([]);
  const [modalType, setModalType] = useState(0);

  const paramsURL = useParams();

  useMemo(() => {
    setTaskSearchResult(store.tasks);
  }, [store.tasks]);

  var params = {
    filter: paramsURL.filter || '',
    q: '',
    sortBy: '',
    tag: paramsURL.tag || ''
  };

  // ** Function to selectTask on click
  const handleTaskClick = (obj) => {
    dispatch(selectTask(obj));
    handleTaskSidebar();
  };

  const renderAssignee = (row) => {
    let target = `t${row.title
      .replace(/[^\w ]/g, '')
      .split(' ')
      .join('-')}`;
    let tmpValue = 0;
    Array.from(row?.title).forEach((x, index) => {
      tmpValue += x.codePointAt(0) * (index + 1);
    });
    const stateNum = tmpValue % 6,
      states = [
        'light-success',
        'light-danger',
        'light-warning',
        'light-info',
        'light-primary',
        'light-secondary'
      ],
      color = states[stateNum];

    return (
      <div className="own-avatar">
        {row.title ? (
          <UncontrolledTooltip placement={row.placement} target={target}>
            {row.title}
          </UncontrolledTooltip>
        ) : null}
        {row?.img ? (
          <Avatar
            // className={classnames('pull-up', {
            //   [row.className]: row.className
            // })}
            img={row.img}
            width="32"
            height="32"
            {...(row.title
              ? {
                  id: target
                }
              : {})}
          />
        ) : (
          <Avatar
            color={color || 'primary'}
            // className={classnames('pull-up', {
            //   [row.className]: row.className
            // })}
            content={row.title || 'John Doe'}
            {...(row.title
              ? {
                  id: target
                }
              : {})}
            width="32"
            height="32"
            initials
          />
        )}
      </div>
    );
  };

  const renderAssignees = (data) => {
    return <div className="own-avatar-group">{data.map((row) => renderAssignee(row))}</div>;
  };

  const handleRowSelected = (e) => {
    setDelBtnEnable(e.selectedRows.length > 0);
    setDeleteTaskArr(e.selectedRows);
  };

  const updateAllSelection = (data) => {
    const { isChecked } = data;
    if (isChecked) {
      setDeleteTaskArr(store.tasks);
    } else {
      setDeleteTaskArr([]);
    }
  };

  // ** Renders task tags
  const renderTags = (arr) => {
    // const labelColors = {
    //   App: 'info',
    //   UX: 'success',
    //   Images: 'warning',
    //   Forms: 'success',
    //   'Code Review': 'danger',
    //   'Charts & Maps': 'primary'
    // };

    return arr.map((item) => (
      <Badge className="text-capitalize" key={item} color={labelColors[item]} pill>
        {item}
      </Badge>
    ));
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

  const selectBadgeColor = (data) => {
    const boardIdList = store.boards.map((x) => x._id);
    const index = boardIdList.indexOf(data.boardId);
    return `light-${badgeColor[index]}`;
  };

  // ** Renders Avatar
  const renderAvatar = (obj) => {
    const item = obj.assignedTo;

    return item.length ? (
      <div>{renderAssignees(item)}</div>
    ) : (
      <Avatar img={blankAvatar} imgHeight="32" imgWidth="32" />
    );
  };
  const columns = [
    {
      name: 'TASK NAME',
      sortable: true,
      maxWidth: '20%',
      selector: (row) => row.title,
      cell: (row) => (
        <div
          className="d-flex align-items-center"
          style={{ cursor: 'pointer', position: 'absolute', left: 0 }}
        >
          <div onClick={() => handleTaskClick(row)}>{row.title}</div>
        </div>
      )
    },
    {
      name: 'START',
      sortable: true,
      maxWidth: '14%',
      selector: (row) => row.createdAt,
      cell: (row) => {
        let date = new Date(row.createdAt).toLocaleDateString();
        let time = new Date(row.createdAt).toLocaleTimeString();
        return (
          <div
            className="d-flex flex-column align-items-center"
            style={{ cursor: 'pointer' }}
            onClick={() => handleTaskClick(row)}
          >
            <span>{date}</span>
            <span>{time}</span>
          </div>
        );
      }
    },
    {
      name: 'END DATE',
      sortable: true,
      maxWidth: '14%',
      selector: (row) => row.dueDate,
      cell: (row) => {
        if (row.dueDate) {
          let date = new Date(row.createdAt).toLocaleDateString();
          let time = new Date(row.createdAt).toLocaleTimeString();
          return (
            <div
              className="d-flex flex-column align-items-center"
              style={{ cursor: 'pointer' }}
              onClick={() => handleTaskClick(row)}
            >
              <span>{date}</span>
              <span>{time}</span>
            </div>
          );
        } else {
          return 'Not selected';
        }
      }
    },
    {
      name: 'ASSIGNEES',
      maxWidth: '12%',
      selector: (row) => (row.assignedTo ? renderAvatar(row) : null)
    },
    {
      name: 'STATUS',
      sortable: true,
      maxWidth: '20%',
      selector: (row) => store.boards.filter((x) => x._id === row.boardId)[0]?.title || '',
      cell: (row) => {
        return (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: 'pointer' }}
            onClick={() => handleTaskClick(row)}
          >
            <Badge
              key={`badge_${Math.floor(Math.random() * 1000 + Math.random() * 1000)}`}
              pill
              color={selectBadgeColor(row)}
            >
              {store.boards.filter((x) => x._id === row.boardId)[0]?.title || ''}
            </Badge>
            {/* {row.labels.length ? (
              <div className="badge-wrapper me-1">{renderTags(row.labels)}</div>
            ) : null} */}
          </div>
        );
        // return row.boardId;
      }
    },
    {
      name: 'LAST ACTIVITY',
      maxWidth: '15%',
      selector: (row) => row?.lastActivity
    },
    {
      name: 'ACTION',
      maxWidth: '5%',
      cell: (row) => {
        return (
          <div className="column-action" style={{ marginLeft: '1.2rem' }}>
            <UncontrolledDropdown>
              <DropdownToggle
                className="btn btn-sm"
                tag="div"
                href="/"
                onClick={(e) => e.preventDefault()}
              >
                <MoreVertical className="text-body" size={16} />
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem
                  tag={'span'}
                  className="w-100"
                  onClick={(e) => {
                    e.preventDefault();
                    handleTaskClick(row);
                  }}
                >
                  <Edit size={'14px'} style={{ marginRight: '10px' }} />
                  Edit
                </DropdownItem>
                {/* <DropdownItem
                  tag={Link}
                  to="/"
                  onClick={(e) => {
                    e.preventDefault();
                    setModalType(3);
                  }}
                >
                  <Trash2 size={'14px'} style={{ marginRight: '10px' }} />
                  Delete
                </DropdownItem> */}
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        );
      }
    }
  ];
  // ** Render Goals
  const renderListTasks = () => {
    return (
      // <PerfectScrollbar
      //   className="list-group task-task-list-wrapper"
      //   options={{ wheelPropagation: true }}
      //   containerRef={(ref) => {
      //     if (ref) {
      //       ref._getBoundingClientRect = ref.getBoundingClientRect;

      //       ref.getBoundingClientRect = () => {
      //         const original = ref._getBoundingClientRect();

      //         return {
      //           ...original,
      //           height: Math.floor(original.height)
      //         };
      //       };
      //     }
      //   }}
      // >
      <div className="list-group task-task-list-wrapper">
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
              onRowClicked={handleTaskClick}
              style={{ cursor: 'pointer' }}
              sortIcon={<ChevronDown size={14} />}
              onSelectedRowsChange={handleRowSelected}
              selectableRows
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
            <h5>
              No Items Found.
              {!store.boards.length ? (
                <>
                  <br />
                  <br /> Please create a new board using the top right corner first button.
                  <br />
                  <br /> And then create a new task using the second button.
                </>
              ) : (
                !store.tasks.length && (
                  <>
                    <br />
                    <br /> Please create a new task using the top right corner "+" button.
                  </>
                )
              )}
            </h5>
          </div>
        )}
      </div>
      // {/* </PerfectScrollbar> */}
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
            onClick={() => setModalType(2)}
            disabled={!store.boards.length}
          >
            <Plus size={16} />
          </Button.Ripple>
          <Button.Ripple
            className="btn-icon me-1"
            outline
            color="primary"
            onClick={() => setModalType(3)}
            disabled={!delBtnEnable}
          >
            <Trash size={16} />
          </Button.Ripple>
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
          setDelBtnEnable={setDelBtnEnable}
        />
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
