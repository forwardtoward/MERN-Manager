// ** React Importss
import { Fragment, useState, useEffect, useMemo } from 'react';

// ** Invoice List Sidebar
import Sidebar from './Sidebar';

// ** Table Columns
import useColumns from './useColumns';

// for CSV export
import { CSVLink } from 'react-csv';

// for PDF export
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// ** Store & Actions
// import { getAllData, getData } from '../store'
import { useDispatch, useSelector } from 'react-redux';

// reducer
import { addLeadReset, deleteContactReset, importProcessingReset } from '../store/reducer';

import useMessage from '../../../../lib/useMessage';

import CSVReader from 'react-csv-reader';

// ** Third Party Components
import Select from 'react-select';
import ReactPaginate from 'react-paginate';
import DataTable from 'react-data-table-component';
import {
  ChevronDown,
  Share,
  Printer,
  FileText,
  File,
  Grid,
  Copy,
  Upload,
  TrendingUp
} from 'react-feather';
import NoteModal from './Note';

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
  VendorNoteFetchAction,
  getMemberContactByTagsAction
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
  ModalHeader,
  Collapse
} from 'reactstrap';

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';

// use vendor position data
import {
  useGetVendorPosition,
  useGetVendorContacts
} from '../../../../requests/contacts/vendor-contacts';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiCalendarEvent } from 'react-icons/bi';
import { BsPrinter } from 'react-icons/bs';
import AddProgression from './AddProgression';
import AddNewTagModal from '../../tags/AddNewTagModal';
import AddNewLeadSourceModal from '../../tags/AddNewLeadSourceModal';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// ** Table Header
const CustomHeader = ({
  store,
  contactList,
  vendorStore,
  tableData,
  toggleSidebar,
  handlePerPage,
  rowsPerPage,
  handleFilter,
  searchTerm,
  setContactImportModal,
  showdelete
}) => {
  // ** Converts table to CSV
  const dispatch = useDispatch();

  let typingTimer; //timer identifier
  let doneTypingInterval = 500; //time in ms (500 ms)
  function doneTyping(val) {
    handleFilter(val);
    //    (val)
  }

  // ** Downloads CSV
  function downloadCSV(array) {
    //
  }

  // for CSV export

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

  const [currentTag, setCurrentTag] = useState({
    value: '',
    label: 'Select Tag',
    number: 0
  });
  const [openNewTag, setOpenNewTag] = useState(false);

  const [openLeadSource, setOpenLeadSource] = useState(false);
  const toggleNewTag = () => setOpenNewTag(!openNewTag);
  const toggleNewLeadSource = () => setOpenLeadSource(!openLeadSource);
  const [tagOptions, setTagOptions] = useState([]);
  const [leadSourceOptions, setLeadSourceOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (vendorStore && vendorStore.tags) {
      let options = [];
      options.push({ value: '1', label: 'Add New Tag' });
      options.push({ value: '2', label: 'Show All' });
      for (const tag of vendorStore.tags) {
        options.push({ value: tag.value, label: tag.value });
      }
      let source = [];
      source.push({ value: '1', label: 'Add New Source' });
      source.push({ value: '2', label: 'Show All' });
      for (const src of vendorStore.leadSources) {
        source.push({ value: src.title, label: src.title });
      }
      setTagOptions(options);
      setLeadSourceOptions(source);
    }
  }, [vendorStore]);

  // csv headers

  const headers = [
    { label: 'Serial', key: 'sl' },
    { label: 'Client Name', key: 'fullName' },
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
    filename: 'vendors.csv',
    headers: headers,
    data: formatedData
  };

  // Hover on CSV

  const [isHover, setIsHover] = useState(false);
  const [openAddProgression, setOpenAddProgression] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  // for PDF export

  const columns = [
    { title: 'Sl', field: 'sl' },
    { title: 'Client', field: 'fullName' },
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

  const planOptions = [
    { value: '', label: 'Select Plan' },
    { value: 'retail', label: 'Retail' },
    { value: 'online', label: 'Online' },
    { value: 'other', label: 'Other' }
  ];

  const statusOptions = [
    { value: '', label: 'Select Status', number: 0 },
    { value: 'active', label: 'active', number: 1 },
    { value: 'inactive', label: 'inactive', number: 2 },
    { value: 'pending', label: 'pending', number: 3 }
  ];

  const [currentRole, setCurrentRole] = useState({
    value: '',
    label: 'Select Source'
  });
  const [currentPlan, setCurrentPlan] = useState({
    value: '',
    label: 'Select Type'
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: '',
    label: 'Select status',
    number: 0
  });

  // ** Get data on mount
  function fetchData() {
    dispatch(
      fetchContactListAction({
        position: currentRole.value,
        status: currentStatus.value,
        type: currentPlan.value
      })
    );
    dispatch(VendorNoteFetchAction());
  }

  useEffect(() => {
    fetchData();
  }, [dispatch, currentRole, currentStatus, currentPlan]);

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text('Vendor Details', 15, 10);
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
    doc.save('vendors.pdf');
  };

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
                value={currentRole}
                options={leadSourceOptions}
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
                onChange={(data) => {
                  setCurrentRole
                  if (data.value === '1') {
                    //open leadsModal
                    toggleNewLeadSource();
                  } else if (data.value === '2') {
                    //get all
                    dispatch(fetchContactListAction());
                  } else {
                    dispatch(fetchContactListAction({ leadSource: data.value }));
                  }
                }}
              />
            </Col>

            {/* <Col md="4">
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
            </Col> */}

            <Col className="my-md-0 my-1" md="3">
              <Label for="plan-select">Vendor Type</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={planOptions}
                value={currentPlan}
                onChange={(data) => {
                  setCurrentPlan(data);
                }}
              />
            </Col>
            <Col md="3">
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
                    dispatch(fetchContactListAction());
                  } else {
                    dispatch(getMemberContactByTagsAction([data.value]));
                  }
                }}
              />
            </Col>
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
              // onChange={(e) => handleFilter(e.target.value)}
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
                <DropdownItem
                  className="w-100"
                  // onClick={() => downloadCSV(store.data)}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <FileText className="font-small-4 me-50" />
                  {tableData && (
                    <CSVLink {...csvReport}>
                      <span
                        className="align-middle"
                        style={{
                          color: isHover ? '#6e6b7b' : '#6e6b7b'
                        }}
                      >
                        CSV
                      </span>
                    </CSVLink>
                  )}
                </DropdownItem>
                {tableData && (
                  <DropdownItem className="w-100" onClick={() => downloadPdf()}>
                    <File className="font-small-4 me-50" />
                    <span className="align-middle">PDF</span>
                  </DropdownItem>
                )}
              </DropdownMenu>
            </UncontrolledDropdown>

            <Button className="add-new-user" color="primary" onClick={toggleSidebar}>
              Add New Vender
            </Button>
          </div>
        </Col>
      </Row>
      <AddProgression
        setOpenAddProgression={setOpenAddProgression}
        openAddProgression={openAddProgression}
      />

      {vendorStore && vendorStore.tags && (
        <AddNewTagModal
          open={openNewTag}
          store={vendorStore}
          dispatch={dispatch}
          toggle={toggleNewTag}
        />
      )}
      {vendorStore && vendorStore.leadSources && (
        <AddNewLeadSourceModal
          open={openLeadSource}
          store={vendorStore}
          dispatch={dispatch}
          toggle={toggleNewLeadSource}
        />
      )}
    </div>
  );
};

const LeadsList = (props) => {
  const { className, vendorStore } = props;

  // get all Relation Contact's data from db
  const { data: tableData, refetch: vendorRefetch } = useGetVendorContacts();

  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.users);
  const { contactList } = useSelector((state) => state.vendorContact);
  const { success, error } = useMessage();
  const [showdelete, setShowdelete] = useState(false);

  const handleRowSelected = ({ selectedRows }) => {
    if (selectedRows.length > 0) {
      setShowdelete(true);
    } else {
      setShowdelete(false);
    }
    // dispatch(setSelectedRows(selectedRows));
  };

  // Delete Handler
  const [deleteModal, setDeleteModal] = useState({
    id: '',
    show: false
  });

  const {
    deleteContact: { success: deleteSuccess, loading: deleteLoading }
  } = useSelector((state) => state.vendorContact);

  useMemo(() => {
    if (deleteSuccess) {
      // Reset Store
      dispatch(deleteContactReset());

      dispatch(fetchTotalLeadCountAction());
      dispatch(fetchTotalColdLeadCountAction());
      dispatch(fetchTotalWarmLeadCountAction());
      dispatch(fetchTotalHotLeadCountAction());

      // show Message
      success('contact Deleted Successfully');
      // Hide modal
      setDeleteModal({
        id: '',
        show: false
      });
    }
  }, [deleteSuccess]);

  // ** States
  const [sort, setSort] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');

  // ************************************************
  const [currentPage, setCurrentPage] = useState(1);

  const [sortColumn, setSortColumn] = useState('id');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // get vendor position data from db
  const { data: positions } = useGetVendorPosition();

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
  const [currentRole, setCurrentRole] = useState({
    value: '',
    label: 'Select Position'
  });
  const [currentPlan, setCurrentPlan] = useState({
    value: '',
    label: 'Select Type'
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: '',
    label: 'Select status',
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
        status: currentStatus.value,
        type: currentPlan.value,
        page: currentPage,
        pageSize: rowsPerPage,
        text: searchTerm
      })
    );
    dispatch(VendorNoteFetchAction());
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
    currentPlan,
    rowsPerPage,
    searchTerm
  ]);

  const planOptions = [
    { value: '', label: 'Select Plan' },
    { value: 'retail', label: 'Retail' },
    { value: 'online', label: 'Online' },
    { value: 'other', label: 'Other' }
  ];

  const statusOptions = [
    { value: '', label: 'Select Status', number: 0 },
    { value: 'active', label: 'active', number: 1 },
    { value: 'inactive', label: 'inactive', number: 2 },
    { value: 'pending', label: 'pending', number: 3 }
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
    const count = Math.ceil(contactList?.data?.total / rowsPerPage);

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

  // Contact import ****************************************************************************
  // Contact import ****************************************************************************
  const [contactImportModal, setContactImportModal] = useState(false);
  const [contactImportStep, setContactImportStep] = useState('first');
  const [contactImportCsvFile, setContactImportCsvFile] = useState(null);
  const [contacts, setContacts] = useState([]);

  const [modal, setModal] = useState(false);
  const [row, setRow] = useState(null);
  const toggle = () => setModal(!modal);

  const { contactUpload } = useSelector((state) => state.vendorContact);
  const { importing, uploadState } = contactUpload;

  const { columns } = useColumns({ setDeleteModal }, { toggle }, { setRow });

  useMemo(() => {
    if (uploadState === 'success') {
      // reset
      dispatch(importProcessingReset());
      // hide modal
      setContactImportModal(false);
      // =========>
      success('Import successfull');

      setContactImportStep('first');

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
  // width: 100%;
  // height: calc(100vh - 16rem);
  return (
    <Fragment>
      <Card className="overflow-hidden mb-0 " style={{ height: "73vh" }}>
        <div className="react-dataTable">
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationComponent={CustomPagination}
            data={contactList?.data?.list}
            subHeaderComponent={
              <CustomHeader
                setContactImportModal={setContactImportModal}
                store={store}
                contactList={contactList}
                tableData={tableData}
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                toggleSidebar={toggleSidebar}
                showdelete={showdelete}
                vendorStore={vendorStore}
              />
            }
            onSelectedRowsChange={handleRowSelected}
            selectableRows
          />
        </div>
      </Card>

      {row !== null && (
        <NoteModal
          toggle={toggle}
          isOpen={modal}
          row={row}
          notes={vendorStore?.vendorNote || []}
          dispatch={dispatch}
          setDeleteModal={setDeleteModal}
        />
      )}

      <Sidebar
        open={sidebarOpen}
        vendorRefetch={vendorRefetch}
        tableData={tableData}
        toggleSidebar={toggleSidebar}
        setSidebarOpen={setSidebarOpen}
        setCurrentPage={setCurrentPage}
      />

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
              setCurrentPage(1);
              dispatch(deleteContactAction({ _id: deleteModal?.id }));
            }}
          >
            {deleteLoading ? 'Deleting...' : 'Yes'}
          </Button>{' '}
        </ModalFooter>
      </Modal>

      {/* // Contact import modal  */}
      <Modal
        isOpen={contactImportModal}
        toggle={() => setContactImportModal(false)}
        className={`modal-dialog-centered ${
          contactImportStep === 'first' ? 'modal-sm' : 'modal-xl'
        }`}
        key={123}
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
                // let form = new FormData()
                // form.append('file', contactImportCsvFile)
                // form.append('type', 'csv')
                // dispatch(contactFileUploadAction(form))

                // Lets Parse This Here
              } else {
                // Import Contact
                // Check if type has Error or Not
                const CheckInvalidType = contacts.find((x, i) => {
                  if (x[3] === 'individual' || x[3] === 'company') {
                    return false;
                  }
                  return true;
                });

                if (CheckInvalidType) {
                  error('Type Column must have value individual or company');
                  return;
                }

                // Check Position Error
                const CheckInvalidPosition = contacts.find((x, i) => {
                  if (
                    x[5] === 'owner' ||
                    x[5] === 'assitant' ||
                    x[5] === 'billing' ||
                    x[5] === 'n/a'
                  ) {
                    return false;
                  }
                  return true;
                });

                if (CheckInvalidPosition) {
                  error('Position Column must have value owner / assitant / billing / n/a');
                  return;
                }

                dispatch(contactImportAction({ contacts }));
              }
            }}
          >
            {contactImportStep === 'first'
              ? 'submit'
              : importing
              ? 'Uploading...'
              : ' finish import'}
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default LeadsList;
