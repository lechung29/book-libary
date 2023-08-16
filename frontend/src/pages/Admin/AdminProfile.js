import React, {useState, useEffect} from 'react'
import '../Admin/AdminDashboard.css'
import { useAuth } from '../../context/auth'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import Layout from '../../components/Layout/Layout'
import  '../Auth/Auth.css'
import AdminMenu from '../../components/AdminMenu/AdminMenu'

const Profile = () => {
    const [auth, setAuth] = useAuth()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [password, setPassword] = useState('')

    //Lấy thông tin người dùng
    useEffect(() => {
        const {email, name, phone, address} = auth.user
        setName(name)
        setPhone(phone)
        setEmail(email)
        setAddress(address)
    }, [auth?.user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.put('/api/v1/auth/profile', 
            {name, email, password, phone, address}
            );
            if (data?.error) {
                toast.error(data?.error)
            } else {
                setAuth({...auth, user: data?.updateUser})
                let ls = localStorage.getItem("auth")
                ls = JSON.parse(ls)
                ls.user = data.updateUser
                localStorage.setItem('auth', JSON.stringify(ls))
                toast.success("Cập nhật thông tin thành công!!!")
            }
        } catch (error) {
            toast.error('Something went wrong')
        }
      }
    return (
    <Layout title={"Cập nhật thông tin"}>
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
                  <h2 className='admin-content-title py-4 text-center text-uppercase'>Quản lý đơn thuê</h2>
                  <div className='admin-content-body p-3'>
                    <div className='update-form'>
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
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="" required/>
                                <label>Mật khẩu</label>
                            </div>
                            <div className='mt-3 d-flex justify-content-center gap-20 align-items-center'>
                                <button className='auth-btn'>Cập nhật</button>
                            </div>
                        </form>
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

export default Profile