import React, {useState, useEffect} from 'react'
import './AdminDashboard.css'
import AdminMenu from '../../components/AdminMenu/AdminMenu'
import { useAuth } from '../../context/auth'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import {Select} from 'antd'
import { Link, useNavigate } from 'react-router-dom'


const AllProducts = () => {
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState([])
  const [total, setTotal] = useState(0)
  const [page,setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  // Lấy số sản phẩm
  const getTotal = async() => {
      try {
        const {data} = await axios.get('/api/v1/product/product-count')
        setTotal(data?.total)
      } catch (error) {
        console.log(error)
      }
    }
  useEffect(() => {
    getTotal()
  }, [])

  //Lấy tất cả sản phẩm
  const getAllProducts = async () => {
    try {
      setLoading(true)
      const {data} = await axios.get(`/api/v1/product/get-product/${page}`)
      setLoading(false)
      setProduct(data.products)
      setProducts(data.products)
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error("Có lỗi xảy ra!")
    }
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  //Xử lý tải trang
  const loadMore = async () => {
      try {
        setLoading(true)
        const {data} = await axios.get(`/api/v1/product/get-product/${page}`)
        setLoading(false)
        setProducts([...products,...data?.products])
        setProduct([...data?.products])
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }

     useEffect(() => {
    if (page === 1) return;
    loadMore()
  }, [page])

  useEffect(() => {
    getAllProducts()
  }, [])
  return (
    <>
      <Layout title={"Tất cả sản phẩm"}>
        <div className='dashboard-section px-5 pt-2 pb-5'>
          <div className='container-fluid pt-4'>
            <div className='row d-flex justify-content-center'>
              <div className='col-10 pt-5 justify-content-center home-border d-flex'></div>
            </div>
            <div className='row d-flex justify-content-center'>
              <div className='col-4 d-flex justify-content-center'>
                <AdminMenu />
              </div>
              <div className='col-8 d-flex justify-content-center'>
                <div className='admin-content-sub-2'>
                  <h2 className='admin-content-title py-4 text-center text-uppercase'>Quản lý sách</h2>
                  <div className='admin-content-manage py-2 px-3 d-flex flex-wrap gap-10'>
                    {product?.map(p => (
                        <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className="text-decoration-none text-black">
                            <div className="book-card-sub-2 d-flex gap-10" style={{width: '18rem'}} key={p._id}>
                                <img src={`/api/v1/product/product-image/${p._id}`} className="" alt={p.name} />
                                <div className="book-card-body-sub w-100 pt-2 text-start">
                                    <h6 className="font-primary text-black mb-0 py-1 h-50">{p.name}</h6>
                                    <p className='font-primary font-13 mb-0 opacity-8 '>{p.author}</p>
                                    <p className='font-primary font-13 mb-0 opacity-8'>Giá thuê: {p.price}VND</p>
                                    <p className='font-primary font-13 mb-0 opacity-8'>Số lượng: {p.quantity}</p>
                                </div>
                            </div>
                        </Link>
                      ))}
                  </div>
                  <div className='row my-5 d-flex gap-20 justify-content-center'>
                    {products && products.length < total && (
                      <button className='auth-btn col-2' onClick={(e) => {
                        e.preventDefault()
                        setPage(page+1)
                      }}>
                        {loading ? "Đang tải ..." : "Trang sau"}
                      </button>
                    )}
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

export default AllProducts