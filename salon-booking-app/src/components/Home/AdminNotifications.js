

import {Container,Row,Col,Button} from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import useFetch from '../../FetchUrl/useFetch'
import {useState} from 'react'
import CustomTable from './CustomTable'
import {servicesAction} from '../../store/servicesSlice'

const AdminNotifications=()=>{

    const [fetchData,setFetchData]=useState({
        url:'http://13.61.4.12:3000/salon-booking/getnotification',
        method:'GET',
        body:null,
        headers:{
            'Authorization':localStorage.getItem('token'),
            'Admin':localStorage.getItem('admin')
        },
        action:'GET_NOTIFICATIONS'
        

    })
   const dispatch=useDispatch()
    useFetch(fetchData)
    useFetch({
        url:'http://13.61.4.12:3000/salon-booking/getadminStaf',
        method:'GET',
        headers:{
            'Authorization':localStorage.getItem('token'),
            'Admin':localStorage.getItem('admin')
        },
        body:null,
        action:'GET_All_STAFS'
      })

      const stafs=useSelector((state)=>state.service.stafs)


    const [staftable,setStafTable]=useState(null)

    const notifications=useSelector(state=>state.service.notifications)
    console.log(notifications)

    const handleAppointment=(data)=>{
      console.log(data)
      const updateData={
        status:'Success',
        id:data.notificationId,
        stafId:data.id,
        stafname:data.name,
        time:data.availabality,
        email:localStorage.getItem('email')
    }
      setFetchData(
      {
        url:'http://13.61.4.12:3000/salon-booking/update-appointment',
        method:'POST',
        body:updateData,
        headers:{
            'Content-Type':'application/json',
            'Authorization':localStorage.getItem('token'),
            'Admin':localStorage.getItem('admin')
        },
        action:null
        

    })
      dispatch(servicesAction.updateNotification({status:'Success',id:data.notificationId}))
    }
    return(
        <>
          <Container className='mt-5'>
              <p className='fs-1'>Notifications</p>
            {notifications.length===0 && <p>No Notifictions</p>}
             {notifications.map(notification=><Row key={notification.id} className='text-dark bg-light rounded p-2 d-flex mb-2 justify-conent-center w-auto align-items-center'>
                  <p className='fs-5 w-75 fw-bold'>{notification.user.username} has been  {notification.status==='Canceled'?'Canceled':'Booked'} An Appointment for {notification.appointmentname}</p>
                  <div className='w-25 '>
                   { notification.status==='Pending' && <Button className='bg-info text-dark fw-bold' onClick={()=>setStafTable(notification)}>Appoint Staf</Button>}
                    {notification.status==='Success' && <><p className='fw-bold'> Appointment Booked</p> <Button className='btn-success'>Details</Button></>}
                  </div>
              </Row>)} 
              {staftable && <CustomTable data={stafs} id={staftable.id}  handleAppointment={handleAppointment} onClose={()=>setStafTable(null)}/>}
             
            </Container>
        </>
    )
}


export default AdminNotifications