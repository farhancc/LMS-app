import { Request,Response,NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import { generateYearlyData } from "../utils/analytics.generator";
import User from "../models/user.models";
import Course from "../models/course.model";
import Order from "../models/order.model";
// get user analytics-- only admin
export const getUserAnalytics=CatchAsyncError(async (req: Request, res: Response, next: NextFunction)=>{

    const users=await  generateYearlyData(User)
    res.status(200).json({
        status:'success',
        users
    })
})

export const getCoursesAnalytics=CatchAsyncError(async (req: Request, res: Response, next: NextFunction)=>{

    const courses=await  generateYearlyData(Course)
    res.status(200).json({
        status:'success',
        courses
    })
})


export const getOrderAnalytics=CatchAsyncError(async (req: Request, res: Response, next: NextFunction)=>{

    const orders=await  generateYearlyData(Order)
    res.status(200).json({
        status:'success',
        orders
    })
})