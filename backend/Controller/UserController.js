const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const User = require("../Model/UserModel")

const securePassword = async(password) => {
    try {
        const passwordHash = await bcrypt.hash(password,10)
        return passwordHash
    }catch(error){
        console.log(error.message)
    }
}

const userRegistration = async(req,res) => {
    try{
        const{ name,mobile,email,password } = req.body
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
            const token = jwt.sign({userId: userData._id},process.env.SECRET_KEY_USER,{expiresIn: "1h"})
            res.json({ userData, alert: "Registration", status:true})
        }
    }catch(error){
        console.log(error.message)  
    }
}

const userLogin = async (req,res) => {
    try{
        const {email,password} = req.body
        const emailExist = await User.findOne({email: email})
        if(emailExist){
            const passCheck = await bcrypt.compare(password, emailExist.password)
            if(passCheck){
                const token = jwt.sign({userId: emailExist._id},process.env.SECRET_KEY_USER,{expiresIn: "1h" })
                res.header('token', token);
                console.log(token,"---Token");

                res.json({userData: emailExist,token,status: true})
            }else{
                res.json({alert: "password is incorrect" })
            }
        }else{
            res.json({alert: "no account in this email" })
        }   

    }catch(error){
        console.log(error.message);
    }
}

const imageUpdate = async (req,res) => {
    try{
        const id = req.body.userId;
        const image = req.file.filename;
        const updateImg = await User.findOneAndUpdate(
        { _id: id },
        { $set: { image: image } },
        { new: true }
        ).then((response) => {
        res.json({ updated: true, data: response });
        });
    }catch(error){
        console.log(error.message);
    }
}





module.exports = {
    userRegistration,
    userLogin,
    imageUpdate
}