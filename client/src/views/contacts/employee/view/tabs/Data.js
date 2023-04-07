// ** Custom Components
import Avatar from '@components/avatar';

// ** Third Party Components
import axios from 'axios';
import { useContext, useState } from 'react';
import DataTable from 'react-data-table-component';
import Upload from './upload/Upload';
import SignDocumment from '../tabs/docSign';
import DocumentSignAndUpload from './docSign/document/signAndUpload/NewProgressionWizard';

import {
  MoreVertical,
  Edit,
  FileText,
  Archive,
  Trash,
  Send,
  Save,
  Info,
  PieChart,
  Download,
  TrendingUp,
  CheckCircle,
  ArrowDownCircle,
  Eye
} from 'react-feather';
import { CiCircleCheck } from 'react-icons/ci';
import { GrReactjs } from 'react-icons/gr';

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Progress,
  Label,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

// ** Reactstrap Imports
import { UncontrolledTooltip } from 'reactstrap';
import ModalTheme from '../../../../components/modal/ModalThemes';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useDispatch } from 'react-redux';
import { updateTaskStatusUserAction } from '../../../../settings/tabs/rolesandper/store/employee/action';
import ViewTask from './viewTask/ViewTask';
import { DocumentContext } from '../../../../../utility/context/Document';
import { getUserData } from '../../../../../auth/utils';
import { formatDateToMonthShort } from '../../../../../utility/Utils';
// ** Vars
const states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary'];

const invoiceStatusObj = {
  Sent: { color: 'light-secondary', icon: Send },
  Paid: { color: 'light-success', icon: CheckCircle },
  Draft: { color: 'light-primary', icon: Save },
  Downloaded: { color: 'light-info', icon: ArrowDownCircle },
  'Past Due': { color: 'light-danger', icon: Info },
  'Partial Payment': { color: 'light-warning', icon: PieChart }
};

const status = {
  pending: { title: 'Pending', color: 'light-info' },
  declined: { title: 'Denied', color: 'light-danger' },
  remind: { title: 'Remind', color: 'light-primary' },
  approved: { title: 'Completed', color: 'light-success' }
};

const signAndUpload = {
  1: { title: 'Sign', color: 'light-primary' },
  2: { title: 'Upload', color: 'light-info' }
};


export let data;

// ** Get initial Data
axios.get('/api/datatables/initial-data').then((response) => {
  data = response.data;
});




// ** Table Common Column
export const columns = [
  {
    name: 'Form Name ',
    minWidth: '220px',
    sortable: (row) => row.originTask[0].title,
    cell: (row) => (
      <div className="d-flex align-items-center">
        <Avatar
          className="me-1"
          color={'light-primary'}
          icon={<GrReactjs size={18} />}
          id={`av-tooltip-${row.id}`}
        />
        <div className="d-flex flex-column">
          <span className="text-truncate fw-bolder">{row.originTask[0].title}</span>
          <small className="text-muted">{row.originTask[0].description}</small>
        </div>
      </div>
    )
  },
  {
    name: 'Type',
    sortable: true,
    sortable: (row) => row.type,
    minWidth: '150px',
    cell: (row) => {
      const [modal2, setModal2] = useState(false);
      const [modal, setModal] = useState(false);

      const toggle = () => setModal(!modal);
      const toggle2 = () => setModal2(!modal2);

      return (
        <div>
          <Badge
            color={signAndUpload[row.signAndUpload ? 0 : 1].color}
            pill
            onClick={
              row.signAndUpload === 1
                ? (e) => {
                  e.preventDefault();
                  toggle2();
                }
                : (e) => {
                  e.preventDefault();
                  toggle();
                }
            }
          >
            {row.originTask[0].type}
          </Badge>

          <Modal
            fullscreen="lg"
            size="lg"
            centered="true"
            scrollable="false"
            isOpen={modal2}
            toggle={toggle2}
          >
            <ModalHeader toggle={toggle2}>Add Employee Task</ModalHeader>
            <ModalBody>
              <DocumentSignAndUpload />
            </ModalBody>
            <ModalFooter>{/* <SignDocumment /> */}</ModalFooter>
          </Modal>

          <Modal
            fullscreen="lg"
            size="lg"
            centered="true"
            scrollable="false"
            isOpen={modal}
            toggle={toggle}
          >
            <ModalHeader toggle={toggle}>Upload</ModalHeader>
            <ModalBody>
              <div className="d-flex justify-content-end">
                <Badge style={{ color: 'light-info' }}>Pending</Badge>
              </div>
              <Upload />
            </ModalBody>
          </Modal>
        </div>
      );
    }
  },
  {
    name: 'Status',
    minWidth: '150px',
    sortable: (row) => row.status,
    cell: (row) => {
      return (
        <Badge color={status[row.status].color} pill>
          {status[row.status].title}
        </Badge>
      );
    }
  },
  {
    name: 'Task',
    minWidth: '150px',
    sortable: (row) => row.status.title,
    cell: (row) => {
      const [viewModel, setViewModel] = useState(false);
      const viewToggle = () => setViewModel(!viewModel);
      
      return (
        <>
          <Button
            color="primary"
            className="btn btn-sm"
            outline
            onClick={(e) => {
              e.preventDefault();
              
              viewToggle();
            }}
          >
            View
          </Button>
          <ViewTask toggle={viewToggle} open={viewModel} empTask={row}/>
         
        </>
      );
    }
  },

  {
    name: 'Action',
    allowOverflow: true,
    cell: (row) => {
      return (
        <div className="d-flex">
          <UncontrolledDropdown>
            <DropdownToggle className="pe-" tag="span">
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu end>
              {/* <DropdownItem tag="a" href="/" className="w-100" onClick={(e) => e.preventDefault()}>
                <FileText size={15} />
                <span className="align-middle ms-50">Details</span>
              </DropdownItem> */}
              <DropdownItem tag="a" href="/" className="w-100" onClick={(e)=>{
                e.preventDefault();
                //dispatch(updateTaskStatusUserAction(row._id,{status:'archived',empId:row.empId}))
              }}>
                <Archive size={15} />
                <span className="align-middle ms-50">Archive</span>
              </DropdownItem>
              <DropdownItem tag="a" href="/" className="w-100" onClick={(e) => e.preventDefault()}>
                <Trash size={15} />
                <span className="align-middle ms-50">Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      );
    }
  }
];
const drowpstatus = {
  1: { title: 'Sent', color: 'light-primary' },
  2: { title: 'Opened', color: 'light-success' },
  3: { title: 'Signed', color: 'light-danger' },
  4: { title: 'Viewed', color: 'light-warning' },
  5: { title: 'Marked Complete', color: 'light-info' }
};

const ExpandableTable = ({data}) => {
  const formatDate = (date)=>{
    const d = new Date(date);
    return `${d.getUTCMonth()+1}/${d.getDate()}/${d.getFullYear()} `
  }
  const formatToMonth = (date) =>{
    const MONTHS = ['JAN', 'FEB', 'MARCH', 'APR', 'MAY', 'JUNE', 'JULY', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const d = new Date(date);
    return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}, ${formatDateToMonthShort(date)}`
  }
  const columns = [
    {
      name: 'Date',
      sortable: true,
      // minWidth: '150px',
      selector: (row) => row.createdAt,
      cell:(row)=><span>{formatDate(row.createdAt)}</span>
    },
    {
      name: 'By',
      sortable: true,
      // minWidth: '150px',
      cell: (row) => (
        <div className="d-flex align-items-center">
          <div className="user-info text-truncate ms-1">
            <span className="d-block fw-bold text-truncate">{row.by}</span>
          </div>
        </div>
      )
    },
    {
      name: 'Note',
      sortable: (row) => row.note,
      cell: (row) => {
        return (
          <div className="d-flex align-items-center">
            <span className="text-truncate fw-bolder">{row.note}</span>
          </div>
        );
      }
    },
    {
      name: 'Status',
      // minWidth: '150px',
      sortable: (row) => row.drowpstatus?.title,
      cell: (row) => {
        return (
          <Badge color={status[row.status].color} pill>
            {status[row.status].title}
          </Badge>
        );
      }
    },
    {
      name: 'History',
      sortable: true,
      minWidth: '220px',
      selector: (row) => row,
      cell: (row) => (
        <div className="d-flex align-items-center">
          <div className="user-info text-truncate ms-1">
            <span className="d-block fw-bold text-truncate">{formatToMonth(row.updatedAt)}</span>
          </div>
        </div>
      )
    }
  ];
  
  return (
    <div className="expandable-content p-2">
      <DataTable data={data.history} columns={columns}></DataTable>
    </div>
  );
};
// ** Table Intl Column
export const multiLingColumns = [
  {
    name: 'Name',
    sortable: true,
    minWidth: '200px',
    selector: (row) => row.full_name
  },
  {
    name: 'Position',
    sortable: true,
    minWidth: '250px',
    selector: (row) => row.post
  },
  {
    name: 'Email',
    sortable: true,
    minWidth: '250px',
    selector: (row) => row.email
  },
  {
    name: 'Date',
    sortable: true,
    minWidth: '150px',
    selector: (row) => row.start_date
  },

  {
    name: 'Salary',
    sortable: true,
    minWidth: '150px',
    selector: (row) => row.salary
  },
  {
    name: 'Status',
    sortable: true,
    minWidth: '150px',
    selector: (row) => row.status,
    cell: (row) => {
      return (
        <Badge color={status[row.status].color} pill>
          {status[row.status].title}
        </Badge>
      );
    }
  },
  {
    name: 'Actions',
    allowOverflow: true,
    cell: () => {
      return (
        <div className="d-flex">
          <UncontrolledDropdown>
            <DropdownToggle className="pe-1" tag="span">
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>
                <FileText size={15} />
                <span className="align-middle ms-50">Details</span>
              </DropdownItem>
              <DropdownItem>
                <Archive size={15} />
                <span className="align-middle ms-50">Archive</span>
              </DropdownItem>
              <DropdownItem>
                <Trash size={15} />
                <span className="align-middle ms-50">Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <Edit size={15} />
        </div>
      );
    }
  }
];

// ** Table Server Side Column
export const serverSideColumns = [
  {
    sortable: true,
    name: 'Full Name',
    minWidth: '225px',
    selector: (row) => row.full_name
  },
  {
    sortable: true,
    name: 'Email',
    minWidth: '250px',
    selector: (row) => row.email
  },
  {
    sortable: true,
    name: 'Position',
    minWidth: '250px',
    selector: (row) => row.post
  },
  {
    sortable: true,
    name: 'Office',
    minWidth: '150px',
    selector: (row) => row.city
  },
  {
    sortable: true,
    name: 'Start Date',
    minWidth: '150px',
    selector: (row) => row.start_date
  },
  {
    sortable: true,
    name: 'Salary',
    minWidth: '150px',
    selector: (row) => row.salary
  }
];

// ** Table Adv Search Column
export const advSearchColumns = [
  {
    name: 'Name',
    sortable: true,
    minWidth: '200px',
    selector: (row) => row.full_name
  },
  {
    name: 'Email',
    sortable: true,
    minWidth: '250px',
    selector: (row) => row.email
  },
  {
    name: 'Post',
    sortable: true,
    minWidth: '250px',
    selector: (row) => row.post
  },
  {
    name: 'City',
    sortable: true,
    minWidth: '150px',
    selector: (row) => row.city
  },
  {
    name: 'Date',
    sortable: true,
    minWidth: '150px',
    selector: (row) => row.start_date
  },

  {
    name: 'Salary',
    sortable: true,
    minWidth: '100px',
    selector: (row) => row.salary
  }
];

export default ExpandableTable;
