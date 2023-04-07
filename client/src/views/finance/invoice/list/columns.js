/* eslint-disable no-unused-vars */
// ** React Imports

import { useState } from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

// ** Custom Components
import Avatar from '@components/avatar';
// ** Reactstrap Imports
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  DropdownToggle,
  UncontrolledTooltip,
  UncontrolledDropdown
} from 'reactstrap';

// ** Third Party Components
import {
  Eye,
  Send,
  Edit,
  Copy,
  Save,
  Info,
  Trash,
  PieChart,
  Download,
  TrendingUp,
  CheckCircle,
  MoreVertical,
  ArrowDownCircle
} from 'react-feather';
import moment from 'moment';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { deleteinovice, sendInvoiceEmail } from '../../../../requests/invoice/invoice';
import { toast } from 'react-toastify';



// ** Vars
const invoiceStatusObj = {
  SENT: { color: 'light-secondary', icon: Send },
  PAID: { color: 'light-success', icon: CheckCircle },
  DRAFT: { color: 'light-primary', icon: Save },
  'DUE': { color: 'light-danger', icon: Info },
  'PARTIAL PAYMENT': { color: 'light-warning', icon: PieChart }
};



// ** renders client column
const renderClient = (row) => {

  const stateNum = Math.floor(Math.random() * 6),
    states = [
      'light-success',
      'light-danger',
      'light-warning',
      'light-info',
      'light-primary',
      'light-secondary'
    ],
    color = states[stateNum];

  if (row?.avatar?.length) {
    return <Avatar className="me-50" img={row?.avatar} width="32" height="32" />;
  } else {
    return (
      <Avatar
        color={color}
        className="me-50"
        content={row?.client ? row.client.name : 'John Doe'}
        initials
      />
    );
  }
};

const MySwal = withReactContent(Swal);

const handleRemove = async(id)=>{
  const res = await MySwal.fire({
    title: 'Delete?',
    text: 'Are you sure to delete?',
    icon: 'danger',
    showCancelButton: true,
    confirmButtonText: 'Delete',
    customClass: {
      confirmButton: 'btn btn-danger',
      cancelButton: 'btn btn-outline-danger ms-1'
    },
    buttonsStyling: false
  })
  if(res.value){
    //delete 
    await deleteinovice(id);
  }
}


const handleSendMail = (row)=>{
  let payload ={title:'',message:'',invoiceId:row?._id,recipient:row?.customer[0]?.email}
  sendInvoiceEmail(payload).then(x=>{
    toast.success("Email sent successfully")
  })
}



// ** Table columns
export const columns = [
  {
    name: 'No.',
    sortable: true,
    sortField: 'no',
    //width: '80px',
    width:"8%",
    cell: (row) => (
      <Link
        to={{
          pathname: `/invoice/preview/${row._id}`,
          state: {
            ...row
          }
        }}
      >{`#${row.no}`}</Link>
    )
  },
  {
    name: 'Client',
    sortable: true,
    width: '20%',
    sortField: 'client.name',
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
          {renderClient(row)}
          <div className="d-flex flex-column">
            <h6 className="user-name text-truncate mb-0">{name}</h6>
            <Link
              to={{
                pathname: `/invoice/preview/${row._id}`,
                state: {
                  ...row
                }
              }}
            >
              <small className="text-truncate mb-0">{row?.customer[0]?.fullName}</small>
            </Link>
          </div>
        </div>
      );
    }
  },
  {
    name: 'Total',
    sortable: true,
    // minWidth: '100px',
    width:"10%",
    sortField: 'totalAmount',
    cell: (row) => <span>${row?.totalAmount + (row?.tax || 0) -(row?.discount || 0) || 0}</span>
  },
  {
    name: 'Paid',
    sortable: true,
    // minWidth: '100px',
    width:"10%",
    sortField: 'paidAmount',
    cell: (row) => <span>${row?.paidAmount}</span>
  },
  {
    name: 'Remain',
    sortable: true,
    // minWidth: '100px',
    //sortField: 'paidAmount',
    width:"10%",
    cell: (row) => <span>${row?.totalAmount + (row?.tax || 0) -(row?.discount || 0) - (row?.paidAmount || 0)}</span>
  },
  {
    sortable: true,
    // minWidth: '100px',
    name: 'Status',
    sortField: 'status',
    width:"15%",
    cell: (row) => (
      <div>
        <Badge color={invoiceStatusObj[row?.status]?.color}>{row?.status}</Badge>
      </div>
    )
  },
  // {
  //   name: 'Issue Date',
  //   sortable: true,
  //   // minWidth: '100px',
  //   sortField: 'date',
  //   width:"10%",
  //   cell: (row) => <span>{moment(row.date).format('MM/DD/YYYY')}</span>
  // },
  
  {
    sortable: true,
    name: 'Due',
    // minWidth: '100px',
    sortField: 'dueDate',
    width:"12%",
    cell: (row) => <span>{moment(row.dueDate).format('MM/DD/YYYY')}</span>
  },
  {
    name: 'Action',
    // minWidth: '100px',
    width:"10%",
    cell: (row) => (
      <div className="column-action d-flex align-items-center">
        <Send className="cursor-pointer" size={17} id={`send-tooltip-${row._id}`} onClick={()=>handleSendMail(row)}/>
        <UncontrolledTooltip placement="top" target={`send-tooltip-${row._id}`}>
          Send Mail
        </UncontrolledTooltip>
        <Link to={`/invoice-preview/${row._id}`} target="_blank" id={`pw-tooltip-${row._id}`}>
          <Eye size={17} className="mx-1" />
        </Link>
        <UncontrolledTooltip placement="top" target={`pw-tooltip-${row._id}`}>
          Preview Invoice
        </UncontrolledTooltip>
        <Trash className="cursor-pointer text-danger"  size={17} id={`remove-tooltip-${row._id}`} onClick={()=>handleRemove(row._id)}/>
        <UncontrolledTooltip placement="top" target={`remove-tooltip-${row._id}`}>
          Remove
        </UncontrolledTooltip>
        
      </div>
    )
  }
];
