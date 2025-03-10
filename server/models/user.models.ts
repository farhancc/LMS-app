import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
require("dotenv").config()

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  courses: Array<{ courseId: string }>;
  createdAt: Date;
  comparePassword: (password: string) => Promise<boolean>;
  signAcessToken:()=>string;
  signRefreshToken:()=>string;
  
  //   getJwtToken: () => string;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [30, "Name cannot exceed 30 characters"],
      minLength: [3, "Name should have more than 4 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      validate: [emailRegex, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [6, "Password should be greater than 6 characters"],
    },
    // confirmpassword: {
    //   type: String,
    //   required: [true, "you forgot the confirm password field"],
    //   validate: {
    //     validator: function (el) {
    //       if (this.password === el) return true;
    //       return false;
    //     },
    //     message: "password and confirm password must be same",
    //   },
    // },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    courses: [
      {
        courseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
      },
    ],
  },
  { timestamps: true }
);
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  // this.confirmpassword = undefined;
  next();
});
userSchema.methods.signAcessToken=function(){
  return jwt.sign({id:this.id},process.env.ACCESS_TOKEN||"",{expiresIn:'5m'})
}
userSchema.methods.signRefreshToken=function(){
  return jwt.sign({id:this.id},process.env.REFRESH_TOKEN||"",{expiresIn:'3d'})
}
// comparePassword
userSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};
const User = mongoose.model<IUser>("user", userSchema);
export default User;
