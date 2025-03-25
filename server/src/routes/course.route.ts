
import express from "express";
import { Router } from "express";

import { autharizeRole, isAuthenticated } from "../middlewares/auth";
import { addAnswers, addQuestion, addReview,  deleteCourse,  editCourse, getACourse, getACourseForUser, getAllCourses, UploadCourse } from "../controllers/course.controller";
const router=express.Router()
router.post('/create-course',UploadCourse);
router.patch('/update-course/:courseId',editCourse)
router.get('/get-course/:courseId',getACourse)
router.get('/all-course',getAllCourses)
router.get('/mycourse/:courseId',isAuthenticated,getACourseForUser)
router.put('/add-question',isAuthenticated,addQuestion)
router.put('/add-answers',isAuthenticated,addAnswers)
router.put('/add-review/:courseid',isAuthenticated,addReview)
router.delete('/course',isAuthenticated,autharizeRole('admin'),deleteCourse)
// router.post('/buy-course/:courseid',isAuthenticated,buyCourse)
export default router