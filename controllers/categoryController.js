import categoryModel from '../models/categoryModel.js'
import slugify from 'slugify'

//Tạo mới thể loại
export const createCategoryController = async (req, res) => {
    try {
        const {name} = req.body
        if(!name) {
            res.status(401).send({message: "Tên thể loại là bắt buộc!"})
        }
        const existingCategory = await categoryModel.findOne({name})
        if (existingCategory) {
            res.status(200).send({
                success: true,
                message: "Thể loại này đã tồn tại", 
            })
        }
        const category = await new categoryModel({name, slug: slugify(name)}).save()
        res.status(201).send({
            success: true,
            message: "Đã tạo mới thể loại này!",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message:'Có lỗi xảy ra!'
        })
    }
}

//Cập nhật thể loại
export const updateCategoryController = async (req, res) =>{
    try {
        const {name} = req.body
        const {id} = req.params
        const category = await categoryModel.findByIdAndUpdate(id, {name, slug: slugify(name)}, {new: true})
        res.status(200).send({
            success: true,
            message: "Cập nhật thể loại thành công!",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Có lỗi xảy ra trong quá trình cập nhật!"
        })
    }
}

//Hiển thị tất cả thể loại
export const categoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success: true,
            message: "Hiển thị thành công tất cả thể loại",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Có lỗi khi hiển thị tất cả thể loại!"
        })
    }
}

export const singleCategoryController = async(req, res) => {
    try {
        const category = await categoryModel.findOne({slug: req.params.slug})
        res.status(200).send({
            success: true,
            message: "Hiển thị 1 thể loại thành công!",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message:"Có lỗi khi hiển thị 1 thể loại!",
            error
        })
    }
}

//Xóa 1 thể loại 
export const deleteCategoryController = async(req, res) => {
    try {
        const {id} = req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: "Xóa thể loại thành công!"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Có lỗi trong khi xóa thể loại!",
            error 
        })
    }
}