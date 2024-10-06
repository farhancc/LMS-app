import { time, timeStamp } from "console";
import mongoose, { Model,Document } from "mongoose";
export interface Iorder extends Document{
courseId: string,
userId:string,
payment_info:object
}
const OrderSchema=new mongoose.Schema<Iorder>(
    {
        courseId:{
            type:String,
            required:true
        },
        userId:{
            type:String,
            required:[true,'there must be a user']
        },
        payment_info:{
            type:Object
        }
    },{timestamps:true}
)
const Order:Model<Iorder>=mongoose.model('Order',OrderSchema)
export default Order