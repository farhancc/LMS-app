require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import express from "express";
import { ErrorMiddleware } from "./middlewares/error";
import ErrorHandler from "./utils/ErrorHandler";
export const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";
// const userRoute = require("./routes/UserRouts");
import userRoute from "./routes/UserRouts";
import courseRoute from "./routes/course.route";
import Orderrouter from "./routes/order.route";
import NotificationRouter from "./routes/notification.route";
import analyticRouter from "./routes/analytics.route";
import Layoutrouter from "./routes/layout.route";
// body parser
app.use(express.json({ limit: "50MB" }));

// cookie parser
app.use(cookieParser());
app.use(cors({ origin: process.env.ORIGIN }));
// routers
app.use("/api/v1/analytics",analyticRouter);
app.use("/api/v1/course",courseRoute);
app.use("/api/v1/order",Orderrouter);
app.use("/api/v1/layout",Layoutrouter);
app.use("/api/v1/notification",NotificationRouter);

app.use("/api/v1", userRoute);
// TESTING API
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ success: true, message: "hello" });
  next();
});
// UNKNOWN ROUTE
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`) as any;
  err.statusCode = 404;
  next(err);
});
app.use(ErrorMiddleware);
