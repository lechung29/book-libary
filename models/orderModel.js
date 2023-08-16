import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    products : [
        {
            type:mongoose.ObjectId,
            ref:'Products',
        },
    ],
    totals: {
        type: Number
    },
    customer: {
        type: mongoose.ObjectId,
        ref:'users'
    },
    status: {
        type: String,
        default: 'Chưa trả',
        enum: ["Chưa xử lý", "Đã thanh toán", "Đang thuê", "Đã trả"]
    }
}, {timestamps: true})

export default mongoose.model('Order', orderSchema)