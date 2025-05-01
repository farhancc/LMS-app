import mongoose, { Schema } from "mongoose";
const reviewSchema = new Schema({
    user: Object,
    rating: {
        type: Number,
        default: 0,
    },
    comment: String,
});
const linkSchema = new Schema({
    title: String,
    url: String
});
const commentSchema = new Schema({
    user: Object,
    question: String,
    questionReplies: [Object]
});
const courseDataSchema = new Schema({
    title: String,
    description: String,
    videoUrl: String,
    videoSection: String,
    videoplayer: String,
    videoLength: Number,
    links: [linkSchema],
    suggestion: String,
    questions: [commentSchema]
});
const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }, price: {
        type: Number,
        required: true
    },
    estimatedPrice: Number,
    thumbnail: {
        public_id: { type: String },
        url: {
            type: String
        },
    },
    tags: { type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    demoUrl: {
        type: String,
        required: true
    },
    benefits: [{ title: String }],
    prerequesites: [{ title: String }],
    reviews: [reviewSchema],
    courseData: [courseDataSchema],
    ratings: {
        type: Number,
        default: 0
    },
    purchased: {
        type: Number,
        default: 0
    }
}, { timestamps: true });
const Course = mongoose.model("Course", courseSchema);
export default Course;
