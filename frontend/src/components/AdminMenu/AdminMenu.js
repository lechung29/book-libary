import React from 'react'
import {NavLink} from 'react-router-dom'
import './AdminMenu.css'
const AdminMenu = () => {
  return (
    <>
       <div className="admin-menu pb-4">
            <h2 className='admin-menu-title py-4 mb-3 text-center text-uppercase'>Quản lý</h2>
            <div className='admin-menu-list gap-20 d-flex flex-column align-items-center'>
                <NavLink to="/dashboard/admin/create-category" className="">
                    <button className='auth-btn menu-btn'>Thể loại</button>
                </NavLink>
                <NavLink to="/dashboard/admin/create-product" className="">
                    <button className='auth-btn menu-btn'>Sách</button>
                </NavLink>
                <NavLink to="/dashboard/admin/all-users" className="">
                    <button className='auth-btn menu-btn'>Người dùng</button>
                </NavLink>
                <NavLink to="/dashboard/admin/all-rents" className="">
                    <button className='auth-btn menu-btn'>Đơn thuê</button>
                </NavLink>
                <NavLink to="/dashboard/admin/profile" className="">
                    <button className='auth-btn menu-btn'>Thông tin</button>
                </NavLink>
            </div>
        </div>
    </>
  )
}

export default AdminMenu