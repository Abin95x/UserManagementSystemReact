const express = require("express")
const AdminRoute = express()
const auth = require("../Middleware/adminAuth")
const adminController = require("../Controller/AdminController")

AdminRoute.post("/login",adminController.adminLogin)
AdminRoute.get("/userList",auth.authenticateAdmin,adminController.userList)
AdminRoute.get('/getUser/:id',auth.authenticateAdmin,adminController.getUserDetails)

AdminRoute.post("/adduser",auth.authenticateAdmin,adminController.addUser)
AdminRoute.post("/updateUser",auth.authenticateAdmin,adminController.updateUser)
AdminRoute.post("/deleteUser",auth.authenticateAdmin,adminController.deleteUser)


module.exports = AdminRoute

