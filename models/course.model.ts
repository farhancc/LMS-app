import mongoose,{Document,Model,Schema} from "mongoose";
import { IUser } from "./user.models";
interface IComment extends Document{
    user:object;
    question:string;
    questionReplies?:[object]
    }
interface IReview extends Document{
user:IUser;
// product:string;
rating:number;
comment:string
commentReplies?:IComment[];

}
interface ILink extends Document{
    title:string;
    url:string;
}
interface ICourseData extends Document{
    title:string;
    description:string;
    videoUrl:string;
    thumbnail:object;
    videoSection:string;
    videoLength:number;
    videoplayer:string
    links:ILink[];
    suggestion:string;
    questions:IComment[];

    instructor:object;
    price:number;

    category:string;
    lessons:ILink[];
    reviews:IReview[]
}

interface ICourse extends Document{
    name:string;
    description:string;
    estimatedPrice?:number;
    thumbnail:object;
    price:number;
    instructor:object;
    tags:string;
    level:string;
    benefits:{title:string}[];
    prerequesites:{title:string}[]
    demoUrl:string;
reviews:IReview[];
courseData:ICourseData[]
ratings?:number;
purchased?:number;
createdAt:Date;
}
const reviewSchema=new Schema<IReview>({
    user:Object,
    rating:{
        type:Number,
        default:0,
       },
       comment:String,
    
})
const linkSchema = new Schema<ILink>({
    title:String,
    url:String
})
const commentSchema =new Schema<IComment>({
    user:Object,
    question:String,
    questionReplies:[Object]

})

const courseDataSchema =new Schema<ICourseData>({
title:String,
description:String,
videoUrl:String,
videoSection:String,
videoplayer:String,
videoLength:Number,
links:[linkSchema],
suggestion:String,
questions:[commentSchema]

})

const courseSchema =new Schema<ICourse>({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,

    },price:{
        type:Number,
        required:true
    },
    estimatedPrice:Number,
    thumbnail:{
        public_id:{type:String},
        url:{
            
            type:String
        },


    },
    tags:{type:String,
        required:true
    },
    level:{
        type:String,
        required:true
    },

   demoUrl:{
    type:String,
    required:true
},
    benefits:[{title:String}],
    prerequesites:[{title:String}],
    reviews:[reviewSchema],
    courseData:[courseDataSchema],
    ratings:{
        type:Number,
        default:0
    },
    purchased:{
        type:Number,
        default:0
    }

},{timestamps:true})

const Course:Model<ICourse>=mongoose.model("Course",courseSchema)
export default Course