import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom'

import store from '../src/store/store.js'
import {Provider} from 'react-redux'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// User
import HomeScreen from './screens/HomeScreen.jsx'
import LoginScreen from './screens/LoginScreen.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx'
import ProfileScreen from './screens/profileScreen.jsx'
import PrivateRouter from './components/PrivateRouter.jsx'

// Admin
import AdminLoginScreen from './screens/adminScreen/adminLoginScreen.jsx'
import AdminHomeScreen from './screens/adminScreen/adminHomeScreen.jsx'
import AdminPrivateRoute from './components/admin/AdminPrivateRoute.jsx'

const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path='/' element={<App/>} >
            <Route index={true} path='/' element={<HomeScreen/>}/>
            <Route  path='/login' element={<LoginScreen/>}/>
            <Route  path='/register' element={<RegisterScreen/>}/>
            <Route path='/admin' element={<AdminLoginScreen/>}/>
         
          {  /*private Route*/}
            <Route path='' element={<AdminPrivateRoute/>}>
            <Route path='/admin/adminHome' element={<AdminHomeScreen/>}/>
            </Route>

            <Route path='' element={<PrivateRouter/>}>
            <Route  path='/profile' element={<ProfileScreen/>}/>
            </Route>

        </Route>
      )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  </Provider>
);
