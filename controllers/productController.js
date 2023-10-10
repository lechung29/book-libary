import productModel from '../models/productModel.js'
import orderModel from '../models/orderModel.js'
import slugify from 'slugify'
import fs from 'fs'
import router from '../routes/productRoute.js'

//Tạo mới sản phẩm
export const createProductController = async (req, res) => {
    try {
        const { name, slug, author, description, category, quantity } = req.fields
        const {photo} = req.files
        
        //Kiểm tra
        switch (true) {
            case !name:
                return res.status(500).send({message: "Tên sách là bắt buộc!"})
            case !author:
                return res.status(500).send({message: "Tên tác giả là bắt buộc!"})
            case !description:
                return res.status(500).send({message: "Mô tả là bắt buộc!"})
            case !category:
                return res.status(500).send({message: "Thể loại là bắt buộc!"})
            case !quantity:
                return res.status(500).send({message: "Số lượng là bắt buộc!"})
            case photo &&  photo.size > 1000000 : 
                return res.status(500).send({message: "Ảnh là bắt buộc và phải bé hơn 1MB!"})
        }
        
        const products = new productModel({...req.fields, slug: slugify(name)})
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success: true,
            message: "Tạo mới sản phẩm thành công!",
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Có lỗi xảy ra khi tạo mới sản phẩm",
            error
        })
    }
}

//Cập nhật sách
export const updateProductController = async (req, res) => {
    try {
        const { name, slug, author, description, category, quantity } = req.fields
        const {photo} = req.files
        
        //Kiểm tra
        switch (true) {
            case !name:
                return res.status(500).send({message: "Tên sách là bắt buộc!"})
            case !author:
                return res.status(500).send({message: "Tên tác giả là bắt buộc!"})
            case !description:
                return res.status(500).send({message: "Mô tả là bắt buộc!"})
            case !category:
                return res.status(500).send({message: "Thể loại là bắt buộc!"})
            case !quantity:
                return res.status(500).send({message: "Số lượng là bắt buộc!"})
            case photo &&  photo.size > 1000000 : 
                return res.status(500).send({message: "Ảnh là bắt buộc và phải bé hơn 1MB!"})
        }
        
        const products = await productModel
            .findByIdAndUpdate(req.params.pid, 
                {...req.fields, slug: slugify(name)}, 
                { new: true}
            )
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success: true,
            message: "Cập nhật sản phẩm thành công!",
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Có lỗi xảy ra khi cập nhật sản phẩm",
            error
        })
    }
}
//Hiển thị sản phẩm
export const getProductController = async (req, res) => {
    try {
        const perPage = 6
        const page = req.params.page ? req.params.page : 1
        const products = await productModel
            .find({})
            .populate('category')
            .select("-photo")
            .skip((page-1)*perPage)
            .limit(perPage)
            .sort({createdAt:-1})
        res.status(200).send({
            success: true,
            countTotal: products.length,
            message: "Tất cả sản phẩm được hiển thị!",
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Có lỗi xảy ra khi lấy thông tin sản phẩm!",
            error
        })
    }
}

//Hiển thị 1 sản phẩm
export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel
            .findOne({slug: req.params.slug})
            .select("-photo")
            .populate('category')
        res.status(200).send({
            success: true,
            message: "Lấy thành công sản phẩm!",
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Có lỗi khi lấy 1 sản phẩm!"
        })
    }
}

//Lấy ảnh sản phẩm
export const productImageController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo")
        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: "Có lỗi xảy ra",
            error
        })
    }
}

//Xóa sản phẩm
export const deleteProductController = async (req, res) => {
    try {
        await productModel
            .findByIdAndDelete(req.params.pid)
            .select("-photo")
        res.status(200).send({
            success: true,
            message: "Xóa sản phẩm thành công!",

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Có lỗi xảy ra khi xóa sản phẩm",
            error
        })
    }
}

//Lọc sản phẩm
export const productFilterController = async (req, res) => {
    try {
        const perPage = 4
        const {check} = req.body
        let args = {}
        if (check.length > 0) args.category = check
        const products = await productModel
            .find(args)
            .select("-photo")
            .limit(perPage)
            .sort({createdAt: 1})
        res.status(200).send({
            success: true,
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Có lỗi xảy ra",
            error
        })
    }
}

//Lấy số sản phẩm

export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success: true,
            total,
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message: "Có lỗi khi lấy số lượng sản phẩm!",
            error 
        })
    }
}

//Lấy sản phẩm mỗi trang
 export const productListController = async (req, res) => {
    try {
        const perPage = 4
        const page = req.params.page ? req.params.page : 1
        const products = await productModel
            .find({})
            .select("-photo")
            .skip((page-1)*perPage)
            .limit(perPage)
            .sort({createdAt: 1})
        res.status(200).send({
            success: true,
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Có lỗi xảy ra!",
            error
        })
    }
 }

 //Lấy danh sách sản phẩm mới cập nhật
 export const updatedProductListController = async (req, res) => {
    try {
        const count = 8
        const products = await productModel
            .find({})
            .select("-photo")
            .limit(count)
            .sort({updatedAt: -1})
        res.status(200).send({
            success: true,
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Có lỗi xảy ra!",
            error
        })
    }
 }

 //Tìm kiếm sản phẩm
 export const searchProductController = async (req, res) => {
    try {
        const {keyword} = req.params
        const result = await productModel.find({
            $or: [
                {name:{$regex :keyword, $options: "i"}},
                {description:{$regex :keyword, $options: "i"}}
            ]
        }).select("-photo")
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message: "Có lỗi xảy ra khi tìm kiếm!",
            error
        })
    }
}


//Xác nhận đơn thuê
export const paymentProductController = async (req, res) => {
    try {
        const {cart} = req.body
        let total = 0
        cart.map((i) => {
            total += i.price    
        })
        const order = new orderModel({
                    products: cart,
                    totals: total,
                    customer: req.user._id
                })
        await order.save()
        res.json({ok: true})
    } catch (error) {
        console.log(error)
    }
}
