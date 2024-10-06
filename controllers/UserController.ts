import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/user.models";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import jwt, { JwtPayload } from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";
import { error } from "console";
import { create } from "domain";
import {
  accessTokenOptions,
  refreshTokenOptions,
  sendToken,
} from "../utils/jwt";
import { redis } from "../utils/redis";
import { getUserById } from "../services/user.services";
import { Redis, RedisKey } from "ioredis";
import cloudinary from "cloudinary";
require("dotenv").config();

interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}
export const signUp = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    if (await User.findOne({ email }))
      return next(new ErrorHandler("user already exist please login", 400));

    const newUser: IRegistrationBody = { name, email, password };

    const activationToken = createActivationToken(newUser);
    const activationCode = activationToken.activationCode;
    const data = { user: { name: newUser.name }, activationCode };
    const html = ejs.renderFile(
      path.join(__dirname, "../mails/activation-mail.ejs"),
      data
    );
    try {
      await sendMail({
        email: newUser.email,
        subject: "Account activation",
        template: "activation-mail.ejs",
        data,
      });
      res.status(201).json({
        success: true,
        message: "please check your mail to activate account",
        activationToken: activationToken.token,
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 400));
    }
    next();
  }
);

interface IActivationToken {
  token: string;
  activationCode: string;
}
export const createActivationToken = (newUser: any): IActivationToken => {
  const activationCode = Math.floor(Math.random() * 9000 + 1000).toString();
  const token = jwt.sign(
    { newUser, activationCode },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "50m",
    }
  );
  return { token, activationCode };
};

// activate user
interface IActivationRequest {
  activation_token: string;
  activation_code: string;
}
export const activateUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activation_token, activation_code }: IActivationRequest =
        req.body;
      const user: { newUser: IUser; activationCode: string } = jwt.verify(
        activation_token,
        process.env.JWT_SECRET_KEY as string
      ) as { newUser: IUser; activationCode: string };

      if (user.activationCode !== activation_code) {
        return next(new ErrorHandler("wrong activation code", 400));
      }
      console.log(user.newUser, "new user");
      const { name, email, password } = user.newUser;

      console.log(User.findOne({ email: email }));

      if (await User.findOne({ email: email })) {
        return next(new ErrorHandler("user already exist please login", 400));
      }
      const freshuser = await User.create({
        name,
        email,
        password,
      });

      res.status(201).json({
        status: "success",
        data: {
          freshuser,
        },
      });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 400));
    }
  }
);
// LOGIN USER
interface IloginRequest {
  email: string;
  password: string;
}
export const loginUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as IloginRequest;
    if (!email || !password) {
      return next(new ErrorHandler("please provide email and password ", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("invalid email-id or password", 400));
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return next(new ErrorHandler("invalid email or password", 400));
    }
    sendToken(user, 200, res);
  }
);

// logout user
export const logout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("access_token", "", { maxAge: 1 });
    res.cookie("access_token", "", { maxAge: 1 });
    const redis_id: any = req?.user?._id || "";
    redis.del(redis_id);
    res.status(200).json({
      status: "success",
      message: "logged out",
    });
  }
);

export const updateAccessToken = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const refresh_token = req.cookies.refresh_token as string;
    const decoded = jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN as string
    ) as JwtPayload;
    if (!decoded) return next(new ErrorHandler("couldnt refresh token", 400));
    const session = await redis.get(decoded.id as string);
    if (!session) return next(new ErrorHandler("couldnt refresh token", 400));
    const user = JSON.parse(session);
    const accessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN as string,
      { expiresIn: "5m" }
    );
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN as string,
      { expiresIn: "3d" }
    );
    req.user = user;
    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);
    res.status(200).json({
      status: "success",
      accessToken,
    });
  }
);

// get user info
export const getUserInfo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId: any = req.user?._id;
    getUserById(userId, res);
  }
);
interface IsocialAuthBody {
  name: string;
  email: string;
  avatar: string;
  password: string;
}
export const socialAuth = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, name, avatar, password } = req.body as IsocialAuthBody;
    const user = await User.findOne({ email });
    if (!user) {
      const newUser = await User.create({ email, name, avatar, password });
      sendToken(newUser, 200, res);
    } else {
      sendToken(user, 200, res);
    }
  }
);

interface IupdateUserInfo {
  name: string;
  password: string;
  email: string;
  avatar: string;
}
export const updateUserinfo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, name, avatar, password } = req.body as IupdateUserInfo;
    const userId: any = req.user?._id;
    const user = await User.findById(userId);
    if (email && user) {
      const isEmailExist = await User.findOne({ email });
      if (isEmailExist) {
        return next(new ErrorHandler("email already exist", 400));
      }
      user.email = email;
    }
    if (name && user) {
      user.name = name;
    }
    await user?.save();
    await redis.set(userId, JSON.stringify(user));
    res.status(201).json({
      status: "success",
      user,
    });
    // const me = await User.findOneAndUpdate({email})
  }
);
interface IpasswordUpdate {
  curPassword: string;
  newPassword: string;
}
export const updatePassword = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { curPassword, newPassword } = req.body as IpasswordUpdate;
    // const isPasswordMatch=
    if (!curPassword || !newPassword) {
      return next(new ErrorHandler("please enter password", 400));
    }

    const user = await User.findById(req.user?._id);
    if (user?.password == undefined)
      return next(new ErrorHandler("invalid user", 400));
    const isPasswordMatch = await user?.comparePassword(curPassword);
    if (!isPasswordMatch) {
      return next(new ErrorHandler("incorrect password", 400));
    }
    user.password = newPassword;

    await user?.save();

    await redis.set(req.user?._id as string, JSON.stringify(user));
    res.status(200).json({ status: "success", user });
  }
);
interface IUpdateProfilePic {
  avatar: {
    public_id: string;
    url: string;
  };
}
export const updateProfilePicture = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { avatar } = req.body;
    // const user=req.user
    const userid = req?.user?._id;
    const user = await User.findById(userid);
    if (avatar&&user) {
      if (user?.avatar?.public_id) {
        await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);
        const myCloud= await cloudinary.v2.uploader.upload(avatar, {
          folder: "avatars",
          width: 150,
        });
        user.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      } else {
       const myCloud= await cloudinary.v2.uploader.upload(avatar, {
          folder: "avatars",
          width: 150,
        });
        user.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
    
    }
    await user?.save()
    await redis.set(userid as any,JSON.stringify(user))
    res.status(200).json({status:"success",user})
  }
);

// get all users
export const getAllUsers = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const users=await User.find()
    res.status(201).json({
      status: "success",
      length:users.length,
      users,
    });
  })
interface IUpdaterole{
  userId:string;
  role:string
}
  export const updateRole = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const {userId,role}:IUpdaterole=req.body
    const user=  await User.findById(userId)
if(!user)return next(new ErrorHandler('no user  found',404))
  user.role=role
user?.save()
     
      res.status(201).json({
        status: "success",
        user,
      });
    })
  
    export const deleteUser = CatchAsyncError(
      async (req: Request, res: Response, next: NextFunction) => {
        const {userId}=req.body
      const user=  await User.findById(userId)
  if(!user)return next(new ErrorHandler('no user  found',404))
    await user.deleteOne({userId})
  await redis.del(userId)

        res.status(201).json({
          status: "success"
        });
      })
    
      