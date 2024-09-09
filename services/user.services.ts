import { CatchAsyncError } from "../middlewares/catchAsyncError"
import User from "../models/user.models"
import { Response } from "express"

export const getUserById=async(id:string,res:Response)=>{
    const user=await User.findById(id)
    // if(!user)
    res.status(201).json({
        status:'success'
        ,user
    })
}