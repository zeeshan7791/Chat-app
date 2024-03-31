import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoute.js"
import { connectDB } from "./config/db.js"
import cors from "cors"
const app=express()
dotenv.config()
const PORT=process.env.PORT ||3000
app.use(express.json())
app.use("/api/auth",authRoutes)
app.get("/",(req,res)=>{
    res.send('hey how are u')
})
// app.use(cors)

app.listen(PORT,()=>{
    connectDB()
    console.log(`server is running on ${PORT}`)
})