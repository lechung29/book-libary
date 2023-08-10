import React from 'react'
import Layout from '../../components/Layout/Layout'
import './AdminDashboard.css'
import AdminMenu from '../../components/AdminMenu/AdminMenu'
import { useAuth } from '../../context/auth'
const AdminDashboard = () => {
  const [auth] = useAuth()
  return (
    <Layout title={"Cài đặt Admin"}>
        <div className='dashboard-section px-5 pt-2'>
          <div className='container-fluid pt-4'>
            <div className='row d-flex justify-content-center'>
              <div className='col-4 d-flex justify-content-center'>
                <AdminMenu />
              </div>
              <div className='col-8 d-flex justify-content-center'>
                <div className='admin-content'>
                  <h2 className='admin-content-title py-4 text-center text-uppercase'>{auth?.user?.role === 1 ? "admin" : "user" }</h2>
                  <div className='admin-content-body py-3 px-3 text-start'>
                    <h4 className='admin-content-item gap-30 d-flex'>
                      <span className='col-4 text-end'>Tên người dùng:</span>
                      <span className='col-8'>{auth?.user?.name}</span>
                    </h4>
                    <h4 className='admin-content-item gap-30 d-flex'>
                      <span className='col-4 text-end'>Số điện thoại:</span>
                      <span className='col-8'>{auth?.user?.phone}</span>
                    </h4>
                    <h4 className='admin-content-item gap-30 d-flex'>
                      <span className='col-4 text-end'>Địa chỉ:</span>
                      <span className='col-8'>{auth?.user?.address}</span>
                    </h4>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default AdminDashboard