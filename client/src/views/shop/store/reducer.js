import { createSlice } from "@reduxjs/toolkit";

export const shopDetails = createSlice({
    name:'shopDetails',
    initialState:{
        shop:{
            name:'',
            description:'',
            bannerUrl:'',
            logoUrl:''
        },

    },
    reducers:{
        setShopReducer:(state,action) =>{
            state.shop = action?.payload
        }
    }
});

export const {
    setShopReducer
} = shopDetails.actions;

export default shopDetails.reducer;