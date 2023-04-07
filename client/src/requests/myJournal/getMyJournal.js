import { toast } from 'react-toastify';
import { customInterIceptors } from '../../lib/AxiosProvider';
import { ENDPOINTS } from '../../lib/endpoints';

const API = customInterIceptors();
export async function getMyjournalList() {
  const { data } = await API.get(ENDPOINTS.GET_MYJOURNAL_LIST);
  return data;
}

export async function getJournalListById(id) {
  const { data } = await API.get(`${ENDPOINTS.GET_JOURNAL_LIST_BY_ID}/${id}`);
  return data;
}

export async function deleteJournalListById(id) {
  const { data } = await API.get(`${ENDPOINTS.DELETE_JOURNAL}/${id}`);
  return data;
}
export async function deleteJournalCategory(id) {
  const { data } = await API.delete(`${ENDPOINTS.DELETE_JOURNAL_CATEGORY}/${id}`);
  return data;
}

export async function getOneJournalListById(id) {
  const { data } = await API.get(`${ENDPOINTS.GET_ONE_MY_JOURNAL}/${id}`);
  return data;
}
export async function getDateJournalData(date) {
  const { data } = await API.get(`${ENDPOINTS.CALENDER_JOURNAL}/${date}`);
  return data;
}

export async function createMyJournal(formData) {
  const { data } = await API.post(ENDPOINTS.CREATE_MY_JOURNAL, { title: formData });
  if (data?.success) {
    toast.success('New category created successfully');
    return data;
  } else {
    toast.error('Unable to created');
  }
}
export async function editMyJournals(id, formData) {
  const { data } = await API.put(`${ENDPOINTS.UPDATE_JOURNAL_CATEGORY}/${id}`, { title: formData });
  if (data?.success) {
    toast.success('Edit category created successfully');
    return data;
  } else {
    toast.error('Unable to Edit');
  }
}

export async function createMyJournalById(formData) {
  const { data } = await API.post(ENDPOINTS.CREATE_MY_JOURNAL_BY_ID, formData);
  if (data?.success) {
    toast.success('Journal list created successfully');
    return data;
  } else {
    toast.error('Unable to created');
  }
}
