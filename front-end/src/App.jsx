 import React from 'react'
 import Header from './components/Header'
 import { Outlet, useLocation } from 'react-router-dom'
 import { ToastContainer } from 'react-toastify'
 import 'react-toastify/dist/ReactToastify.css'
 import AdminHeader from './components/admin/AdminHeader.jsx'

 function App() {
   const location = useLocation()
   const isAdminPage = location.pathname.startsWith('/admin')

   return (
     <>
        {isAdminPage ? <AdminHeader/> :  <Header/>}
       
       <ToastContainer/>
       <Outlet/>
       
     
     </>
   )
 }
 
 export default App
 