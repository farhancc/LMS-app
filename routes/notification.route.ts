import express from 'express'
import { autharizeRole, isAuthenticated } from '../middlewares/auth'
import { createOrder } from '../controllers/order.controller'
import { getNotification, updateNotification } from '../controllers/notification.controller'
const router=express.Router()
// autharizeRole('admin') should be added to this
router.route('/notification').get(isAuthenticated,getNotification  )
router.route('/notification/:id').put(isAuthenticated, updateNotification)
export default router