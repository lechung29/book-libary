import express from 'express'
import {requireSignIn, isAdmin} from '../middlewares/authMiddleware.js'
import { createProductController, deleteProductController, getProductController, getSingleProductController, productCountController, productFilterController, productImageController, productListController, searchProductController, updateProductController, updatedProductListController } from '../controllers/productController.js';
import formidable from 'express-formidable'

const router = express.Router();

//Thêm mới sách
router.post('/create-product',
    requireSignIn, 
    isAdmin, 
    formidable(),
    createProductController
)

//Cập nhật sách
router.put('/update-product/:pid',
    requireSignIn, 
    isAdmin, 
    formidable(),
    updateProductController
)

//Hiển thị sản phẩm
router.get('/get-product', getProductController)


//Hiển thị 1 sản phẩm
router.get('/get-product/:slug', getSingleProductController)

//Hiển thị ảnh sản phẩm
router.get('/product-image/:pid', productImageController)

//Xóa 1 sản phẩm
router.delete("/delete-product/:pid", deleteProductController)

//Lọc sản phẩm
router.post('/product-filter', productFilterController)

//Lấy số sản phẩm
router.get('/product-count', productCountController)


//Lấy sản phẩm mỗi trang
router.get('/product-list/:page', productListController)

//Lấy sản phẩm mới cập nhật
router.get('/updated-product-list', updatedProductListController)


//Tìm kiếm sản phẩm
router.get('/search/:keyword', searchProductController)


export default router