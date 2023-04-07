// ** React Imports
import { useState } from 'react'

// ** Table columns & Expandable Data
import ExpandableTable, { data, columns } from './data'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle } from 'reactstrap'

const MemberContracts = () => {
  // ** State
  const [item, setItem] = useState(0);
  const endItem = item + 5;
  const sliceData = data.slice(item, endItem);
  const count = Math.ceil(data.length / 5)
  const [currentPage, setCurrentPage] = useState(1);
  const handlePagination = (page) => {
    const newItem = (page.selected * 5) % data.length;
    setCurrentPage(page.selected + 1);
    setItem(newItem);
  };

  // ** Custom Pagination
  const CustomPagination = () => (
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
  )

  return (
    <Card className='px-1'>
      <CardHeader>
        <CardTitle tag='h4'>Member Contracts</CardTitle>
      </CardHeader>
      <div className='react-dataTable'>
        <DataTable
          noHeader
          responsive
          data={sliceData}
          // expandableRows
          columns={columns}
          // expandOnRowClicked
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          pagination
          paginationServer
          paginationComponent={CustomPagination}
        />
      </div>
    </Card>
  )
}

export default MemberContracts

