import React, { useState,useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap'; // Import LinkContainer
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer.jsx';
import { useDispatch,useSelector } from 'react-redux'
import { useLoginMutation } from '../slices/userApiSlice.js';
import { setCredentials } from '../slices/authSlices.js';
import { toast } from 'react-toastify'
import Loader from '../components/Loader.jsx';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login,{isLoading}] = useLoginMutation()

  const { userInfo } = useSelector((state)=>state.auth)

  useEffect(()=>{
    if(userInfo){
      navigate('/')  
    }
  },[navigate,userInfo])

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email,password }).unwrap();
      dispatch(setCredentials({...res}))
      navigate('/')
      
    } catch (err) {
     toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer   >
      <h1>SignIn</h1>
      <Form onSubmit={submitHandler} >
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
        </Form.Group>

         { isLoading && <Loader/> }
        <Button type="submit" variant="secondary" className="mg-3 my-4">
          Sign In
        </Button>

        <Row className="py-3">
          <Col> 
            New Member?
            <LinkContainer to="/register">
              {/* Use LinkContainer here */}
              <Button variant="link">Register</Button>
            </LinkContainer>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
