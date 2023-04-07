// ** React Imports
import { useEffect, useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

// ** Custom Components
import Avatar from '@components/avatar';
import AvatarGroup from '@components/avatar-group';

// ** Blank Avatar Image
import blankAvatar from '@src/assets/images/avatars/avatar-blank.png';

// ** Third Party Components
import classnames from 'classnames';
import { ReactSortable } from 'react-sortablejs';
import PerfectScrollbar from 'react-perfect-scrollbar';
import DataTable from 'react-data-table-component';
import ReactPaginate from 'react-paginate';
import { BiCalendarEvent } from 'react-icons/bi';
import { BsPrinter } from 'react-icons/bs';
import {
  Menu,
  Search,
  MoreVertical,
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
  CheckCircle,
  ChevronDown,
  TrendingUp,
  Download,
  Share,
  FileText,
  Upload
} from 'react-feather';
import { AiOutlineDelete } from 'react-icons/ai';

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
  Card,
  Row,
  Col,
  Label
} from 'reactstrap';

// ** Import Components
import NewModal from './NewModal';

// ** Styles
import '@styles/react/libs/drag-and-drop/drag-and-drop.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import useColumns from './useColumns';

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
  const [taskSearchResult, setTaskSearchResult] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // ** Columns
  const { columns } = useColumns();

  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  useMemo(() => {
    setTaskSearchResult(store.tasks);
  }, [store]);

  // ** Custom Table Header
  const CustomTableHeader = () => {
    return (
      <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
        <Row>
          <Col xl="2" className="d-flex align-items-center p-0">
            <div className="d-flex align-items-center w-100">
              <Input
                className="mx-50"
                type="select"
                id="rows-per-page"
                value={rowsPerPage}
                onChange={handlePerPage}
                style={{ width: '5rem' }}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </Input>
              <label htmlFor="rows-per-page">Entries</label>
            </div>
          </Col>
          <Col
            xl="10"
            className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
          >
            <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
              <Input
                id="search-invoice"
                className="ms-1 w-100"
                type="text"
                // value={tempValue}
                onChange={(e) => {
                  clearTimeout(typingTimer);
                  typingTimer = setTimeout(() => doneTyping(e.target.value), doneTypingInterval);
                }}
                placeholder="Search..."
              />
            </div>
            <div className="d-flex text-center">
              <div>
                <Button
                  className="btn-icon me-1"
                  outline
                  color="primary"
                  // onClick={() => toggle ((p) => !p)}
                >
                  <AiOutlineDelete size={16} />
                </Button>
              </div>
              <div>
                <Button className="btn-icon me-1" outline color="primary" onClick={() => {}}>
                  {/* <BiUser size={16} /> */}
                  <TrendingUp size={16} />
                </Button>
              </div>
              <div>
                <Button className="btn-icon me-1" outline color="primary" onClick={() => {}}>
                  <BsPrinter size={16} />
                </Button>
              </div>

              <div>
                <Button.Ripple className="btn-icon me-1" outline color="primary" onClick={() => {}}>
                  <Download size={16} />
                </Button.Ripple>
              </div>
            </div>
            <div className="d-flex align-items-center table-header-actions">
              <UncontrolledDropdown className="me-1">
                <DropdownToggle color="secondary" caret outline>
                  <Share className="font-small-4 me-50" />
                  <span className="align-middle">Export</span>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    className="w-100"
                    onClick={() => {
                      // downloadCSV(store.data)
                    }}
                  >
                    <FileText className="font-small-4 me-50" />
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <Button
                style={{ fontSize: '12px', whiteSpace: 'nowrap' }}
                className="add-new-user"
                color="primary"
              >
                Add New Lead
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  };
};

export default TaskList;
