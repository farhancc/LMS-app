import express from 'express'
import { autharizeRole, isAuthenticated } from '../middlewares/auth'
// import { createOrder, getAllOrder } from '../controllers/order.controller'
import { getCoursesAnalytics, getOrderAnalytics, getUserAnalytics } from '../controllers/analytics.controller'
const router=express.Router()

// router.post('/order',isAuthenticated,createOrder)
// console.log('hiiii');

router.get('/users',isAuthenticated,autharizeRole('admin'),getUserAnalytics)
router.get('/courses',isAuthenticated,autharizeRole('admin'),getCoursesAnalytics)
router.get('/order',isAuthenticated,autharizeRole('admin'),getOrderAnalytics)
export default router