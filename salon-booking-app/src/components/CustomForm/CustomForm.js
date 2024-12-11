
import {Form,Button,Container} from 'react-bootstrap'
import {useState,useRef} from 'react'
import './CustomForm.css'
import { FaStar } from "react-icons/fa6";
const CustomForm=({fields,onSubmit,closeForm,formname})=>{
   const [rating,setRating]=useState(null)
   const formRefs=useRef({})
     console.log(fields)
    const handleFormSubmit = (e) => {
        e.preventDefault(); 

        let formData = Object.keys(formRefs.current).reduce((acc, key) => {
          const field = formRefs.current[key];
          if (field.type === 'file') {
            acc[key] = field.files[0] || null; 
            // Get the first file or null if no file was uploaded
          } 
          else{
            acc[key] = formRefs.current[key].value;
             
          }
             
            formRefs.current[key].value=''
            return acc;
        }, {});
         console.log(formData)
         if(rating)
         {
          formData={...formData,rating:rating}
         }
        onSubmit(formData); 
    };
    console.log(rating)
    return(
          <>
           <div className='overlaypage' onClick={closeForm}></div>
           <Container className='border border-ridge rounded bg-light text-center text-dark w-50 p-2    d-flex flex-column justify-content-center align-items-center z-2 custom-form' >
              <p className='fs-2'>{formname}</p>
            <Form onSubmit={handleFormSubmit} className=' w-75 '>
             {fields && fields.length>0 && fields.map((field)=><>
             {field.type!=='select'  && field.type!=='star' && <Form.Group className="mb-3" controlId="formBasicEmail" key={field.name}>
                <Form.Label>{field.label}</Form.Label>
                <Form.Control type={field.type} placeholder={field.placeholder} ref={(el) => (formRefs.current[field.name] = el)} />
                </Form.Group>  }       
                {field.type==='select' && <Form.Group className="mb-3" controlId="formBasicEmail" key={field.name}>   
                 <Form.Select aria-label="Default select example" ref={(el) => (formRefs.current[field.name] = el)}>
                {field.values.map((value)=><option value={value}>{value}</option>) }
                </Form.Select>
              </Form.Group>}

              {field.type==='star' && [...Array(5)].map((star,index)=>
                
                <><label>
                 <input type='radio' name='rating' value={index+1} onClick={()=>setRating(index+1)} className='d-none'/>
                 <FaStar size='50px' style={{color:`${index+1<=rating?'yellow':'grey'}`}}/>
              </label></>) }</>)}
              <br/>
              <Button variant="primary" type="submit" className='mx-2'>
                Submit
              </Button>
              <Button variant="danger" onClick={closeForm}>Cancel</Button>
            </Form>
            </Container>
            </>
          );
       
}

export default CustomForm