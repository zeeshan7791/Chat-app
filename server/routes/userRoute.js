import express from "express"
import { getAllUsers } from "../controllers/userContoller.js"
import protectRoute from "../middleware/protectedRoute.js"

const router=express.Router()

router.get("/",protectRoute,getAllUsers)

export default router