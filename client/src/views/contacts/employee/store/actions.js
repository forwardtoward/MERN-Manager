import * as api from './api';
import {
  addEmployeeStart,
  addEmployeeSuccess,
  addEmployeeError,

  //Notes
  empNoteFetch,

  // List
  EmployeeListStart,
  EmployeeListSuccess,
  EmployeeListError,
  EmployeeListReset,

  // Fetch single employee
  employeeByIdStart,
  employeeByIdSuccess,
  employeeByIdError,
  employeeByIdReset,

  // TAgs
  tagFetchingStart,
  tagFetchingSuccess,
  tagFetchingError,
  // ** update Employee
  employeeUpdateIdStart,
  employeeUpdateIdSuccess,
  employeeUpdateIdError,
  employeeUpdateIdReset,

  // ** social LInks
  socialLinkUpdateStart,
  socialLinkUpdateSuccess,
  socialLinkUpdateError,
  socialLinkUpdateReset,

  // Rank Add Update
  rankAddNUpdateStart,
  rankAddNUpdateSuccess,
  rankAddNUpdateError,
  rankAddNUpdateReset,

  // Rank Delete
  rankDeleteStart,
  rankDeleteSuccess,
  rankDeleteError,

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

  // ** Update Billing Address
  billingAddressUpdateStart,
  billingAddressUpdateSuccess,
  billingAddressUpdateError,
  billingAddressUpdateReset,

  // ** total Count
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

  // import
  importProcessingStart,
  importProcessingFinish,
  importProcessingError,

  // set all work history
  setAllWorkHistor,

  // Category
  getAllCategoryError,
  getAllCategoryStart,
  getAllCategorySuccess,
  getAllCategoryReset,

  // Work Attendance
  saveAttendEmployeeStart,
  saveAttendEmployeeSuccess,
  getAttendEmployeeStart,
  getAttendEmployeeSuccess

  // Class Attendance
  // saveAttendClassStart,
  // saveAttendClassSuccess,
  // getAttendClassStart,
  // getAttendClassSuccess
} from './reducer';

// Fetch Client Contact List
export const addContactAction = (options) => async (dispatch) => {
  try {
    dispatch(addEmployeeStart());
    const data = await api.addNewEmployeeContactAction(options);
    dispatch(addEmployeeSuccess(data));
    dispatch(contactListRequest({}));
    dispatch(TotalEmployeeCountAction());
    dispatch(TotalActiveEmployeeCountAction());
  } catch (error) {
    dispatch(addEmployeeError(error?.response?.data?.message));
  }
  // Reset After 3 sec
};

// ** Delete Contact
export const deleteEmployeeContact = (payload, id) => async (dispatch) => {
  try {
    dispatch(deleteEmployeeStart());
    const { data } = await api.deleteContactReqeust(payload);
    dispatch(contactListRequest({}));
    dispatch(deleteEmployeeSuccess(data));
    dispatch(TotalEmployeeCountAction());
    dispatch(TotalActiveEmployeeCountAction());
  } catch (error) {
    dispatch(deleteEmployeeError({}));
  }
};

export const contactImportAction = (payload) => async (dispatch, getState) => {
  try {
    dispatch(importProcessingStart());
    const { data } = await api.importCOntactReqeust(payload);
    dispatch(importProcessingFinish(data));
  } catch (error) {
    dispatch(importProcessingError({}));
  }
};

// action for member notes
export const EmpNoteFetchAction = () => async (dispatch) => {
  try {
    const { data } = await api.empNoteList();
    dispatch(empNoteFetch(data));
  } catch (error) {}
};
export const EmpNoteAddAction = (newNote) => async (dispatch) => {
  try {
    const { data } = await api.empNoteAdd(newNote);
    dispatch(EmpNoteFetchAction());
  } catch (error) {}
};
export const EmpNoteDeleteAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.empNoteDelete(id);
    dispatch(EmpNoteFetchAction());
  } catch (error) {}
};
export const EmpNoteEditAction = (newNote) => async (dispatch) => {
  try {
    const { data } = await api.empNoteEdit(newNote);
    dispatch(EmpNoteFetchAction());
  } catch (error) {}
};

// ======~ >>> ||
export const contactListRequest = (options) => async (dispatch) => {
  try {
    dispatch(EmployeeListStart());
    const { data } = await api.employeeListAction(options);
    dispatch(EmployeeListSuccess(data));
    // Refetch Employee
  } catch (error) {}
  // Reset After 3 sec
};

// ======~ >>> ||
export const contactByIdAction =
  ({ _id }) =>
  async (dispatch) => {
    try {
      dispatch(employeeByIdStart());
      const { data } = await api.contactById(_id);
      dispatch(employeeByIdSuccess(data));
      // Refetch Employee
    } catch (error) {
      // console.log(error?.response?.data?.errors)
      // dispatch(EmployeeListError(data))
    }
    // Reset After 3 sec
  };

export const contactRegisterAction = (contact) => async (dispatch) => {
  try {
    dispatch(employeeUpdateIdStart());
    const { data } = await api.contactRegisterUpdate(contact);
    dispatch(employeeUpdateIdSuccess(data));
    // Refetch Employee
    dispatch(contactByIdAction({ _id: contact?.id }));
  } catch (error) {}
  // Reset After 3 sec
};

export const contactRegisterSendAction = (contact) => async (dispatch) => {
  try {
    const response = await api.contactRegisterSend(contact);
  } catch (error) {}
  // Reset After 3 sec
};

export const contactUpdateByIdAction = (contact) => async (dispatch) => {
  try {
    dispatch(employeeUpdateIdStart());
    const { data } = await api.contactUpdate(contact);
    dispatch(employeeUpdateIdSuccess(data));
    // Refetch Employee
    dispatch(contactByIdAction({ _id: contact?._id }));
  } catch (error) {}
  // Reset After 3 sec
};

export const uploadAvatarAction = (form, id) => async (dispatch) => {
  try {
    // dispatch(avatarUploadStart())
    await api.uploadAvatarReqeust(form);
    dispatch(contactByIdAction({ _id: id }));
    // dispatch(avatarUploadSuccess())
  } catch (error) {
    // dispatch(avatarUploadError({}))
  }
};

export const socialLinksUpdateAction = (payload) => async (dispatch) => {
  try {
    dispatch(socialLinkUpdateStart());
    await api.updateSocialLinkRequest(payload);
    dispatch(contactByIdAction({ _id: payload?.id }));
    dispatch(socialLinkUpdateSuccess());
  } catch (error) {
    dispatch(socialLinkUpdateError({}));
  }
};

// ** rank Update

export const RankAddOrUpdateAction = (payload, id) => async (dispatch) => {
  try {
    dispatch(rankAddNUpdateStart());
    await api.rankAddOrUpdateRequest(payload);
    dispatch(contactByIdAction({ _id: id }));
    dispatch(rankAddNUpdateSuccess());
  } catch (error) {
    dispatch(rankAddNUpdateError({}));
  }
};

// ** rank Update
export const deleteRankAction = (payload, id) => async (dispatch) => {
  try {
    dispatch(rankDeleteStart());
    await api.rankDeleteRequest(payload);
    dispatch(contactByIdAction({ _id: id }));
    dispatch(rankDeleteSuccess());
  } catch (error) {
    dispatch(rankDeleteError({}));
  }
};

// ********************** FIle Section **************************************************
// ********************** FIle Section **************************************************

// ** File Add
export const fileAddAction = (payload, id) => async (dispatch) => {
  try {
    dispatch(fileAddStart());
    await api.fileAddReqeust(payload);
    dispatch(contactByIdAction({ _id: id }));
    dispatch(fileAddSuccess());
  } catch (error) {
    dispatch(fileAddError({}));
  }
};

// ** file Update
export const fileEditAction = (payload, id) => async (dispatch) => {
  try {
    dispatch(fileEditStart());
    await api.fileEditReqeust(payload);
    dispatch(contactByIdAction({ _id: id }));
    dispatch(fileEditSuccess());
  } catch (error) {
    dispatch(fileEditReset({}));
  }
};

// ** file Delete
export const fileDeleteAction = (payload, id) => async (dispatch) => {
  try {
    dispatch(fileDeleteStart());
    await api.fileDeleteReqeust(payload);
    dispatch(contactByIdAction({ _id: id }));
    dispatch(fileDeleteSuccess());
  } catch (error) {
    dispatch(fileDeleteError({}));
  }
};

// ** Billing Address Update

export const billingAddressUpdateAction = (payload, id) => async (dispatch) => {
  try {
    dispatch(billingAddressUpdateStart());
    await api.billingAddressUpdateReqeust(payload);
    // dispatch(contactByIdAction({ _id: id }))
    dispatch(billingAddressUpdateSuccess());
  } catch (error) {
    dispatch(billingAddressUpdateError({}));
  }
};

// ** Total Employee Count
export const TotalEmployeeCountAction = (payload, id) => async (dispatch) => {
  try {
    dispatch(totalEmployeeCountStart());
    const { data } = await api.totalEmployeeCount(payload);
    dispatch(totalEmployeeCountSuccess(data));
  } catch (error) {
    dispatch(totalEmployeeCountError({}));
  }
};

// ** Total Active Employee Count
export const TotalActiveEmployeeCountAction = (payload, id) => async (dispatch) => {
  try {
    dispatch(activeEmployeeCountStart());
    const { data } = await api.ActiveEmployeeCount(payload);
    dispatch(activeEmployeeCountSuccess(data));
  } catch (error) {
    dispatch(activeEmployeeCountError({}));
  }
};

// ** Selected employee save
export const saveEmpArrToMapAction = (payload) => async (dispatch) => {
  try {
    await api.saveEmpArrToMap(payload);
    await dispatch(contactListRequest({}));
  } catch (error) {
    console.log(error);
  }
};

// ** Total Internship Employee Count
export const TotalinternshipEmployeeEmployeeCountAction = (payload, id) => async (dispatch) => {
  try {
    dispatch(internshipEmployeeCountStart());
    const { data } = await api.InternshipEmployeeCount(payload);
    dispatch(internshipEmployeeCountSuccess(data));
  } catch (error) {
    dispatch(internshipEmployeeCountError({}));
  }
};

// ** Total Former Employee Count
export const formerEmployeeEmployeeCountAction = (payload, id) => async (dispatch) => {
  try {
    dispatch(formerEmployeeCountStart());
    const { data } = await api.FormerEmployeeCount(payload);
    dispatch(formerEmployeeCountSuccess(data));
  } catch (error) {
    dispatch(formerEmployeeCountError({}));
  }
};

export const getAllWorkHistory = () => async (dispatch) => {
  try {
    const { data } = await api.getAllWorkHistory();
    dispatch(setAllWorkHistory(data));
  } catch (error) {
    //
  }
};

export const getAllEmployeeCategoryAction = () => async (dispatch) => {
  try {
    //dispatch(employeeShiftFetchStart());

    dispatch(getAllCategoryStart());
    const { data } = await api.getAllEmployeeCategory();
    dispatch(getAllCategorySuccess(data));
  } catch (error) {
    //console.log(error);
    // dispatch(
    //   getAllCategoryError({
    //     error: error.response
    //   })
    // );
  }
};

export const createCategoryAction = (newCategory) => async (dispatch) => {
  try {
    await api.createCategory(newCategory);
  } catch (error) {}
};

export const updateCategoryAction = (newCategory) => async (dispatch) => {
  try {
    await api.updateCategory(newCategory);
  } catch (error) {}
};

export const deleteCategoryAction = (id) => async (dispatch) => {
  try {
    await api.deleteCategory(id);
  } catch (error) {}
};
// export const shiftUpdateAction = (updateShift) => async (dispatch) => {
//   try {
//     await api.shiftUpdate(updateShift);
//     setTimeout(async () => {
//       dispatch(employeeShiftFetchStart());
//       const { data } = await api.getAllEmployeeShift();
//       dispatch(employeeShiftFetchSuccess(data));
//     }, '700');
//   } catch (error) {}
// };

export const fetchTagsAction = () => async (dispatch) => {
  try {
    dispatch(tagFetchingStart());
    const { data } = await api.tagFetchReqeust();
    dispatch(tagFetchingSuccess(data));
  } catch (error) {
    // const email =
    dispatch(tagFetchingError());
  }
};

export const getEmployeeContactByTagsAction = (options) => async (dispatch) => {
  try {
    dispatch(EmployeeListStart());
    const { data } = await api.getContactByTag(options);
    dispatch(EmployeeListSuccess(data));
  } catch (error) {
    dispatch(
      EmployeeListError({
        error: error.response
      })
    );
  }
  // Reset After 3 sec
  setTimeout(() => {
    EmployeeListReset();
  });
};

// Attendance actions

export const getEmployeeAttendanceAction = () => async (dispatch) => {
  try {
    dispatch(getAttendEmployeeStart());
    const { data } = await api.getAllAttendEmployee();
    dispatch(getAttendEmployeeSuccess(data));
  } catch (error) {
    console.log(error);
  }
};

export const saveAttendEmployeeAction = (newAttend) => async (dispatch) => {
  try {
    await api.saveAttendEmployee(newAttend).then((res) => {
      dispatch(getEmployeeAttendanceAction());
    });
  } catch (error) {
    console.log(error);
  }
};

export const checkOutEmployeeAction = (id) => async (dispatch) => {
  try {
    await api.checkOutEmployee(id).then((res) => {
      dispatch(getEmployeeAttendanceAction());
    });
  } catch (error) {
    console.log(error);
  }
};

export const checkMemberAction = (id) => async (dispatch) => {
  try {
    await api.checkMember(id).then((res) => {
      dispatch(contactListRequest());
    });
  } catch (error) {
    console.log(error);
  }
};
