import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedslice";
import connectionReducer from "./connectionslice";
import requestReducer from "./requestslice";
const appStore=configureStore({
    reducer:{
        user:userReducer,
        feed:feedReducer,
        connection:connectionReducer,
        request:requestReducer
    },
});

export default appStore;