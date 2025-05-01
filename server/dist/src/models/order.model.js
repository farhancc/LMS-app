import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
    courseId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: [true, 'there must be a user']
    },
    payment_info: {
        type: Object
    }
}, { timestamps: true });
const Order = mongoose.model('Order', OrderSchema);
export default Order;
