import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../slices/authSlices.js';
import { apiSlice } from '../slices/apiSlice.js';
import adminReducer from '../slices/adminSlices/adminAuthSlice.js';

const Store = configureStore({
    reducer: {
        auth:authReducer,
        adminAuth:adminReducer,
        [apiSlice.reducerPath]:apiSlice.reducer,
    },
    middleware:(getDefaultMiddleware)=>
     getDefaultMiddleware().concat(apiSlice.middleware),
     devTools:true
})

export default Store;