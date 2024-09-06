import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/user.models";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import jwt from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";
import { error } from "console";
import { create } from "domain";
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
export const createActivationToken = (
  newUser: any
): IActivationToken => {
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
      const { activation_token, activation_code }:IActivationRequest =
        req.body ;
      const user: { newUser: IUser; activationCode: string } = jwt.verify(
        activation_token,
        process.env.JWT_SECRET_KEY as string
      ) as { newUser: IUser; activationCode: string };

      if (user.activationCode !== activation_code) {
        return next(new ErrorHandler("wrong activation code", 400));
      }
      console.log(user.newUser,'new user')
      const { name, email, password } = user.newUser;
      
      console.log(User.findOne({ email: email }));
      
      
      if (await User.findOne({ email: email })) {
        return next(new ErrorHandler("user already exist please login", 400));
      }
      const freshuser = await User.create( {name,email, password,confirmpassword:password});

      res.status(201).json({
        status: "success",
        data: {
       freshuser
        },
      });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 400));
    }
  }
);
