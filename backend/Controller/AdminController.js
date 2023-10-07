const User = require('../Model/UserModel')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config()

const securePassword = async(password) => {
  try {
      const passwordHash = await bcrypt.hash(password,10)
      console.log(passwordHash,"pass");
      return passwordHash
  }catch(error){
      console.log(error.message)
  }
}

const adminLogin = async (req,res) =>{
    try{
        const {email,password} = req.body
        const emailExist = await User.findOne({email:email})

        if(emailExist){
          if(emailExist.is_admin === 1){
            const passCheck = await bcrypt.compare(password,emailExist.password)
            if(passCheck){
              const admintoken = jwt.sign({adminId:emailExist._id},process.env.SECRET_KEY_ADMIN,{expiresIn:'1h'})
             
              res.header('admintoken', admintoken);
              console.log(admintoken,"---AdminToken");

              res.json({adminData:emailExist,admintoken,status:true})
            }else{
              res.json({alert:"Password is incorrect"})
            }
          }else{
            res.json({alert:"You are not an admin"})
          }
        }else{
          res.json({alert:"Email does not exist"})
        }
    }catch(error){
      console.log(error.message);
    }
}

const userList = async(req,res) => {
  try{
    const userData = await User.find({is_admin: 0})
    if(userData){
      res.json({status: true,userData})
    }else{
      res.json({status: false,userData})
    }
  }catch(error){
    console.log(error.message);
  }
}

const deleteUser = async(req,res) => {
  try{
    const {userId} = req.body
    const deleteUser = await User.deleteOne({_id: userId})
    if(deleteUser){
      res.json({delete: true})
    }else{
      res.json({delete: false})
    }

  }catch(error){
    console.log(error.message)
  }
}

const addUser = async (req, res) => {
  try {
    const{ name,mobile,email,password } = req.body.userData
    
    const spassword = await securePassword(password)

    const emailExist = await User.findOne({email: email})

    if(emailExist){
        res.json({alert: "This email is already exist",status: false})
    }else{
        const user = new User({
            name: name,
            email: email,
            mobile: mobile,
            password: spassword,
            is_admin: 0
        })
        const userData = await user.save()
        const token = jwt.sign({userId: userData._id},"process.env.SECRET_KEY_USER",{expiresIn: "1h"})
        res.json({ userData, alert: "Registration", status:true})
    }
}catch(error){
    console.log(error.message)  
}
  
};

const getUserDetails = async(req,res) => {
  try{
    const {id} = req.params;
    const userData = await User.findById(id)

    if(userData){
      res.json({userData,staus:true,message:"Data found"})
    }else{
      res.json({staus:false,message:"Data not found"})
    }

  }catch(error){
    console.log(error.message)
  }
}

const updateUser = async(req,res) =>{
  try{
    const {id,name,email,mobile} = req.body
    const updateUserData = await User.updateOne({_id:id},{$set:{name:name,email:email,mobile:mobile}})//,{new:true}
    if(updateUserData){
      res.json({userData:updateUserData,status:true,alert:"updation completed"})
    }else{
      res.json({status:false,alert:'updation failed'})
    }
  }catch(error){
    console.log(error.message)
  }
}



module.exports = {
    adminLogin,
    userList,
    deleteUser,
    addUser,
    getUserDetails,
    updateUser
}