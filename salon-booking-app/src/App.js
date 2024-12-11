
import './App.css';
import {useEffect} from 'react'
import Authentication from './components/Authentication/Authentication'
import {useSelector,useDispatch} from 'react-redux'
import Profile from './components/Profile/Profile'
import {Routes,Route,Navigate} from 'react-router-dom'
import SalonHome from './components/SalonHome/SalonHome'
import Navigation from './components/Navigation/Navigation'
import Home from './components/Home/Home'
import AdminHome from './components/Home/AdminHome'
import {authAction} from './store/authenticationSlice'
import AdminNotifications from './components/Home/AdminNotifications'
import UserHome from './components/Home/UserHome'
import UserAppointments from './components/Home/UserAppointment'
import FeedBack from './components/Home/Feedback'
function App() {

  const isLogin=useSelector((state)=>state.auth.isLogin)
  const isAdmin=localStorage.getItem('admin')
  const dispatch=useDispatch() 
  useEffect(()=>{
      if(isLogin)
       dispatch(authAction.login({token:localStorage.getItem('token'),email:localStorage.getItem('email'),role:localStorage.getItem('admin')}))
  },[])
  console.log(isLogin)
  console.log(isAdmin)
  return (
    <div className="">
      <header className="">
       <Navigation/>  
    
      </header>
      <main className='main'>
      <Routes>
          {/* Public Routes */}
          {!isLogin && (
            <>
              <Route path="/" element={<SalonHome />} />
              <Route path="/salon-booking/login" element={<Authentication />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}

          {/* User Routes */}
          {isLogin && isAdmin==='user' && (
            <>
              <Route path="/" element={<Navigate to="/salon-booking/userhome" />} />
              <Route path="/salon-booking/home/:id" element={<Home />} />
              <Route path="/salon-booking/profile" element={<Profile />} />
              <Route path="/salon-booking/userhome" element={<UserHome />} />
              <Route path="/salon-booking/appointments" element={<UserAppointments />} />
             
            </>
          )}

          {/* Admin Routes */}
          {isLogin && isAdmin==='admin' && (
            <>
              <Route path="/" element={<Navigate to="/admin/salon-booking/home" />} />
              <Route path="/admin/salon-booking/home" element={<AdminHome />} />
              <Route path="/admin/salon-booking/notifications" element={<AdminNotifications />} />
              <Route path="/salon-booking/profile" element={<Profile />} />
              <Route path="/salon-booking/feedbacks" element={<FeedBack />} />
              <Route path="*" element={<Navigate to="/admin/salon-booking/home" />} />
            </>
          )}    
        </Routes>
      </main>
    </div>
  );
}

export default App;
