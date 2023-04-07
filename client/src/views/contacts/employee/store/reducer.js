import { createSlice } from '@reduxjs/toolkit';

export const employeeContact = createSlice({
  name: 'employeeContact',
  initialState: {
    // add new Employee
    addEmployee: {
      loading: false,
      success: false,
      error: null
    },
    deleteEmployee: {
      loading: false,
      success: false,
      error: null
    },

    //notes
    empNote: [],

    employeeList: {
      loading: false,
      success: false,
      error: null,
      data: null
    },

    //Tags
    tags: {
      isLoading: false,
      data: [],
      error: null
    },

    contact: {
      loading: false,
      success: false,
      error: null,
      data: null
    },

    contactUpdate: {
      loading: false,
      success: false,
      error: null
    },

    socialLinksUpdate: {
      loading: false,
      success: false,
      error: null
    },

    rankAddNUpdate: {
      loading: false,
      success: false,
      error: null
    },

    rankDelete: {
      loading: false,
      success: false,
      error: null
    },

    // ** file add
    fileAdd: {
      loading: false,
      success: false,
      error: null
    },
    // ** file Edit
    fileEdit: {
      loading: false,
      success: false,
      error: null
    },
    // **  File Delete
    fileDelete: {
      loading: false,
      success: false,
      error: null
    },

    // ** Other Add
    billingAddressUpdate: {
      loading: false,
      success: false,
      error: null
    },

    totalEmployeeCount: {
      loading: false,
      success: false,
      error: null,
      data: 0
    },
    activeEmployeeCount: {
      loading: false,
      success: false,
      error: null,
      data: 0
    },
    internshipEmployeeCount: {
      loading: false,
      success: false,
      error: null,
      data: 0
    },
    formerEmployeeCount: {
      loading: false,
      success: false,
      error: null,
      data: 0
    },

    // Contact Upload
    contactUpload: {
      contacts: [],
      fileProcessing: false,
      processingError: null,
      importing: false,
      uploadState: 'idle'
    },
    // ** WorkHistory
    workHistory: {
      isStart: false,
      duration: 0
    },

    // all work history data
    workAllHistory: {
      allHistory: []
    },

    // category
    employeeCategory: {
      loading: false,
      success: false,
      data: []
    },

    // Work Attendance
    employeeAttance: {
      loading: false,
      success: false,
      data: []
    }

    // Class Attendance

    // studentAttendance: {
    //   loading: false,
    //   success: false,
    //   data: []
    // }
  },
  reducers: {
    // ** add new Employee
    addEmployeeStart: (state) => {
      state.addEmployee.loading = true;
    },
    addEmployeeSuccess: (state) => {
      state.addEmployee.loading = false;
      state.addEmployee.success = true;
      state.addEmployee.error = null;
    },
    addEmployeeError: (state, action) => {
      state.addEmployee.loading = false;
      state.addEmployee.success = false;
      state.addEmployee.error = action.payload;
    },
    addEmployeeReset: (state, action) => {
      state.addEmployee.loading = false;
      state.addEmployee.success = false;
      state.addEmployee.error = null;
    },
    // ** add new Employee
    // Member Notes

    empNoteFetch: (state, action) => {
      state.empNote = action?.payload;
    },
    // ** add new Employee
    EmployeeListStart: (state) => {
      state.employeeList.loading = true;
    },
    EmployeeListSuccess: (state, action) => {
      state.employeeList.loading = false;
      state.employeeList.success = true;
      state.employeeList.error = null;
      state.employeeList.data = action.payload;
    },
    EmployeeListError: (state, action) => {
      state.employeeList.loading = false;
      state.employeeList.success = true;
      state.employeeList.error = action.payload;
    },
    EmployeeListReset: (state, action) => {
      state.employeeList.loading = false;
      state.employeeList.success = false;
      state.employeeList.error = null;
    },
    // ** add new Employee

    // ** single employee fetch
    employeeByIdStart: (state) => {
      state.contact.loading = true;
    },
    employeeByIdSuccess: (state, action) => {
      state.contact.loading = false;
      state.contact.success = true;
      state.contact.error = null;
      state.contact.data = action.payload;
    },
    employeeByIdError: (state, action) => {
      state.contact.loading = false;
      state.contact.success = true;
      state.contact.error = action.payload;
    },
    employeeByIdReset: (state, action) => {
      state.contact.loading = false;
      state.contact.success = false;
      state.contact.error = null;
    },

    // (**) Contact Update
    // ** single employee fetch
    employeeUpdateIdStart: (state) => {
      state.contactUpdate.loading = true;
    },
    employeeUpdateIdSuccess: (state, action) => {
      state.contactUpdate.loading = false;
      state.contactUpdate.success = true;
      state.contactUpdate.error = null;
    },
    employeeUpdateIdError: (state, action) => {
      state.contactUpdate.loading = false;
      state.contactUpdate.success = true;
      state.contactUpdate.error = action.payload;
    },
    employeeUpdateIdReset: (state, action) => {
      state.contactUpdate.loading = false;
      state.contactUpdate.success = false;
      state.contactUpdate.error = null;
    },

    // ** social Link update

    socialLinkUpdateStart: (state) => {
      state.socialLinksUpdate.loading = true;
    },
    socialLinkUpdateSuccess: (state, action) => {
      state.socialLinksUpdate.loading = false;
      state.socialLinksUpdate.success = true;
      state.socialLinksUpdate.error = null;
    },
    socialLinkUpdateError: (state, action) => {
      state.socialLinksUpdate.loading = false;
      state.socialLinksUpdate.success = true;
      state.socialLinksUpdate.error = action.payload;
    },
    socialLinkUpdateReset: (state, action) => {
      state.socialLinksUpdate.loading = false;
      state.socialLinksUpdate.success = false;
      state.socialLinksUpdate.error = null;
    },

    // TAg Fetching
    tagFetchingStart: (state, action) => {
      state.tags.isLoading = true;
      state.tags.data = [];
      state.tags.error = null;
    },
    tagFetchingSuccess: (state, action) => {
      state.tags.isLoading = false;
      state.tags.data = action?.payload;
      state.tags.error = null;
    },
    tagFetchingError: (state, action) => {
      state.tags.isLoading = false;
      state.tags.data = [];
      state.tags.error = action?.payload;
    },

    // ** Rank Add or Update

    rankAddNUpdateStart: (state) => {
      state.rankAddNUpdate.loading = true;
    },
    rankAddNUpdateSuccess: (state, action) => {
      state.rankAddNUpdate.loading = false;
      state.rankAddNUpdate.success = true;
      state.rankAddNUpdate.error = null;
    },
    rankAddNUpdateError: (state, action) => {
      state.rankAddNUpdate.loading = false;
      state.rankAddNUpdate.success = true;
      state.rankAddNUpdate.error = action.payload;
    },
    rankAddNUpdateReset: (state, action) => {
      state.rankAddNUpdate.loading = false;
      state.rankAddNUpdate.success = false;
      state.rankAddNUpdate.error = null;
    },

    // ** Rank Delete

    rankDeleteStart: (state) => {
      state.rankDelete.loading = true;
    },
    rankDeleteSuccess: (state, action) => {
      state.rankDelete.loading = false;
      state.rankDelete.success = true;
      state.rankDelete.error = null;
    },
    rankDeleteError: (state, action) => {
      state.rankDelete.loading = false;
      state.rankDelete.success = true;
      state.rankDelete.error = action.payload;
    },
    rankDeleteReset: (state, action) => {
      state.rankDelete.loading = false;
      state.rankDelete.success = false;
      state.rankDelete.error = null;
    },
    // fileAdd
    // fileEdit
    // fileDelete
    // ** file Add
    fileAddStart: (state) => {
      state.fileAdd.loading = true;
    },
    fileAddSuccess: (state, action) => {
      state.fileAdd.loading = false;
      state.fileAdd.success = true;
      state.fileAdd.error = null;
    },
    fileAddError: (state, action) => {
      state.fileAdd.loading = false;
      state.fileAdd.success = true;
      state.fileAdd.error = action.payload;
    },
    fileAddReset: (state, action) => {
      state.fileAdd.loading = false;
      state.fileAdd.success = false;
      state.fileAdd.error = null;
    },

    // ** file Edit
    fileEditStart: (state) => {
      state.fileEdit.loading = true;
    },
    fileEditSuccess: (state, action) => {
      state.fileEdit.loading = false;
      state.fileEdit.success = true;
      state.fileEdit.error = null;
    },
    fileEditError: (state, action) => {
      state.fileEdit.loading = false;
      state.fileEdit.success = true;
      state.fileEdit.error = action.payload;
    },
    fileEditReset: (state, action) => {
      state.fileEdit.loading = false;
      state.fileEdit.success = false;
      state.fileEdit.error = null;
    },
    // ** file Delete
    fileDeleteStart: (state) => {
      state.fileDelete.loading = true;
    },
    fileDeleteSuccess: (state, action) => {
      state.fileDelete.loading = false;
      state.fileDelete.success = true;
      state.fileDelete.error = null;
    },
    fileDeleteError: (state, action) => {
      state.fileDelete.loading = false;
      state.fileDelete.success = true;
      state.fileDelete.error = action.payload;
    },
    fileDeleteReset: (state, action) => {
      state.fileDelete.loading = false;
      state.fileDelete.success = false;
      state.fileDelete.error = null;
    },

    // Billing Address Update
    billingAddressUpdateStart: (state) => {
      state.billingAddressUpdate.loading = true;
    },
    billingAddressUpdateSuccess: (state, action) => {
      state.billingAddressUpdate.loading = false;
      state.billingAddressUpdate.success = true;
      state.billingAddressUpdate.error = null;
    },
    billingAddressUpdateError: (state, action) => {
      state.billingAddressUpdate.loading = false;
      state.billingAddressUpdate.success = true;
      state.billingAddressUpdate.error = action.payload;
    },
    billingAddressUpdateReset: (state, action) => {
      state.billingAddressUpdate.loading = false;
      state.billingAddressUpdate.success = false;
      state.billingAddressUpdate.error = null;
    },

    // Employee Count
    totalEmployeeCountStart: (state) => {
      state.totalEmployeeCount.loading = true;
    },
    totalEmployeeCountSuccess: (state, action) => {
      state.totalEmployeeCount.loading = false;
      state.totalEmployeeCount.success = true;
      state.totalEmployeeCount.error = null;
      state.totalEmployeeCount.data = action.payload;
    },
    totalEmployeeCountError: (state, action) => {
      state.totalEmployeeCount.loading = false;
      state.totalEmployeeCount.success = true;
      state.totalEmployeeCount.error = action.payload;
    },
    totalEmployeeCountReset: (state, action) => {
      state.totalEmployeeCount.loading = false;
      state.totalEmployeeCount.success = false;
      state.totalEmployeeCount.error = null;
    },

    // Active Employee Count
    activeEmployeeCountStart: (state) => {
      state.activeEmployeeCount.loading = true;
    },
    activeEmployeeCountSuccess: (state, action) => {
      state.activeEmployeeCount.loading = false;
      state.activeEmployeeCount.success = true;
      state.activeEmployeeCount.error = null;
      state.activeEmployeeCount.data = action.payload;
    },
    activeEmployeeCountError: (state, action) => {
      state.activeEmployeeCount.loading = false;
      state.activeEmployeeCount.success = true;
      state.activeEmployeeCount.error = action.payload;
    },
    activeEmployeeCountReset: (state, action) => {
      state.activeEmployeeCount.loading = false;
      state.activeEmployeeCount.success = false;
      state.activeEmployeeCount.error = null;
    },

    // Internship Employee Count
    internshipEmployeeCountStart: (state) => {
      state.internshipEmployeeCount.loading = true;
    },
    internshipEmployeeCountSuccess: (state, action) => {
      state.internshipEmployeeCount.loading = false;
      state.internshipEmployeeCount.success = true;
      state.internshipEmployeeCount.error = null;
      state.internshipEmployeeCount.data = action.payload;
    },
    internshipEmployeeCountError: (state, action) => {
      state.internshipEmployeeCount.loading = false;
      state.internshipEmployeeCount.success = true;
      state.internshipEmployeeCount.error = action.payload;
    },
    internshipEmployeeCountReset: (state, action) => {
      state.internshipEmployeeCount.loading = false;
      state.internshipEmployeeCount.success = false;
      state.internshipEmployeeCount.error = null;
    },

    // Former Employee
    formerEmployeeCountStart: (state) => {
      state.formerEmployeeCount.loading = true;
    },
    formerEmployeeCountSuccess: (state, action) => {
      state.formerEmployeeCount.loading = false;
      state.formerEmployeeCount.success = true;
      state.formerEmployeeCount.error = null;
      state.formerEmployeeCount.data = action.payload;
    },
    formerEmployeeCountError: (state, action) => {
      state.formerEmployeeCount.loading = false;
      state.formerEmployeeCount.success = true;
      state.formerEmployeeCount.error = action.payload;
    },
    formerEmployeeCountReset: (state, action) => {
      state.formerEmployeeCount.loading = false;
      state.formerEmployeeCount.success = false;
      state.formerEmployeeCount.error = null;
    },

    // Delete Employee
    deleteEmployeeStart: (state) => {
      state.deleteEmployee.loading = true;
    },
    deleteEmployeeSuccess: (state, action) => {
      state.deleteEmployee.loading = false;
      state.deleteEmployee.success = true;
      state.deleteEmployee.error = null;
      state.deleteEmployee.data = action.payload;
    },
    deleteEmployeeError: (state, action) => {
      state.deleteEmployee.loading = false;
      state.deleteEmployee.success = true;
      state.deleteEmployee.error = action.payload;
    },
    deleteEmployeeReset: (state, action) => {
      state.deleteEmployee.loading = false;
      state.deleteEmployee.success = false;
      state.deleteEmployee.error = null;
    },

    // import handler
    importProcessingStart: (state, action) => {
      state.contactUpload.fileProcessing = false;
      state.contactUpload.contacts = [];
      state.contactUpload.importing = true;
      state.contactUpload.uploadState = 'loading';
    },
    importProcessingFinish: (state, action) => {
      state.contactUpload.fileProcessing = false;
      state.contactUpload.contacts = [];
      state.contactUpload.importing = false;
      state.contactUpload.uploadState = 'success';
    },
    importProcessingError: (state, action) => {
      state.contactUpload.fileProcessing = false;
      state.contactUpload.contacts = [];
      state.contactUpload.importing = false;
      state.contactUpload.uploadState = 'error';
    },
    importProcessingReset: (state, action) => {
      state.contactUpload.fileProcessing = false;
      state.contactUpload.contacts = [];
      state.contactUpload.importing = false;
      state.contactUpload.uploadState = 'idle';
    },

    // set all work history
    setAllWorkHistory: (state, action) => {
      state.workAllHistory.allHistory = action.payload;
    },

    // WorkHistory
    setWorkHistory: (state, action) => {
      state.workHistory = action.payload;
    },

    // WorkHistoryDuration
    setDuration: (state) => {
      state.workHistory.duration += 1;
    },

    // GetAllCategory
    getAllCategoryStart: (state) => {
      state.employeeCategory.loading = true;
    },
    getAllCategorySuccess: (state, action) => {
      state.employeeCategory.loading = false;
      state.employeeCategory.success = true;
      state.employeeCategory.data = action.payload;
    },
    getAllCategoryError: (state, action) => {
      state.employeeCategory.loading = false;
      state.employeeCategory.success = true;
      state.employeeCategory.data = action.payload;
    },
    getAllCategoryReset: (state, action) => {
      state.employeeCategory.loading = false;
      state.employeeCategory.success = false;
      state.employeeCategory.data = null;
    },
    getAttendEmployeeStart: (state) => {
      state.employeeAttance.isLoading = true;
      state.employeeAttance.saveSuccess = false;
    },
    getAttendEmployeeSuccess: (state, action) => {
      state.employeeAttance.isLoading = true;
      state.employeeAttance.data = action.payload;
      state.employeeAttance.saveSuccess = true;
    },
    saveAttendEmployeeStart: (state) => {
      state.employeeAttance.isLoading = true;
      state.employeeAttance.saveSuccess = false;
    },
    saveAttendEmployeeSuccess: (state) => {
      state.employeeAttance.isLoading = false;
      state.employeeAttance.saveSuccess = true;
    }

    // Student Attendance
    // getAttendClassStart: (state) => {
    //   state.studentAttendance.isLoading = true;
    //   state.studentAttendance.saveSuccess = false;
    // },
    // getAttendClassStart: (state, action) => {
    //   state.studentAttendance.isLoading = true;
    //   state.studentAttendance.data = action.payload;
    //   state.studentAttendance.saveSuccess = true;
    // },
    // saveAttendClassStart: (state) => {
    //   state.studentAttendance.isLoading = true;
    //   state.studentAttendance.saveSuccess = false;
    // },
    // saveAttendClassSuccess: (state) => {
    //   state.studentAttendance.isLoading = false;
    //   state.studentAttendance.saveSuccess = true;
    // }
  }
});

//
// updateBillingInfo

export const {
  // Add
  addEmployeeStart,
  addEmployeeSuccess,
  addEmployeeError,
  addEmployeeReset,

  //notes
  empNoteFetch,

  //tags
  tagFetchingStart,
  tagFetchingSuccess,
  tagFetchingError,

  // list
  EmployeeListStart,
  EmployeeListSuccess,
  EmployeeListError,
  EmployeeListReset,

  // Single Employee Fetch
  employeeByIdStart,
  employeeByIdSuccess,
  employeeByIdError,
  employeeByIdReset,

  // Single employee contact Update
  employeeUpdateIdStart,
  employeeUpdateIdSuccess,
  employeeUpdateIdError,
  employeeUpdateIdReset,

  // social link
  socialLinkUpdateStart,
  socialLinkUpdateSuccess,
  socialLinkUpdateError,
  socialLinkUpdateReset,

  // Rank Add Or Update
  rankAddNUpdateStart,
  rankAddNUpdateSuccess,
  rankAddNUpdateError,
  rankAddNUpdateReset,

  // Rank Delete
  rankDeleteStart,
  rankDeleteSuccess,
  rankDeleteError,
  rankDeleteReset,

  // ** file add
  fileAddStart,
  fileAddSuccess,
  fileAddError,
  fileAddReset,
  // ** file Edit
  fileEditStart,
  fileEditSuccess,
  fileEditError,
  fileEditReset,
  // ** file Delete
  fileDeleteStart,
  fileDeleteSuccess,
  fileDeleteError,
  fileDeleteReset,

  billingAddressUpdateStart,
  billingAddressUpdateSuccess,
  billingAddressUpdateError,
  billingAddressUpdateReset,

  // **

  totalEmployeeCountStart,
  totalEmployeeCountSuccess,
  totalEmployeeCountError,
  totalEmployeeCountReset,
  //
  activeEmployeeCountStart,
  activeEmployeeCountSuccess,
  activeEmployeeCountError,
  activeEmployeeCountReset,
  //
  internshipEmployeeCountStart,
  internshipEmployeeCountSuccess,
  internshipEmployeeCountError,
  internshipEmployeeCountReset,
  //
  formerEmployeeCountStart,
  formerEmployeeCountSuccess,
  formerEmployeeCountError,
  formerEmployeeCountReset,

  // Delete Contact
  deleteEmployeeStart,
  deleteEmployeeSuccess,
  deleteEmployeeError,
  deleteEmployeeReset,

  // import start
  importProcessingStart,
  importProcessingFinish,
  importProcessingError,
  importProcessingReset,

  // WorkHistory
  setWorkHistory,

  // set all work history
  setAllWorkHistory,

  // WorkHistoryDuration
  setDuration,

  // Category
  getAllCategoryStart,
  getAllCategorySuccess,
  getAllCategoryError,
  getAllCategoryReset,

  // Work Attendance
  getAttendEmployeeStart,
  getAttendEmployeeSuccess,

  saveAttendEmployeeStart,
  saveAttendEmployeeSuccess

  // Student Attendance
  // getAttendClassStart,
  // getAttendClassSuccess,

  // saveAttendClassStart,
  // saveAttendClassSuccess
} = employeeContact.actions;

export default employeeContact.reducer;
