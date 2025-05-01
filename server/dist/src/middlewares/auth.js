import { CatchAsyncError } from "./catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import jwt from "jsonwebtoken";
import { redis } from "../utils/redis";
export const isAuthenticated = CatchAsyncError(async (req, res, next) => {
    const access_token = req.cookies.access_token;
    if (!access_token)
        return next(new ErrorHandler("login please", 400));
    const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN);
    if (!decoded) {
        return next(new ErrorHandler("access token is not valid", 400));
    }
    const user = await redis.get(decoded.id);
    if (!user) {
        return next(new ErrorHandler('user not found', 400));
    }
    //  console.log(user,"------------",JSON.parse(user));
    req.user = JSON.parse(user);
    next();
});
export const autharizeRole = (...roles) => {
    return (req, res, next) => {
        if (!(roles.some((el) => el == req.user?.role))) {
            // console.log(roles,'rolesssss',(roles.some((el:any)=>el==req.user?.role)),req.user);
            return next(new ErrorHandler(`you are not allowed to access the data`, 400));
        }
        next();
    };
};
