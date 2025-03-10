import { CatchAsyncError } from "../middlewares/catchAsyncError"
import Course from "../models/course.model"
import { Response } from "express"

export const createCourse=CatchAsyncError(async(data:any,res:Response)=>{
const course=await Course.create(data);
res.status(201).json({
    status:'success',
    course
})

})