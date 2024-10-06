import express from 'express'
import { autharizeRole, isAuthenticated } from '../middlewares/auth'
import { createOrder, getAllOrder } from '../controllers/order.controller'
const router=express.Router()
router.post('/order',isAuthenticated,createOrder)
router.get('/order',isAuthenticated,autharizeRole('admin'),getAllOrder)
export default router