  import React, { useState,useEffect } from 'react';
  import { LinkContainer } from 'react-router-bootstrap'; // Import LinkContainer
  import { useNavigate } from 'react-router-dom';
  import { Form, Button ,Image,Col } from 'react-bootstrap';
  import FormContainer from '../components/FormContainer.jsx';
  import { useDispatch,useSelector } from 'react-redux';
  
  import { setCredentials } from '../slices/authSlices.js';
  import { toast } from 'react-toastify'
  import { useUpdateUserMutation } from '../slices/userApiSlice.js';
  import Loader from '../components/Loader.jsx';
 
  import Noprofile from '../../public/images/Make Your Day.jpeg'

    const ProfileScreen = () => {
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [confirmPassword, setConfirmPassword] = useState('');
      const [image, setImage] = useState('')
      

    
      const avatar = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
      const navigate = useNavigate()
      const dispatch = useDispatch()
      
      const [updateProfile,{isLoading}] = useUpdateUserMutation();
      const { userInfo } = useSelector((state)=>state.auth)
      const imageUrl = `http://localhost:3000/images/${userInfo.image}`;

      useEffect(()=>{
        setName(userInfo.name)
        setEmail(userInfo.email)
        console.log(userInfo.image)
      },[userInfo.setName,userInfo.setEmail]);

      const submitHandler = async (e) => {
        e.preventDefault();
    

          if(password !== confirmPassword){
              toast.error('Password do not Match')
          }else{
            try {
              const formData = new FormData();
              formData.append('_id', userInfo._id);
              formData.append('name', name);
              formData.append('email', email);
              formData.append('password', password);
              formData.append('file', image);
      
              const res = await updateProfile(formData).unwrap();
      
              dispatch(setCredentials(res));
              toast.success("Profile updated successfully");
              } catch (err) {
                      toast.error(err?.data?.message || err.error)
              }
          }
      
      };
 

      return (
        <FormContainer >
          <h1>  Profile </h1>

          <Form onSubmit={submitHandler} encType="multipart/form-data">


          {/* <div className="flex justify-content-center item-center" style={{ justifyContent: 'center', display: 'flex' }}>
          <label htmlFor="profile">
            <Image src={file || avatar} style={{ height: '180px', width: '185px' }} alt="Profile" roundedCircle />
          </label>
          <input onChange={(e) => changeImage(e)} type="file" name="profileImage" id="profile" accept=".jpeg, .png, .jpg" />

        </div> */}

        {
            userInfo? (
        <div className="flex justify-content-center item-center" style={{ justifyContent: 'center', display: 'flex' }}>
          <label htmlFor="profile">
            <Image src={userInfo.image?`http://localhost:8000/images/${userInfo.image}` : Noprofile} style={{ height: '180px', width: '185px' }} alt="Profile" roundedCircle />
          </label>
        </div> 
        ):(
              null
       )
      }

      


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
          
         {/* Profile Picture input  */}

            <Form.Group className="my-2" controlId="image" style={{display:'none'}}>
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="file"
              id="profile"
              accept=".jpeg, .png, .jpg"
              onChange={(e) => setImage(e.target.files[0])}
             
            ></Form.Control>
          </Form.Group>
    
                { isLoading && <Loader/> }
            <Button type="submit" variant="primary" className=" my-4">
              Update 
            </Button>

          
          </Form>
        </FormContainer>
      );
    };

  export default ProfileScreen;
