require('dotenv').config()
import { Response } from "express"
import { IUser } from "../models/user.models"
import { redis } from "./redis"
interface ITokenOptions{
    expires:Date;
    maxAge:number;
    httpOnly:boolean;
    sameSite:'lax' | 'strict' |'none'|undefined;
    secure?:boolean;
}

// PARSE ENV VARIABLES TO INTEGRATE WITH FALLBACK VALUES
const accessTokenExpires=parseInt(process.env.ACCESS_TOKEN_EXPIRES||"300",10)
const refreshTokenExpires=parseInt(process.env.REFRESH_TOKEN_EXPIRES||"1200",10)

export const accessTokenOptions:ITokenOptions={
    expires:new Date(Date.now()+accessTokenExpires*60*60*1000),
    maxAge:accessTokenExpires*60*60*1000,
    httpOnly:true,
    sameSite:'lax' 
}
export const refreshTokenOptions:ITokenOptions={
    expires:new Date(Date.now()+refreshTokenExpires*24*60*60*1000),
    maxAge:refreshTokenExpires*60*60*24*1000,
    httpOnly:true,
    sameSite:'lax' 
}
export const sendToken=(user:IUser,statusCode:number,res:Response)=>{
 const accessToken=user.signAcessToken();
 const refreshToken=user.signRefreshToken();
//  upload session to redis
redis.set(user.id,JSON.stringify(user) as any)

if(process.env.NODE_ENV==='production'){
    accessTokenOptions.secure=true
}
res.cookie('access_token',accessToken,accessTokenOptions)
res.cookie('refresh_token',refreshToken,refreshTokenOptions)
res.status(statusCode).json({
    status:"success",
    user,
    accessToken
})
}
