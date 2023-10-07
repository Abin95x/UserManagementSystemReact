import axios from "axios";
const token = localStorage.getItem("token")

console.log("api token---",token)


const userApi = axios.create({
    baseURL: `http://localhost:3001`,
    headers:{
      Authorization:token
    }
})

export async function userSignup(singupData) {
    try {
       
        const data = await userApi.post("/signup", singupData);
        return data;
    } catch (error) {
      console.log(error.message,"1101001");
    }
  }

export async function userLogin(loginData){
  try{
    const data = await userApi.post('/login',loginData)
    return data
  }catch(error){
    console.log(error.message);
  }
}

export async function userImage(id,photo) {
  try{
    const data = new FormData()
    data.append("image",photo)
    data.append("userId",id)
    
    const config={
      header:{
        'content-type':'multipart/form-data',
        userId : id
      },
      WithCreadentials:true
    }

    const response = await userApi.post("/profileImage",data,config)
    return response

  }catch(error){
    console.log(error.message);
  } 
}