import { Navigate } from "react-router-dom";

 const UserPublic = (props) => {
  try {
    const token =  localStorage.getItem('token')
    if(token){
      return <Navigate to="/home"/>
    }else{
      <Navigate to="/"/>
      return props.children
    }
  } catch (error) {
    console.log(error.message)
  }
}
export default UserPublic;