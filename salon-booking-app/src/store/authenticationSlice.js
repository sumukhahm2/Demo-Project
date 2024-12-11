
import {createSlice} from '@reduxjs/toolkit'

const defaultState={
    isLogin:localStorage.getItem('token')?true:false,
    token:null,
    profile:[],
    isAdmin:localStorage.getItem('admin')==='admin'
}

const authenticationSlice=createSlice({
    name:'auth',
    initialState:defaultState,
    reducers:{
        login(state,action){
            console.log(action)
           state.isLogin=true
           localStorage.setItem('token',action.payload.token)
           localStorage.setItem('email',action.payload.email)
           localStorage.setItem('admin',action.payload.role)
           state.isAdmin=action.payload.isAdmin
           state.token=action.payload.token
        },
        logout(state){
            localStorage.removeItem('token')
            localStorage.removeItem('email')
            localStorage.removeItem('admin')
            state.token=null
        },
        setProfile(state,action){
            state.profile=[]
            console.log(action.payload)
          state.profile=state.profile.concat(action.payload)
        }

    }
})



export const authAction=authenticationSlice.actions

export default authenticationSlice.reducer