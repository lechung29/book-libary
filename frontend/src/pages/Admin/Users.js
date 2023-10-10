import React, { useEffect, useState } from 'react'
import './AdminDashboard.css'
import AdminMenu from '../../components/AdminMenu/AdminMenu'
import { useAuth } from '../../context/auth'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios'

const Users = () => {
  const [auth, setAuth] = useAuth()
  const [users, setUsers] = useState([])

   //Lấy tất cả thể loại sách
  const getAllUsers = async () => {
    try {
      const {data} = await axios.get("/api/v1/auth/all-users")
      if (data?.success) {
        setUsers(data?.users)
      }
    } catch (error) {
      console.log(error)
      toast.error("Có lỗi xảy ra khi lấy danh sách người dùng!")
    }
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  //Xử lý xóa
  const handleDelete = async (pId) => {
    try {
      const {data} = await axios.delete(`/api/v1/auth/delete-user/${pId}`)
      if (data?.success) {
        toast.success(`Người dùng này đã bị xóa`)
        getAllUsers()
      }
    } catch (error) {
      console.log(error)
      toast.error("Có lỗi xảy ra!")
    }
  }
  return (
    <Layout title={"Quản lý người dùng"}>
        <div className='dashboard-section px-5 pt-2'>
          <div className='container-fluid pt-4'>
            <div className='row d-flex justify-content-center'>
              <div className='col-11 pt-5 justify-content-center home-border d-flex'></div>
            </div>
            <div className='row d-flex justify-content-center'>
              <div className='col-xl-4 col-sm-12 mb-5 d-flex justify-content-center'>
                <AdminMenu />
              </div>
              <div className='col-xl-8 col-sm-12 mb-5 d-flex justify-content-center'>
                <div className='admin-content-sub'>
                  <h2 className='admin-content-title py-4 text-center text-uppercase'>Quản lý người dùng</h2>
                  <div className='admin-content-body py-3 px-3 text-start'>
                    <div className='border'>
                        <table className='table'>
                            <thead>
                                <tr className='text-center'>
                                    <th className="font-primary font-15" scope='col'>STT</th>
                                    <th className="font-primary font-15" scope='col'>Họ tên</th>
                                    <th className="font-primary font-15" scope='col'>Email</th>
                                    <th className="font-primary font-15" scope='col'>Số điện thoại</th>
                                    <th className="font-primary font-15" scope='col'>Địa chỉ</th>
                                    <th className="font-primary font-15" scope='col'>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.map((u,i) => {
                                  return (
                                    <tr className='text-center'>
                                    <td className="font-primary font-15" scope='col'>{i + 1}</td>
                                    <td className="font-primary font-15" scope='col'>{u?.name}</td>
                                    <td className="font-primary font-15" scope='col'>{u?.email}</td>
                                    <td className="font-primary font-15" scope='col'>{u?.phone}</td>
                                    <td className="font-primary font-15" scope='col'>{u?.address}</td>
                                    <td className="font-primary font-15" scope='col'>
                                      <button className='action-btn error-btn' onClick={() => {
                                        handleDelete(u._id)
                                      }}>Xóa</button>
                                    </td>
                                </tr>
                                )})}
                            </tbody>
                        </table>
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

export default Users