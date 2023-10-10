import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import './Search.css'
import { useSearch } from '../../context/search'
import { useCart } from '../../context/cart'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const Search = () => {
    const [values, setValues] = useSearch()
    const [cart, setCart] = useCart()
  return (
    <>
        <Layout title={"Tìm kiếm sách"}>
            <div className='search-section px-5 pt-4 pb-5'>
                <div className='container-fluid'>
                    <div className='row d-flex justify-content-center mb-4'>
                        <div className='col-lg-6 col-md-9 col-sm-12 home-border d-md-flex gap-10 pt-5 justify-content-center'>
                            <h4 className='font-sub fw-bold text-uppercase text-success text-decoration-underline'>Kết quả</h4>
                            <h4 className='font-sub fw-bold text-uppercase text-warning-emphasis'>tìm kiếm</h4>
                        </div>
                    </div>
                    <div className='row d-flex justify-content-center mb-5'>
                        <div className='col-6 d-flex justify-content-center'>
                            <h6 className='font-primary '>{values?.results.length < 1 ? "Không tìm thấy bất kỳ sách nào trong thư viện!!!" : `Đã tìm thấy ${values?.results.length} sách trong thư viện!!!`}</h6>
                        </div>
                    </div>
                    <div className='row d-flex justify-content-center'>
                        <div className='col-10 d-flex flex-wrap justify-content-start'>
                            {values?.results.map(p => (
                            <div key={p._id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4 d-flex justify-content-center text-decoration-none text-black">
                                <div className="book-card" style={{minWidth: '200px', maxWidth: '200px'}} key={p._id}>
                                    <div className="book-card-body">
                                        <div className='h-75 text-start'>
                                          <h6 className="font-primary text-black mb-0 pt-5 pb-4">{p.name}</h6>
                                          <p className='font-primary font-13 opacity-8 pb-3 mb-0'>{p.author}</p>
                                          <p className='font-primary font-13 opacity-8 pb-3 mb-0'>Số lượng còn: {p.quantity}</p>
                                          <p className='font-primary font-13 opacity-8 pb-3 mb-0'>Giá: {p.price}VND</p>
                                        </div>
                                        <div className='h-25 d-flex align-items-center justify-content-center'>
                                            <button className='buy-btn' onClick={() => {
                                                if (p.quantity === 0) {
                                                    toast.error("Hết sách mất rồi!!")
                                                } else if (cart.includes(p)) {
                                                        toast.error("Có sách này trong giỏ rồi!")
                                                } 
                                                else {
                                                    setCart([...cart, p])
                                                    localStorage.setItem('cart', JSON.stringify([...cart, p]))
                                                    toast.success("Đã thêm vào giỏ sách của bạn!!!")
                                                }}
                                            }>Thuê ngay</button>
                                        </div>
                                    </div>
                                    <div className='book-card-img'>
                                        <img src={`/api/v1/product/product-image/${p._id}`} className="" width={"200px"} height={"250px"} alt={p.name} />
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    </>
  )
}

export default Search