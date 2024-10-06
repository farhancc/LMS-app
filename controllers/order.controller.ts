import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/user.models";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import Order ,{Iorder} from "../models/order.model";
import Course from "../models/course.model";
import ejs from 'ejs'
import sendMail from "../utils/sendMail";
import Notification from "../models/notification.modal";
import { newOrder } from "../services/order.services";
import path from "path";

export const createOrder=CatchAsyncError(async (req: Request, res: Response, next: NextFunction)=>{
// const courseId=req.params?.courseid
const user=await User.findById(req.user?._id)
const {payment_info,courseId}:Iorder=req.body
const isBougth=user.courses.some((el:any)=>{
return el._id.toString()===courseId
})
if(isBougth){
    return next(new ErrorHandler('already bougt',400))
}
const course=await Course.findById(courseId)
if(!course)return next(new ErrorHandler('course not found',404))

    const data:any={
        courseId,
        userId:user._id,
        payment_info
        
    }
    
    const mailData={
        order:{
            _id:course._id.toString().slice(0,6),
            name:course.name,
            price:course.price,
        date:new Date().toLocaleDateString('en-Us',{year:'numeric',month:'long',day:'numeric'})
    }
}
const html =await ejs.renderFile(path.join(__dirname,'../mails/orderMail.ejs'),{order:mailData,name:user.name})

try{
    if(user){
        await sendMail({
            email:user.email,
            subject:'Thank you for Buying Course',
            template:'orderMail.ejs',
            data:mailData
            
        })
    }
    
}catch(err:any){
    return next(new ErrorHandler(err.message,400))
}
user?.courses.push(course.id)

await user?.save()
const notification=await Notification.create({
    userId:user._id,
    title:'New Order',
    type:'success',
    message:'You have new order from '+course?.name
}) 
course.purchased?course.purchased++:course.purchased
await course.save()
newOrder(data,res,next);
}

)