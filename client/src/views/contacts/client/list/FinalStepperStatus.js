// ** React Imports
import React, { Fragment, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronDown, Edit2, Eye, Trash2, User } from 'react-feather';

// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import DataTable from 'react-data-table-component';
import ReactPaginate from 'react-paginate';
import { Badge, Button, Input } from 'reactstrap';
// import Avatar from '../../../components/avatar';
import Avatar from '@components/avatar';

import { promotedListAction, demoteClientAction } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';

// import { log } from 'console';
import { customInterIceptors } from '@src/lib/AxiosProvider';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { getEventInfo } from '../../../calendar/event/store';
// import { setErrors } from '../../../calendar/event/store';

const DailyAttendance = [
  { name: 'Maths Class', date: '01/13/23', type: 'New Member' },
  { name: 'English Class', date: '01/18/23', type: 'Personal' },
  { name: 'Science Class', date: '01/24/23', type: 'Business' },
  { name: 'Practice Class', date: '01/03/23', type: 'Business' },
  { name: 'Maths Class', date: '01/13/23', type: 'Other' },
  { name: 'English Class', date: '01/18/23', type: 'New Member' },
  { name: 'Science Class', date: '01/24/23', type: 'Other' },
  { name: 'Practice Class', date: '01/03/23', type: 'Information' },
  { name: 'Maths Class', date: '01/13/23', type: 'New Member' },
  { name: 'English Class', date: '01/18/23', type: 'Personal' },
  { name: 'Science Class', date: '01/24/23', type: 'Reschedule' },
  { name: 'Practice Class', date: '01/03/23', type: 'Business' }
];

const FinalStepperStatus = (props) => {
  const { stepper, selectedRows, selectedEventId } = props;
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  let promotedData = useSelector((state) => state?.clientContact?.promotedClientList);

  let promotedDataMain = promotedData?.length > 0 ? promotedData : null;
  const columns = [
    {
      name: 'Name',
      sortable: true,
      selector: (row) => row.fullName
    },
    {
      name: 'Email',
      sortable: true,
      selector: (row) => row.email
    },
    {
      name: 'Phone',
      sortable: true,
      selector: (row) => row.phone
    },
    {
      name: 'Status',
      sortable: true,
      selector: (row) => (
        <Badge className="text-capitalize" color="light-success" pill>
          Add Successful
        </Badge>
      )
    }
  ];
  const handleDeletePromoted = (id) => {
    const payload = { clientRankId: id };
    dispatch(demoteClientAction(payload));
  };

  const API = customInterIceptors();
  const history = useHistory();
  const dispatch = useDispatch();

  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };
  useEffect(() => {
    dispatch(promotedListAction());
  }, []);

  const CustomPagination = () => {
    const count = Math.ceil(promotedData?.length / rowsPerPage);
    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
      />
    );
  };
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  const handleNext = async () => {
    const addGuestsData = selectedRows.map((row) => {
      return {
        id: row._id,
        name: row.fullName,
        email: row.email,
        phone: row.phone,
        category: 'Client'
      };
    });
    const response = await API.post(`event/add-guests`, {
      data: addGuestsData,
      _id: selectedEventId,
      sendEmailChecked: true
    }).catch(function (error) {
      if (error.response) {
        return error.response;
      }
    });

    // console.log('response', response);
    if (response.status == 404) {
      toast.error(response.data.msg);
      dispatch(setErrors(response.data));
    }

    if (response.status == 200) {
      toast.success('OK! Guests added successfully');
      dispatch(getEventInfo(selectedEventId));
      history.push(`/event-details/${selectedEventId}`);
    }
    stepper.next();
  };

  return (
    <Fragment>
      <div className="react-dataTable mt-2">
        {selectedRows.length && (
          <DataTable
            noHeader
            pagination
            columns={columns}
            paginationPerPage={7}
            className="react-dataTable"
            sortIcon={<ChevronDown size={10} />}
            paginationDefaultPage={currentPage + 1}
            paginationComponent={CustomPagination}
            data={selectedRows}
            // selectableRowsComponent={BootstrapCheckbox}
            // selectableRows
          />
        )}
      </div>

      <div className="d-flex justify-content-between">
        <Button color="primary" className="btn-prev" onClick={() => stepper.previous()}>
          <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
          <span className="align-middle d-sm-inline-block d-none">Previous</span>
        </Button>
        <Button color="primary" className="btn-next" onClick={() => handleNext()}>
          <span className="align-middle d-sm-inline-block d-none">Close</span>
          <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
        </Button>
      </div>
    </Fragment>
  );
};

export default FinalStepperStatus;
