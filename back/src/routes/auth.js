import express from 'express'
import { loginTeacher } from '../controllers/authController.js'

const router = express.Router()

// POST /api/auth/login
router.post('/login', loginTeacher)

export default router

