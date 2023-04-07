// ** React Imports
import { Fragment, useState, useEffect, useMemo } from 'react';

// ** Invoice List Sidebar
import Sidebar from './Sidebar';

// ** Table Columns
import ExpandableTable, { useColumns } from './useColumns';

import CSVReader from 'react-csv-reader';

// ** Store & Actions
import { getAllData, getData } from '../store';
import { useDispatch, useSelector } from 'react-redux';

// ** Third Party Components
import Select from 'react-select';
import ReactPaginate from 'react-paginate';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';
import {
  ChevronDown,
  Share,
  // Printer,
  FileText,
  File,
  // Grid,
  // Copy,
  Upload,
  TrendingUp
} from 'react-feather';

// ** Utils
import { selectThemeColors } from '@utils';

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

  //----------- >
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Collapse
} from 'reactstrap';

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';

import {
  contactListRequest,
  TotalEmployeeCountAction,
  TotalActiveEmployeeCountAction,
  TotalinternshipEmployeeEmployeeCountAction,
  formerEmployeeEmployeeCountAction,
  deleteEmployeeContact,
  contactImportAction,
  EmpNoteFetchAction,
  getEmployeeContactByTagsAction
} from '../store/actions';
import { importProcessingReset } from '../store/reducer';
import { contactNoteFetchAction } from '../../store/actions';
import useMessage from '../../../../lib/useMessage';

// Message

// for CSV export
import { CSVLink } from 'react-csv';

// for PDF export
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useGetEmployeePosition } from '../../../../requests/contacts/employee-contacts';
import { getTasksByUserAction } from '../../../settings/tabs/rolesandper/store/employee/action';
import { getUserData } from '../../../../auth/utils';
import { getSignatureInitialStampAction } from '../../../settings/tabs/rolesandper/store/signsAndStamps/actions';
import NoteModal from '../../Note';
import AddNewTagModal from '../../tags/AddNewTagModal';
import AddNewLeadSourceModal from '../../tags/AddNewLeadSourceModal';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiCalendarEvent } from 'react-icons/bi';
import { BsPrinter } from 'react-icons/bs';
import AddProgression from './AddProgression';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import { useDeleteContacts } from '../../../../requests/contacts/contacts';

const statusColors = {
  pending: { title: 'Pending', color: 'light-info' },
  declined: { title: 'Denied', color: 'light-danger' },
  remind: { title: 'Remind', color: 'light-primary' },
  approved: { title: 'Completed', color: 'light-success' }
};
const customStyles = {};

// ** Table Header
const CustomHeader = ({
  store,
  empStore,
  toggleSidebar,
  handlePerPage,
  rowsPerPage,
  handleFilter,
  searchTerm,
  setContactImportModal,
  employeeList,
  showdelete
}) => {
  const dispatch = useDispatch();
  const [isHover, setIsHover] = useState(false);
  const [openAddProgression, setOpenAddProgression] = useState(false);
  // ** Converts table to CSV
  const { data: positions, refetch, isLoading: positionLoading } = useGetEmployeePosition();
  const [openNewTag, setOpenNewTag] = useState(false);
  const [openLeadSource, setOpenLeadSource] = useState(false);
  const toggleNewTag = () => setOpenNewTag(!openNewTag);
  const toggleNewLeadSource = () => setOpenLeadSource(!openLeadSource);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = Object.keys(store.data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  // for CSV export

  const [currentRole, setCurrentRole] = useState({
    value: '',
    label: 'Select Position'
  });
  const [currentSource, setCorrentSource] = useState({
    value: '',
    label: 'Select Source'
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: '',
    label: 'Select Status',
    number: 0
  });
  const [currentTag, setCurrentTag] = useState({
    value: '',
    label: 'Select Tag',
    number: 0
  });

  // ** Sort by role
  const newRoleOptions = [
    { value: '', label: 'Select Position' },
    { value: 'owner', label: 'owner' }
  ];

  // ** Sort by active status
  const statusOptions = [
    { value: false, label: 'Active' },
    { value: true, label: 'Former' }
  ];

  const [roleOptions, setRoleOptions] = useState([
    { value: '', label: 'Select Position' },
    { value: 'owner', label: 'owner' }
  ]);

  //positions array function
  const getPositions = () => {
    try {
      //loading handler
      if (positionLoading) {
        return <h2>Loading</h2>;
      }
      if (positions) {
        positions?.map((position) => {
          if (newRoleOptions.includes(position?.position.toLowerCase())) {
            return;
          }
          newRoleOptions.push({
            value: `${position.position.toLowerCase()}`,
            label: `${position.position.toLowerCase()}`
          });
        });
      }
    } catch (err) {
      toast.error(err.message);
    }
    setRoleOptions(newRoleOptions);
  };
  //calling the function
  useEffect(getPositions, [positions]);

  function fetchData() {
    dispatch(
      contactListRequest({
        position: currentRole?.value,
        status: currentStatus.value
      })
    );
    dispatch(EmpNoteFetchAction());
  }

  useEffect(() => {
    fetchData();
  }, [dispatch, currentRole, currentStatus]);

  const [tagOptions, setTagOptions] = useState([]);
  const [leadSourceOptions, setLeadSourceOptions] = useState([]);

  useEffect(() => {
    if (empStore && empStore.tags) {
      let options = [];
      options.push({ value: '1', label: 'Add New Tag' });
      options.push({ value: '2', label: 'Show All' });
      for (const tag of empStore.tags) {
        options.push({ value: tag.value, label: tag.value });
      }
      let source = [];
      source.push({ value: '1', label: 'Add New Source' });
      source.push({ value: '2', label: 'Show All' });
      for (const src of empStore.leadSource) {
        source.push({ value: src.title, label: src.title });
      }
      setTagOptions(options);
      setLeadSourceOptions(source);
    }
  }, [empStore]);

  const tableData = employeeList?.data?.list;

  const formatedData =
    tableData &&
    tableData.map(
      (
        {
          _id,
          userId,
          photo,
          tags,
          isFormer,
          isDelete,
          ranks,
          files,
          others,
          socialLinks,
          paymentMethods,
          address,
          billingAddress,
          __v,
          ...rest
        },
        index
      ) => {
        const sl = index + 1;
        // formatting address
        const fullAddress = `${address?.street || ''},${address?.city || ''},${
          address?.state || ''
        },${address?.country || ''}`;

        const fullBillilgAddress = `${billingAddress?.addressLineOne || ''},${
          billingAddress?.city || ''
        },${billingAddress?.state || ''},${billingAddress?.country || ''},${
          billingAddress?.zipCode || ''
        }`;

        const restData = {
          sl,
          fullAddress,
          fullBillilgAddress,
          ...rest
        };
        return restData;
      }
    );

  const csvReport = {
    filename: 'employees.csv',
    data: formatedData
  };

  // Hover on CSV

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv === null) return;
    const filename = 'export.csv';
    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
  }

  // for PDF export
  const columns = [
    { title: 'Sl', field: 'sl' },
    { title: 'Employees', field: 'fullName' },
    { title: 'Email', field: 'email' },
    { title: 'Phone', field: 'phone', type: 'numeric' },
    { title: 'fullAddress', field: 'fullAddress' },
    { title: 'Billing Address', field: 'fullBillilgAddress' },
    { title: 'Gender', field: 'gender' },
    { title: 'Salary', field: 'salary' },
    { title: 'position', field: 'position' },
    { title: 'Note', field: 'note' },
    { title: 'Status', field: 'status' }
  ];

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text('Employee Details', 15, 10);
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
      },
      columnStyles: {
        0: {
          cellWidth: 18
        },
        1: {
          cellWidth: 20
        }
      }
    });
    doc.save('employees.pdf');
  };

  let typingTimer; //timer identifier
  let doneTypingInterval = 500; //time in ms (500 ms)
  function doneTyping(val) {
    handleFilter(val);
  }

  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row className="mb-2 border" style={{ marginBottom: '10px' }}>
        <div className="d-flex justify-content-between">
          <h4 className="text-secondary" style={{ marginTop: '5px' }}>
            Filters
          </h4>
          <div onClick={toggle} style={{ marginTop: '5px', cursor: 'pointer' }}>
            {isOpen ? (
              <FaChevronUp size={18} style={{ color: 'lightgray' }} />
            ) : (
              <FaChevronDown size={18} color="primary" />
            )}
          </div>
        </div>
        <Collapse isOpen={isOpen}>
          <Row style={{ paddingBottom: '10px' }}>
            <Col md="3">
              <Label for="role-select">Source</Label>
              <Select
                isClearable={false}
                value={currentSource}
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
                options={leadSourceOptions}
                onChange={(data) => {
                  setCorrentSource(data);
                  if (data.value === '1') {
                    //open leadsModal
                    setCorrentSource(data);
                    toggleNewLeadSource();
                  } else if (data.value === '2') {
                    //get all
                    dispatch(contactListRequest());
                  } else {
                    dispatch(contactListRequest({ leadSource: data.value }));
                  }
                }}
              />
            </Col>
            <Col md="3">
              <Label for="role-select">Position</Label>
              <Select
                isClearable={false}
                value={currentRole}
                options={roleOptions}
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
                onChange={(data) => {
                  setCurrentRole(data);
                }}
              />
            </Col>
            <Col md="3">
              <Label for="status-select">Status</Label>
              <Select
                value={currentStatus}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={statusOptions}
                onChange={(data) => {
                  setCurrentStatus(data);
                  dispatch(contactListRequest({ isFormer: data.value }));
                }}
              />
            </Col>
            <Col md="3">
              <Label for="status-select">Tag</Label>
              <Select
                // isMulti
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={tagOptions}
                value={currentTag}
                onChange={(data) => {
                  setCurrentTag(data);
                  if (data.value === '1') {
                    //add new tag
                    toggleNewTag();
                  } else if (data.value === '2') {
                    dispatch(contactListRequest());
                  } else {
                    dispatch(getEmployeeContactByTagsAction([data.value]));
                  }
                }}
              />
            </Col>

            {/* <Col className="my-md-0 my-1" md="4">
              <Label for="plan-select">Outlet</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={outletOptions}
                value={currentPlan}
                onChange={(data) => {
                  setCurrentPlan(data);
                }}
              />
            </Col> */}
            {/* <Col md="4">
              <Label for="status-select">Status</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={statusOptions}
                value={currentStatus}
                onChange={(data) => {
                  setCurrentStatus(data);
                }}
              />
            </Col> */}
          </Row>
        </Collapse>
      </Row>
      <Row>
        <Col xl="6" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <label htmlFor="rows-per-page">Show</label>
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
          xl="6"
          className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
        >
          <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
            <label className="mb-0" htmlFor="search-invoice">
              Search:
            </label>

            <Input
              id="search-invoice"
              className="ms-50 w-100"
              type="text"
              // value={searchTerm}
              onChange={(e) => {
                clearTimeout(typingTimer);
                typingTimer = setTimeout(() => doneTyping(e.target.value), doneTypingInterval);
              }}
            />
          </div>
          <div className="d-flex text-center">
            {showdelete ? (
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
            ) : (
              ''
            )}
            <div>
              <Button
                className="btn-icon me-1"
                outline
                color="primary"
                onClick={() => setOpenAddProgression(true)}
              >
                {/* <BiUser size={16} /> */}
                <TrendingUp size={16} />
              </Button>
            </div>
            <div>
              <Button className="btn-icon me-1" outline color="primary">
                <BiCalendarEvent size={16} />
              </Button>
            </div>
            <div>
              <Button
                className="btn-icon me-1"
                outline
                color="primary"
                // disabled={selectedRows.length === 0}
                // onClick={() => setIsMergeModalOpen(true)}
              >
                <BsPrinter size={16} />
              </Button>
            </div>
            <div>
              <Button.Ripple
                className="btn-icon me-1"
                outline
                color="primary"
                onClick={() => setContactImportModal((p) => !p)}
              >
                <Upload size={16} />
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
                {/* <DropdownItem className="w-100">
                                    <Printer className="font-small-4 me-50" />
                                    <span className="align-middle">Print</span>
                                </DropdownItem> */}
                <DropdownItem
                  className="w-100"
                  onClick={() => {
                    // downloadCSV(store.data)
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <FileText className="font-small-4 me-50" />
                  {tableData && (
                    <CSVLink {...csvReport}>
                      <span
                        className="align-middle"
                        style={{
                          color: isHover ? '#7367f0' : '#b4b7bd'
                        }}
                      >
                        CSV
                      </span>
                    </CSVLink>
                  )}
                </DropdownItem>
                {/* <DropdownItem className="w-100">
                                    <Grid className="font-small-4 me-50" />
                                    <span className="align-middle">Excel</span>
                                </DropdownItem> */}
                {tableData && (
                  <DropdownItem className="w-100" onClick={() => downloadPdf()}>
                    <File className="font-small-4 me-50" />
                    <span className="align-middle">PDF</span>
                  </DropdownItem>
                )}
                {/* <DropdownItem className="w-100">
                                    <Copy className="font-small-4 me-50" />
                                    <span className="align-middle">Copy</span>
                                </DropdownItem> */}
              </DropdownMenu>
            </UncontrolledDropdown>
            <Button className="add-new-user" color="primary" onClick={toggleSidebar}>
              Add New Employee
            </Button>
          </div>
        </Col>
      </Row>
      <AddProgression
        setOpenAddProgression={setOpenAddProgression}
        openAddProgression={openAddProgression}
      />

      {empStore && empStore.tags && (
        <AddNewTagModal
          open={openNewTag}
          store={empStore}
          dispatch={dispatch}
          toggle={toggleNewTag}
        />
      )}
      {empStore && empStore.leadSources && (
        <AddNewLeadSourceModal
          open={openLeadSource}
          store={empStore}
          dispatch={dispatch}
          toggle={toggleNewLeadSource}
        />
      )}
    </div>
  );
};

const EmployeeList = ({ empStore }) => {
  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.users);
  // const { employeeList } = useSelector((state) => state.employeeContact);
  const contactList = empStore?.contactList?.list;
  const storeTasks = useSelector((state) => state.employeeTasks);

  const [modal, setModal] = useState(false);
  const [openAddProgression, setOpenAddProgression] = useState(false);
  const [showdelete, setShowdelete] = useState(false);

  const { mutate } = useDeleteContacts();

  const toggle = () => setModal(!modal);

  const contactTypeId = useSelector(
    (state) => state?.totalContacts?.contactTypeList?.filter((x) => x.name == 'Employee')[0]?._id
  );
  const employeeList = contactList?.filter((x) => x.contactType.indexOf(contactTypeId) > -1);

  const tableData = employeeList?.map((x) => {
    const approved =
      storeTasks?.taskList?.data?.approvedEmployee.find((y) => y._id === x._id)?.approved || 0;
    const total = storeTasks?.taskList?.data?.employeeTasks.find((y) => y._id === x._id)?.tasks
      ?.length;
    const series = parseInt((approved / total) * 100) || 0;
    return { ...x, approved: approved, total: total, series: [series] };
  });
  const noteData = useSelector((state) => state?.totalContacts?.notes?.data);

  const handleRowSelected = ({ selectedRows }) => {
    if (selectedRows.length > 0) {
      setShowdelete(true);
    } else {
      setShowdelete(false);
    }
    // dispatch(setSelectedRows(selectedRows));
  };

  // table columns
  const { success } = useMessage();
  const {
    deleteEmployee: { success: deleteSuccess, loading: deleteLoading }
  } = useSelector((state) => state.employeeContact);

  // Delete Contact Modal
  const [deleteModal, setDeleteModal] = useState({
    id: '',
    show: false
  });

  const fetchNotes = (id) => {
    dispatch(contactNoteFetchAction(id));
  };
  // table columns
  const [row, setRow] = useState(null);
  const { columns } = useColumns(
    { setDeleteModal },
    { toggle },
    { setRow },
    { fetchNotes },
    { empStore }
  );

  // ** States
  const [sort, setSort] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState('id');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState({
    value: '',
    label: 'Select Position'
  });
  const [currentSource, setCorrentSource] = useState({
    value: '',
    label: 'Select Source'
  });
  const [currentPlan, setCurrentPlan] = useState({
    value: '',
    label: 'Select Outlet'
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: '',
    label: 'Select Status',
    number: 0
  });

  // Contact import modal
  const [contactImportModal, setContactImportModal] = useState(false);
  const [contactImportCsvFile, setContactImportCsvFile] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [contactImportStep, setContactImportStep] = useState('first');

  const {
    contactUpload: { importing, uploadState }
  } = useSelector((state) => state.employeeContact);
  // contactUpload
  useMemo(() => {
    if (uploadState === 'success') {
      // Reset state
      dispatch(importProcessingReset());

      // refetch data again
      dispatch(TotalEmployeeCountAction());
      dispatch(TotalActiveEmployeeCountAction());
      dispatch(TotalinternshipEmployeeEmployeeCountAction());
      dispatch(formerEmployeeEmployeeCountAction());
      dispatch(fetchTagsAction());

      // fetch list with empy option
      dispatch(contactListRequest({}));

      // hide modal
      setContactImportModal(false);
      setContacts([]);
      setContactImportCsvFile(null);
      setContactImportStep('first');
      // show message
      success('contact import successfull');
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

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // ** Get data on mount
  useEffect(() => {
    dispatch(TotalEmployeeCountAction());
    dispatch(TotalActiveEmployeeCountAction());
    dispatch(TotalinternshipEmployeeEmployeeCountAction());
    dispatch(formerEmployeeEmployeeCountAction());
    dispatch(getTasksByUserAction('employee'));
    const userData = getUserData();
    if (userData) {
      const email = userData?.email;
      dispatch(getSignatureInitialStampAction(email));
    }
  }, [dispatch]);

  function fetchData() {
    dispatch(
      contactListRequest({
        position: currentRole?.value,
        status: currentStatus.value,
        page: currentPage,
        pageSize: rowsPerPage,
        text: searchTerm
      })
    );
    dispatch(EmpNoteFetchAction());
  }

  useEffect(() => {
    fetchData();
  }, [
    dispatch,
    sort,
    sortColumn,
    currentPage,
    currentRole,
    currentStatus,
    searchTerm,
    rowsPerPage
  ]);

  // ** User filter options

  const [roleOptions, setRoleOptions] = useState([
    { value: '', label: 'Select Position' },
    { value: 'owner', label: 'owner' }
  ]);

  // get position data from db
  const { data: positions, refetch, isLoading: positionLoading } = useGetEmployeePosition();

  // ** Sort by role
  const newRoleOptions = [
    { value: '', label: 'Select Position' },
    { value: 'owner', label: 'owner' }
  ];

  //** Sort by outlet (unknown filter)
  const outletOptions = [
    { value: '', label: 'Select Outlet' },
    { value: 'outlet1', label: 'Outlet1' },
    { value: 'outlet2', label: 'Outlet2' },
    { value: 'outlet3', label: 'Outlet3' }
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
    // const count = Number(Math.ceil(store.total / rowsPerPage));
    const count = Math.ceil(employeeList?.length / rowsPerPage);

    return (
      <Row>
        <Col md="11" className="my-auto">
          <div className="d-flex align-items-center justify-content-end">
            {/* <label htmlFor="rows-per-page">Show</label> */}
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
            <label htmlFor="rows-per-page">Per Page</label>
          </div>
        </Col>
        <Col md="1">
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
        </Col>
      </Row>
    );
  };

  // ** Table data to render

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        role: currentRole.value,
        status: currentStatus.value,
        currentPlan: currentPlan.value
      })
    );
  };

  return (
    <Fragment>
      <Card className="overflow-hidden mb-0">
        <div className="react-dataTable employee-list-table" style={{ height: '73.5vh' }}>
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns}
            expandOnRowClicked
            expandableRows
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationComponent={CustomPagination}
            expandableRowsComponent={ExpandableTable}
            data={tableData}
            customStyles={customStyles}
            subHeaderComponent={
              <CustomHeader
                setContactImportModal={setContactImportModal}
                store={store}
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                toggleSidebar={toggleSidebar}
                employeeList={employeeList}
                showdelete={showdelete}
                empStore={empStore}
              />
            }
            onSelectedRowsChange={handleRowSelected}
            selectableRows
          />
        </div>
      </Card>

      {/* Notes Modal */}

      {row !== null && (
        <NoteModal
          toggle={toggle}
          isOpen={modal}
          row={row}
          notes={noteData || []}
          dispatch={dispatch}
          setDeleteModal={setDeleteModal}
        />
      )}

      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

      <Modal
        isOpen={contactImportModal}
        toggle={() => setContactImportModal(false)}
        className={`modal-dialog-centered ${
          contactImportStep === 'first' ? 'modal-sm' : 'modal-xl'
        }`}
        key={1234}
      >
        <ModalHeader toggle={() => setContactImportModal(false)}>
          {contactImportStep === 'first' ? 'Choose CSV file' : 'Final Check to import '}
        </ModalHeader>
        <ModalBody>
          {contactImportStep === 'first' ? (
            <Fragment>
              <CSVReader
                onFileLoaded={(data, fileInfo, originalFile) => {
                  let contactData = [];

                  contactData = data.filter((x, i) => {
                    let isEmpty = true;
                    for (let each of Object.values(x)) {
                      if (each !== '') {
                        isEmpty = false;
                      }
                    }
                    return !isEmpty;
                  });

                  contactData = contactData.map((x, i) => {
                    let data = Object.values(x).filter((x) => x !== '');
                    return {
                      ...data
                    };
                  });

                  setContacts(contactData);
                  setContactImportStep('second');
                }}
              />
            </Fragment>
          ) : (
            <Fragment>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  textAlign: 'center',
                  alignItems: 'center'
                }}
              >
                <span style={{ textAlign: 'center', flex: 1 }}>Serial</span>
                <span style={{ textAlign: 'center', flex: 5 }}>Full Name</span>
                <span style={{ textAlign: 'center', flex: 5 }}>Email</span>
                <span style={{ textAlign: 'center', flex: 5 }}>Contact</span>
                <span style={{ textAlign: 'center', flex: 5 }}>Type</span>
                <span style={{ textAlign: 'center', flex: 5 }}>Company</span>
                <span style={{ textAlign: 'center', flex: 5 }}>Position</span>
              </div>
              {contacts &&
                contacts.map((contact, index) => (
                  <div
                    key={index + 1}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Input style={{ flex: 1 }} value={index + 1} />
                    <Input
                      style={{ flex: 5 }}
                      value={contact[0]}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => onchangeImportContact(index, 0, e.target.value)}
                    />
                    <Input
                      style={{ flex: 5 }}
                      value={contact[1]}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => onchangeImportContact(index, 1, e.target.value)}
                    />
                    <Input
                      style={{ flex: 5 }}
                      value={contact[2]}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => onchangeImportContact(index, 2, e.target.value)}
                    />
                    <Input
                      style={{ flex: 5 }}
                      value={contact[3]}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => onchangeImportContact(index, 3, e.target.value)}
                    />
                    <Input
                      style={{ flex: 5 }}
                      value={contact[4]}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => onchangeImportContact(index, 4, e.target.value)}
                    />
                    <Input
                      style={{ flex: 5 }}
                      value={contact[5]}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => onchangeImportContact(index, 5, e.target.value)}
                    />
                  </div>
                ))}
            </Fragment>
          )}
        </ModalBody>
        <ModalFooter>
          {contactImportStep !== 'first' && (
            <Button
              onClick={() => {
                setContactImportStep('first');
              }}
              color="primary"
              outline
            >
              Upload Again
            </Button>
          )}

          <Button
            color="primary"
            outline
            disabled={importing}
            onClick={() => {
              if (contactImportStep === 'first') {
                if (contactImportCsvFile === null) {
                  return;
                }

                // Lets Parse This Here
              } else {
                // Import Contact
                // Check if type has Error or Not

                dispatch(contactImportAction({ contacts }));
              }
            }}
          >
            {contactImportStep === 'first'
              ? 'submit'
              : importing
              ? 'Importing...'
              : ' finish import'}
          </Button>
        </ModalFooter>
      </Modal>

      {/* // Delete Modal  */}
      <Modal
        toggle={() => {
          setDeleteModal({
            id: '',
            show: false
          });
        }}
        centered
        isOpen={deleteModal.show}
      >
        <ModalBody>
          <div>
            <h3>Are you sure to Delete ?</h3>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            size="sm"
            onClick={() => {
              setDeleteModal({
                id: '',
                show: false
              });
            }}
          >
            No
          </Button>
          <Button
            disabled={deleteLoading}
            size="sm"
            color="primary"
            onClick={() => {
              console.log({ _id: deleteModal?.id });
              mutate({ _id: deleteModal?.id });
              // dispatch(deleteEmployeeContact({ _id: deleteModal?.id }));
            }}
          >
            {deleteLoading ? 'Deleting...' : 'Yes'}
          </Button>{' '}
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default EmployeeList;
