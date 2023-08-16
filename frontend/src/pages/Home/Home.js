import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import {useAuth} from '../../context/auth'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import './Home.css'
import {Checkbox , Radio} from 'antd'



const Home = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState([])
  const [categories, setCategories] = useState([])
  const [check, setCheck] = useState([])
  const [total, setTotal] = useState(0)
  const [page,setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [updatedProduct, setUpdatedProduct] = useState([])

  //Lấy số sản phẩm
  const getTotal = async() => {
      try {
        const {data} = await axios.get('/api/v1/product/product-count')
        setTotal(data?.total)
      } catch (error) {
        console.log(error)
      }
    }
  //Lấy tất cả thể loại sách
  const getAllCategory = async () => {
    try {
      const {data} = await axios.get("/api/v1/category/get-category")
      if (data?.success) {
        setCategories(data?.category)
      }
    } catch (error) {
      console.log(error)
      toast.error("Có lỗi xảy ra khi lấy thể loại sách!")
    }
  }

  useEffect(() => {
    getAllCategory()
    getTotal()
  }, [])

  //Lấy tất cả sản phẩm
  const getAllProducts = async () => {
    try {
      setLoading(true)
      const {data} = await axios.get(`/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProduct(data.products)
      setProducts(data.products)
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error("Có lỗi xảy ra!")
    }
  }
  //Lấy sản phẩm mới cập nhật
  const getUpdatedProducts = async () => {
    try {
      const {data} = await axios.get('/api/v1/product/updated-product-list')
      setUpdatedProduct(data.products)
    } catch (error) {
      console.log(error)
      toast.error("Có lỗi xảy ra!")
    }
  }

  useEffect(() => {
    getAllProducts()
    getUpdatedProducts()
  }, [])

  //Xử lý tải trang
  const loadMore = async () => {
      try {
        setLoading(true)
        const {data} = await axios.get(`/api/v1/product/product-list/${page}`)
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

  // Xử lý lọc 
  const handleFilter = (value, id) => {
    let all = [...check]
    if (value) {
      all.push(id)
    } else {
      all = all.filter(c => c!== id )
    }
    setCheck(all)
  };

   const filterProduct = async () => {
    try {
      const {data} = await axios.post('/api/v1/product/product-filter', {check})
      setProduct(data?.products)
    } catch (error) {
      console.log(error)
    }
  }

    useEffect(() => {
    if(!check.length) getAllProducts()
    }, [check.length])

  useEffect(() => {
    if(check.length) filterProduct()
  }, [check])
  return (
    <Layout title={"Trang chủ"}>
        <div className='home-section px-5 pt-4 pb-5'>
          <div className='container-fluid'>
            <div className='row d-flex justify-content-center mb-4 '>
              <div className='col-6 d-flex home-border gap-10 pt-5 justify-content-center'>
                <h3 className='home-title text-decoration-underline font-primary fw-bold text-uppercase text-success'>Tất cả</h3>
                <h3 className='home-title font-primary fw-bold text-uppercase text-warning-emphasis'> sách</h3>
              </div>
            </div>
            <div className='row d-flex justify-content-center mb-4'>
              <div className='col-6 d-flex gap-10 flex-wrap justify-content-center'>
                {categories?.map(c => 
                  <Checkbox key={c._id} className='font-primary filter-checkbox' onChange={(e) => handleFilter(e.target.checked, c._id)}>
                    {c.name}
                  </Checkbox>
                )}
              </div>
            </div>
            <div className='row d-flex justify-content-center'>
              <div className='col-10 d-flex flex-wrap justify-content-start'>
                {product?.map(p => (
                  <Link key={p._id} to={`/product/${p.slug}`} className="col-3 mb-4 d-flex justify-content-center text-decoration-none text-black">
                      <div className="book-card" style={{width: '200px'}} key={p._id}>
                          <div className="book-card-body">
                              <h6 className="font-primary text-black mb-0 pt-5 pb-2">{p.name}</h6>
                              <p className='font-primary font-13 opacity-8 pb-3'>{p.author}</p>
                              <p className='font-primary font-13 mb-1 opacity-8 pt-1 pb-3'>Giá: {p.price}VND</p>
                              <button className='buy-btn'>Chi tiết</button>
                          </div>
                          <div className='book-card-img'>
                            <img src={`/api/v1/product/product-image/${p._id}`} className="" width={"200px"} height={"250px"} alt={p.name} />
                          </div>
                      </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className='row my-5 d-flex gap-20 justify-content-center'>
              {products && products.length < total && (
                <button className='auth-btn col-1' onClick={(e) => {
                  e.preventDefault()
                  setPage(page+1)
                }}>
                  {loading ? "Đang tải ..." : "Trang sau"}
                </button>
              )}
            </div>
            <div className='row d-flex justify-content-center mt-5 mb-5 '>
              <div className='col-6 d-flex home-border gap-10 pt-5 justify-content-center'>
                <h3 className='home-title text-decoration-underline font-primary fw-bold text-uppercase text-success'>Cập nhật</h3>
                <h3 className='home-title font-primary fw-bold text-uppercase text-warning-emphasis'> gần đây</h3>
              </div>
            </div>
            <div className='row d-flex justify-content-center'>
              <div className='col-10 d-flex flex-wrap justify-content-start'>
                {updatedProduct?.map(p => (
                  <Link key={p._id} to={`/product/${p.slug}`} className="col-3 mb-5 text-decoration-none d-flex justify-content-center text-black">
                      <div className="book-card" style={{width: '200px'}} key={p._id}>
                          <div className="book-card-body">
                              <h6 className="font-primary text-black mb-0 pt-5 pb-2">{p.name}</h6>
                              <p className='font-primary font-13 opacity-8 pb-3'>{p.author}</p>
                              <p className='font-primary font-13 mb-1 opacity-8 pt-1 pb-3'>Giá: {p.price}VND</p>
                              <button className='buy-btn'>Chi tiết</button>
                          </div>
                          <div className='book-card-img'>
                            <img src={`/api/v1/product/product-image/${p._id}`} className="" width={"200px"} height={"250px"} alt={p.name} />
                          </div>
                      </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Home