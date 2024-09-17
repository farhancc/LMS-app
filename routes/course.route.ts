
import { Router } from "express";

import { autharizeRole, isAuthenticated } from "../middlewares/auth";
import { editCourse, UploadCourse } from "../controllers/course.controller";
const router=Router()
router.post('/create-course',
    // autharizeRole('admin'),
    UploadCourse);
router.put('update-course/:courseId',editCourse)
export default router