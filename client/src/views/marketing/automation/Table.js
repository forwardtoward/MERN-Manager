// ** React Imports
import { Fragment, useState, forwardRef } from 'react';

// ** Table Data & Columns

// ** Third Party Components
import ReactPaginate from 'react-paginate';
import DataTable from 'react-data-table-component';
import { ChevronDown, Plus } from 'react-feather';
import { useSelector, useDispatch } from 'react-redux';
import { setEditAutomation, setNewAutomation } from './store/actions';
import { Check, X, MoreVertical, Edit, FileText, Archive, Trash } from 'react-feather';
// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardTitle,
  CardHeader
} from 'reactstrap';
// ** Reactstrap Imports

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className="form-check">
    <Input type="checkbox" ref={ref} {...props} />
  </div>
));
const CustomLabel = ({ htmlFor }) => {
  return (
    <Label className='form-check-label' >
      <span className='switch-icon-left'>
        <Check size={14} />
      </span>
      <span className='switch-icon-right'>
        <X size={14} />
      </span>
    </Label>
  )
}
const Table = (props) => {
  // ** States

  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  // ** Function to handle filter
  const handleFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    setSearchValue(value);

    const status = {
      1: { title: 'Done', color: 'light-primary' },
      2: { title: 'Todo', color: 'light-success' },
      3: { title: 'Start', color: 'light-danger' }
    };

    if (value.length) {
      updatedData = props.allData.filter((item) => {
        const startsWith =
          item.automationName.toLowerCase().startsWith(value.toLowerCase()) ||
          item.startTime.toLowerCase().startsWith(value.toLowerCase()) ||
          item.campaign.toLowerCase().startsWith(value.toLowerCase()) ||
          item.contacts.toLowerCase().startsWith(value.toLowerCase()) ||
          item.status.toLowerCase().startsWith(value.toLowerCase());
        // status[item.status].title.toLowerCase().startsWith(value.toLowerCase());

        const includes =
          item.automationName.toLowerCase().includes(value.toLowerCase()) ||
          item.startTime.toLowerCase().includes(value.toLowerCase()) ||
          item.campaign.toLowerCase().includes(value.toLowerCase()) ||
          item.contacts.toLowerCase().includes(value.toLowerCase()) ||
          item.status.toLowerCase().startsWith(value.toLowerCase());
        // status[item.status].title.toLowerCase().includes(value.toLowerCase());

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else return null;
      });
      setFilteredData(updatedData);
      setSearchValue(value);
    }
  };

  // ** Function to handle Pagination
  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={
        searchValue.length
          ? Math.ceil(filteredData.length / 7)
          : Math.ceil(props.allData.length / 7) || 1
      }
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

  const dispatch = useDispatch();
  const onSetEditAutomatoin = async (id) => {
    await dispatch(setEditAutomation(id));
    props.showGraph();
  };

  const newAutomation = () => {
    dispatch(setNewAutomation());
    props.showGraph();
  };

  const columns = [
    {
      name: 'NAME',
      sortable: true,
      minWidth: '20%',
      cell: (row) => {
        return (
          <div
            id={row.id}
            style={{ cursor: 'pointer', width: '100%', padding: 'auto' }}
            onClick={(e) => onSetEditAutomatoin(e.target.id)}
          >
          {row.automationName}
          </div>
        );
      }
    },
    {
      name: 'ACTIVATION',
      sortable: true,
      minWidth: '15%',
      cell: (row) => {
        return (
          <div
            id={row.id}
            style={{ cursor: 'pointer', width: '100%', padding: 'auto' }}
            onClick={(e) => onSetEditAutomatoin(e.target.id)}
          >
            {row.activateUpon}
          </div>
        );
      }
    },

    {
      name: 'CONTACT INFO',
      minWidth: '10%',
      cell: (row) => {
        return (
          <Button color="info" size="sm" outline style={{marginLeft: '10px'}}>
            Detail
          </Button>
        );
      }
      // selector: (row) => row.smartlist
    },
    {
      name: 'STATUS',
      sortable: true,
      minWidth: '15%',
      cell: (row) => {
        return (
          <div
            id={row.id}
            style={{ cursor: 'pointer', width: '100%', padding: 'auto' }}
          // onClick={(e) => onSetEditAutomatoin(e.target.id)}
          >
            {/* {row.status} */}
            <div className='form-switch form-check-danger'>
              <Input type='switch' defaultChecked id={row.id} name='icon-danger' />
              <CustomLabel htmlFor={row.id} />
            </div>
          </div>
        );
      }
    },

    {
      name: 'ACTION',
      sortable: true,
      minWidth: '15%',
      cell: (row) => {
        return (
          <div
            id={row.id}
            style={{ cursor: 'pointer', padding: 'auto' }}
          // onClick={(e) => onSetEditAutomatoin(e.target.id)}
          >
            <span className='switch-icon-left'>
              <Trash size={18} style={{marginBottom: '4px'}}/>
            </span>
            <span className='switch-icon-right ms-1' style={{fontSize: '16px', marginTop: '1px'}}>
             Delete 
            </span>
          </div>
        );
      }
    },

  ];

  return (
    <Fragment>
      <Card className='mb-0' style={{ width: '100%', boxShadow: "none" }}>
        {/* <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom">
          <CardTitle tag="h4">Automations</CardTitle>
          <div className="d-flex mt-md-0 mt-1">
            <Button className="ms-2" color="primary">
              <Plus size={15} />
              <span className="align-middle ms-50" onClick={() => newAutomation()}>
                Add New
              </span>
            </Button>
          </div>
        </CardHeader> */}
        <Row className="justify-content-end mx-0">
          <Col className="d-flex align-items-center justify-content-end mt-1" md="6" sm="12">
            <Label className="me-1" for="search-input">
              Search
            </Label>
            <Input
              className="dataTable-filter mb-50"
              type="text"
              bsSize="sm"
              id="search-input"
              value={searchValue}
              onChange={handleFilter}
            />
          </Col>
        </Row>
        <div className="react-dataTable align-items-center react-dataTable-selectable-rows">
          <DataTable
            noHeader
            pagination
            selectableRows
            columns={columns}
            paginationPerPage={7}
            className="react-dataTable"
            sortIcon={<ChevronDown size={10} />}
            paginationComponent={CustomPagination}
            paginationDefaultPage={currentPage + 1}
            // selectableRowsComponent={BootstrapCheckbox}
            data={searchValue.length ? filteredData : props.allData}
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default Table;
