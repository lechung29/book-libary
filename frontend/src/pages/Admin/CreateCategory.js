import React, {useEffect, useState} from 'react'
import './AdminDashboard.css'
import AdminMenu from '../../components/AdminMenu/AdminMenu'
import { useAuth } from '../../context/auth'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm'
import {Modal} from 'antd'
import { Footer } from 'antd/es/layout/layout'

const CreateCategory = () => {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState("")
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState(null)
  const [updateName, setUpdateName] = useState("")

  //Lấy tất cả thể loại sách
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
  //Xử lý form
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.post('/api/v1/category/create-category', {name})
      if (data?.success) {
        toast.success(`${name} được tạo thành công!`)
        getAllCategory()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Có lỗi xảy ra!')
    }
  }

  //Xử lý cập nhật
  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.put(`/api/v1/category/update-category/${selected._id}`, {name: updateName})
      if (data.success) {
        toast.success(`${updateName} được cập nhật`)
        setSelected(null)
        setUpdateName("")
        setVisible(false)
        getAllCategory()
      }
    } catch (error) {
      console.log(error)
      toast.error("Có lỗi xảy ra!")
    }
  }

  //Xử lý xóa 
  const handleDelete = async (pId) => {
    try {
      const {data} = await axios.delete(`/api/v1/category/delete-category/${pId}`)
      if (data?.success) {
        toast.success(`Danh mục này đã xóa`)
        getAllCategory()
      }
    } catch (error) {
      console.log(error)
      toast.error("Có lỗi xảy ra!")
    }
  }
  
  return (
    <Layout title={"Quản lý thể loại sách"}>
        <div className='dashboard-section px-5 pt-2'>
          <div className='container-fluid pt-4'>
            <div className='row d-flex justify-content-center'>
              <div className='col-10 pt-5 justify-content-center home-border d-flex'></div>
            </div>
            <div className='row d-flex justify-content-center'>
              <div className='col-4 d-flex justify-content-center'>
                <AdminMenu />
              </div>
              <div className='col-8 d-flex justify-content-center'>
                <div className='admin-content'>
                  <h2 className='admin-content-title py-4 mb-0 text-center text-uppercase'>Quản lý thể loại</h2>
                  <div className='admin-content-manage'>
                    <div className='my-2'>
                      <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
                    </div>
                    <table class="table">
                      <thead>
                        <tr>
                          <th className='col-6 font-primary font-14'>Tên thể loại</th>
                          <th className='col-6 font-primary font-14'>Xử lý</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories?.map((c) => (
                          <>
                            <tr className=''>
                              <td className='font-primary font-14' key={c._id}>{c.name}</td>
                              <td className='d-flex justify-content-center gap-15'>
                                <button className='action-btn info-btn' onClick={() => {
                                  setVisible(true);
                                  setUpdateName(c.name)
                                  setSelected(c)
                                }}>
                                Chỉnh sửa
                                </button>
                                <button className='action-btn error-btn' onClick={() => {
                                  handleDelete(c._id)
                                }}>
                                  Xóa
                                </button>
                              </td>
                            </tr>
                          </>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
                    <CategoryForm value={updateName} setValue={setUpdateName} handleSubmit={handleUpdate}/>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default CreateCategory