
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useSelector,useDispatch} from 'react-redux'
import {useState,useRef} from 'react'
import useFetch from '../../FetchUrl/useFetch'
import LoadingBar from '../ProgressBar'
import {useSearchParams} from 'react-router-dom'
import CustomForm from '../CustomForm/CustomForm'

function Authentication() {
   const [inSignUp,setSwitch]=useState(false)
   const [next,setNext]=useState(null)
    const isLogin=useSelector((state)=>state.auth.isLogin)
    const formRefs = useRef({});
    const [searchParams]=useSearchParams()

  console.log(inSignUp)
    const type=searchParams.get('type')
    const [requestConfig, setRequestConfig] = useState({
        url:'',
        method:'GET',
        headers:{},
        body:null,
        action:null
    });
    
 console.log(requestConfig)
    const { data,message, error, loading } = useFetch(
       requestConfig
    );


    const setInputRef = (key) => (el) => {
      formRefs.current[key] = el; 
    };


     const handleAuthentication=(e)=>{
        e.preventDefault()
        
        const formData = {};
      for (const key in formRefs.current) {
        if (formRefs.current[key])
        {
            formData[key] = formRefs.current[key].value;
             formRefs.current[key].value=''
        }
       }
       console.log(formData)
       
        let userData={
          ...formData,
          role:'user'
       }
       if(type==='buisness')
        {
          userData={
            ...formData,
            role:'admin'
         }
        }
        let url
        let action
        if(inSignUp)
        {
         url='http://13.61.4.12:3000/salon-booking/signup'
         action=null
        }
        else{
             
             url='http://13.61.4.12:3000/salon-booking/signin'
            action='LOGIN'
        }
      setRequestConfig({             
        url: url,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: userData, 
        action:action
    })
  }
        
  return (
    <div className='mt-5 m-auto'>  
    <Form onSubmit={handleAuthentication} className=' '>              
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Text className='text-light fs-3'>{inSignUp?'SignUp Here-->':'Login Here-->'}</Form.Text>
        <br/>
        { message && <Form.Text className='text-success fs-5'>{message}</Form.Text>}
        { error && <Form.Text className='text-danger fs-5'>{error}</Form.Text>}
        <br/>
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" ref={setInputRef('email')}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      {inSignUp && <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Your Name" ref={setInputRef('username')}/>
      </Form.Group>}

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" ref={setInputRef('password')}/>
      </Form.Group>
     {inSignUp && <><Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" ref={setInputRef('confirm-password')}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Mobile Number</Form.Label>
        <Form.Control type="number" placeholder="Mobile Number" ref={setInputRef('phone')} />
      </Form.Group>
    </>}
      
     {!loading  && <Button variant="primary" type="submit" className="mx-2">
        {inSignUp?'SignUp':'Login'}
      </Button>}
      {loading && <LoadingBar now={loading}/>}
      <Button className="btn-link" onClick={()=>setSwitch((prev)=>!prev)}  style={{backgroundColor: 'inherit'}}>{!inSignUp?'Dont Have An Account?':'Have An Account?'}</Button>
    </Form>
    </div>
  );
}

export default Authentication;