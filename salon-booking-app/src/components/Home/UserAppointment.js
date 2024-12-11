
import {Container,Row,Col,Button} from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux' 
import useFetch from '../../FetchUrl/useFetch'
import {useState} from 'react'
import Calendar from './Calendar'
import {servicesAction} from '../../store/servicesSlice'
import socket from '../../socket/socket'
const UserAppointments=()=>{
  const [isCalendar,setCalendar]=useState(false)
  const [isDownload,setDownload]=useState(null)
  const dispatch=useDispatch()
  const [fetchUrl,setUrl]=useState({
    url:'http://13.61.4.12:3000/salon-booking/getnotification',
    method:'GET',
    body:null,
    headers:{
        'Authorization':localStorage.getItem('token'),
        'Admin':localStorage.getItem('admin')
    },
    action:'GET_NOTIFICATIONS'
})
    useFetch(fetchUrl)

    const submitData=async(data)=>{
     console.log(data)
      
        const response=await fetch('http://13.61.4.12:3000/salon-booking/reschedule-appointment',{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
            'Content-Type':'application/json',
            'Authorization':localStorage.getItem('token'),
            'Admin':localStorage.getItem('admin')
        },
    })
    const dta=await response.json()
    console.log(dta)
    if(dta.message)
    {
        dispatch(servicesAction.updateNotification({id:data.id,status:'Reschedule',date:data.date,time:data.time}))
        socket.emit('reschedule-appointment',dta.data)
        alert(dta.message)
    }
   
    else
     alert(dta.error)
     

    }

    const generateInvoice=async(id)=>{
        const response=await fetch(`http://13.61.4.12:3000/salon-booking/getinvoice?appointmentId=${id}`,{
            method:'GET',
            body:null,
            headers:{
                'Content-Type':'application/json',
                'Authorization':localStorage.getItem('token'),
                'Admin':localStorage.getItem('admin')
            },
        })
        console.log(response)
        const dta=await response.json()

        console.log(dta)
        setDownload(dta.message.invoiceURL)
        document.getElementById('download').click()
       
    }

    const cancelAppointment=async(data)=>{
       console.log(data)
       const response=await fetch('http://13.51.199.15:3000/salon-booking/reschedule-appointment',{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
            'Content-Type':'application/json',
            'Authorization':localStorage.getItem('token'),
            'Admin':localStorage.getItem('admin')
        },
    })
    const dta=await response.json()
    console.log(dta)
    if(dta.message)
    {

        
        dispatch(servicesAction.updateNotification(data))
        socket.emit('cancel-appointment',data)
        alert(dta.message)
    }
    
    else
     alert(dta.error)
     
    }
    const appointments=useSelector(state=>state.service.notifications)
    console.log(appointments)
   return(
    <Container className='mt-5'>
        <p className='fs-2'>Booked Appointments</p>
          {appointments.length && appointments.map(appt=>
          <Row key={appt.id} className='bg-light mb-2 text-dark d-flex'>
            <div>
            {appt.status==='Success' && <p className='fs-5 fw-bolder'>Your Appointment for {appt.appointmentname} has been Booked with Staf {appt.stafname} on {appt.date.split('T')[0]} {appt.time}</p>}
            {appt.status==='Pending' && <p className='fs-5 fw-bolder'>Your Appointment for {appt.appointmentname} has been  Booked on {appt.date.split('T')[0]} {appt.time} and staf allotment need to be done </p>}
            {appt.status==='Canceled' && <p className='fs-5 fw-bolder'>Your Appointment for {appt.appointmentname} has been  Canceled </p>}
            </div>
            {appt.status!=='Canceled' &&<div className='mb-2'>
            <Button className='mx-2 bg-warning' onClick={()=>setCalendar(appt.id)}>Reschedule</Button>
            <Button className='bg-danger mx-2' onClick={()=>cancelAppointment({id:appt.id,status:'Canceled'})}>Cancel Appointment</Button>
           { appt.status==='Success' && <Button onClick={()=>generateInvoice(appt.id)}>Generate Invoice</Button>}
           { appt.status==='Success' && <a id='download' className='d-none' target='_blank' download="MyExampleDoc" href={isDownload}></a>}
         
            </div>}
            {isCalendar===appt.id && <Calendar returnData={(data)=>submitData({...data,status:appt.status,id:appt.id})} onCancel={()=>{setCalendar(null)}} reschedule={appt}/>}
          </Row>)}
    </Container>
   )
}

export default UserAppointments