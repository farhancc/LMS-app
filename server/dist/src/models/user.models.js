import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// require("dotenv").config()
import dotenv from 'dotenv';
dotenv.config();
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const userSchema = new mongoose.Schema({
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
}, { timestamps: true });
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    // this.confirmpassword = undefined;
    next();
});
userSchema.methods.signAcessToken = function () {
    return jwt.sign({ id: this.id }, process.env.ACCESS_TOKEN || "", { expiresIn: '5m' });
};
userSchema.methods.signRefreshToken = function () {
    return jwt.sign({ id: this.id }, process.env.REFRESH_TOKEN || "", { expiresIn: '3d' });
};
// comparePassword
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
const User = mongoose.model("user", userSchema);
export default User;
