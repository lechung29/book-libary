import mongoose from "mongoose";
import colors from 'colors'

const connectDB = async () => {
    try {
        const conString = await mongoose.connect(process.env.MONGO_URl)
        console.log(`Đã kết nối đến cơ sở dữ liệu ${conString.connection.host}`)
    } catch (error) {
        console.log(`Có lỗi khi kết nối với cơ sở dữ liệu ${error}`.bgRed.white)
    }
}

export default connectDB