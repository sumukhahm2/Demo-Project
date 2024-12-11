import {configureStore} from '@reduxjs/toolkit'
import authenticationSlice from './authenticationSlice'
import serviceSlice from './servicesSlice'
const store=configureStore({
    reducer:{auth:authenticationSlice,service:serviceSlice}
})

export default store