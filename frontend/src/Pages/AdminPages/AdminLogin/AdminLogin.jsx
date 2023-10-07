import React,{useState} from 'react'
import { toast ,ToastContainer  } from "react-toastify"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminHeader from '../../../Components/AdminComponents/AdminHeader/AdminHeader';


import { setUserDetails } from "../../../Redux/UserSlice/UserSlice";
import { AdminSignin } from "../../../Api/adminApi";



const AdminLogin = () => {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault()
    try{
      if(email.trim() === ""){
        toast.info("please enter your email");
      }else if(password.trim() === ""){
        toast.info("please enter your password");
      }else{

        const response = await AdminSignin({email,password});
        console.log(response,"xxxxxxxxxxxxxxxxxxxxxxxxxxxx");
        console.log(response.data.admintoken,"qwerty111111111111111111111111")

         if (response.data.status) {

          localStorage.setItem("admintoken", response.data.admintoken);

          dispatch(
            setUserDetails({
              id: response.data.adminData._id,
              name: response.data.adminData.name,
              email: response.data.adminData.email,
              mob: response.data.adminData.mobile,
              is_admin: response.data.adminData.is_admin,
              image: response.data.adminData.image,
            })
          );
      console.log("5");

          navigate("/admin/dashboard");
        } else {
      console.log("error login");

          toast.error(response.data.alert);
        }
      }
      

    }catch(error){
      console.log("error login 2");
      console.log(error.message);
    }
  }

  return (

    <div>
      <AdminHeader/>
      <div className="hero min-h-screen bg-base-200">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <h3>Admin Login</h3>
                  <form action="" onSubmit={handleLogin}>
                  <input type="email" placeholder="Admin email" className="input input-bordered input-warning w-full max-w-xs"
                  onChange={(e)=>setEmail(e.target.value)} />
                  <br />
                  <br />
                  <input type="password" placeholder="Admin Password" className="input input-bordered input-warning w-full max-w-xs" 
                  onChange={(e)=>setPassword(e.target.value)} />

                  <div className="form-control mt-6">
                    <button className="btn btn-primary" type='submit'>Login</button>
                  </div>

                  </form>
                  <ToastContainer />
            </div>
        </div>      
    </div>
    </div>

    
  )
}

export default AdminLogin