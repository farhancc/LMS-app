import { CatchAsyncError } from "../middlewares/catchAsyncError";
import Course from "../models/course.model";
export const createCourse = CatchAsyncError(async (data, res) => {
    const course = await Course.create(data);
    res.status(201).json({
        status: 'success',
        course
    });
});
