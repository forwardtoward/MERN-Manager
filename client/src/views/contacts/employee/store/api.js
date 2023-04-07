import { customInterIceptors } from '../../../../lib/AxiosProvider';
import { toast } from 'react-toastify';
const API = customInterIceptors();

// user API end point
export const addNewEmployeeContactAction = (addNewEmployee) => {
  API.post('/employee-contact/add', addNewEmployee).then((res) => {
    if (res.status !== 200 && res.status !== 201) {
      toast.error(res.message);
    } else {
      return res;
    }
  });
};

// fetch member notes list
export const empNoteList = () => {
  return API.get('notes/followup_note/get_notes_by_user_id');
};
export const empNoteAdd = (newnote) => {
  return API.post('notes/followup_note/add_note', newnote);
};
export const empNoteDelete = (id) => {
  return API.delete('notes/followup_note/remove_note/' + id);
};
export const empNoteEdit = (newnote) => {
  return API.put('notes/followup_note/update_note/' + newnote._id, newnote);
};

export const deleteContactReqeust = (payload) => {
  return API.post('/employee-contact/delete', payload);
};

export const employeeListAction = (options) => {
  return API.get('/employee-contact/list', {
    params: options
  });
};

export const contactById = (_id) => {
  return API.get('/employee-contact/contact/' + _id);
};

export const contactUpdate = (payload) => {
  return API.post('/employee-contact/contact-update', payload);
};

export const contactRegisterUpdate = (payload) => {
  return API.post('/employee-contact/contact-register-update', payload);
};

export const contactRegisterSend = (payload) => {
  return API.post('/employee-contact/contact-register-send', payload);
};

export const uploadAvatarReqeust = (payload) =>
  API.post(`/employee-contact/upload-avatar`, payload);

export const updateSocialLinkRequest = (payload) =>
  API.post(`/employee-contact/update-social-links`, payload);

export const rankAddOrUpdateRequest = (payload) =>
  API.post(`/employee-contact/rank-add-or-update`, payload);

export const rankDeleteRequest = (payload) => API.post(`/employee-contact/delte-rank`, payload);

// ** File Section
export const fileAddReqeust = (payload) => API.post(`/employee-contact/file-add`, payload);

export const fileEditReqeust = (payload) => API.post(`/employee-contact/file-edit`, payload);

export const fileDeleteReqeust = (payload) => API.post(`/employee-contact/file-delete`, payload);

export const billingAddressUpdateReqeust = (payload) =>
  API.post(`/employee-contact/billing-address-update`, payload);

// Count

export const totalEmployeeCount = (payload) => API.get(`/employee-contact/total-employee`, payload);

export const ActiveEmployeeCount = (payload) =>
  API.get(`/employee-contact/active-employee`, payload);

export const InternshipEmployeeCount = (payload) =>
  API.get(`/employee-contact/internship-employee`, payload);

export const FormerEmployeeCount = (payload) =>
  API.get(`/employee-contact/former-employee`, payload);

export const importCOntactReqeust = (data) => {
  return API.post('/employee-contact/import-contact-array', data);
};

// ** workHistory

//getAllWorkHistory
export const getAllWorkHistory = () => {
  return API.get('/employee-contact/workhistory/getallworkhisotry');
};

export const apiStartWork = async (userId, description) => {
  const response = await API.post('/employee-contact/workhistory/startwork', {
    userId: userId,
    description: description
  });
  localStorage.setItem('currentWork', JSON.stringify(response?.data));
  return response;
};

export const apiUpdateWork = async (historyId, screenshot, screenshot_sm) => {
  const response = await API.post('/employee-contact/workhistory/updatework', {
    historyId: historyId,
    screenshot: screenshot,
    screenshot_sm: screenshot_sm
  });

  return response;
};

export const apiEndWork = async (historyId) => {
  const response = await API.post('/employee-contact/workhistory/endwork', {
    historyId: historyId
  });
  return response;
};

export const getWorkHistoryTimeLine = async (id) => {
  const response = await API.get(`/employee-contact/workhistory/${id}`, { id: id });
  return response.data;
};

export const getWorkHistoryOverView = async (id) => {
  const response = await API.get(`/employee-contact/workhistory/overview/${id}`, { id: id });
  return response.data;
};

export const getScreenshots = async (historyId) => {
  const response = await API.get(`employee-contact/workhistory/screenshot/${historyId}`, {
    historyId: historyId
  });
  return response.data;
};

export const getScreenshotsByUserId = async (userId, startPicker) => {
  const response = await API.post(`employee-contact/workhistory/screenshots_userId`, {
    userId: userId,
    startPicker: startPicker
  });
  if (response.status == 200) return response.data;
};

export const getDetailImage = async (workId, screenId) => {
  const response = await API.post(`employee-contact/workhistory/get_detail_image`, {
    workId: workId,
    screenId: screenId
  });
  if (response.status == 200) return response.data;
};

export const getAllEmployeeCategory = async () => {
  return API.get(`employee-categories/`);
};

export const createCategory = async (newCategory) => {
  API.post(`/employee-categories/`, newCategory).then((response) => {
    if (response.status == 200 || response.status == 201) {
      toast.success('Create categories successfully');
    } else {
      toast.error('Failed to save categories');
    }
  });
};
export const deleteCategory = async (id) => {
  API.delete(`/employee-categories/${id}`).then((response) => {
    if (response.status == 200 || response.status == 201) {
      toast.success('Delete category successfully');
    } else {
      toast.error('Failed to delete category');
    }
  });
};
export const updateCategory = async ({ id, category }) => {
  API.put(`/employee-categories/${id}`, { category }).then((response) => {
    if (response.status == 200 || response.status == 201) {
    } else {
      toast.error('Failed to save shift');
    }
  });
};

export const getContactByTag = (tag) => {
  let payload = { tag: tag };
  return API.get('/client-contact/contact/bytag/', payload);
};

export const tagFetchReqeust = () => API.get(`/tags`);

// ** Work Attendance
// *** Save recent punch in
export const saveAttendEmployee = async (payload) => {
  await API.post('/employee-attendance/', payload).then((response) => {
    if (response.status == 200 || response.status == 201) {
    } else {
      toast.error('Failed to save attendance');
    }
  });
};

export const checkOutEmployee = async (id) => {
  await API.delete(`/employee-attendance/${id}`).then((response) => {
    if (response.status == 200 || response.status == 201) {
    } else {
      toast.error('Failed to save attendance');
    }
  });
};

export const getAllAttendEmployee = async () => {
  return API.get('/employee-attendance/');
};

// ** Class Attendance
// *** Save recent punch in
// export const saveAttendClass = async (payload) => {
//   await API.post('/class-attendance/', payload).then((response) => {
//     if (response.status == 200 || response.status == 201) {
//     } else {
//       toast.error('Failed to save attendance');
//     }
//   });
// };

// export const getAllAttendClass = async () => {
//   return API.get('/class-attendance/');
// };

export const saveEmpArrToMap = async (payload) => {
  await API.post('/employee-contact/save-employee-to-map', payload);
};

// Member Api

export const checkMember = async (id) => {
  await API.post('/member-contact/attendance', { employeeId: id }).then((response) => {
    if (response.status == 200 || response.status == 201) {
    } else {
      toast.error('Failed to save attendance');
    }
  });
};
