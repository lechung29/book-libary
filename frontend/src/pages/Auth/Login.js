import React, {useState} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import toast from 'react-hot-toast';
import './Auth.css'
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import '../../App.css'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

     //form action
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("/api/v1/auth/login",{email, password})
            if (res && res.data.success) {
                toast.success(res.data && res.data.message)
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                })
                localStorage.setItem('auth', JSON.stringify(res.data))
                navigate(location.state || '/')
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
    <Layout title={"Đăng nhập"}>
        <div className='login-section position-relative px-5 py-4'>
            <div className='login-form'>
                <h1 className='login-title pb-4'>Đăng nhập</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 user-box">
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} name="" required/>
                        <label>Email</label>
                    </div>
                    <div className="mb-3 user-box">
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="" required/>
                        <label>Mật khẩu</label>
                    </div>
                    <div className='mb-3'>
                        <button type="button" className="btn" onClick={() => {navigate('/forgot-password')}}>
                            Quên mật khẩu?
                            <div class="arrow-wrapper">
                                <div class="arrow"></div>
                            </div>
                        </button>
                    </div>
                    <button type="submit" className="auth-button">
                        Đăng nhập
                        <div class="arrow-wrapper">
                            <div class="arrow"></div>
                        </div>
                    </button>
                </form>
            </div>
        </div>
    </Layout>
  )
}

export default Login