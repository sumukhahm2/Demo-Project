

import {Container,Row,Col,Button} from 'react-bootstrap'
import useFetch from '../../FetchUrl/useFetch'
import {useState} from 'react'
import CustomForm from '../CustomForm/CustomForm'
import {useSelector,useDispatch} from 'react-redux'
import {authAction} from '../../store/authenticationSlice'

const Profile=()=>{
  const dispatch=useDispatch()
    const [editProfile,setEditProfile]=useState(false)
    const isAdmin=localStorage.getItem('admin')==='admin'
    const [update,setUpdate]=useState({
        url:'http://13.61.4.12:3000/salon-booking/getProfile',
        method:'GET',
        headers:{
            'Authorization':localStorage.getItem('token'),
             'Admin':localStorage.getItem('admin')
        },
        body:null,
        action:'GET_PROFILE'
    })
   
    const profile=useSelector(state=>state.auth.profile)
   const {data,message,error,loading}=useFetch(update)
    let fields
    console.log(isAdmin)
   if(isAdmin)
   {
     fields=[{
        name:'name',
        label:'Company Name',
        type:'text',
        placeholder:'Enter Your Salon Shop Name'
       },
       {
        name:'address',
        label:'Address',
        type:'text',
        placeholder:'Enter Address'
       },
       {
        name:'photo',
        label:'Salon Photo',
        type:'file',
        placeholder:'upload Salon Photo'
       },
    ]
   }
    else
    {
     fields=[
        {
        name:'dob',
        label:'Date Of Birth',
        type:'date',
        placeholder:'Enter Date Of Birth'
       },
       {
        name:'gender',
        label:'Gender',
        type:'select',
        values:['Select Gender','Male','Female'],
        placeholder:'Enter Age'
       },
       {
        name:'address',
        label:'Address',
        type:'text',
        placeholder:'Enter Address'
       },
       {
        name:'photo',
        label:'Salon Photo',
        type:'file',
        placeholder:'upload Salon Photo'
       },
    ]
}
    

  
const handleUpdateProfile = async (data) => {
    console.log("Data received:", data); // Log incoming data
  
    // Create a FormData object
    const formData = new FormData();
  
    // Append all fields to FormData
    for (let key in data) {
      if (key === "photo") {
        // Append file if it exists
        formData.append(key, data[key]); // Handle file input
      } else {
        // Append other fields
        formData.append(key, data[key]);
      }
    }
  
    //Debug: Log FormData contents
    console.log("FormData before sending:");
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
  
    // Make the POST request to update profile
    const url = "http://13.61.4.12:3000/salon-booking/postProfile";
    try {
      const response = await fetch(url, {
        method: "POST",
        body:formData, // Send FormData
        headers: {
          'Authorization': localStorage.getItem("token"),
          'Admin': localStorage.getItem("admin"), // Optional header for admin
        },
      });
  
      const result = await response.json();
      console.log("Server response:", result);
  
      if (result) {
        alert("Profile updated successfully!");
        dispatch(authAction.setProfile(result.data))
        setEditProfile(false)
      } else {
        alert(`Failed to update profile: ${result.message}`);
      }
    } catch (error) {
      console.error("Error while updating profile:", error);
      alert("Something went wrong while updating the profile.");
    }
  };
  

   console.log(profile)
    return(
        <Container className=''>
            <Row>
                {editProfile && <CustomForm fields={fields} onSubmit={handleUpdateProfile} closeForm={()=>setEditProfile(false)}/>}
                <p className='fs-1'>Profile</p>
                <div className="d-flex justify-content-end">
                
                <Button className='bg-transparent btn-md' onClick={()=>setEditProfile(true)}>Edit</Button>
                </div>
                
                <Col>
                    {isAdmin && <p>Company Name:-   {profile[0]?profile[0].profile.name:''}</p>}
                    <p>Name:- {profile[0]?profile[0].username:''}  </p>
                    <p>Mobile Number:- {profile[0]?profile[0].phone:''}</p>
                    <p>Email:- {profile[0]?profile[0].email:''} </p>
                    <p>Date Of Birth:- {profile[0]?profile[0].profile.dob:''} </p>
                    <p>Gender:- {profile[0]?profile[0].profile.gender:''}</p>
                </Col>
                <Col>
                <p>Address:- {profile[0]?profile[0].profile.address:''}</p>
                </Col>
             </Row>   
            
        </Container>
    )
}

export default Profile