import { Routes,Route } from "react-router-dom"
import Signup from "../Pages/UserPages/Signup/Signup"
import Login from "../Pages/UserPages/Login/Login"
import Home from "../Pages/UserPages/Home/Home"
import UserProtect from "./userProtect"
import UserPublic from "./userPublic"
import Profile from "../Pages/UserPages/Profile/Profile"

function UserRoute(){
    return(
        <Routes>
            <Route path="/signup" element={ <UserPublic><Signup/></UserPublic> } />  
            <Route path="/" element={ <UserPublic><Login/></UserPublic> } />     
            <Route path="/home" element={ <UserProtect><Home/></UserProtect> } />
            <Route path="/profile" element={<UserProtect><Profile/></UserProtect>} />
        </Routes>
    )
}

export default UserRoute