import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAdminLogoutApiMutation } from "../../slices/adminSlices/adminApiSlice";
import { FaSignOutAlt } from "react-icons/fa";
import {adminLogout} from '../../slices/adminSlices/adminAuthSlice'

function AdminHeader() {
 
  const { adminInfo } = useSelector((state)=>state.adminAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [adminLogoutApi] = useAdminLogoutApiMutation()

  const logoutHandler = async ()=>{
     try {
      await adminLogoutApi().unwrap()
      dispatch(adminLogout())
      navigate('/admin/login')
     } catch (error) {
       console.log(error);
     }
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          
          <Navbar.Brand>Admin</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {adminInfo?(
                <>
                  <Nav.Link onClick={logoutHandler}>
                     <FaSignOutAlt/> Logout 
                  </Nav.Link>
                </>
              ):(
                <></>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default AdminHeader;