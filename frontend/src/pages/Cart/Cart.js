import React from 'react'
import Layout from '../../components/Layout/Layout'
import {useAuth} from '../../context/auth'
import {useCart} from '../../context/cart'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import './Cart.css'
import { SlTrash } from "react-icons/sl"

const Cart = () => {
    const [auth, setAuth] = useAuth()
    const [cart, setCart] = useCart()
    const navigate = useNavigate()

    //Tổng giá thuê
    const totalPrice = () => {
        try {
            let total = 0
            cart?.map(item => {total = total + item.price});
            return total
        } catch (error) {
            console.log(error)
        }
    }
    //Xóa sách trong giỏ
    const removeCartItem = async (pid) => {
        try {
            let myCart = [...cart]
            let index = myCart.findIndex(item => item._id === pid)
            myCart.splice(index, 1)
            setCart(myCart)
            localStorage.setItem('cart', JSON.stringify(myCart))
        } catch (error) {
            console.log(error)
        }
    }

    //Xác nhận thuê
    const handleSubmit =  async () => {
        try {
            if (cart.length >= 1) {
                const {data} = await axios.post('/api/v1/product/payment', {cart})
                localStorage.removeItem('cart')
                setCart([])
                toast.success("Thuê sách thành công!")
                navigate('/dashboard/user/rents');
            } else (
                toast.error("Giỏ sách đang trống!!!")
            )
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
        <Layout title={"Giỏ sách của bạn"}>
            <div className='home-section px-5 pt-4 pb-5'>
                <div className='container-fluid'>
                    <div className='row d-flex justify-content-center mb-4'>
                        <div className='col-lg-6 col-md-9 col-sm-12 d-flex home-border gap-10 pt-5 justify-content-center'>
                            <h3 className='home-title text-decoration-underline font-primary fw-bold text-uppercase text-success'>Giỏ sách</h3>
                            <h3 className='home-title font-primary fw-bold text-uppercase text-warning-emphasis'> của tôi</h3>
                        </div>
                    </div>
                    <div className='row d-flex justify-content-center mb-4'>
                        <div className='col-6 d-flex justify-content-center'>
                            <h5 className='font-primary font-15 opacity-8'>{cart?.length > 0 ? `Bạn có ${cart.length} cuốn sách trong giỏ ${auth?.token ? "" : ". Vui lòng đăng nhập để thanh toán"}` : "Giỏ sách của bạn đang trống"}</h5>
                        </div>
                    </div>
                    <div className='row d-flex justify-content-center mb-2' style={{minHeight: '150px'}}>
                        <div className='col-6 d-flex flex-wrap justify-content-center'>
                            {
                                cart?.map(p => (
                                    <>
                                        <div key={p._id} className='d-flex flex-wrap gap-15 justify-content-center pb-5 cart-items' >
                                            <div className='col-xl-3 col-md-6 col-sm-12 text-center'>
                                                <img src={`/api/v1/product/product-image/${p._id}`} className="" width={"160px"} height={"250px"} alt={p.name} />
                                            </div>
                                            <div className='col-xl-6 col-md-6 col-sm-12  py-2'>
                                                <h3 className='font-primary fw-semibold text-sm-center text-uppercase mb-3'>{p.name}</h3>
                                                <p className='font-primary font-14 opacity-8 mb-0 py-1'>Tác giả: {p.author}</p>
                                                <p className='font-primary font-14 opacity-8 mb-1 py-1'>Mô tả sách: {p.description.substring(0,100)}...</p>
                                                <p className='font-primary font-14 opacity-8 mb-0 py-1'>Giá thuê: {p.price}VND</p>
                                            </div>
                                            <div className='col-xl-1 col-md-12 col-sm-12 pt-xl-5 mt-xl-4 d-flex justify-content-center'>
                                                <button className='remove-btn' onClick={() => removeCartItem(p._id)}>
                                                    <SlTrash />
                                                    <span className='remove-text'>Xóa</span>
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                ))
                            }
                        </div>
                    </div>
                    
                    <div className='row  d-flex justify-content-center'>
                        <div className='col-lg-6 col-md-9 col-sm-12 home-border d-flex justify-content-between py-3'>
                            <div className='col-6 text-start'>
                                <span className='font-primary font-16 fw-semibold'>Tổng cộng: {totalPrice()}VND</span>
                            </div>
                            <div className='col-6 text-end'>
                                {auth?.token ? (
                                    <button className='auth-btn' onClick={handleSubmit}>Xác nhận đặt thuê</button>
                                ) : (
                                    <button className='auth-btn' onClick={() => navigate('/login', {state: '/cart'})}>Vui lòng đăng nhập</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    </>
  )
}

export default Cart