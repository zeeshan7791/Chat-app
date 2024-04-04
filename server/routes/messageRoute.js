import express from "express"
import { sendMessage } from "../controllers/messagesController.js"
import protectRoute from "../middleware/protectedRoute.js"

const router=express.Router()

router.post("/send/:id",protectRoute,sendMessage)

export default router