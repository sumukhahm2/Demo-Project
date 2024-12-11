import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navigation.css'
import {useDispatch} from 'react-redux'
import {authAction} from '../../store/authenticationSlice'
import {useNavigate} from 'react-router-dom'

function Navigation() {
   const dispatch=useDispatch()
  const navigate=useNavigate()
    const LogoutHandler=()=>{
      console.log('logout')
       dispatch(authAction.logout())
       navigate('/')
       window.location.reload()
    }
  return (
    <Navbar expand="lg" className="bg-body-tertiary custom-navbar fixed-top mb-2">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#link">Services</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="/salon-booking/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={LogoutHandler}>
                Logout
              </NavDropdown.Item>
             {localStorage.getItem('admin')==='admin' && <NavDropdown.Item href="/admin/salon-booking/notifications">Notifications</NavDropdown.Item>}
             {localStorage.getItem('admin')==='user' && <NavDropdown.Item href="/salon-booking/appointments">Appointments</NavDropdown.Item>}
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;