import { createSlice } from '@reduxjs/toolkit';

export const totalContacts = createSlice({
  name: 'totalContacts',
  initialState: {
    contactList: {},
    contactTypeList: {},
    selectedContact: {},
    //contact note
    notes: [],
    //promotedlist
    promotedClientList: [],
    //progression
    progressionListClientData: [],

    //contact count
    totalCount: {
      clients: 0,
      leads: 0,
      vendors: 0,
      relationships: 0,
      employees: 0,
      members: 0,
      total: 0
    },
    tags: [],
    leadSource: [],

    //contact data
    clientContacts: [],
    leadContacts: [],
    vendorContacs: [],
    relationshipContacts: [],
    employeeContacts: [],
    memberContacts: []
  },
  reducers: {
    contactsReducer: (state, action) => {
      state.contactList = action?.payload?.contactList;
      state.contactTypeList = action?.payload?.contactTypeList;
    },
    selectContactReducer: (state, action) => {
      state.selectedContact = action.payload;
    },
    // Client Notes
    contactNoteFetch: (state, action) => {
      state.notes = action?.payload;
    },
    //promoted client data
    promotedClientData: (state, action) => {
      state.promotedClientList = action?.payload;
    },
    //progression List
    progressionListClient: (state, action) => {
      state.progressionListClientData = action.payload;
    },

    /**
     * ***********************  CAUTION  ***********************
     * Following code will be delete after finish refactoring.
     * Now can not delelte we should test & check the previous work and current work.
     * Thanks.
     */

    totalCountReducer: (state, action) => {
      state.totalCount = action?.payload;
    },

    clientContactsReducer: (state, action) => {
      state.clientContacts = action.payload;
    },
    leadContactsReducer: (state, action) => {
      state.leadContacts = action.payload;
    },
    vendorContactsReducer: (state, action) => {
      state.vendorContacs = action.payload;
    },
    relationshipContactsReducer: (state, action) => {
      state.relationshipContacts = action.payload;
    },
    employeeContactsReducer: (state, action) => {
      state.employeeContacts = action.payload;
    },
    memberContactsReducer: (state, action) => {
      state.memberContacts = action.payload;
    },
    setTagsReducer: (state, action) => {
      state.tags = action.payload;
    },
    setLeadsReducer: (state, action) => {
      state.leadSource = action.payload;
    }
  }
});
export const {
  contactsReducer,
  selectContactReducer,
  contactNoteFetch,
  promotedClientData,
  progressionListClient,

  /**
   * ***********************  CAUTION  ***********************
   * Following code will be delete after finish refactoring.
   * Now can not delelte we should test & check the previous work and current work.
   * Thanks.
   */

  totalCountReducer,
  totalLeadsReducer,
  totalVendorsReducer,
  totalRelationshipsReducer,
  totalEmployeesReducer,
  totalMembersReducer,
  clientContactsReducer,
  leadContactsReducer,
  vendorContactsReducer,
  relationshipContactsReducer,
  employeeContactsReducer,
  memberContactsReducer,
  setTagsReducer,
  setLeadsReducer
} = totalContacts.actions;

export default totalContacts.reducer;
