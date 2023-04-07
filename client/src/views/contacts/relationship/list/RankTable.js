// ** React Imports
import React, { Fragment, useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Edit2,
  Trash2,
  User
} from 'react-feather';

import { useDispatch, useSelector } from 'react-redux';
import { progressionFetchAction } from '../../../settings/tabs/progressiontab/store/actions';
// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import DataTable from 'react-data-table-component';
import ReactPaginate from 'react-paginate';
import { Form, Button, Input } from 'reactstrap';
import { toast } from 'react-toastify';






const RankTable = (props) => {
  const dispatch = useDispatch();
  const clientStore = useSelector((state) => state.clientContact);

  const [clientProgressionData, setClientProgressionData] = useState([])
  const progressionList = useSelector((state) => state.progression?.progressionList);
  let categoriesArray = []
  for (let i = 0; i < progressionList?.length; i++) {
    for (let j = 0; j < progressionList[i]?.categoryId.length; j++) {
      categoriesArray.push({ name: progressionList[i]?.progressionName, list: progressionList[i]?.categoryId[j] })
    }
  }


  // const [progressionCategories, setProgressionCategories] = useState([]);
  // const [selectedData, setSelectedData] = useState({})
  const [enablePromote, setEnablePromote] = useState(false);
  const handleRowSelected = ({ selectedRows }) => {
    selectedRows.length > 0 ? setEnablePromote(true) : setEnablePromote(false)
  };
  const columns = [
    {
      name: 'Name',
      sortable: true,
      selector: (row) => row.fullName,

    },
    {
      name: 'Progression',
      sortable: true,
      grow: 2,

      selector: (row) => (
        <Input
          key={row._id}
          id="exampleSelect"
          name="progressionName"
          type="select"

        >
          <option>
            Select Progression
          </option>
          {categoriesArray?.map((progressionItem) => (
            <option>{progressionItem?.list?.categoryName + " (" + progressionItem?.name + ")"}</option>
          )
          )}
        </Input>
      )
    },
    // {
    //   name: 'Category',
    //   sortable: true,
    //   selector: (row) => (
    //         <Input
    //           id="exampleSelect"
    //           name="progressionName"
    //           type="select"
    //           key={row._id}
    //         >
    //           <option>
    //             Select
    //           </option>

    //           {progressionList?.map((progressionItem) => (
    //             <option>{progressionItem.progressionName}</option>
    //           )
    //           )}
    //         </Input>
    //   )
    // },
    {
      name: 'Rank',
      sortable: true,
      selector: (row) => (
        <div className="d-flex align-items-center">
          <div
            className="d-flex justify-content-center align-items-center me-1"
            style={{
              height: '40px',
              width: '40px',
              backgroundColor: '#de9f7a',
              borderRadius: '50%'
            }}
          >
            5
          </div>
          {row.name}
        </div>
      )
    },
    {
      name: 'Next Rank',
      sortable: true,
      selector: (row) => (
        <div className="d-flex align-items-center">
          <div
            className="d-flex justify-content-center align-items-center me-1"
            style={{
              height: '40px',
              width: '40px',
              backgroundColor: '#94f564',
              borderRadius: '50%'
            }}
          >
            4
          </div>
          {row.name}
        </div>

      )
    },
    {
      name: 'Last Promoted',
      sortable: true,
      selector: (row) => (
        <div className="d-flex align-items-center">
          <div
            className="d-flex justify-content-center align-items-center me-1"
            style={{
              height: '40px',
              width: '40px',
              backgroundColor: '#f0f564',
              borderRadius: '50%'
            }}
          >
            6
          </div>
          {row.name}
        </div>
      )
    },
    // {
    //     name: "Status",
    //     sortable: true,
    //     selector: (row) => (
    //         <Badge
    //             className="text-capitalize"
    //             color="light-primary"
    //             pill
    //         >
    //             Pay Now
    //         </Badge >
    //     )
    // },
    {
      name: 'Actions',
      allowOverflow: true,
      cell: (row) => (
        <div className="d-flex">
          <Edit2 size={16} />
          <Trash2 size={16} className="ms-1" />
          {/* <Mail size={16} className="ms-1" />
                  <PhoneCall size={16} className="ms-1" /> */}
        </div>
      )
    }
  ];

  // const handleProgressionData = (e) => {
  //   if (e.target.name === "progressionName") {
  //     setSelectedData({ [e.target.name]: e.target.value })
  //   }
  //   else {
  //     setSelectedData({ ...selectedData, [e.target.name]: e.target.value })
  //   }

  // }
  // const submitData = () => {
  //   if (selectedData?.progressionName != undefined && selectedData?.categoryName != undefined && selectedData?.categoryName != "Select Category" && selectedData?.progressionName != "Select Progression") {
  //     const array = [];
  //     array.push(selectedData)

  //     const filterP = clientProgressionData.filter(filteredData => filteredData.progressionName === selectedData.progressionName);
  //     const filterC = clientProgressionData.filter(filteredData => filteredData.categoryName === selectedData.categoryName);
  //     if (filterP.length >= 1 && filterC.length >= 1) {
  //       toast.error("Progression with this cateogry already exists, you can promote progression")

  //     }
  //     else {

  //       setClientProgressionData([...clientProgressionData, ...array])
  //     }

  //   }
  //   else {
  //     toast.error("Please Select progression and cateogory both")
  //   }

  // }
  // const generateProgressionCategories = (item) => {
  //   const filteredCategory = progressionList?.filter(category => category?.progressionName === item)
  //   const categories = filteredCategory[0]?.categoryId;
  //   setProgressionCategories(categories)
  // }
  const { stepper } = props;
  const [currentPage, setCurrentPage] = useState(0);

  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };

  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={Math.ceil(clientProgressionData.length / 7) || 1}
      breakLabel="..."
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      nextLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextClassName="page-item next-item"
      previousClassName="page-item prev-item"
      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
    />
  );
  useEffect(() => {
    dispatch(progressionFetchAction())

  }, [])


  return (

    <Fragment>
      <Form>
        {/* <FormGroup row>
          <Col sm={4}>
    
            <Input
              id="exampleSelect"
              name="progressionName"
              type="select"
              onChange={(e) => {handleProgressionData(e); generateProgressionCategories(e.target.value) }}
            >
              <option>
                Select Progression
              </option>
              {progressionList?.map((progressionItem) => (
                <option>{progressionItem.progressionName}</option>
              )
              )}
            </Input>
          </Col>
          <Col sm={4}>

            <Input
              id="exampleSelect"
              name="categoryName"
              type="select"
              onChange={(e) => {handleProgressionData(e)}}
            >
              <option>
                Select Category
              </option>
              {progressionCategories?.map((category) =>
              (
                <option>{category?.categoryName}</option>
              )
              )}
            </Input>
          </Col>
          <Col sm={4}>

            <Button color="primary" className="" onClick={submitData}>Add Client to Progression</Button>
          </Col>
        </FormGroup> */}
      </Form>
      <div className="react-dataTable mt-2">
        <DataTable
          noHeader
          pagination
          columns={columns}
          paginationPerPage={7}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          paginationComponent={CustomPagination}
          data={clientStore?.contacts?.list}
          onSelectedRowsChange={handleRowSelected}
          selectableRows
        // selectableRowsComponent={BootstrapCheckbox}
        // selectableRows
        />
      </div>
      <div className="d-flex justify-content-between">
        <Button color="primary" className="btn-prev" onClick={() => stepper.previous()}>
          <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
          <span className="align-middle d-sm-inline-block d-none">Previous</span>
        </Button>
        <Button color="primary" disabled={!enablePromote} className="btn-next" onClick={() => stepper.next()}>
          <span className="align-middle d-sm-inline-block d-none">Promote</span>
          <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
        </Button>
      </div>
    </Fragment>
  );
};

export default RankTable;
