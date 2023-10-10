import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import './Auth.css'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [answer, setAnswer] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    //form action
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("/api/v1/auth/register",{name, email, password, phone, address, answer})
            if (res && res.data.success) {
                toast.success(res.data && res.data.message)
                navigate('/login')
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            setTimeout(() => {
                toast.error("Có lỗi xảy ra!")
            })
        }
    }
    console.log(process.env.REACT_API)
  return (
    <>
        <Layout title={"Đăng ký tài khoản"}>
            <div className='register-section position-relative px-5 py-4'>
                <div className='register-form col-sm-12 col-md-6 col-lg-4' style={{minHeight : '400px', minWidth: '420px'}}>
                    <h1 className='register-title pb-4'>Đăng ký</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 user-box">
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="" required/>
                            <label>Họ và tên</label>
                        </div>
                        <div className="mb-3 user-box">
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} name="" required/>
                            <label>Email</label>
                        </div>
                        <div className="mb-3 user-box">
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} name="" required/>
                            <label>Số điện thoại</label>
                        </div>
                        <div className="mb-3 user-box">
                            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} name="" required/>
                            <label>Địa chỉ</label>
                        </div>
                        <div className="mb-3 user-box">
                            <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} name="" required/>
                            <label>Thể loại sách mà bạn yêu thích nhất?</label>
                        </div>
                        <div className="mb-3 user-box">
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="" required/>
                            <label>Mật khẩu</label>
                        </div>
                        <button type="submit" className="auth-button mt-2">
                            Đăng ký
                            <div class="arrow-wrapper">
                                <div class="arrow"></div>
                            </div>
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    </>
  )
}

export default Register