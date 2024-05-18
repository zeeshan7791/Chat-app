import path from 'path'
import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoute.js"
import messagesRoute from "./routes/messageRoute.js"
import userRoute from "./routes/userRoute.js"
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { connectDB } from "./config/db.js"
import cors from "cors"
import { app, server } from "./socket/socket.js"

dotenv.config()
const PORT=process.env.PORT ||3000
const __dirname=path.resolve()
// app.use(cors())
app.use(
    cors({
      origin: "http://127.0.0.1:3000",
      credentials: true, // Allow credentials (cookies)
    })
  );
  app.use(express.json())
  app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth",authRoutes)
app.use("/api/messages",messagesRoute)
app.use("/api/users",userRoute)
app.use(express.static(path.join(__dirname,"/client/dist")))
app.get("*",(req,res)=>{
res.sendFile(path.join(__dirname,"client","dist","index.html"))
})

// app.use(cors)

server.listen(PORT,()=>{
    connectDB()
    console.log(`server is running on ${PORT}`)
})