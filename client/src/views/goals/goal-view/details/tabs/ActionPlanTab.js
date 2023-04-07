import React, { useState,useEffect } from 'react'
import DataTable from 'react-data-table-component'
import ReactPaginate from 'react-paginate'
import { Card } from 'reactstrap'
import moment from 'moment'


export default function ActionPlanTab({task}) {
  const [data,setData]=useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePagination = async (page) => {
      setCurrentPage(page.selected + 1);
    };
  const columns = [
    {
      name: 'Goal Name',
      selector: (row) => row.title,
      
    },
    {
      name: 'Action',
      selector: (row) => row.action,
      
    },
    {
      name: 'Date',
      selector: (row) => moment(row.date).format("DD/MM/YYYY"),
      
    },
    {
      name: 'Progress',
      selector: (row) => row.status,
      
    }
  ];
  useEffect(() => {
    setData(task.actionPlans)
   }, [task])
  const CustomPagination = () => {
    const count = Math.ceil(data.length/ 5);
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
  return (
    <Card>
     <DataTable
     noHeader
     sortServer
     pagination
     responsive
     paginationServer
     columns={columns}
     className="react-dataTable"
     paginationComponent={CustomPagination}
     data={data||[]}
      />
      
      <div className="d-flex justify-content-end p-1">
          {/* <Button color="primary" className=" me-1" outline onClick={handleAddSubGoal}>
            
            <span className="align-middle d-sm-inline-block d-none ">Add Sub Goal</span>
          </Button>
          <Button color="primary" onClick={handleAddHabit}>
            <span className="align-middle d-sm-inline-block d-none">Add Habit</span>
            
          </Button> */}
        </div>
    </Card>
  )
}
