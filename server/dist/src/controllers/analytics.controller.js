import { CatchAsyncError } from "../middlewares/catchAsyncError";
import { generateYearlyData } from "../utils/analytics.generator";
import User from "../models/user.models";
import Course from "../models/course.model";
import Order from "../models/order.model";
// get user analytics-- only admin
export const getUserAnalytics = CatchAsyncError(async (req, res, next) => {
    const users = await generateYearlyData(User);
    res.status(200).json({
        status: 'success',
        users
    });
});
export const getCoursesAnalytics = CatchAsyncError(async (req, res, next) => {
    const courses = await generateYearlyData(Course);
    res.status(200).json({
        status: 'success',
        courses
    });
});
export const getOrderAnalytics = CatchAsyncError(async (req, res, next) => {
    const orders = await generateYearlyData(Order);
    res.status(200).json({
        status: 'success',
        orders
    });
});
