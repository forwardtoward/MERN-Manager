import { customInterIceptors } from '../../../../lib/AxiosProvider';

const API = customInterIceptors();

// user API end point
export const addContact = (payload) => {
  return API.post('/relation-contact/add', payload);
};

// fetch relationship notes list
export const relationNoteList = () => {
  return API.get('notes/followup_note/get_notes_by_user_id');
};
export const relationNoteAdd = (newnote) => {
  return API.post('notes/followup_note/add_note', newnote);
};
export const relationNoteDelete = (id) => {
  return API.delete('notes/followup_note/remove_note/' + id);
};
export const relationNoteEdit = (newnote) => {
  return API.put('notes/followup_note/update_note/' + newnote._id, newnote);
};

// user API end point
export const contactList = (payload) => {
  return API.get('/relation-contact/list', {
    params: payload
  });
};

// GET Single contact
export const getSingleCotact = (id) => {
  return API.get('/relation-contact/' + id);
};

// Total Lead Count
export const totalLeadsCount = () => {
  return API.get('/relation-contact/total-contact-count');
};

// Total Cold Lead Count
export const totalCOldLeads = () => {
  return API.get('/relation-contact/total-cold-contact-count');
};

// Total warm Lead Count
export const totalWarmLeads = () => {
  return API.get('/relation-contact/total-warm-contact-count');
};

// Total Hot Lead Count
export const totalHotLeads = () => {
  return API.get('/relation-contact/total-hot-contact-count');
};
// Total Hot Lead Count
export const updateContact = (payload) => {
  return API.post('/relation-contact/update', payload);
};

// update social media
export const updateSocialLinkRequest = (payload) =>
  API.post(`/relation-contact/update-social-links`, payload);

// ** File Section
export const fileAddReqeust = (payload) => API.post(`/relation-contact/file-add`, payload);

export const fileDeleteReqeust = (payload) => API.post(`/relation-contact/file-delete`, payload);

export const fetchSingleClientReqeust = (id) => {
  return API.get('/relation-contact/' + id);
};

export const addOtherReqeust = (form) => API.post(`/relation-contact/add/other`, form);

export const otherDeleteReqeust = (payload) => API.post(`/relation-contact/delete/other`, payload);

export const uploadAvatarReqeust = (payload) =>
  API.post(`/relation-contact/upload-avatar`, payload);

export const deleteContact = (payload) => API.post(`/relation-contact/delete-contact`, payload);

export const importCOntactReqeust = (data) => {
  return API.post('/relation-contact/import-contact-array', data);
};
export const tagFetchReqeust = () => API.get(`/tags`);

export const getContactByTag = (tag)=>{
  let payload = {tag:tag}
  return API.get('/client-contact/contact/bytag/',payload)
}