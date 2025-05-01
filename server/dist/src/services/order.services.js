import { CatchAsyncError } from "../middlewares/catchAsyncError";
import Order from "../models/order.model";
// CatchAsyncError
export const newOrder = CatchAsyncError(async (data, res, next) => {
    const order = await Order.create(data);
    res.status(200).json({
        status: 'success',
        order
    });
});
