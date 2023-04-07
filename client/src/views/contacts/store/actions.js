import * as api from './api';
import { toast } from 'react-toastify';

import {
  contactsReducer,
  selectContactReducer,
  contactNoteFetch,
  promotedClientData,
  progressionListClient,
  //
  leadContactsReducer,
  vendorContactsReducer,
  relationshipContactsReducer,
  employeeContactsReducer,
  clientContactsReducer,
  totalCountReducer,
  setTagsReducer,
  setLeadsReducer
} from './reducer';

/**
 * Contact Action Method
 * @param {Object} payload json object contact data to save in database
 * @returns
 */
export const contactsAction = (payload) => async (dispatch) => {
  try {
    dispatch(contactsReducer(payload));
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

/**
 * Contact Select Method
 * @param {Object} payload json object selected contact data
 * @returns
 */
export const selectContactAction = (payload) => async (dispatch) => {
  try {
    dispatch(selectContactReducer(payload));
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

/**
 * Get Note Method
 * @param {String} id contact _id
 * @returns
 */
export const contactNoteFetchAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.contactNoteList(id);
    dispatch(contactNoteFetch(data));
  } catch (error) {}
};

/**
 * Add Contact Note Method
 * @param {Object} newNote json object data of notes
 * @param {*} id client _id
 * @returns
 */
export const contactNoteAddAction = (newNote, id) => async (dispatch) => {
  try {
    const { data } = await api.contactNoteAdd(newNote, id);
    dispatch(contactNoteFetchAction(id));
  } catch (error) {}
};

/**
 * Delete Contact Note Method
 * @param {String} id note _id
 * @param {String} parentId note parentId
 * @returns
 */
export const contactNoteDeleteAction = (id, parentId) => async (dispatch) => {
  try {
    const { data } = await api.contactNoteDelete(id);
    dispatch(contactNoteFetchAction(parentId));
  } catch (error) {}
};

/**
 * Edit Contact Note Method
 * @param {Object} newNote note data for update
 * @param {String} parentId note parentId
 * @returns
 */
export const contactNoteEditAction = (newNote, parentId) => async (dispatch) => {
  try {
    const { data } = await api.contactNoteEdit(newNote);
    dispatch(contactNoteFetchAction(parentId));
  } catch (error) {}
};

// add  client to progression
export const addClientProgressionAction = (state) => async (dispatch) => {
  console.log('addClientProgressionAction', state);
  try {
    const res = await api.addClientProgressionApi(state);
    toast.success(res.data.msg);
  } catch (error) {
    // console.log(error);
    toast.error('Sorry! client not added to progression');
  }
};

// promot client to progression
export const promotClientAction = (state) => async (dispatch) => {
  try {
    const res = await api.promoteClientProgressionApi(state);

    res.status == 200 ? toast.success('clients is  promoted') : toast.error('clients not promoted');
  } catch (error) {
    toast.error('clients is not promoted');
  }
};

// progression client
export const progressionListAction = () => async (dispatch) => {
  try {
    const res = await api.progressionListApi();
    // res.status == 200 ? toast.success('clients is  promoted') : toast.error('clients not promoted')
    dispatch(progressionListClient(res.data.data));
  } catch (error) {
    toast.error('clients is not promoted');
  }
};
//get promoted client
export const promotedListAction = (state) => async (dispatch) => {
  try {
    const res = await api.promotedListApi();

    dispatch(promotedClientData(res.data.data));
    // toast.success(res.data.msg)
  } catch (error) {
    // toast.error("Sorry! client not added to progression")
  }
};
// demoteClientAction
export const demoteClientAction = (state) => async (dispatch) => {
  try {
    const res = await api.demoteClientApi(state);
    if (res.status == 200) {
      toast.success('client has demoted');
    }

    // console.log('res in  promotedListAction',res.data.data);
    // dispatch(promotedClientData(res.data.data))
    // toast.success(res.data.msg)
  } catch (error) {
    console.log(error);
    toast.error('Sorry! client not demoted.');
  }
};

/**
 * ***********************  CAUTION  ***********************
 * Following code will be delete after finish refactoring.
 * Now can not delelte we should test & check the previous work and current work.
 * Thanks.
 */

//total client
export const totalContactsAction = () => async (dispatch) => {
  try {
    const clients = await api.getTotalClients();
    const leads = await api.getTotalLeads();
    const vendors = await api.getTotalVendors();
    const relationships = await api.getTotalRelationships();
    const employees = await api.getTotalEmployees();

    const payload = {
      clients: clients.data,
      leads: leads.data,
      vendors: vendors.data,
      relationships: relationships.data,
      employees: employees.data,
      total: clients.data + leads.data + vendors.data + relationships.data + employees.data
    };
    dispatch(totalCountReducer(payload));
  } catch (error) {
    //
  }
};

//---------data
//client list
export const clientContactsAction = () => async (dispatch) => {
  try {
    const { data } = await api.getClientList();
    dispatch(clientContactsReducer(data));
  } catch (error) {
    //
  }
};
//lead list
export const leadsContactsAction = () => async (dispatch) => {
  try {
    const { data } = await api.getLeadsList();
    dispatch(leadContactsReducer(data));
  } catch (error) {
    //
  }
};
//vendor List
export const vendorContactsAction = () => async (dispatch) => {
  try {
    const { data } = await api.getVendorsList();
    dispatch(vendorContactsReducer(data));
  } catch (error) {
    //
  }
};
//relationships list
export const relationshipsContactsAction = () => async (dispatch) => {
  try {
    const { data } = await api.getRelationshipsList();
    dispatch(relationshipContactsReducer(data));
  } catch (error) {
    //
  }
};
//employee list
export const employeesContactsAction = () => async (dispatch) => {
  try {
    const { data } = await api.getEmployeeList();
    dispatch(employeeContactsReducer(data));
  } catch (error) {
    //
  }
};
//memger list
export const memberContactsAction = () => async (dispatch) => {
  try {
    const { data } = await api.getMemberList();
    dispatch(memberContactsReducer(data));
  } catch (error) {
    //
  }
};

//tags
export const getTagsAction = () => async (dispatch) => {
  try {
    const { data } = await api.getTags();
    if (data) {
      dispatch(setTagsReducer(data));
    }
  } catch (error) {}
};

export const updateTagsAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.updateTag(id, payload);
    if (data) {
      dispatch(getTagsAction());
    }
  } catch (error) {}
};

export const deleteTagsAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteTag(id);
    if (data) {
      dispatch(getTagsAction());
    }
  } catch (error) {}
};

export const createTagsAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createTag(payload);
    if (data) {
      dispatch(getTagsAction());
    }
  } catch (error) {}
};

export const getLeadsSourceAction = () => async (dispatch) => {
  try {
    const { data } = await api.getLeadSource();
    if (data) {
      dispatch(setLeadsReducer(data));
    }
  } catch (error) {}
};
export const createLeadsSourceAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.addLeadSource(payload);
    if (data) {
      dispatch(getLeadsSourceAction());
    }
  } catch (error) {}
};
export const deleteLeadsSourceAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteLeadSource(id);
    if (data) {
      dispatch(getLeadsSourceAction());
    }
  } catch (error) {}
};
export const updateLeadsSourceAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.updateLeadSource(id, payload);
    if (data) {
      dispatch(getLeadsSourceAction());
    }
  } catch (error) {}
};

//---pagination
//client list

//lead list

//vendor List

//relationships list

//employee list

//--------selecting
//selected contacts
