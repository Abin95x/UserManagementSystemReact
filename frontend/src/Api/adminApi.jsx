import axios from "axios";
const admintoken = localStorage.getItem("admintoken")

console.log("my tokenn",admintoken)

const adminApi = axios.create({
    baseURL: `http://localhost:3001/admin`,
    headers:{
      Authorization:admintoken
    }
})

export async function AdminSignin(loginData){
    try{
      const data = await adminApi.post("/login",loginData)
      return data
    }catch(error){
      console.log(error.message);   
    }
}

export const UserListDetails = async () => {
  try {
    const data = await adminApi.get("/userList");
    return data;
  } catch (error) {
    console.log(error.message);
  }
};      

export const DeleteUser = async (userId) => {
  try {
      const data = await adminApi.post("/deleteUser",{userId})
      return data;
  } catch (error) {
      console.log(error.message);
  }
}
export const AddUserDetails = async (userData) =>{
  try{ 
    const data = await adminApi.post("/addUser",{userData})
    return data
  }catch(error){
    console.log(error.meassge);
  }
}

export const EditUserData = async (userId) => {
  try {
    const data = await adminApi.get(`/getUser/${userId}`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const UpdateUser = async (id,updateData) =>{
  try{
    const {name,mobile,email} = updateData
    const data = await adminApi.post("/updateUser",{id,name,mobile,email})
    return data

  }catch(error){
    console.log(error.message)
  }
}
