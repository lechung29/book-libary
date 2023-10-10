import React, {useState, useEffect} from 'react'
import './AdminDashboard.css'
import AdminMenu from '../../components/AdminMenu/AdminMenu'
import { useAuth } from '../../context/auth'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import {Select} from 'antd'
import { Link, NavLink, useNavigate } from 'react-router-dom'

const {Option} = Select

const CreateProduct = () => {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState("")
  const [author, setAuthor] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [quantity, setQuantity] = useState("")
  const [photo, setPhoto] = useState("")

  const navigate = useNavigate()
  const getAllCategory = async () => {
    try {
      const {data} = await axios.get("/api/v1/category/get-category")
      if (data?.success) {
        setCategories(data?.category)
      }
    } catch (error) {
      console.log(error)
      toast.error("Có lỗi xảy ra khi lấy thể loại sách!")
    }
  }
  useEffect(() => {
    getAllCategory()
  }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      const productData = new FormData()
      productData.append("name",name)
      productData.append("author",author)
      productData.append("description",description)
      productData.append("price",price)
      productData.append("quantity",quantity)
      productData.append("category",category)
      productData.append("photo",photo)
      const {data} = await axios.post('/api/v1/product/create-product', productData)
      if (data?.success) {
        toast.success("Tạo mới sách thành công!")
        navigate('/dashboard/admin/all-products')
      } else {
        toast.error(data?.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Có lỗi xảy ra!")
    }
  }
  return (
    <Layout title={"Quản lý sách"}>
        <div className='dashboard-section px-5 pt-2 pb-5'>
          <div className='container-fluid pt-4'>
            <div className='row d-flex justify-content-center'>
              <div className='col-11 pt-5 justify-content-center home-border d-flex'></div>
            </div>
            <div className='row d-flex justify-content-center'>
              <div className='col-lg-4 col-sm-12 mb-5 d-flex justify-content-center'>
                <AdminMenu />
              </div>
              <div className='col-lg-8 col-sm-12 mb-5 d-flex justify-content-center'>
                <div className='admin-content'>
                  <h2 className='admin-content-title py-4 text-center text-uppercase'>Quản lý sách</h2>
                  <div className='admin-content-manage'>
                    <Select bordered={false} 
                      placeholder="Chọn thể loại sách" 
                      size='large' 
                      showSearch 
                      className='form-select mb-2 font-primary font-14'
                      onChange={(value) => {setCategory(value)}}
                    >
                      {
                        categories?.map(c => (
                          <Option className="font-primary" key={c._id} value={c._id}>{c.name}</Option>
                        ))
                      }
                    </Select>
                    <div className='mb-2'>
                      <label className='btn btn-outline-secondary font-primary font-14 col-12'>
                        {photo ? photo.name : "Tải ảnh lên"}
                        <input 
                          type='file' 
                          name='photo' 
                          accept='image/*' 
                          onChange={(e) => setPhoto(e.target.files[0])} 
                          hidden
                        />
                      </label>
                    </div>
                    <div className='mb-2'>
                      { photo && (
                        <div className='text-center'>
                          <img 
                            src={URL.createObjectURL(photo)} 
                            alt='book_photo' 
                            height={'200px'} 
                            className='img-responsive'
                          />
                        </div>
                      )}
                    </div>
                    <div className='mb-2'>
                      <input 
                        type='text' 
                        value={name} 
                        placeholder='Nhập tên sách' 
                        className='form-control font-primary font-14'
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className='mb-2'>
                      <input 
                        type='text' 
                        value={author} 
                        placeholder='Nhập tên tác giả' 
                        className='form-control font-primary font-14'
                        onChange={(e) => setAuthor(e.target.value)}
                      />
                    </div>
                    <div className='mb-2'>
                      <input 
                        type='text' 
                        value={description} 
                        placeholder='Nhập mô tả sách' 
                        className='form-control font-primary font-14'
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className='mb-2'>
                      <input 
                        type='text' 
                        value={price} 
                        placeholder='Nhập giá cho thuê' 
                        className='form-control font-primary font-14'
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <div className='mb-3'>
                      <input 
                        type='number' 
                        value={quantity} 
                        min={0}
                        placeholder='Nhập số lượng' 
                        className='form-control font-primary font-14'
                        onChange={(e) => {
                          setQuantity(e.target.value)
                        }}
                      />
                    </div>
                    <div className='mb-3 d-flex gap-20 justify-content-center'>
                      <button className='auth-btn' onClick={handleCreate}>Tạo mới</button>
                      <NavLink to="/dashboard/admin/all-products" className='text-decoration-none'>
                        <button className='auth-btn'>Xem tất cả</button>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default CreateProduct