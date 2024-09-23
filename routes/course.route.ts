
import express from "express";
import { Router } from "express";

import { autharizeRole, isAuthenticated } from "../middlewares/auth";
import { editCourse, getACourse, getAllCourses, UploadCourse } from "../controllers/course.controller";
const router=express.Router()
router.post('/create-course',UploadCourse);
router.patch('/update-course/:courseId',editCourse)
router.get('/get-course/:courseId',getACourse)
router.get('/all-course',getAllCourses)
export default router