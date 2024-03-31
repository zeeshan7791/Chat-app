import express from "express"
import { login, logout, signUp } from "../controllers/authController.js"
const router=express.Router()

router.post("/sign-up",signUp)
router.post("/login",login)
router.get("/logout",logout)
export default router