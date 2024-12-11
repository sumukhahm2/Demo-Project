import React, { useState, useEffect,useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Container, Modal, Button, Form } from "react-bootstrap";
import useFetch from '../../FetchUrl/useFetch'
import {useSelector} from 'react-redux'

const AppointmentCalendar = ({returnData,onCancel,reschedule,userId}) => {
  const [selectedDate, setSelectedDate] = useState(new Date()); 
  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const timeRef=useRef()
  const ampmRef=useRef()
  const [newAppointment, setNewAppointment] = useState({
    title: "",
    time: "",
  });

  
    useFetch({
        url:`http://13.61.4.12:3000/salon-booking/getallnotification?userId=${userId}`,
        method:'GET',
        body:null,
        headers:{
            'Authorization':localStorage.getItem('token'),
            'Admin':localStorage.getItem('admin')
        },
        action:'GET_NOTIFICATIONS'
        

    })

const allAppointments=useSelector(state=>state.service.notifications)
console.log(allAppointments)

const getdateAndTime=(e)=>{
   e.preventDefault()
   console.log({date:selectedDate,time:`${timeRef.current.value} ${ampmRef.current.value}`})
   returnData({date:selectedDate.toLocaleDateString("en-CA"),time:`${timeRef.current.value} ${ampmRef.current.value}`})
   setShowModal(false)
   onCancel()

}

  const handleDateClick = (date) => {
    console.log(date); 
    const formattedDate = date.toLocaleDateString("en-CA");
    
    if(!isAppointed(formattedDate))
    {
        setSelectedDate(date);
        setShowModal(true)
      }
      else
         alert('This Date Already Booked ')
    }
   

  const isAppointed = (date) => {
    // allAppointments.some(appt=>console.log(new Date(appt.date).toISOString().split("T")[0]+' '+date))
    // allAppointments.some(appt=>console.log(new Date(appt.date).toISOString().split("T")[0]===date))
return allAppointments.some(appt=>new Date(appt.date).toLocaleDateString("en-CA")===date)
  };

  return (
    <Container className='mb-2'>
      <div className='d-flex justify-content-end fw-bolder fs-4'><Button onClick={onCancel} className='bg-danger'>Close</Button></div>
      <h2 className="text-center">Appointment Scheduler</h2>
      <p className='text-danger fw-bolder'>Red background dates are booked </p>
      <Calendar
        onClickDay={handleDateClick}
        value={selectedDate}
        minDate={new Date()}
        tileClassName={({ date }) => {
            const formattedDate = date.toLocaleDateString("en-CA");
            console.log(formattedDate)
            console.log(isAppointed(formattedDate))
            if (isAppointed(formattedDate)) {
              return "bg-danger "; // Add "red" for appointed dates
            } else {
              return ""; 
            }
          }}
          
            
      />
   {showModal && <div>
        <Form onSubmit={getdateAndTime}>
            <Form.Text>Enter The Time SLot</Form.Text>
            <Form.Control type='time' ref={timeRef}/>
            <Form.Select ref={ampmRef}>
                <option value='AM'>AM</option>
                <option value='PM'>PM</option>
            </Form.Select>
            <Button type='submit'>Submit</Button>
        </Form>
    </div>}
       
    </Container>
  );
};

export default AppointmentCalendar;
