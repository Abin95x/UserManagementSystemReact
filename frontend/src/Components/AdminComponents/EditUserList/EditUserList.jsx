import React, { useEffect, useState } from 'react'
import AdminHeader from '../AdminHeader/AdminHeader'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { EditUserData,UpdateUser } from '../../../Api/adminApi';


const EditUserList = () => {

  const [value,setValue] = useState({
    name:'',
    mobile:'',
    email:'',
  })

  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(()=>{
    const userData = async () => {
      try{
        const response = await EditUserData(id);
        const { name, mobile, email } = response.data.userData;
        setValue({ name: name, mobile: mobile, email: email });

      }catch(error){
        console.log(error.message)
      }
    }
    userData()
  },[])
 
  
  const handleSubmit = async (e) => { 
    e.preventDefault()
    try{
      const response = await UpdateUser(id,value)
      if (response.data.userData) {
        toast.success(response.data.alert);
        navigate("/admin/dashboard");
      } else {
        toast.error(response.data.alert);
      }
    } catch(error){
      console.log(error.message)
    }
  }
  return (
    <div>
        
        <AdminHeader/>
        
      <div className="hero min-h-screen bg-base-200">
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
              <form action="" onSubmit={handleSubmit}>

                <input type="text" p className="input input-bordered input-md w-full max-w-xs" 
                 name="name"
                 value={value.name}
                 onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })} 
                />

                <br />
                <br />

                <input type="text" placeholder="" className="input input-bordered input-md w-full max-w-xs" 
                name="mobile"
                value={value.mobile}
                onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })}
                 />

                <br />
                <br />

                <input type="text" placeholder="Type here" className="input input-bordered input-md w-full max-w-xs" 
                name="email"
                value={value.email}
                onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })}
                />

                <br />
                <br />

                <button className="btn">Update</button>

              </form>
                
              </div>
          </div>
        </div>
      
    </div>
  )
}

export default EditUserList