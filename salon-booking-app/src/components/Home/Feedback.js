
import {Container,Col,Row,Button,Form} from 'react-bootstrap'
import useFetch from '../../FetchUrl/useFetch'
import {useRef,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { FaStar } from "react-icons/fa6";
import socket from'../../socket/socket'
import {servicesAction} from '../../store/servicesSlice'

const FeedBack=({serviceId})=>{
const feedbackRef=useRef()
const dispatch=useDispatch()
    useFetch({
        url:`http://13.61.4.12:3000/salon-booking/getAllFeedBacks?serviceId=${serviceId}`,
        method:'GET',
        body:null,
        headers:{

        },
        action:'GET_FEEDBACKS'
    })

    useEffect(()=>{
        socket.emit('join-group',serviceId)
        

        socket.on('incoming-reply',(incomingData)=>{
            console.log(incomingData)
            dispatch(servicesAction.addFeedback(incomingData.data))
        })

        return ()=>{
            socket.off('incoming-reply')
        }
    },[serviceId])

    const feedbacks=useSelector(state=>state.service.feedbacks)
    console.log(feedbacks)

    const submitReply=async(e,data)=>{
        e.preventDefault()
        console.log(data)

        const replyData={
            id:serviceId,
            feedback:feedbackRef.current.value,
            replyId:data.id
        }
       
           
            const result=await fetch('http://13.61.4.12:3000/salon-booking/sendFeedback',{
             method:'POST',
             body:JSON.stringify(replyData), 
             headers:{
               'Content-Type':'application/json',
               'Authorization':localStorage.getItem('token') ,
               'Admin':localStorage.getItem('admin')
             }
           })
           const dta=await result.json()
           console.log(dta)
           socket.emit('send-reply',dta)
          dispatch(servicesAction.addFeedback(dta.data))
           
    }
   const groupFeedback=feedbacks.filter(feedback=>feedback.replyId===null).map((feedback=>{
        const reply=feedbacks.filter((reply)=>reply.replyId===feedback.id)
        return {...feedback,reply}
    }))
    console.log(groupFeedback)
    return(
        <Container className='bg-secondary p-2 my-2'>
            <p className='fs-4'>Customer FeedBacks</p>
            { groupFeedback.length===0 && <p className='fs-3 bg-light m-2 text-dark text-center'>No Feedbacks Found</p>}
            { groupFeedback.length!==0 && groupFeedback.map(feedback=><Row className='bg-light m-1 text-dark' key={feedback.id}>
                 <p className='fs-3 fw-bold'>{feedback.user.username}</p>
                 <p>{feedback.feedback}</p>
                 <div className='mb-2 justify-content-between'>
                    <div>
                 {[...Array(5)].map((star,index)=>
                    <FaStar style={{color:`${feedback.rating>=(index+1)?'yellow':'grey'}`}}/>
                 )}
                 </div>
                 {feedback.reply && feedback.reply.map(reply=>
                    <Row >
                        <p className='fs-3 fw-bold'>{reply.user.username}</p>
                        <p>{reply.feedback}</p>
                    </Row>
                 )}
                 
                 </div>
                 <div className='d-flex  justify-content-end mb-2'>
                 <Form className='d-flex' onSubmit={(e)=>submitReply(e,{...feedback})}>
                    <Form.Control type='text' className='mx-2 border-secondary' ref={feedbackRef}/>
                 <Button className='bg-white text-dark border-secondary' type='submit'>Reply</Button>
                 </Form>
                </div>
            </Row>)}
            </Container>
    )
}

export default FeedBack