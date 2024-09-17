import { Request, Response, NextFunction } from "express";
import Course from "../models/course.model";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middlewares/catchAsyncError";import cloudinary from "cloudinary";
import { createCourse } from "../services/course.services";

export const UploadCourse=CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
const data=req.body;
const thumbnail=data.thumbnail;
if(thumbnail){
    const myCloud=await cloudinary.v2.uploader.upload(thumbnail,{
        folder:'courses'
    })
    data.thumbnail={public_id:myCloud.public_id,
        url:myCloud.secure_url}
}
createCourse(data,res,next);

})
export const editCourse=CatchAsyncError(async (req:Request,res:Response,next:NextFunction)=>{
const data = req.body
if(data.thumbnail){
    await cloudinary.v2.uploader.destroy(data.thumbnail.public_id)
    const myCloud=await cloudinary.v2.uploader.upload(data.thumbnail,{folder:"courses"})
    data.thumbnail={public_id:myCloud.public_id,
        url:myCloud.secure_url
    }
}
const courseId=req.params.courseId
const course= await Course.findByIdAndUpdate(courseId,{$set:data},{new:true})
course.save()
res.status(200).json({
    status:'success',
    course
})
}) 