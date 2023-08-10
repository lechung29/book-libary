import express from 'express'
import {forgotPasswordController, loginController, registerController} from '../controllers/authController.js'
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

export default router
