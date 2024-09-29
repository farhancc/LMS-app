import { Request, Response, NextFunction } from "express";
import Course from "../models/course.model";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import cloudinary from "cloudinary";
import { createCourse } from "../services/course.services";
import { redis } from "../utils/redis";
import User from "../models/user.models";
import mongoose from "mongoose";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";

export const UploadCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const thumbnail = data.thumbnail;
    if (thumbnail) {
      const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
        folder: "courses",
      });
      data.thumbnail = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
    createCourse(data, res, next);
  }
);
export const editCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    if (data.thumbnail) {
      if (data.thumbnail.public_id) {
        await cloudinary.v2.uploader.destroy(data.thumbnail.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(data.thumbnail, {
          folder: "courses",
        });
        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
    }
    const courseId = req.params.courseId;
    const course = await Course.findByIdAndUpdate(
      courseId,
      { $set: data },
      { new: true }
    );
    course.save();
    res.status(200).json({
      status: "success",
      course,
    });
  }
);

export const getACourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.courseId;
    const isCached = await redis.get(courseId);
    if (isCached) {
      const course = JSON.parse(isCached);
      res.status(200).json({
        status: "success",
        course,
      });
    } else {
      const course = await Course.findById(courseId).select(
        "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
      );
      redis.set(courseId, JSON.stringify(course));
      res.status(200).json({
        status: "success",
        course,
      });
    }
  }
);
export const getAllCourses = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const isCached = await redis.get("allCourses");
    if (isCached) {
      console.log("redisssss");

      const courses = JSON.parse(isCached);
      res.status(200).json({
        status: "success",
        courses,
      });
    } else {
      const courses = await Course.find().select(
        "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
      );
      console.log("mongooooo");
      redis.set("allCourses", JSON.stringify(courses));

      res.status(200).json({
        status: "success",
        courses,
      });
    }
  }
);

// get courses for a user

export const getACourseForUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseList = req.user?.courses;
    const courseid = req.params.courseId;
    // if(courses.includes(courseid))
    const courseExist = courseList?.find((course: any) => {
      course._id.toString === courseid;
    });
    if (!courseExist) {
      return next(new ErrorHandler("course not purchased", 404));
    }
    const course = (await Course.findById(courseid)).courseData;
    res.status(200).json({
      status: "success",
      course,
    });
  }
);

// add question in course
interface IAddQuestionData {
  question: string;
  courseId: string;
  contentId: string;
}
export const addQuestion = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { question, courseId, contentId }: IAddQuestionData = req.body;
    // console.log(courseId,question,contentId,"courseId,question,contentId....")
    if (!mongoose.Types.ObjectId.isValid(contentId)) {
      return next(new ErrorHandler("invalid content id", 400));
    }
    // const courseId=req.params.courseId
    const course = await Course.findById(courseId);
    const courseContent = course?.courseData?.find((item: any) => {
      return item._id.equals(contentId);
    });

    if (!courseContent) {
      return next(new ErrorHandler("invalid content id", 400));
    }
    const newQuestion: any = {
      user: req.user,
      question,
      questionReplies: [],
    };
    // add this question to course content
    courseContent.questions.push(newQuestion);
    await course.save();
    res.status(200).json({
      status: "success",
      question,
    });
  }
);

interface IaddAnswerData {
  answer: string;
  courseId: string;
  contentId: string;
  questionId: string;
}
export const addAnswers = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { answer, courseId, contentId, questionId } =
      req.body as IaddAnswerData;

    if (
      req.user?.courses.find((id: any) => {
        return id === courseId;
      })
    )
      console.log("hello");

    if (!mongoose.Types.ObjectId.isValid(contentId)) {
      return next(new ErrorHandler("invalid content id", 400));
    }
    const course = await Course.findById(courseId);
    const courseContent = course?.courseData?.find((item: any) => {
      return item._id.equals(contentId);
    });

    if (!courseContent) {
      return next(new ErrorHandler("invalid content id", 400));
    }
    const question = courseContent?.questions?.find((qstn: any) => {
      return qstn._id.equals(questionId);
    });
    if (!question) {
      return next(new ErrorHandler("qustion not found", 404));
    }
    const newReply: any = {
      user: req.user,
      answer,
    };

    question?.questionReplies.push(newReply);
    await course?.save();
    if (req.user?._id === question?.user?._id) {
      // notification
    } else {
      const data = {
        name: question?.user?.name,
        title: courseContent.title,
      };
      // const html = await ejs.renderFile(
      //   path.join(__dirname, `../mails/questionReplay.ejs`),
      //   data
      // );
      try {
        await sendMail({
          email: question?.user?.email,
          subject: "Question Reply",
          template: "questionReplay.ejs",
    

          data,
          // html
        });
      } catch (err: any) {
        return next(new ErrorHandler(err.message, 400));
      }
    }

    res.status(200).json({
      status: "success",
      course,
    });
  }
);
