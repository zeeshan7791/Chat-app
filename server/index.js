import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoute.js"
const app=express()

dotenv.config()
app.get("/",(req,res)=>{
    res.send('hey how are u')
})
app.use("/api/auth",authRoutes)
const PORT=process.env.PORT ||3000
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})