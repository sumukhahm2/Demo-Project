
import {Container,Row,Col,Button} from 'react-bootstrap'
import  useFetch from '../../FetchUrl/useFetch'
import {useSelector} from 'react-redux'
import {useState,useEffect} from 'react'
import {useParams,useLocation} from 'react-router-dom'
import './Home.css'
import AppointmentCalendar from './Calendar'
import CustomForm from '../CustomForm/CustomForm'
import FeedBack from './Feedback'



const loadScript=(src)=>{
    return new Promise((resolve)=>{
      const script=document.createElement('script')
      script.src=src
      script.onload=()=>{
        resolve(true)
      }
      script.onerror=()=>{
        resolve(false)
      }
      document.body.appendChild(script)
    })
   
  }

const Details=({service,cssClass,userId})=>{

    const [appointments, setAppointments] = useState([]);

    const fields=[{
        label:'Drop Your Feedback',
        name:'feedback',
        placeholder:'Enter Your Feedback',
        type:'text'
     },
     {
      label:'Rating',
      name:'rating',
      placeholder:'',
      type:'star'
   }
    ]

    const [urlFetch,setFetch]=useState({
        url:'',
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        },
        body:null,
        action:null
    })
    const [appointmentData,setAppointment]=useState(null)
    const [isCalendar,showCalendar]=useState(false)
    const [review,setReview]=useState(false)
    const [feedback,setFeedback]=useState(null)

    const [date,setDate]=useState(new Date())
    const {data,message,error,loading}=useFetch(urlFetch)
    console.log(isCalendar)
    console.log(feedback)

    useEffect(() => {
        if (appointmentData || review) {
          document.body.classList.add("overlay-active");
        } else {
          document.body.classList.remove("overlay-active");
        }
      }, [appointmentData,review]);
  

      const sendConfirmation=async(e)=>{
        const result=await loadScript('https://checkout.razorpay.com/v1/checkout.js')
      console.log(e)
      if(!result){
        alert('Something went wrong')
        return
      }
      console.log(appointmentData.price)
        const res=await fetch(`http://13.61.4.12:3000/salon-booking/pay?amount=${appointmentData.price}`,{
           method:'GET',
           headers:{
             'Authorization':localStorage.getItem('token') ,
             'Admin':localStorage.getItem('admin')
           }
  
        })
    
       const data=await res.json()
       console.log(data)
        var option={
          'key_id':data.key_id,
          amount: appointmentData.price * 100, // Convert to paise
          currency: 'INR',
          name: 'Your Company Name',
          description: 'Test Transaction',
          'order_id':data.order.id,
          'handler':async function (response){
            //console.log(response)
            const result=await fetch('http://13.61.4.12:3000/salon-booking/update-transaction',{
              method:'POST',
              body:JSON.stringify({
                order_id:response.razorpay_order_id,
                payment_id:response.razorpay_payment_id,
                appointmentData
              }), 
              headers:{
                'Content-Type':'application/json',
                'Authorization':localStorage.getItem('token') ,
                'Admin':localStorage.getItem('admin')
              }
            })
           const dta=await result.json()
           console.log(dta)
           if(dta.token)
           {
          console.log(dta.token)
             
           }
           else
           {
             alert(dta.message)
             return
           } 
          }
        }
        const rzp1= new window.Razorpay(option)
        console.log(rzp1)
        rzp1.open()
        e.preventDefault()
      
      }
      const getAppointmentsForDate = (date) => {
        const convertedDate=new Date(date)
        console.log(date)
        const formattedDate = date.toISOString().split("T")[0];
        console.log(formattedDate)
        //return appointments.filter((appt) => appt.date === formattedDate);
      };
  
      const submitFeedback=async(data)=>{
       console.log(data)
       const result=await fetch('http://13.61.4.12:3000/salon-booking/sendFeedback',{
        method:'POST',
        body:JSON.stringify(data), 
        headers:{
          'Content-Type':'application/json',
          'Authorization':localStorage.getItem('token') ,
          'Admin':localStorage.getItem('admin')
        }
      })
      const dta=await result.json()
      setReview(false)
      }

    return(
        <Col className={cssClass}>
        <div>
          <p className='fs-3 fw-bolder'> {service.servicename}</p>
        </div>
      
        <div>
        <p  className='fs-3'> {service.description}</p>
        </div>
       
        <div>
        <p  className='fs-5'>
          Price:- Rs.{service.price}/-
        </p>
        </div>
       
        <div>
        <p  className='fs-5'>Duration:- {service.duration} hh:mm</p>
        </div>
       
        <div>
        <p  className='fs-5'>
          availabality:- {service.availabality}
        </p>
        </div>
        <div className=' d-flex justify-content-between'>
        <div>
        <Button onClick={()=>showCalendar(service.id)}className='mx-2'>Book</Button>
        <Button onClick={()=>setReview(true)} className='bg-success'>Review</Button>
        </div>
        <div>
          <Button className='bg-transparent text-secondary fw-bold' onClick={()=>setFeedback(service.id)}>FeedBack & Reviews</Button>
        </div>
        </div>
        {isCalendar===service.id && <div classNmae=' z-2 mt-2'><p className='fw-bolder'>Select Date</p>
        <AppointmentCalendar returnData={(data)=>setAppointment({...service,date:data.date,time:data.time})} onCancel={()=>showCalendar(false)} userId={userId}/>
        </div> }
        {appointmentData &&
      <>
      <div className='overlaypage' onClick={()=>setAppointment(null)}></div>
      <div className='rounded border border-ridge shadow-lg  bg-light text-dark p-2 w-25 paypage '>
        <p className='fs-2 text-secondary'>Payment Preview</p>
      <Row>  
      <Col>  
      <p className='fw-bolder'>Service Name</p>
      <hr/>
      <p className='fw-bolder'>Duration</p>
      <hr/>
      <p className='fw-bolder'>Amount to Pay</p>
      <hr/>
      </Col>
      <Col>
      <p className=''>{appointmentData.servicename}</p>
      <hr/>
      <p className=''>{appointmentData.duration} HH:MM</p>
      <hr/>
      <p className=''>{appointmentData.price} Rs/-</p>
      <hr/>
      </Col>
      <div className='text-center'>
        <Button className='mx-2 px-4 bg-success' onClick={sendConfirmation}>Pay</Button>
        <Button className='bg-danger' onClick={()=>setAppointment(null)}>Cancel</Button>
        </div>
      </Row>
      </div>
      </>}
      {review && <CustomForm fields={fields} onSubmit={(data)=>submitFeedback({...service,...data})} closeForm={()=>setReview(false)}/>}
        {feedback===service.id && <FeedBack serviceId={service.id}/>}
     </Col>
    )
}

export default Details