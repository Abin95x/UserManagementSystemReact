import React from 'react'
import { Link,useNavigate } from 'react-router-dom'



import { useDispatch } from "react-redux";
import { logoutDetails } from "../../../Redux/UserSlice/UserSlice";


const AdminHeader = () => {
        const dispatch = useDispatch();
        const navigate = useNavigate();
    
        const handleLogout = () => {
            localStorage.removeItem("admintoken")
            dispatch(logoutDetails({
                id:'',
                name:'',
                email:'',
                mobile:'',
            }))
            navigate("/admin/login")
        }
    
    let adminToken = localStorage.getItem("admintoken")
    
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Item 1</a></li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </li>
            <li><a>Item 3</a></li>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">Management System</a>
        
      </div>
      {adminToken ? (
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/admin/dashboard">Dashboard</Link></li>
            <li><Link to="/admin/adduser">Add User</Link></li>
          </ul>
        </div>
      ) : null}
      {adminToken ? (
        <div className="navbar-end">
          
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
              <img src="" alt="User Avatar" />
              </div>
            </label>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>
        </div>
      ) : <div className="navbar-end">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="icon.jpg" alt="User Avatar" />
                </div>
              </label>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li><Link to="/admin/login" >Admin</Link></li>
                <li><Link to="/">User</Link></li>
                
              </ul>
            </div>
          </div>}
    </div>
  
  )
}

export default AdminHeader