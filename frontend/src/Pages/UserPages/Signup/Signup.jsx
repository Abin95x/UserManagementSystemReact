import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import Header from '../../../Components/Header/Header'

import {useDispatch} from "react-redux"
import { toast ,ToastContainer  } from "react-toastify"
// import { Typography } from "@material-tailwind/react";
import "react-toastify/dist/ReactToastify.css";


import { setUserDetails } from "../../../Redux/UserSlice/UserSlice";
import { userSignup } from "../../../Api/userApi"


function Signup() {
    const [name,setName] = useState("")
    const [mobile,setMobile] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault() 
        try{
            if(name.trim() === ""){
                toast.info("enter the name")
            }else if(mobile.trim() === ""){
                toast.info("enter the number")
            }else if(email.trim() === ""){
                toast.info("enter the email")
            }else if(password.trim() === ""){
                toast.info("enter the password")
            }else{
                const response = await userSignup({name,mobile,email,password})
                if(response.data.status){   
                    localStorage.setItem("token",response.data.token)
                    const { _id,email,mobile,image,is_admin } = response.data.userData
                    dispatch(
                        setUserDetails({
                            id: _id,
                            name: name,
                            mobile: mobile,
                            email: email,
                            image: image,
                            is_admin: is_admin 
                        })
                    )
                    navigate("/");
                }else{
                    toast.error(response.data.alert);
                }
            }

        }catch(error){
            console.log(error.message)
        }
    }
    return (
        <div>
          <Header />
          <div className="hero min-h-screen bg-base-200">
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
                <h3>User Signup</h3>
                <br />
                <form action="" onSubmit={handleSubmit}>
                  <div>
                    <input
                      type="text"
                      placeholder="Type name"
                      className="input input-bordered input-accent w-full max-w-xs"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <br />
                    <br />
      
                    <input
                      type="text"
                      placeholder="Type number"
                      className="input input-bordered input-accent w-full max-w-xs"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                    <br />
                    <br />
      
                    <input
                      type="email"
                      placeholder="Type email"
                      className="input input-bordered input-accent w-full max-w-xs"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                    <br />
      
                    <input
                      type="password"
                      placeholder="Type password"
                      className="input input-bordered input-accent w-full max-w-xs"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
      
                  <div className="form-control mt-6">
                    <button className="btn btn-primary" type="submit">
                      Signup
                    </button>
                  </div>
                  <br />
      
                  Already have an account?{" "}
                  <Link to={"/"} className="font-medium text-orange-900">
                    Sign In
                  </Link>
                </form>
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      );
      
    
      
}

export default Signup