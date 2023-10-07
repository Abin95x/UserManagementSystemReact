import React from 'react'
import { Route, Routes,route } from 'react-router-dom'
import AddUser from '../Pages/AdminPages/AddUser/AddUser'
import AdminLogin from '../Pages/AdminPages/AdminLogin/AdminLogin'
import DashBoard from '../Pages/AdminPages/Dashboard/DashBoard'
import EditUserList from '../Components/AdminComponents/EditUserList/EditUserList'
import AdminProtect from './adminProtect'
import AdminPublic from './adminPublic'

const aminRoute = () => {
  return (
    <Routes>
        <Route path='/adduser' element={<AdminProtect><AddUser/></AdminProtect> } /> 
        <Route path='/login'  element={ <AdminPublic><AdminLogin/></AdminPublic> } />
        <Route path='/dashboard'  element={<AdminProtect><DashBoard/></AdminProtect> } />
        <Route path='/edituser/:id'  element={<AdminProtect><EditUserList/></AdminProtect> } />
    </Routes>
  )
}

export default aminRoute