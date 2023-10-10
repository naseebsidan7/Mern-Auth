import React, { useState,useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap'; // Import LinkContainer
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer.jsx';
import { useDispatch,useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/userApiSlice.js';
import { setCredentials } from '../slices/authSlices.js';
import { toast } from 'react-toastify'
import Loader from '../components/Loader.jsx';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [register,{isLoading}] = useRegisterMutation();

  const { userInfo } = useSelector((state)=>state.auth)

  useEffect(()=>{
    if(userInfo){
      navigate('/')
    }
  },[navigate,userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    
      if(password !== confirmPassword){
          toast.error('Password do not Match')
      }else{
        try {
          
          const res = await register({name,email,password }).unwrap();
            if(res){
              console.log(res);
              dispatch(setCredentials({...res}))
              navigate('/')
            }else{
              toast.error('Registration Failed');
            }

        } catch (err) {
          
            console.log("Error occurred:", err);
            toast.error(err?.data?.message || err.error);
        }
      }
  
  };

  return (
    <FormContainer>
      <h1>Register User</h1>
      <Form onSubmit={submitHandler}>


        <Form.Group className="my-2" controlId="name">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

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

        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        { isLoading && <Loader/> }

        <Button type="submit" variant="secondary" className=" my-4">
          Sign Up
        </Button>

        <Row className="py-3 ">
          <Col>
            I'm Already a Member
            <LinkContainer to="/login">
              {/* Use LinkContainer here */}
              <Button variant="link">Login</Button>
            </LinkContainer>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default RegisterScreen;
