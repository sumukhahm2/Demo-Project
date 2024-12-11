
import {Container,Col,Row,Button,Form} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import {Link } from 'react-router-dom'
import useFetch from '../../FetchUrl/useFetch'
import { FaStar } from "react-icons/fa";
import SearchBar from './SearchBar'
import {useState,useRef} from 'react'

const UserHome=()=>{
    const searchRef=useRef()
    const [search,setSearch]=useState()

    useFetch({
        url:'http://13.61.4.12:3000/salon-booking/getAllProfile',
        method:'GET',
        headers:{
            'Authorization':localStorage.getItem('token'),
             'Admin':localStorage.getItem('admin')
        },
        body:null,
        action:'GET_PROFILE'
    })
    const profiles=useSelector(state=>state.auth.profile)
    const searchDatas=(e)=>{
        e.preventDefault()
        setSearch(searchRef.current.value)
  
      }
      
  
    console.log(profiles)
    return(
        <Container>
              <Row>
                <p className='fs-1'>Book local beauty and wellness services</p>
                <div>
                <Form className='w-50 d-flex  mb-2' onSubmit={searchDatas}>
           <Form.Control type='text' className='mx-2' placeholder='Search services' ref={searchRef}/>
           <Button type='submit'>Search</Button>
           </Form>
               {search && <SearchBar search={search}/>}
               </div>
               {profiles.length !== 0 &&
                profiles.map((profile) => (
                    <Col key={profile.userId} className="col-12 col-md-6 col-lg-4 d-flex align-items-stretch">
                        <Link
                            className="text-decoration-none w-100"
                            to={`/salon-booking/home/${profile.userId}`}
                            state={profile.photo}
                        >
                            <div className="bg-light text-dark fw-bold p-3 border border-ridge border-lg border-warning h-100">
                                {/* Image Section */}
                                <Row>
                                    <div className="text-center">
                                        <img
                                            src={profile.photo}
                                            alt={profile.name}
                                            className="img-fluid"
                                            style={{
                                                width: '300px',
                                                height: '200px',
                                                objectFit: 'cover',
                                                borderRadius: '10px',
                                            }}
                                        />
                                    </div>
                                </Row>
                                {/* Content Section */}
                                <Row className="mt-3">
                                    <p className="fs-4 text-center">{profile.name}</p>
                                    <p className="fs-5 text-center">{profile.address}</p>
                                    <p className="text-center">
                                        4.2 <FaStar style={{ color: 'gold' }} />
                                    </p>
                                </Row>
                            </div>
                        </Link>
                    </Col>
                ))}
              </Row>
        </Container>
    )
}


export default UserHome