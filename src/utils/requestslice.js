import { createSlice } from "@reduxjs/toolkit";

const requestSlice=createSlice({
    name:"request",
    initialState:null,
    reducers:{
        addRequest:(state,action)=>action.payload,
        removeUserRequest:(state,action)=>{
            const newRequest=state.filter((user)=>user._id!==action.payload)
            return newRequest;
        }
    }
})

export const {addRequest,removeUserRequest}=requestSlice.actions;
export default requestSlice.reducer;
