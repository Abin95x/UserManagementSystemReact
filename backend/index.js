const express = require('express')
const app = express()

require("dotenv").config()
const cors = require('cors')
const PORT = process.env.PORT || 3001;

const dbconnect = require("./Config/dbConfig")
dbconnect.dbconnect()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Enable CORS for specific origin and methods
app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true, // Set to true if you need to include credentials
    })
);

const userRoute = require("./Routes/UserRouter")
app.use("/",userRoute)

const adminRoute = require('./Routes/AdminRouter')
app.use("/admin",adminRoute)

app.listen(PORT,()=>{
    console.log(`server running on port http://localhost:${PORT}`)
})