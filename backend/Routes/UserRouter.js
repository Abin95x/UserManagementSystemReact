const express = require("express")
const UserRoute = express()
const userController = require("../Controller/UserController")
const auth = require("../Middleware/userAuth")
const {uploadOptions} = require("../Config/multer")

UserRoute.post("/signup",userController.userRegistration)
UserRoute.post("/login",userController.userLogin)
UserRoute.post("/profileImage",auth.authenticateUser,uploadOptions.single('image'),userController.imageUpdate)

module.exports = UserRoute
    