import { useMutation, useQuery, useQueryClient } from 'react-query';
import { customInterIceptors } from '../../lib/AxiosProvider';
import { ENDPOINTS } from '../../lib/endpoints';
import { toast } from 'react-toastify';

const API = customInterIceptors();

// fetch all contacts
async function fetchContactsRQ() {
  const { data } = await API.get('/contact/get');
  return data;
}

export function useGetContactsRQ() {
  return useQuery('contacts', fetchContactsRQ);
}

// fetch all contact types
async function fetchContactTypesRQ() {
  const { data } = await API.get('/contact-type/getByUserId');
  return data;
}

export function useGetContactTypesRQ() {
  return useQuery('contactTypes', fetchContactTypesRQ);
}

// add contact query
async function addContactsRQ(payload) {
  const { data } = await API.post('/contact/add', payload);
  return data;
}

export function useAddContacts() {
  const queryClient = useQueryClient();
  return useMutation(addContactsRQ, {
    onSuccess: () => {
      toast.success('Contact created successfully');
      queryClient.invalidateQueries('contacts');
    },
    onError: () => {
      toast.error('Unable to create new contact');
    }
  });
}

// update contact query
async function updateContactsRQ(payload) {
  const { data } = await API.post(`/contact/update/${payload?._id}`, payload);
  return data;
}

export function useUpdateContacts() {
  const queryClient = useQueryClient();
  return useMutation(updateContactsRQ, {
    onSuccess: () => {
      toast.success('Contact updated successfully');
      queryClient.invalidateQueries('contacts');
    },
    onError: () => {
      toast.error('Unable to create new contact');
    }
  });
}

// delete contact query
async function deleteContactsRQ(payload) {
  const { data } = await API.delete(`/contact/delete/${payload?._id}`, payload);
  return data;
}

export function useDeleteContacts() {
  const queryClient = useQueryClient();
  return useMutation(deleteContactsRQ, {
    onSuccess: () => {
      toast.success('Contact deleted successfully');
      queryClient.invalidateQueries('contacts');
    },
    onError: () => {
      toast.error('Unable to delete contact');
    }
  });
}
