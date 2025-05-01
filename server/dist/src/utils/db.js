import mongoose from "mongoose";
// require("dotenv").config();
import dotenv from 'dotenv';
dotenv.config();
const dbUri = process.env.MONGO_URI;
const connectDB = async () => {
    try {
        await mongoose.connect(dbUri
        // ,{
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // poolSize: 10}
        ).then((data) => {
            console.log("database connected" + data.connection.host);
        });
    }
    catch (err) {
        console.log(err.message);
        setTimeout(connectDB, 5000);
    }
};
export default connectDB;
