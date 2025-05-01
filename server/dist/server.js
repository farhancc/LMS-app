import app from "./src/app";
import connectDB from "./src/utils/db";
// require("dotenv").config();
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();
//
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,
    api_secret: process.env.CLOUD_SECRET_KEY
});
// create serveer
app.listen(process.env.PORT, () => {
    console.log(`server is running on port${process.env.PORT}`);
    connectDB();
});
