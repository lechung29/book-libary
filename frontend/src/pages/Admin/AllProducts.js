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

  const getAllProducts = async () => {
    try {
      const {data} = await axios.get('/api/v1/product/get-product')
      setProducts(data.products)
    } catch (error) {
      console.log(error)
      toast.error("Có lỗi xảy ra!")
    }
  }


  useEffect(() => {
    getAllProducts()
  }, [])
  return (
    <>
      <Layout title={"Tất cả sản phẩm"}>
        <div className='dashboard-section px-5 pt-2 pb-5'>
          <div className='container-fluid pt-4'>
            <div className='row d-flex justify-content-center'>
              <div className='col-4 d-flex justify-content-center'>
                <AdminMenu />
              </div>
              <div className='col-8 d-flex justify-content-center'>
                <div className='admin-content-sub'>
                  <h2 className='admin-content-title py-4 text-center text-uppercase'>Quản lý sách</h2>
                  <div className='admin-content-manage py-2 px-3 d-flex flex-wrap gap-10'>
                    {products?.map(p => (
                        <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className="text-decoration-none text-black">
                            <div className="book-card d-flex gap-20" style={{width: '18rem'}} key={p._id}>
                                <img src={`/api/v1/product/product-image/${p._id}`} className="" width={"100px"} height={"125px"} alt={p.name} />
                                <div className="book-card-body w-100 pt-2 text-start">
                                    <h6 className="font-primary text-black mb-0 py-1">{p.name}</h6>
                                    <p className='font-primary font-13 mb-0 opacity-8 py-1 mb-2'>{p.author}</p>
                                    <p className='font-primary font-13 mb-0 opacity-8 py-1'>Giá thuê: {p.price}</p>
                                    <p className='font-primary font-13 mb-0 opacity-8 py-1'>Số lượng: {p.quantity}</p>
                                </div>
                            </div>
                        </Link>
                      ))}
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