import express from 'express'
import {deleteUserController, forgotPasswordController, getAllOrdersController, getAllUsersController, getOrdersController, loginController, orderStatusController, registerController, updateProfileController} from '../controllers/authController.js'
import {requireSignIn, isAdmin} from '../middlewares/authMiddleware.js'

//Khởi tạo router
const router = express.Router()

//Đăng ký
router.post('/register', registerController)

//Đăng nhập
router.post('/login', loginController)

//Quên mật khẩu
router.post('/forgot-password', forgotPasswordController)

//router xác thực bảo vệ người dùng
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ok : true})
})

//router xác thực bảo vệ admin 
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ok : true})
})

//Lấy tất cả người dùng
router.get("/all-users",requireSignIn, isAdmin, getAllUsersController)


//Xóa người dùng
router.delete('/delete-user/:id', requireSignIn, isAdmin, deleteUserController )

//Cập nhật profile
router.put('/profile', requireSignIn, updateProfileController)

//Lấy đơn thuê
router.get('/orders', requireSignIn, getOrdersController)

//Tất cả đơn thuê
router.get('/all-orders', requireSignIn, isAdmin, getAllOrdersController)

//Cập nhật trạng thái thuê
router.put('/order-status/:orderId', requireSignIn, isAdmin, orderStatusController)

export default router
