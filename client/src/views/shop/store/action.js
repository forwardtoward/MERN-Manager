import { toast } from 'react-toastify';
import * as api from './api';
import { setShopReducer } from './reducer';

export const createShopAction =(payload) => async(dispatch) => {
    try {
        const {data} = await api.createShop(payload);
        if(data.success === true){
            dispatch(setShopReducer(data.data))
            toast.success("Shop created successfully")

        }
        else{
            toast.error("An error occured please try again")
        }
    } catch (error) {
        
    }
}

export const editShopAction =(id,payload) => async(dispatch) => {
    try {
        const {data} = await api.editShop(id,payload);
        if(data.success === true){
            dispatch(getShopAction())
            toast.success("Shop Updated successfully")

        }
        else{
            toast.error("An error occured please try again")
        }
    } catch (error) {
        
    }
}

export const getShopAction = () => async(dispatch) => {
    try {
        const {data} = await api.getShop()
        if(data){
            dispatch(setShopReducer(data[0] || {}))
        }
    } catch (error) {
        
    }
}

export const getIsValidPath = (path) => async(dispatch) => {
    try {
        const {data} = await api.getShopPathValid(path)
     
        return data;
    } catch (error) {
        
    }
}

export const getPublicShopAction = (path) => async(dispatch) => {
    try {
        const {data} = await api.getPublicShop(path)
        if(data){
            dispatch(setShopReducer(data[0] || {}))
        }
    } catch (error) {
        
    }
}

export const getStripeConfigAction = () => async(dispatch) => {
    try {
        const {data} = await api.getStripeConfig()
        
        return data;
    } catch (error) {
        
    }
}

export const createStripePaymentIntentAction = (payload) => async(dispatch)=>{
    try {
        const {data} = await api.createIntent(payload)
        return data;
    } catch (error) {
        
    }
}

export const addPaymentToInvoiceAction = (id,payload) => async(dispatch)=> {
    try {
        const {data} = await api.updateInvoicePayment(id, payload)
        return data
    } catch (error) {
        
    }
}

export const createStripeCustomerAction = (payload) => async(dispatch) => {
    try {
        const { userId, customer } = payload;
        const { data } = await api.createStripeCustomer(userId, customer)
        return data
    } catch (error) {
        
    }
}

export const createStripeSubscriptionAction = (payload) => async(dispatch) => {
    try {
        const {data} = await api.createStripeSubscription(payload)
        return data
    } catch (error) {
        
    }
}

export const createStripeMembership = (payload) => async(dispatch) => {
    try {
        const { membership_name, total_price, payment_type, payment_time } = payload
        const product = {
            name: membership_name,
            default_price_data: {
                currency: 'USD',
                unit_amount: total_price,
                recurring: {
                    interval: payment_type === 'Monthly' ? 'month' : 'week',
                    interval_count: payment_time,
                },
            },
        }

        const { data } = await api.createStripeMembership(product)
        return data;
    } catch (error) {
        
    }
}

export const getStripeMembershipPrice = (productId) => async(dispatch) => {
    try {
        let result = await api.getStripeProduct(productId)
        if (result.success !== 'true') {
            return null                
        }

        const { data } = result;
        result = await api.getStripePrice(data.default_price)
        if (result.success !== 'true') {
            return null
        }
        return result.data;
    } catch (error) {
        
    }
}
