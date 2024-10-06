import express from 'express'
import { isAuthenticated } from '../middlewares/auth'
import { createOrder } from '../controllers/order.controller'
const router=express.Router()
router.post('/order',isAuthenticated,createOrder)
export default router