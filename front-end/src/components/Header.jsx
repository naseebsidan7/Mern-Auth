import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Navbar,NavDropdown,Badge } from 'react-bootstrap';
 
import { FaSignInAlt,FaSignOutAlt,FaHome } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'

import { useSelector,useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/userApiSlice.js';
import { logout } from '../slices/authSlices.js';
import { useNavigate } from 'react-router-dom';

function BasicExample() {
  const {userInfo} = useSelector((state)=>state.auth)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async ()=>{
         try {
             await logoutApiCall().unwrap();
             dispatch(logout());
             navigate('/')
         } catch (err) {
          console.log(err);
         }
  }

  return (
    <Navbar  expand="lg" className="  headerBg" collapseOnSelect>
      <Container>
 
        <LinkContainer to='/'>
        <Navbar.Brand><h5 className='triangleFontFamily' style={{fontWeight:500,fontSize:30}}>MERN Auth</h5></Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">

            {/* <LinkContainer to='/'>
            <Nav.Link   className='triangleFontFamily' style={{fontWeight:600,fontSize:17,marginRight:15}}>
            <FaHome/> Home
            </Nav.Link>
            </LinkContainer> */}

            {userInfo ? (

               <>
                 <NavDropdown    title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'> 
                     <NavDropdown.Item> Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={ logoutHandler } > Logout </NavDropdown.Item>
                 </NavDropdown>
               </>

             ) : (
              <>

                  <LinkContainer to='/login'>
                <Nav.Link className='triangleFontFamily' style={{fontWeight:600,fontSize:17,marginRight:15}}>
                  <FaSignInAlt /> Login
                </Nav.Link>
                </LinkContainer>

                <LinkContainer to='/register'>
                <Nav.Link className='triangleFontFamily' style={{fontWeight:600,fontSize:17,marginRight:15}}>
                  <FaSignOutAlt/> Signup
                </Nav.Link>
                </LinkContainer>

              </>
            )}
         

           
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;