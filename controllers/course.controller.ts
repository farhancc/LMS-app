import { Request, Response, NextFunction } from "express";
import Course from "../models/course.model";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middlewares/catchAsyncError";import cloudinary from "cloudinary";
import { createCourse } from "../services/course.services";
import { kMaxLength } from "buffer";
import { redis } from "../utils/redis";

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
    if(data.thumbnail.public_id){
    await cloudinary.v2.uploader.destroy(data.thumbnail.public_id)
    const myCloud=await cloudinary.v2.uploader.upload(data.thumbnail,{folder:"courses"})
    data.thumbnail={public_id:myCloud.public_id,
        url:myCloud.secure_url
    }
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

export const getACourse=CatchAsyncError(async (req:Request,res:Response,next:NextFunction)=>{

    const courseId=req.params.courseId
    const isCached=await redis.get(courseId)
    if(isCached){
        const course=JSON.parse(isCached)
        res.status(200).json({
            status:'success',
            course

        })
    }
    else{
 const course=await Course.findById(courseId).select('-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links')
 redis.set(courseId, JSON.stringify(course))
 res.status(200).json({
    status:"success",
    course
 })}
})
export const getAllCourses=CatchAsyncError(async (req:Request,res:Response,next:NextFunction)=>{
    const isCached=await redis.get("allCourses")
    if(isCached){
        console.log('redisssss');
        
const courses=JSON.parse(isCached)
res.status(200).json({
    status:"success",
    courses
})
    }
    else{
        const courses=await Course.find().select('-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links')
        console.log('mongooooo');
        redis.set('allCourses', JSON.stringify(courses))
        
res.status(200).json({
    status:"success",
    courses
})}
})