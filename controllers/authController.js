import userModel from '../models/userModel.js'
import orderModel from '../models/orderModel.js'
import { comparePassword, hashPassword} from '../helpers/authHelper.js'
import JWT from 'jsonwebtoken'

//Đăng ký
export const registerController = async (req, res) => {
    try {
        const {name, email, password, phone, address, answer} = req.body
        if (!name) {
            return res.send({message: "Tên là bắt buộc!"})
        }
        if (!email) {
            return res.send({message: "Email là bắt buộc!"})
        }
        if (!password) {
            return res.send({message: "Mật khẩu là bắt buộc!"})
        }
        if (!phone) {
            return res.send({message: "Số điện thoại là bắt buộc!"})
        }
        if (!address) {
            return res.send({message: "Địa chỉ là bắt buộc!"})
        }
        if (!answer) {
            return res.send({message: "Câu trả lời là bắt buộc!"})
        }

        //Tồn tại tài khoản
        const existingUser = await userModel.findOne({email})
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Đã tồn tại tài khoản, vui lòng đăng nhập!!!"
            })
        }
        //Đăng ký tài khoản mới
        const hashedPassword = await hashPassword(password)

        //Lưu tài khoản
        const user = new userModel({name, email, phone, address, password:hashedPassword, answer}).save()

        res.status(201).send({
            success: true,
            message: "Đăng ký tài khoản thành công!!!",
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Có lỗi khi đăng ký',
            error
        })
    }
}


//Đăng nhập
export const loginController = async (req, res) => {
    try {
        const {email, password} = req.body 

        //Xác thực 
        if(!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Email và mật khẩu không hợp lệ!!!"
            })
        }

        //Kiểm tra người dùng
        const user = await userModel.findOne({email})
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email không tồn tại!!!"
            })
        }

        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Mậu khẩu không hợp lệ!!!",
            })
        }

        //Token
        const token = await JWT.sign({_id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "7d",
        })
        res.status(200).send({
            success: true,
            message: "Đăng nhập thành công!!!",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address:user.address,
                role: user.role,
            },
            token,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Có lỗi khi đăng nhập!!!',
            error
        })
    }
}

//Quên mật khẩu

export const forgotPasswordController =  async (req, res) => {
    try {
        const {email, answer, newPassword} = req.body
        if (!email) {
            res.status(400).send({message: 'Email là bắt buộc!'})
        } 
        if (!answer) {
            res.status(400).send({message: 'Câu trả lời là bắt buộc!'})
        }
        if (!newPassword) {
            res.status(400).send({message: 'Mật khẩu mới là bắt buộc!'})
        }

        //Kiểm tra
        const user = await userModel.findOne({email, answer})

        //Xác thực
        if (!user) {
            res.status(400).send({
                success: false,
                message: "Email hoặc câu trả lời không đúng"
            })
        }

        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id, {password: hashed})
        res.status(200).send({
            success: true,
            message: "Đặt lại mật khẩu thành công!",    
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Có lỗi xảy ra!",
            error
        })
    }
}
//Lấy tất cả người dùng
export const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.find({})
        res.status(200).send({
            success: true,
            message: "Hiển thị thành công tất cả người dùng",
            users
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Có lỗi khi hiển thị tất cả người dùng!"
        })
    }
}

//Xóa người dùng
export const deleteUserController = async (req, res) => {
    try {
        const {id} = req.params
        await userModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: "Xóa người dùng thành công!"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Có lỗi trong khi xóa người dùng!",
            error 
        })
    }
}


//Cập nhật profile
export const updateProfileController = async (req, res) => {
    try {
        const {name, email, password, address, phone} = req.body
        const user = await userModel.findById(req.user._id)
        //password
        if (password && password.length < 6) {
            return res.json({error: "Mật khẩu phải dài hơn 6 ký tự"})
        }
        const hashedPassword = password ? await hashPassword(password) : undefined 
        const updateUser = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            address: address || user.address
        }, {new: true})
        res.status(200).send({
            success: true,
            message: 'Cập nhật thành công',
            updateUser
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Có lỗi khi cập nhật thông tin",
            error
        })
    }
}

//Lấy đơn thuê
export const getOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({customer: req.user._id})
            .populate('products', '-photo')
            .populate('customer', 'name')
        res.json(orders);
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Có lỗi khi lấy đơn hàng",
            error
        })
    }
}

//Tất cả đơn thuê
export const getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({})
            .populate('products', '-photo')
            .populate('customer', 'name')
            .sort({createdAt: "-1"});
        res.json(orders);
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Có lỗi khi lấy đơn hàng",
            error
        })
    }
}

//Cập nhật trạng thái
export const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params
        const { status } = req.body
        const orders = await orderModel.findByIdAndUpdate(orderId, {status}, {new: true})
        res.json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: "Lỗi khi cập nhật trạng thái",
            error
        })
    }
}