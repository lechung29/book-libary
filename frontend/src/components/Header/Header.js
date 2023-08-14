import React, {useEffect} from 'react'
import './Header.css'
import '../../App.css'
import {Link, NavLink} from 'react-router-dom'
import { BsBook } from "react-icons/bs";
import { MdOutlinePolicy } from "react-icons/md";
import { BsBag } from "react-icons/bs";
import { FiSettings} from "react-icons/fi";
import {useAuth} from '../../context/auth'
import toast from 'react-hot-toast'
import SearchForm from '../Form/SearchForm';
const Header = () => {
  const [auth, setAuth] = useAuth()
  
  const handleLogout = () => {
    setAuth({
      ...auth, 
      user:null,
      token: ''
    })
    localStorage.removeItem('auth')
    toast.success("Đăng xuất thành công!")
  }
  return (
    <>
      <div className='header-top px-5 py-3'>
        <div className='container-fluid pt-2'>
          <div className='row d-flex align-items-center justify-content-between'>
            <Link to="/"className='text-decoration-none logo-brand col-3 text-center'>
              <span className='logo-text text-success text-decoration-underline'>book</span>
              <span className='logo-text text-warning-emphasis'>lib</span>
            </Link>
            <div className='col-6 gap-30 d-flex justify-content-center align-items-center'>
              <NavLink className="list-page-item text-uppercase text-decoration-none text-black" to="/"><BsBook className='mx-1'/> Trang chủ</NavLink>
              <NavLink className="list-page-item text-uppercase text-decoration-none text-black" to="/about"><MdOutlinePolicy className='mx-1'/> Chính sách & Điều khoản</NavLink>
            </div>
            <div className='col-3 gap-20 d-flex justify-content-end align-items-center'>
              <Link to='' className='text-decoration-none'><button className='auth-btn d-flex align-items-center justify-content-betwwee text-decoration-none'><BsBag className='mx-1'/><span>Giỏ</span></button></Link>
              {
                !auth.user ? (
                  <>
                    <Link to='/login'><button className='auth-btn'>Đăng nhập</button></Link>
                    <Link to='/register'><button className='auth-btn'>Đăng ký</button></Link>
                  </>
                ) : (
                  <>
                    <Link to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className='text-decoration-none'><button className='auth-btn d-flex align-items-center justify-content-betwwee text-decoration-none'><FiSettings className='mx-1'/><span>Quản lý</span></button></Link>
                    <Link to='/login' onClick={handleLogout}><button className='auth-btn'>Đăng xuất</button></Link>
                  </>
                )
              }
            </div>
          </div>
        </div>
      </div>
      <div className='header-bottom px-5 pt-1 pb-4'>
        <div className='container-fluid'>
          <div className='row d-flex justify-content-center align-items-center'>
            <div className='col-12 text-center'>
              <div className='search-title'>Mới & Thịnh hành</div>
              <p className='search-quote py-2'>Khám phá thế giới mới từ những cuốn sách</p>
            </div>
          <div className='row d-flex justify-content-center'>
            <SearchForm />
          </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header