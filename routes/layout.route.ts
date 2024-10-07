import express from 'express'
import { createLayout, editLayout } from '../controllers/layout.controller'
import { autharizeRole, isAuthenticated } from '../middlewares/auth'
const router=express.Router()
router.post('/',isAuthenticated,autharizeRole('admin'),createLayout)
router.put('/',isAuthenticated,autharizeRole('admin'),editLayout)

export default router