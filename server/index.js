import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoute.js"
import messagesRoute from "./routes/messageRoute.js"
import userRoute from "./routes/userRoute.js"
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js"
import cors from "cors"
const app=express()
dotenv.config()
const PORT=process.env.PORT ||3000
app.use(express.json())
app.use(cookieParser());
app.use("/api/auth",authRoutes)
app.use("/api/messages",messagesRoute)
app.use("/api/users",userRoute)
app.get("/",(req,res)=>{
    res.send('hey how are u')
})
// app.use(cors)

app.listen(PORT,()=>{
    connectDB()
    console.log(`server is running on ${PORT}`)
})