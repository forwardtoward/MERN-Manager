// ** React Importss
import { Fragment, useState, useEffect, useMemo } from 'react';

// ** Invoice List Sidebar
import Sidebar from './Sidebar';

// ** Table Columns
import useColumns from './useColumns';
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
  TrendingUp,
  Download,
  Share,
  FileText,
  Upload
} from 'react-feather';
// ** Store & Actions
// import { getAllData, getData } from '../store'
import { useDispatch, useSelector } from 'react-redux';
import KanbanBoard from './KanbanBoard';

// reducer
import { addLeadReset, deleteContactReset, importProcessingReset } from '../store/reducer';
import { contactNoteFetchAction } from '../../store/actions';

import useMessage from '../../../../lib/useMessage';

// ** Third Party Components
import Select from 'react-select';
import ReactPaginate from 'react-paginate';
import DataTable from 'react-data-table-component';
import { ChevronDown, File } from 'react-feather';

// ** Utils
import { selectThemeColors } from '@utils';

// ** actions
import {
  fetchContactListAction,
  fetchTotalLeadCountAction,
  fetchTotalColdLeadCountAction,
  fetchTotalWarmLeadCountAction,
  fetchTotalHotLeadCountAction,
  deleteContactAction,
  contactImportAction,
  changeViewGoalAction,
  LeadNoteFetchAction
} from '../store/actions';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';
import CSVReader from 'react-csv-reader';
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import '@styles/react/apps/app-kanban.scss';

// import TaskList from '../../../tasks/task-list';

// import csv for export csv table
import { CSVLink } from 'react-csv';

// for PDF export
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import {
  useGetLeadContacts,
  useGetLeadPosition
} from '../../../../requests/contacts/lead-contacts';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsPrinter } from 'react-icons/bs';
import NoteModal from '../../Note';

// ** Table Header
const CustomHeader = ({
  store,
  toggleSidebar,
  handlePerPage,
  leadStore,
  rowsPerPage,
  handleFilter,
  searchTerm,
  setContactImportModal,
  tableData,
  contactList
}) => {
  // ** Converts table to CSV
  let typingTimer; //timer identifier
  let doneTypingInterval = 500; //time in ms (500 ms)
  function doneTyping(val) {
    handleFilter(val);
  }

  // for CSV

  // const tableData = contactList?.data?.list

  const formatedData =
    tableData &&
    tableData.map(
      (
        { _id, userId, photo, tags, isFormer, isDelete, ranks, files, others, __v, ...rest },
        index
      ) => {
        const sl = index + 1;
        const restData = { sl, ...rest };
        const { address } = { ...rest };

        const reorderedAddress = {
          city: null,
          street: null,
          zipCode: null,
          state: null,
          country: null
        };
        const newAddressData = Object.assign(reorderedAddress, address);

        const addressValues = Object.values(newAddressData);
        const joinedAddressValues = addressValues
          .filter((x) => typeof x === 'string' && x.length > 0)
          .join(', ');

        /* if (joinedAddressValues === '') {
            joinedAddressValues = 'N/A'
        } */

        const fullAddress = { address: joinedAddressValues };

        const finalData = Object.assign(restData, fullAddress);

        return finalData;
      }
    );

  // csv headers

  const headers = [
    { label: 'Serial', key: 'sl' },
    { label: 'Lead', key: 'fullName' },
    { label: 'Email', key: 'email' },
    { label: 'Phone', key: 'phone' },
    { label: 'Gender', key: 'gender' },
    { label: 'Address', key: 'address' },
    { label: 'Status', key: 'status' },
    { label: 'Note', key: 'note' },
    { label: 'Company Phone', key: 'companyPhone' },
    { label: 'Company Email', key: 'companyEmail' },
    { label: 'Type', key: 'type' },
    { label: 'Company', key: 'company' },
    { label: 'Position', key: 'position' },
    { label: 'Social Links', key: 'socialLinks' },
    { label: 'Payment Methods', key: 'paymentMethods' }
  ];

  const csvReport = {
    filename: 'leads.csv',
    headers: headers,
    data: formatedData
  };

  // Hover on CSV
  const dispatch = useDispatch();
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  // for PDF export
  const columns = [
    { title: 'Sl', field: 'sl' },
    { title: 'Leads', field: 'fullName' },
    { title: 'Email', field: 'email' },
    { title: 'Phone', field: 'phone', type: 'numeric' },
    { title: 'Gender', field: 'gender' },
    { title: 'Address', field: 'address' },
    { title: 'Status', field: 'status' },
    { title: 'Note', field: 'note' },
    { title: 'Company Phone', field: 'companyPhone' },
    { title: 'Company Email', field: 'companyEmail' },
    { title: 'Type', field: 'type' },
    { title: 'Company', field: 'company' },
    { title: 'Position', field: 'position' },
    { title: 'Social Link', field: 'socialLink' },
    { title: 'Payment Methods', field: 'paymentMethods' }
  ];

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text('Lead Details', 15, 10);
    doc.autoTable({
      styles: {
        fontSize: 8
      },
      theme: 'grid',
      columns: columns.map((col) => ({ ...col, dataKey: col.field })),
      body: formatedData,
      horizontalPageBreak: true,
      headStyles: {
        halign: 'center',
        valign: 'middle',
        fontSize: 7,
        fillColor: ['#f3f2f7'],
        textColor: '#202c33',
        tableWidth: 'auto'
      },
      bodyStyles: {
        textColor: 'black'
      }
    });
    doc.save('leads.pdf');
  };

  const [taskSearchResult, setTaskSearchResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // ** Columns
  useMemo(() => {
    setTaskSearchResult(store.tasks);
  }, [store]);

  return (
    <div className="invoice-list-table-header w-100 mt-2 mb-75">
      {' '}
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
              onClick={toggleSidebar}
            >
              Add New Lead
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const LeadsList = ({ leadStore }) => {
  // get all client's data from db
  // const { data: tableData, refetch: leadRefetch } = useGetLeadContacts();

  const tableData = leadStore?.contactList?.list;

  const [modal, setModal] = useState(false);
  const [row, setRow] = useState(null);

  const toggle = () => setModal(!modal);

  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.users);

  const { success } = useMessage();

  // Delete Handler
  const [deleteModal, setDeleteModal] = useState({
    id: '',
    show: false
  });
  const changeViewGoal = (e) => {
    dispatch(changeViewGoalAction(e));
  };

  const {
    deleteContact: { success: deleteSuccess, loading: deleteLoading }
  } = useSelector((state) => state.leadContact);

  useMemo(() => {
    if (deleteSuccess) {
      // Reset Store
      dispatch(deleteContactReset());
      // show Message
      success('contact Deleted Successfully');
      // Hide modal
      setDeleteModal({
        id: '',
        show: false
      });
    }
  }, [deleteSuccess]);

  const fetchNotes = (id) => {
    dispatch(contactNoteFetchAction(id));
  };

  const { columns } = useColumns({ setDeleteModal }, { toggle }, { setRow }, { fetchNotes });

  // ** States

  const [sort, setSort] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState('id');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // ---------------------------------------------------

  // get client positions data from db
  const { data: positions } = useGetLeadPosition();

  const [currentRole, setCurrentRole] = useState({
    value: '',
    label: 'Select Position'
  });

  // ** User filter options
  const roleOptions = [
    { value: '', label: 'Select Position' },
    { value: 'Owner', label: 'Owner' },
    { value: 'Assistant', label: 'Assistant' },
    { value: 'Billing', label: 'Billing' }
  ];

  // push every position to the roleoptions
  positions?.map((p) => {
    const value = p.position;
    const label = p.position;
    const roles = { value, label };
    roleOptions.push(roles);
  });

  // ----------------------------------------------------------

  const [currentPlan, setCurrentPlan] = useState({
    value: '',
    label: 'Select Type'
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: '',
    label: 'Select Stage',
    number: 0
  });

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    dispatch(fetchTotalLeadCountAction());
    dispatch(fetchTotalColdLeadCountAction());
    dispatch(fetchTotalWarmLeadCountAction());
    dispatch(fetchTotalHotLeadCountAction());
  }, [dispatch]);

  // ** Get data on mount
  function fetchData() {
    dispatch(
      fetchContactListAction({
        position: currentRole.value,
        stage: currentStatus.value,
        type: currentPlan.value,
        page: currentPage,
        pageSize: rowsPerPage,
        text: searchTerm
      })
    );
    dispatch(LeadNoteFetchAction());
  }

  useEffect(() => {
    fetchData();
    //
  }, [
    dispatch,
    sort,
    sortColumn,
    currentPage,
    currentRole,
    currentStatus,
    currentPlan,
    rowsPerPage,
    searchTerm
  ]);

  const planOptions = [
    { value: '', label: 'Select Plan' },
    { value: 'individual', label: 'Individual' },
    { value: 'company', label: 'Company' }
  ];

  const stageOptions = [
    { value: '', label: 'Select Stage', number: 0 },
    { value: 'cold', label: 'Cold', number: 1 },
    { value: 'warm', label: 'Warm', number: 2 },
    { value: 'hot', label: 'Hot', number: 3 }
  ];

  // ** Function in get data on page change
  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  // ** Function in get data on search query change
  const handleFilter = (val) => {
    setSearchTerm(val);
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Math.ceil(leadStore?.contactList?.total / rowsPerPage);

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

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };

  // After Add Success
  const {
    addLead: { success: AddSuccess }
  } = useSelector((state) => state.leadContact);

  useMemo(() => {
    if (AddSuccess) {
      // reset
      dispatch(addLeadReset());
      // success message
      success('Added Successfully');
      // hide modal
      setSidebarOpen(false);
    }
  }, [AddSuccess]);

  // Contact import
  const [contactImportModal, setContactImportModal] = useState(false);
  const [contactImportStep, setContactImportStep] = useState('first');
  const [contactImportCsvFile, setContactImportCsvFile] = useState(null);
  const [contacts, setContacts] = useState([]);

  const { contactUpload } = useSelector((state) => state.leadContact);

  const { viewGoalSet } = useSelector((state) => state.leadContact);

  const { importing, uploadState } = contactUpload;

  useMemo(() => {
    if (uploadState === 'success') {
      // reset
      dispatch(importProcessingReset());
      // hide modal
      setContactImportModal(false);
      // =========>
      success('Import successfull');

      // Refetch
      dispatch(fetchTotalLeadCountAction());
      dispatch(fetchTotalColdLeadCountAction());
      dispatch(fetchTotalWarmLeadCountAction());
      dispatch(fetchTotalHotLeadCountAction());
      dispatch(fetchContactListAction({}));
    }
  }, [uploadState]);

  function onchangeImportContact(index, column, value) {
    let newData = [];
    let i = 0;
    for (let each of contacts) {
      if (i === index) {
        newData.push({ ...each, [column]: value });
      } else {
        newData.push(each);
      }
      i++;
    }
    setContacts(newData);
  }

  return (
    <Fragment>
      <Card className="mb-0">
        <div className="react-dataTable" style={{ height: '73.5vh' }}>
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            selectableRows
            paginationServer
            columns={columns}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            // paginationComponent={CustomPagination}
            // data={dataToRender()}
            data={tableData}
            subHeaderComponent={
              <CustomHeader
                setContactImportModal={setContactImportModal}
                store={store}
                tableData={tableData}
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                toggleSidebar={toggleSidebar}
                // showdelete={showdelete}
              />
            }
            // onSelectedRowsChange={handleRowSelected}
            // selectableRows
          />
        </div>
      </Card>

      {row !== null && (
        <NoteModal
          toggle={toggle}
          isOpen={modal}
          row={row}
          notes={leadStore?.notes?.data || []}
          dispatch={dispatch}
          setDeleteModal={setDeleteModal}
        />
      )}

      <Sidebar
        open={sidebarOpen}
        toggleSidebar={toggleSidebar}
        setSidebarOpen={setSidebarOpen}
        setCurrentPage={setCurrentPage}
        tableData={tableData}
        // leadRefetch={leadRefetch}
      />
    </Fragment>
  );
};

export default LeadsList;
