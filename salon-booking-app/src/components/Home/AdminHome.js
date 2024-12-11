import {Container,Col,Row,Button} from 'react-bootstrap'
import  useFetch from '../../FetchUrl/useFetch'
import {useSelector,useDispatch} from 'react-redux'
import {useState} from 'react'
import CustomForm from '../CustomForm/CustomForm'
import {servicesAction} from '../../store/servicesSlice'
import FeedBack from './Feedback'
import './Home.css'

const AdminHome=()=>{
  //console.log(servicesAction.servicesAction.addService)
 const dispatch=useDispatch()
  const fetchData={
    url:'http://13.61.4.12:3000/admin/salon-booking/getsalonServices',
    method:'GET',
    headers:{
        'Authorization':localStorage.getItem('token'),
        'Admin':localStorage.getItem('admin')
    },
    body:null,
    action:'GET_All_SERVICES'
}

const [addServices,setService]=useState(false)
const [addStaf,setStaf]=useState(false)
const [serviceId,setServiceId]=useState(null)
const [fetch,setFetch]=useState(fetchData)
const fields=[{
  label:'Service Name',
  type:'text',
  placeholder:'',
  name:'servicename'
},
{
label:'Description About Service',
type:'textarea',
placeholder:'',
name:'description'
},
{
label:'Service Price',
type:'number',
placeholder:'',
name:'price'
},
{
label:'How Much Time It Will Take To Finish Your Service?',
type:'time',
placeholder:'',
name:'duration'
}
]

const stafFields=[{
  label:'Name',
  type:'text',
  placeholder:'Enter Staf Name',
  name:'name'
},
{
  label:'Email',
  type:'email',
  placeholder:'Enter Staf Email',
  name:'email'
},
{
  label:'Contact Number',
  type:'number',
  placeholder:'Enter Staf Contact Detail',
  name:'phone'
},
{
  label:'Specialization',
  type:'select',
  values:['Select Specialization','Beautician','Spa Therapist','Unisex HairStylist','Sinior Beautician','Tatoo Artist','Mehindi Application','Cosmetologist'],
  placeholder:'Specialization',
  name:'specialization'
},
{
  label:'Availabality',
  type:'text',
  placeholder:'',
  name:'availabality'
}]

const {data,message,error,loading}=useFetch(fetch)
console.log(data)
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
const services=useSelector((state)=>state.service.services)
const stafs=useSelector((state)=>state.service.stafs)

console.log(stafs)
const handleService=(dta)=>{
  console.log(dta)
  const info={info:{...dta}}
  console.log(info)
 
  setFetch({
    url:'http://13.61.4.12:3000/salon-booking/postsalonServices',
    method:'POST',
    headers:{
       'Content-Type':'application/json',
        'Authorization':localStorage.getItem('token'),
        'Admin':localStorage.getItem('admin')
    },
    body:info,
    action:'ADD_SERVICE'
})

  setService(false)
}

const handleStaf=(dta)=>{
  console.log(dta)
  setFetch({
    url:'http://13.61.4.12:3000/admin/salon-booking/addStaf',
    method:'POST',
    headers:{
       'Content-Type':'application/json',
        'Authorization':localStorage.getItem('token'),
        'Admin':localStorage.getItem('admin')
    },
    body:dta,
    action:'ADD_STAF'
})

  setStaf(false)
}
    return(
        <Container className='mt-5 '>
         {!serviceId &&<>
           <p className='fs-1'>Welcome to Salon Booking AdminHome</p>
        <Row>  
            <p className='fs-2'>Added Services:-</p>
            {services.length && services.map(service=>
               <Col className='border border-ridge border-danger mx-1 mb-2 col-5 bg-light text-dark'>
                  <div className='text-center bg-warning rounded mt-2'>
                    <p className='fs-3 fw-bolder'> {service.servicename}</p>
                  </div>
                  <hr/>
                  <div>
                  <p  className='fs-4 fw-bolder'>Description:- <span className='fw-lighter'>{service.description}</span></p>
                  </div>
                  <div>
                  <p  className='fs-4 fw-bolder'>
                    Price:- <span className='fw-lighter'>{service.price}</span>
                  </p>
                  </div>
                  <div>
                  <p  className='fs-4 fw-bold'>Duration:- <span className='fw-lighter'>{service.duration} hh:mm</span></p>
                  </div>
                  <div>
                  <p  className='fs-4 fw-bolder'>
                    availabality:- <span className='fw-lighter'>{service.availabality}</span>
                  </p>
                  </div>
                  <div className='mb-2 d-flex'>
                  <span className=''>0</span>
                    <Button className='bg-transparent text-secondary' onClick={()=>setServiceId(service.id)}>Customer Feedbacks </Button>
                  </div>

               </Col>

              )}
              <div>
              <Button onClick={()=>setService(true)}>Add Services</Button>
              {addServices && !addStaf && <CustomForm fields={fields} onSubmit={handleService} closeForm={()=>setService(false)} formname='Add Services'/>}
              </div>
          </Row>  
          <Row>  
            <p className='fs-2'>Added Stafs:-</p>
            {stafs.length && stafs.map(staf=>
               <Col className='border border-ridge border-danger mx-1 mb-2 col-5 bg-light text-dark rounded'>
                  <div className='text-center bg-info rounded mt-2'>
                    <p className='fs-4 fw-bolder'> {staf.name}</p>
                  </div>
                  <div>
                  <p  className='fs-5 fw-bolder'>Email:-  <span className='fw-lighter'>{staf.email}</span></p>
                  </div>
                  <div>
                  <p  className='fs-5 fw-bolder'>
                    Mobile No:- <span className='fw-lighter'>{staf.phone}</span>
                  </p>
                  </div>
                  <div>
                  <p  className='fs-5 fw-bolder'>Specialization:- <span className='fw-lighter'>{staf.specialization} </span></p>
                  </div>
                  <div>
                  <p  className='fs-5 fw-bolder'>
                    availabality:- <span className='fw-lighter'>{staf.availabality}</span>
                  </p>
                  </div>
               </Col>

              )}
              <div>
              <Button onClick={()=>setStaf(true)}>Add Staf</Button>
              {!addServices && addStaf && <CustomForm fields={stafFields} onSubmit={handleStaf} closeForm={()=>setStaf(false)} formname='Add Stafs'/>}
              </div>
          </Row> </>}
          {serviceId && <FeedBack serviceId={serviceId}/>}
        </Container>
    )
}



export default AdminHome