import React from 'react'
import '../Admin/AdminDashboard.css'
import UserMenu from '../../components/UserMenu/UserMenu'
import { useAuth } from '../../context/auth'
import Layout from '../../components/Layout/Layout'

const Profile = () => {
    const [auth] = useAuth()
    return (
    <Layout title={"Quản lý đơn thuê"}>
        <div className='dashboard-section px-5 pt-2'>
          <div className='container-fluid pt-4'>
            <div className='row d-flex justify-content-center'>
              <div className='col-4 d-flex justify-content-center'>
                <UserMenu />
              </div>
              <div className='col-8 d-flex justify-content-center'>
                <div className='admin-content'>
                  <h2 className='admin-content-title py-4 text-center text-uppercase'>Quản lý đơn thuê</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Profile