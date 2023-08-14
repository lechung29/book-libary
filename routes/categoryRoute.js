import express from 'express'
import {requireSignIn, isAdmin} from '../middlewares/authMiddleware.js'
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from '../controllers/categoryController.js'

const router = express.Router()

//Tạo 1 thể loại sách
router.post('/create-category', requireSignIn, isAdmin, createCategoryController)

//Cập nhật 1 thể loại sách
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController)
export default router

//Hiển thị tất cả thể loại
router.get('/get-category', categoryController)

//Hiển thị 1 thể loại
router.get('/single-category/:slug', singleCategoryController)

//Xóa 1 thể loại
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController)