import { createSlice } from "@reduxjs/toolkit";

export const organizations = createSlice({
    name:'organizations',
    initialState:{
        myOrgs:[
        ],
        plans:[],

    },
    reducers:{
        setOrgs: (state,action) =>{
            state.myOrgs = action?.payload
        },
        setPlans:(state,action) =>{
            state.plans = action?.payload
        },
        
    }
})

export const {setOrgs,setPlans,setDefaultElements} = organizations?.actions

export default organizations.reducer


// {
//     name:'',
//     email:'',
//     contact:'',
//     address:'',
//     url:'',
//     isVerified:false
//     totals:{
//         users:0,
//     }
// }