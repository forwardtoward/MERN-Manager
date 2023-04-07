import { customInterIceptors, publicInterIceptors } from "../../../lib/AxiosProvider";
const API = customInterIceptors();
const PUBLIC_API = publicInterIceptors();


export const createShop = (payload) =>{
    return API.post('/shop/create',payload)
}

export const getShop = () =>{
    return API.get('/shop/get')
}

export const editShop = (id,payload) => {
    return API.put(`/shop/update/${id}`,payload)
}

export const getShopPathValid = (path) => {
    return API.get(`/shop/check-shop-path/${path}`)
}

export const getPublicShop = (path) => {
    return PUBLIC_API.get(`/shop/public/get/${path}`)
}

export const getStripeConfig = () => {
    return API.get('/payment/stripe/config')
}
export const createIntent = (payload) => {
    return API.post('/payment/stripe/payment-intent', payload)
}

export const updateInvoicePayment = (id, payload) => {
    return API.put(`/invoice/${id}`, payload)
}

export const createStripeCustomer = (userId, payload)=> {
    return API.post(`/payment/user/${userId}/stripe/customer`, payload)
}

export const createStripeSubscription = (payload)=> {
    return API.post(`/payment/stripe/subscription`, payload)
}

export const createStripeMembership = (payload)=> {
    return API.post(`/payment/stripe/membership`, payload)
}

export const getStripeProduct = (productId)=> {
    return API.get(`/payment/stripe/product/${productId}`)
}

export const getStripePrice = (priceId)=> {
    return API.get(`/payment/stripe/price/${priceId}`)
}
