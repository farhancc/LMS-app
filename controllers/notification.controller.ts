import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/user.models";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middlewares/catchAsyncError";

import Notification from "../models/notification.modal";

export const getNotification=CatchAsyncError(async (req: Request, res: Response, next: NextFunction)=>{

    const notifications=await Notification.find().sort({createdAt:-1})
    res.status(201).json({
        status:'success',
        notifications
    })
})
export const updateNotification=CatchAsyncError(async (req: Request, res: Response, next: NextFunction)=>{
const notification=await Notification.findById(req.params.id)
if(!notification)return next(new ErrorHandler('notificationnot found',400))
notification.status?notification.status='read':notification.status
await notification.save()
const notifications=await Notification.find().sort({createdAt:-1})
res.status(201).json({
    status:'success',
    notifications
})
})