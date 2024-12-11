
import {createSlice} from '@reduxjs/toolkit'

const defaultState={
    services:[],
    stafs:[],
    notifications:[],
    feedbacks:[]
}

const servicesSlice=createSlice({
    name:'service',
    initialState:defaultState,
    reducers:{
        addService(state,action){
            console.log(action)
            state.services=state.services.concat(action.payload)
            console.log(state.services)
        },
        addStaf(state,action){
            state.stafs=state.stafs.concat(action.payload)
        },
        getServices(state,action){
            state.services=[]
           state.services=state.services.concat(action.payload)
        },
        getStaffs(state,action)
        {
            state.stafs=[]
           state.stafs=state.stafs.concat(action.payload)
        },
        getNotifications(state,action){
            state.notifications=[]
           state.notifications=state.notifications.concat(action.payload)
           console.log(state.notifications)
        },
        updateNotification(state,action){
            console.log(action.payload)
            const { id, status,date,time } = action.payload; 
            const index = state.notifications.findIndex(item => item.id === id); 
            if(status==='Reschedule')
            {
                if (index !== -1) {
               state.notifications[index].date=date
               state.notifications[index].time=time
                }
            }
            else{
                if (index !== -1) {
                    state.notifications[index].status = status;
                }
            }
            
          
        },
        getFeedbacks(state,action){
            state.feedbacks=[]
            state.feedbacks=state.feedbacks.concat(action.payload)
            console.log(state.feedbacks)
        }
        ,
        addFeedback(state,action){
            console.log(action.payload)
            state.feedbacks=state.feedbacks.concat(action.payload)
        }
    }
})
      


export const servicesAction=servicesSlice.actions

export default servicesSlice.reducer