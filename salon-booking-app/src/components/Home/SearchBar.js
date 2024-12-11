
import {Container,Row,Button,Form} from 'react-bootstrap'
import {useState,useRef} from 'react'
import {useSelector} from 'react-redux'
import useFetch from '../../FetchUrl/useFetch'
import Details from './Details'
import './SearchBar.css'
const SearchBar=({search})=>{

   
    useFetch({
        url:`http://13.61.4.12:3000/salon-booking/getsalonServices`,
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        },
        body:null,
        action:'GET_All_SERVICES'
    })
   
    const services=useSelector(state=>state.service.services)
    console.log(services)
    const searchItem=services.filter(item=>item.servicename.toLowerCase().includes(search))

const cssClass='p-2 bg-light m-2 text-dark   shadow-lg rounded'
    return(

        <Container className='h-auto'>
        
            <p className='fs-4 text-center fw-bold'>Search Results</p> 
        {searchItem.length!==0 && searchItem.map(item=><>
       
            <Details service={item} cssClass={cssClass} userId={item.userId}/>
           </>)}
       </Container>
    )
}


export default SearchBar