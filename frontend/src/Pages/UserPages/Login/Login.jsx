import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import Header from '../../../Components/Header/Header'

import { toast ,ToastContainer  } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

import { userLogin } from "../../../Api/userApi";
import { setUserDetails } from '../../../Redux/UserSlice/UserSlice';

function Login() {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleLogin = async (e) => {
        e.preventDefault()  
        try{
           const response = await userLogin({email,password})

           if(response.data.userData){
           console.log("hiiiiiiiiiiiii",response.data.token)

                localStorage.setItem("token",response.data.token)

                const {_id,name,email,mobile,image,is_admin } = response.data.userData
                
                dispatch(
                    setUserDetails({
                        id:_id,
                        name: name,   //{payload: "name"}
                        mobile: mobile,
                        email: email,
                        image: image,
                        is_admin: is_admin,
                    })
                )
                navigate("/home")
            }else{
                toast.error(response.data.alert)
                
            }

        }catch(error){
            console.log(error.message);
        }

    }


    return (
        <div>
             <Header/>
             <div className="hero min-h-screen bg-base-200">
           
           <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
               <div className="card-body"> 
               <h3>User Login</h3>
               <br />
                   <form action="" onSubmit={handleLogin}>
                       
                       <div>
                           <input type="email" placeholder="Type email" className="input input-bordered input-accent w-full max-w-xs"  value={email}
                           onChange={(e)=>setEmail(e.target.value)}
                           />
                           <br />
                           <br />

                           <input type="password" placeholder="Type password" className="input input-bordered input-accent w-full max-w-xs"  value={password}
                           onChange={(e)=>setPassword(e.target.value)} 
                           />
                       </div>

                       <div className="form-control mt-6">
                           <button className="btn btn-primary" type='submit'>Login</button>
                       </div>

                       <br />

                       <div>
                          New user?{" "}
                          <Link to={"/signup"} className="font-medium text-orange-900">Sign Up</Link>
                       </div>

                   </form> 
                   
                   <ToastContainer />
               </div>
           </div>
   </div>
        </div>
        
       
    )
}

export default Login