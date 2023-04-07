import { customInterIceptors } from '../../../lib/AxiosProvider';
const API = customInterIceptors();

// ** New Contacts
export const getContacts = () => {
  return API.get('contact/get');
};

export const getContactTypes = () => {
  return API.get('contact-type/getByUserId');
};

// ** Contact Notes API
// fetch client notes list
export const contactNoteList = (id) => {
  return API.get('notes/followup_note/get_client_notes/' + id);
};
export const contactNoteAdd = (newnote, id) => {
  return API.post('notes/followup_note/add_note/' + id, newnote);
};
export const contactNoteDelete = (id) => {
  return API.delete('notes/followup_note/remove_note/' + id);
};
export const contactNoteEdit = (newnote) => {
  return API.put('notes/followup_note/update_note/' + newnote._id, newnote);
};

// add client to progression
export const addClientProgressionApi = (form) =>
  API.post(`/client-ranks/add_client_into_progression`, form);
//promoted client list
export const promotedListApi = () => {
  return API.get('/client-ranks/listof_Promoted_clients');
};

//promote client to progression
export const promoteClientProgressionApi = (form) =>
  API.put(`/client-ranks/promote_clients_rank`, form);
// add client to progression
export const progressionListApi = (form) => API.get(`/client-ranks/listof_not_Promoted_clients`);

// demoteClientApi
//promoted client list
export const demoteClientApi = (payload) => {
  return API.put('/client-ranks/add_clients_intoProgression', payload);
};

/**
 * ***********************  CAUTION  ***********************
 * Following code will be delete after finish refactoring.
 * Now can not delelte we should test & check the previous work and current work.
 * Thanks.
 */

//leads
export const getLeadsList = (payload) => {
  return API.get('/lead-contact/list', {
    params: payload
  });
};
export const getTotalLeads = () => {
  return API.get('/lead-contact/total-contact-count');
};

//client
export const getClientList = (options) => {
  return API.get('/client-contact', {
    params: options
  });
};
export const getTotalClients = () => {
  return API.get('/client-contact/total-clients-count');
};

//employee
export const getEmployeeList = (options) => {
  return API.get('/employee-contact/list', {
    params: options
  });
};

export const getTotalEmployees = () => {
  return API.get(`/employee-contact/total-employee`);
};
//relationships
export const getRelationshipsList = (payload) => {
  return API.get('/relation-contact/list', {
    params: payload
  });
};
export const getTotalRelationships = () => {
  return API.get('/relation-contact/total-contact-count');
};

//vendors
export const getTotalVendors = () => {
  return API.get('/vendor-contact/total-contact-count');
};
export const getVendorsList = (payload) => {
  return API.get('/vendor-contact/list', {
    params: payload
  });
};

//member
export const getMemberList = (options) => {
  return API.get('/member-contact', {
    params: options
  });
};
export const getTotalMembers = () => {
  return API.get('/member-contact/total-members-count');
};

//tags
export const getTags = () => {
  return API.get('/tags/');
};

export const createTag = (payload) => {
  return API.post('/tags/', payload);
};

export const deleteTag = (id) => {
  return API.put(`/tags/delete/${id}`);
};

export const updateTag = (id, payload) => {
  return API.put(`/tags/update/${id}`, payload);
};

export const getLeadSource = () => {
  return API.get('/lead-source');
};
export const updateLeadSource = (id, payload) => {
  return API.put(`/lead-source/update/${id}`, payload);
};
export const deleteLeadSource = (id) => {
  return API.put(`/lead-source/delete/${id}`);
};
export const addLeadSource = (payload) => {
  return API.post('/lead-source', payload);
};
