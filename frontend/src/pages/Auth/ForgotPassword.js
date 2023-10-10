import React, {useState} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import toast from 'react-hot-toast';
import './Auth.css'
import { useNavigate } from 'react-router-dom';


const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [answer, setAnswer] = useState("")

    const navigate = useNavigate()

     //form action
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("/api/v1/auth/forgot-password",{email, newPassword, answer})
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
        <Layout title={"Quên mật khẩu"}>
            <div className='forgot-section position-relative px-5 py-4'>
                <div className='forgot-form col-sm-12 col-md-6 col-lg-4' style={{minHeight : '400px', minWidth: '420px'}}>
                    <h1 className='forgot-title pb-4'>Đặt mật khẩu</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 user-box">
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} name="" required/>
                            <label>Email</label>
                        </div>
                        <div className="mb-3 user-box">
                            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} name="" required/>
                            <label>Mật khẩu</label>
                        </div>
                        <div className="mb-4 user-box">
                            <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} name="" required/>
                            <label>Nhập thể loại sách mà bạn yêu thích</label>
                        </div>
                        <button type="submit" className="auth-button">
                            Đặt lại mật khẩu
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

export default ForgotPassword