import {Container,Row,Col,Button} from 'react-bootstrap'
import  useFetch from '../../FetchUrl/useFetch'
import {useSelector} from 'react-redux'
import {useState,useEffect} from 'react'
import {useParams,useLocation} from 'react-router-dom'
import './Home.css'
import AppointmentCalendar from './Calendar'
import CustomForm from '../CustomForm/CustomForm'
import FeedBack from './Feedback'
import Details from './Details'
const Home=()=>{
 
  const location=useLocation()
  console.log(location)
  const param=useParams()
    const fetchData={
        url:`http://13.61.4.12:3000/salon-booking/getsalonServices?id=${param.id}`,
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        },
        body:null,
        action:'GET_All_SERVICES'
    }
    
   useFetch(fetchData)
   
   
    const services=useSelector((state)=>state.service.services)
    

   
    const cssClass='p-2 bg-light m-2 text-dark shadow-lg rounded'
    return(
        <Container className='mt-5 '>
          <img src={location.state} alt='' width='100%' height='400px' className='mt-5'/>
           <p className='fs-1'>Welcome to  Salon Booking Home</p>
           <Row className='d-flex flex-column '>
              <p className='fs-2'>Available Services</p>
              {services.length && services.map(service=>
                 <Details service={service} cssClass={cssClass} userId={param.id}/>

              )}
               
           </Row>
          
        </Container>
    )
}



export default Home