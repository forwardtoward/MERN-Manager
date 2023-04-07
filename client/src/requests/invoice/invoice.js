import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { customInterIceptors } from '../../lib/AxiosProvider';
import { ENDPOINTS } from '../../lib/endpoints';

const API = customInterIceptors();

async function fectgetinvoce() {
  const data = await API.get(ENDPOINTS.GET_INVOICE);
  return data;
}
export function fetchinvoicedata() {
  return useQuery('get-invoice', fectgetinvoce);
}
//  customer
async function fetchcustomer() {
  const data = await API.get(ENDPOINTS.GET_TOTAL_CLIENTS);
  return data;
}
export function fetchcustomerdata() {
  return useQuery('get-costumer', fetchcustomer);
}
// get customer
async function fetchuserdetails() {
  const { data } = await API.get(ENDPOINTS.GET_USER);
  return data?.data;
}

export function fetchuserdata() {
  return useQuery('get-user', fetchuserdetails);
}

async function Addcustomer(payload) {
  const data = await API.post(ENDPOINTS.CREATE_CLIENTS, payload);
  return data;
}
export function addcustomer() {
  const queryClient = useQueryClient();
  return useMutation(Addcustomer, {
    onSuccess: () => {
      toast.success('New customer Created Successfully');
      queryClient.invalidateQueries(ENDPOINTS.GET_TOTAL_CLIENTS);
    },
    onError: () => {
      toast.error('Unable to Create New customer');
    }
  });
}
async function invocedata(payload) {
  const data = await API.post(ENDPOINTS.GET_INVOICE, payload);
  if(payload.get("sendInvoice")==="true"){
    let p ={title:'',message:'',invoiceId:data?.data?.data?._id,recipient:payload.get("recipient")}
    await sendInvoiceEmail(p)

  }
  return data;
}

export function addinvoicedata() {
  const queryClient = useQueryClient();
  return useMutation(invocedata, {
    onSuccess: () => {
      toast.success('New invoice Created Successfully');
      queryClient.invalidateQueries(ENDPOINTS.GET_INVOICE);
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    }
  });
}

async function editinvoice(payload) {
  const data = await API.patch(ENDPOINTS.GET_INVOICE + `/${payload.get('_id')}`, payload);
  return data;
}

export function editinvoiceres() {
  const queryClient = useQueryClient();
  return useMutation(editinvoice, {
    onSuccess: () => {
      toast.success('Invoice update  Successfully');
      queryClient.invalidateQueries(ENDPOINTS.GET_INVOICE);
    },
    onError: () => {
      toast.error('Unable to update invoice');
    }
  });
}
export async function getsinsgleinvoice(id) {
  const data = await API.get(ENDPOINTS.GET_INVOICE + `/${id}`);
  return data;
}

export async function deleteinovice(id) {
  const data = await API.delete(ENDPOINTS.GET_INVOICE + `/${id}`);
  return data;
}
//  member
async function fetchmember() {
  const data = await API.get(ENDPOINTS.GET_TOTAL_MEMBERS);
  return data;
}
export function fetchmemberdata() {
  return useQuery('get-costumer', fetchmember);
}

async function Addmember(payload) {
  const data = await API.post(ENDPOINTS.CREATE_MEMBER, payload);
  return data;
}
export function addmember() {
  const queryClient = useQueryClient();
  return useMutation(Addmember, {
    onSuccess: () => {
      toast.success('New member Created Successfully');
      queryClient.invalidateQueries(ENDPOINTS.GET_TOTAL_MEMBERS);
    },
    onError: () => {
      toast.error('Unable to Create New member');
    }
  });
}
export async function sendInvoiceEmail(payload){
  await API.post('/invoice/send-email',payload);
}
export function sendEmail() {
  const queryClient = useQueryClient();
  return useMutation(sendInvoiceEmail, {
    onSuccess: () => {
      toast.success('Email Sent Successfully');
      queryClient.invalidateQueries('/invoice/send-email');
    },
    onError: () => {
      toast.error('Unable to Send Email');
    }
  });
}
