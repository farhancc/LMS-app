import mongoose, { Model } from "mongoose";
interface Inotification{
    userId:string;
    title:string;
    message:string;
    status:string;

}
const notificationSchema=new mongoose.Schema<Inotification>(
    {
title:{
type:String,
required:true
},message:{type:String,
    required:true

},
status:{
    type:String,
    required:true,
    default:'unread'

},
userId:{
    type:String,
    required:true
}
    }
)
 const Notification:Model<Inotification>=mongoose.model('Notification',notificationSchema)
export default Notification