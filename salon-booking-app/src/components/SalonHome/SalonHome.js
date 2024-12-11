
import {Container,Row,Col,Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import './SalonHome.css'


const SalonHome=()=>{

    const navigate=useNavigate()
    const handleLoginSignUp=(data)=>{
        console.log(data)
       navigate(`/salon-booking/login?type=${data}`)
    }
    return(
        <Container>
            <Row className='d-flex flex-column align-items-center'>
            <div className='w-50'>
                <p className='fs-1 '>Welcome to Saloon Booking App</p>
                <p className='fs-3'>Signup/SignIn</p>
            </div>
            
             <Col className='mb-2 bg-light w-50 rounded home-buttons' onClick={()=>handleLoginSignUp('buisness')}>
                 <p className=' text-dark text-decoration-none fs-4 mt-2'>For Buisness --></p>
             </Col>
             <Col className='mb-2 bg-light w-50 rounded home-buttons' onClick={()=>handleLoginSignUp('everyone')}>
             <p className=' text-dark text-decoration-none fs-4 mt-2'>For Everyone --></p>
             </Col>
            </Row>

        </Container>
    )
}


export default SalonHome