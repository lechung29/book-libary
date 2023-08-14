import React from 'react'
import {NavLink} from 'react-router-dom'
import '../AdminMenu/AdminMenu.css'
const AdminMenu = () => {
  return (
    <>
       <div className="admin-menu pb-4">
            <h2 className='admin-menu-title py-4 mb-3 text-center text-uppercase'>Quản lý</h2>
            <div className='admin-menu-list gap-20 d-flex flex-column align-items-center'>
                <NavLink to="/dashboard/user/profile" className="">
                    <button className='auth-btn menu-btn'>Thông tin</button>
                </NavLink>
                <NavLink to="/dashboard/user/rents" className="">
                    <button className='auth-btn menu-btn'>Đơn thuê</button>
                </NavLink>
            </div>
        </div>
    </>
  )
}

export default AdminMenu