import React, { useEffect, useState } from 'react';
// import { getData } from '../props.filtered_list/actions';
import { useDispatch, useSelector } from 'react-redux';

import { columns } from './columns';

import ReactPaginate from 'react-paginate';

import { ChevronDown, ChevronsDown } from 'react-feather';

import DataTable from 'react-data-table-component';

import {
  Button,
  Input,
  Row,
  Col,
  Card,
  FormGroup,
  Label,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem
} from 'reactstrap';

const InvoiceList = (props) => {
  const monthNames = [
    { key: 0, name: 'January', year: 2012 },
    { key: 1, name: 'February', year: 2013 },
    { key: 2, name: 'March', year: 2014 },
    { key: 3, name: 'April', year: 2015 },
    { key: 4, name: 'May', year: 2016 },
    { key: 5, name: 'June', year: 2017 },
    { key: 6, name: 'July', year: 2018 },
    { key: 7, name: 'August', year: 2019 },
    { key: 8, name: 'September', year: 2020 },
    { key: 9, name: 'October', year: 2021 },
    { key: 10, name: 'November', year: 2022 },
    { key: 11, name: 'December', year: 2023 }
  ];

  const [value, setValue] = useState('');
  const [sort, setSort] = useState('desc');
  const [sortColumn, setSortColumn] = useState('id');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusValue, setStatusValue] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState('1');

  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
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
    const count = Number((props.filtered_list.total / rowsPerPage).toFixed(0));

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

  const dataToRender = () => {
    const filters = {
      q: value,
      status: statusValue
    };

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0;
    });
    if (props.filtered_list.length > 0) {
    
      return props.filtered_list;
    } else if (props.filtered_list.length === 0 && isFiltered) {
      return [];
    }
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
    <div className="invoice-list-wrapper">
      <Card>
        <Accordion open={open} toggle={toggle}>
          <AccordionItem className="border">
            <AccordionHeader targetId="1">
              <div className="d-flex">
                <Label style={{fontSize: '18px'}}>{monthNames[props.currentMonth].name} 1, {props.currentYear}</Label>
                <Badge
                  color="primary"
                  style={{
                    position: 'absolute',
                    right: '50px'
                  }}
                >
                  10
                </Badge>{' '}
              </div>
            </AccordionHeader>
            <AccordionBody accordionId="1">
              <div className="invoice-list-dataTable react-dataTable">
                <DataTable
                  noHeader
                  pagination
                  sortServer
                  paginationServer
                  subHeader={false}
                  columns={columns}
                  responsive={true}
                  onSort={handleSort}
                  data={dataToRender()}
                  sortIcon={<ChevronDown />}
                  className="react-dataTable"
                  defaultSortField="invoiceId"
                  paginationDefaultPage={currentPage}
                  paginationComponent={CustomPagination}
                  // subHeaderComponent={

                  // }
                />
              </div>
            </AccordionBody>
          </AccordionItem>
          <AccordionItem className="border">
            <AccordionHeader targetId="2">
              <div className="d-flex">
                <Label style={{fontSize: '18px'}}>{monthNames[props.currentMonth].name} 5, {props.currentYear}</Label>
                <Badge
                  color="primary"
                  style={{
                    position: 'absolute',
                    right: '50px'
                  }}
                >
                  10
                </Badge>{' '}
              </div>
            </AccordionHeader>
            <AccordionBody accordionId="2">
              <div className="invoice-list-dataTable react-dataTable">
                <DataTable
                  noHeader
                  pagination
                  sortServer
                  paginationServer
                  subHeader={false}
                  columns={columns}
                  responsive={true}
                  onSort={handleSort}
                  data={dataToRender()}
                  sortIcon={<ChevronDown />}
                  className="react-dataTable"
                  defaultSortField="invoiceId"
                  paginationDefaultPage={currentPage}
                  paginationComponent={CustomPagination}
                  // subHeaderComponent={

                  // }
                />
              </div>
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  );
};

export default InvoiceList;
