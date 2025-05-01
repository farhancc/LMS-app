import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, message: { type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'unread'
    },
    userId: {
        type: String,
        required: true
    }
}, { timestamps: true });
const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
