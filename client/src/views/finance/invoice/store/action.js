import * as api from './api';

export const getStripeConfigAction =() =>async(dispatch)=>{
    try {
        const {data} = await api.getStripeConfig()
        
        return data;
    } catch (error) {
        
    }
}

export const createStripePaymentIntentAction =(payload) =>async(dispatch)=>{
    try {
        const {data} = await api.createIntent(payload)
        return data;
    } catch (error) {
        
    }
}

export const addPaymentToInvoiceAction =(id,payload) =>async(dispatch)=>{
    try {
        const {data} = await api.updateInvoicePayment(id,payload)
    } catch (error) {
        
    }
}