/* eslint-disable no-unused-vars */
import { Fragment, useEffect } from 'react';
// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs';

// ** User List Component

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap';

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal';

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from 'react-feather';

// ** Styles
import { useSelector } from 'react-redux';
import InvoiceSidbar from './InvoiceSidbar';
import { useState } from 'react';
import { columns } from './columns';
import ReactPaginate from 'react-paginate';
import { ChevronDown } from 'react-feather';
import DataTable from 'react-data-table-component';
import { Input, Card, CardTitle } from 'reactstrap';
import { getData } from '../store';
import { useDispatch } from 'react-redux';
import '@styles/react/apps/app-invoice.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import { fetchinvoicedata } from '../../../../requests/invoice/invoice';
import '@styles/react/apps/app-email.scss';
import { getInvoiceListAction } from '../store/action';
import { setInvoiceListReducer } from '../store/reducer';

const CustomHeader = ({ value, handleFilter, handlePerPage, rowsPerPage }) => {
  return (
    <div className="invoice-list-table-header w-100 py-2 ">
      <Row>
        <Col lg="4">
          <CardTitle className="h2 ">Invoice</CardTitle>
        </Col>
        <Col lg="8" className="d-flex justify-content-end align-items-center px-0 px-lg-1">
          <div className="d-flex align-items-center ">
            <label htmlFor="search-invoice">Search</label>
            <Input
              id="search-invoice"
              className="ms-50 me-2 w-100"
              type="text"
              value={value}
              onChange={(e) => handleFilter(e.target.value)}
              placeholder="Search Invoice"
            />
          </div>

          <div className="d-flex align-items-center me-2">
            <label htmlFor="rows-per-page">Show</label>
            <Input
              type="select"
              id="rows-per-page"
              value={rowsPerPage}
              onChange={handlePerPage}
              className="form-control ms-50 pe-3"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </Input>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const Client = () => {
  const clientStore = useSelector((state) => state.clientContact);
  // ** Store vars
  const dispatch = useDispatch();
  //const store = useSelector((state) => state.invoice);
  const { data } = fetchinvoicedata();
  // ** States
  const [value, setValue] = useState('');
  const [sort, setSort] = useState('desc');
  const [sortColumn, setSortColumn] = useState('id');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusValue, setStatusValue] = useState('Pending');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const store = useSelector((state) => state.userInvoice);
  useEffect(() => {
    dispatch(setInvoiceListReducer(data?.data));
  }, [data]);
  const handleFilter = (val) => {
    setValue(val);
    setTimeout(() => {
      dispatch(
        getData({
          sort,
          q: val,
          sortColumn,
          page: currentPage,
          perPage: rowsPerPage,
          status: statusValue
        })
      );
    }, 500);
  };

  const handlePerPage = (e) => {
    dispatch(
      getData({
        sort,
        q: value,
        sortColumn,
        page: currentPage,
        status: statusValue,
        perPage: parseInt(e.target.value)
      })
    );
    setRowsPerPage(parseInt(e.target.value));
  };

  const handleStatusValue = (e) => {
    setStatusValue(e.target.value);
    dispatch(
      getData({
        sort,
        q: value,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        status: e.target.value
      })
    );
  };

  const handlePagination = (page) => {
    dispatch(
      getData({
        sort,
        q: value,
        sortColumn,
        status: statusValue,
        perPage: rowsPerPage,
        page: page.selected + 1
      })
    );
    setCurrentPage(page.selected + 1);
  };

  const CustomPagination = () => {
    const count = Number((store?.invoiceList?.length / rowsPerPage).toFixed(0));

    return (
      <ReactPaginate
        nextLabel=""
        breakLabel="..."
        previousLabel=""
        pageCount={count || 1}
        activeClassName="active"
        breakClassName="page-item"
        pageClassName={'page-item'}
        breakLinkClassName="page-link"
        nextLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousLinkClassName={'page-link'}
        previousClassName={'page-item prev'}
        onPageChange={(page) => handlePagination(page)}
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        containerClassName={'pagination react-paginate justify-content-end p-1'}
      />
    );
  };
  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
    dispatch(
      getData({
        q: value,
        page: currentPage,
        sort: sortDirection,
        status: statusValue,
        perPage: rowsPerPage,
        sortColumn: column.sortField
      })
    );
  };

  return (
    <Fragment>
      {/* <div className="w-100">
        <Breadcrumbs
          breadCrumbTitle="Invoice"
          breadCrumbParent="Finance"
          breadCrumbActive="Invoice"
        />
      </div> */}
      <div className="app-user-list w-100">
        <Row>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="primary"
              statTitle="Total Invoices"
              icon={<User size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">{data?.data?.length}</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="danger"
              statTitle="Partially Paid"
              icon={<UserPlus size={20} />}
              renderStats={
                <h3 className="fw-bolder mb-75">
                  {' '}
                  {data?.data?.filter((x) => x.status === 'PARTIAL PAYMENT').length}
                </h3>
              }
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="success"
              statTitle="Paid"
              icon={<UserCheck size={20} />}
              renderStats={
                <h3 className="fw-bolder mb-75">
                  {' '}
                  {data?.data?.filter((x) => x.status === 'PAID').length}
                </h3>
              }
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="warning"
              statTitle="Past Due"
              icon={<UserX size={20} />}
              renderStats={
                <h3 className="fw-bolder mb-75">
                  {' '}
                  {data?.data?.filter((x) => x.status === 'DUE').length}
                </h3>
              }
            />
          </Col>
        </Row>
      </div>
      <div className="overflow-hidden email-application">
        <div className="content-overlay"></div>
        <div className="content-area-wrapper animate__animated animate__fadeIn">
          <div>
            <InvoiceSidbar data={data?.data?.length > 0 ? data?.data : []} />
          </div>
          <div className="content-right ">
            <div className="content-body">
              <div className="ms-1">
                <div className="react-dataTable">
                  <DataTable
                    noHeader
                    pagination
                    sortServer
                    paginationServer
                    subHeader={true}
                    columns={columns}
                    responsive={true}
                    onSort={handleSort}
                    data={data?.data?.length > 0 && data?.data}
                    sortIcon={<ChevronDown />}
                    className="react-dataTable"
                    defaultSortField="invoiceId"
                    paginationDefaultPage={currentPage}
                    paginationComponent={CustomPagination}
                    subHeaderComponent={
                      <CustomHeader
                        value={value}
                        statusValue={statusValue}
                        rowsPerPage={rowsPerPage}
                        handleFilter={handleFilter}
                        handlePerPage={handlePerPage}
                        handleStatusValue={handleStatusValue}
                      />
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Client;
