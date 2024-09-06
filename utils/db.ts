import mongoose from "mongoose";
require("dotenv").config();
const dbUri: string = process.env.MONGO_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(dbUri
      // ,{
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // poolSize: 10}
  ).then((data: any) => {
      console.log("database connected" + data.connection.host);
    });
  } catch (err: any) {
    console.log(err.message);
    setTimeout(connectDB, 5000);
  }
};
export default connectDB;
