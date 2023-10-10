  import React,{ useEffect,useState } from 'react'
  import Table from 'react-bootstrap/Table'
  
  import { FaRegTrashAlt } from 'react-icons/fa'
  import axios from 'axios'
  import { Row, Col, Form, Toast } from 'react-bootstrap'; // Import Bootstrap components
  import {toast} from 'react-toastify'
  import { useDeleteUserMutation } from '../../slices/adminSlices/adminApiSlice';

  const TableComponent = () => {

    const [users, setUsers] = useState([]);
    const [deleted,setDeleted] = useState(false)
    const [search,setSearch] = useState('')

    const [deleteUser] = useDeleteUserMutation()

    const deleteHandler = async(id)=>{
          try {
            const deleteSuccess = await deleteUser({id})
            if(deleteSuccess){
              toast.success('Deleted Successfully')
              setDeleted(!deleted)
            }
          } catch (err) {
              toast.error(err?.data?.message || err.error)
          }
    }

    const handleSearch =(e)=>{
        setSearch(e.target.value)
    }


    const fetchUser = async()=>{
      const userData = await axios.get('http://localhost:3000/api/admin/getUser');
      console.log(JSON.stringify(userData.data.userData)+"<---- userData");
      setUsers(userData.data.userData)
    }

    useEffect(()=>{
      fetchUser()
    },[deleted])

    const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

    return (
    
      <>
      <Form>
          <Form.Group controlId="exampleForm.ControlInput1" style={{ maxWidth: "1200px" }} >
            <Row>
              <Col sm={6}>
                <h2 className='my-3 mx-5 userListFont' >User List</h2>
              </Col>
              <Col sm={6} >
                <Form.Control  className='my-3'
                  style={{ width: "90%" }}
                  type="text"
                  value={search}
                  onChange={handleSearch}
                  placeholder="Search Here"
                />
              </Col>
            </Row>
          </Form.Group>
        </Form>

        
      

        <Table striped bordered hover responsive style={{width:'90%',marginLeft:'5%',marginTop:'2%'}} >
            <thead>

            <tr>
              <th>#</th>
              <th>Name</th>
              <th>email</th>
              <th>options</th>
              </tr>
            </thead>

            <tbody>

            { 
              filteredUsers.length !== 0 ?(
                filteredUsers.map((user,index)=>(

            
              <tr key={index}>
                <td>{index+1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td> 
                <td  style={{cursor:'pointer'}} onClick={()=>{ deleteHandler(user._id) }}><FaRegTrashAlt/></td>
              </tr>
              
              ))):
              <tr>
                <td colSpan={4} className="text-center">No users Available</td>
              </tr>

            }

              </tbody>

        </Table>
      </>
    )
  }

  export default TableComponent