import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import './BookDetail.css'
import {useCart} from "../../context/cart"
import { toast } from 'react-hot-toast'
const BookDetail = () => {
    const params = useParams()
    const [cart, setCart] = useCart()
    const [product, setProduct] = useState({})
    const navigate = useNavigate()

    //Lấy sản phẩm
    const getProduct = async () => {
        try {
            const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (params?.slug) getProduct()
    }, [params?.slug])
  return (
    <>
        <Layout title={"Chi tiết sản phẩm"}>
            <div className='detail-section px-5 pt-5 pb-4'>
                <div className='container-fluid'>
                    <div className='row d-flex justify-content-center mb-4 '>
                        <div className='col-6 d-flex home-border gap-10 pt-5 justify-content-center'>
                            <h3 className='home-title text-decoration-underline font-primary fw-bold text-uppercase text-success'>Thông tin</h3>
                            <h3 className='home-title font-primary fw-bold text-uppercase text-warning-emphasis'> chi tiết</h3>
                        </div>
                    </div>
                    <div className='row d-flex justify-content-center mt-5 mb-4'>
                        <div className='col-6 book-detail-content py-3 d-flex justify-content-center'>
                            <div className='col-6 text-center'>
                                <img src={`/api/v1/product/product-image/${product._id}`} className="" width={"90%"} height={"90%"} alt={product.name} />
                            </div>
                            <div className='col-6 py-3'>
                                <h3 className='font-primary fw-semibold text-uppercase mb-3'>{product.name}</h3>
                                <p className='font-primary font-14 opacity-8 mb-0 py-1'>Tác giả: {product.author}</p>
                                <p className='font-primary font-14 opacity-8 mb-1 py-1'>Mô tả sách: {product.description}</p>
                                <p className='font-primary font-14 opacity-8 mb-0 py-1'>Giá thuê: {product.price}VND</p>
                                <p className='font-primary font-14 opacity-8 mb-2 py-1'>Số lượng còn: {product.quantity}</p>
                                <div className='d-flex gap-10'>
                                    <button className='buy-btn col-5 py-2 px-2 transparent-bg' onClick={() => {
                                        setCart([...cart, product])
                                        localStorage.setItem('cart', JSON.stringify([...cart, product]))
                                        toast.success("Đã thêm vào giỏ sách của bạn!!!")
                                    }}>Thuê ngay</button>
                                    <button className='buy-btn py-2 col-5 px-3 transparent-bg' onClick={(e) => navigate('/')}>Trở về</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    </>
  )
}

export default BookDetail