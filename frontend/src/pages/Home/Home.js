import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import {useAuth} from '../../context/auth'
import { useCart } from '../../context/cart'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import './Home.css'
import {Checkbox , Radio} from 'antd'



const Home = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart()
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState([])
  const [p1, setP1] = useState([])
  const [p2, setP2] = useState([])
  const [categories, setCategories] = useState([])
  const [check, setCheck] = useState([])
  const [total, setTotal] = useState(0)
  const [page,setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [updatedProduct, setUpdatedProduct] = useState([])
  const navigate = useNavigate()

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
              <div className='col-lg-6 col-md-9 col-sm-12 d-flex home-border gap-10 pt-5 justify-content-center'>
                <h4 className='home-title text-decoration-underline font-primary fw-bold text-uppercase text-success'>Tất cả</h4>
                <h4 className='home-title font-primary fw-bold text-uppercase text-warning-emphasis'> sách</h4>
              </div>
            </div>
            <div className='row d-flex justify-content-center mb-4'>
              <div className='col-6 d-flex gap-10 flex-wrap justify-content-start'>
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
                  <div key={p._id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4 d-flex justify-content-center text-decoration-none text-black">
                      <div className="book-card" style={{minWidth: '200px', maxWidth: '200px'}}>
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
                                  } else {
                                    setP1([...p1, p._id])
                                    if (p2.includes(p._id) || cart.includes(p)) {
                                    toast.error("Có sách này trong giỏ rồi!")
                                    console.log(p1)
                                    } 
                                    else {
                                      setCart([...cart, p])
                                      localStorage.setItem('cart', JSON.stringify([...cart, p]))
                                      toast.success("Đã thêm vào giỏ sách của bạn!!!")
                                    }
                                  }
                                }}>Thuê ngay</button>
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
              <div className='col-lg-6 col-md-9 col-sm-12 d-flex home-border gap-10 pt-5 justify-content-center'>
                <h4 className='home-title text-decoration-underline font-primary fw-bold text-uppercase text-success'>Cập nhật</h4>
                <h4 className='home-title font-primary fw-bold text-uppercase text-warning-emphasis'> gần đây</h4>
              </div>
            </div>
            <div className='row d-flex justify-content-center'>
              <div className='col-10 d-flex flex-wrap justify-content-start'>
                {updatedProduct?.map(up => (
                  <div key={up._id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-5 text-decoration-none d-flex justify-content-center text-black">
                      <div className="book-card" style={{minWidth: '200px', maxWidth: '200px'}} key={up._id}>
                          <div className="book-card-body">
                              <div className='h-75 text-start'>
                                <h6 className="font-primary text-black mb-0 pt-5 pb-2">{up.name}</h6>
                                <p className='font-primary font-13 opacity-8 pb-3'>{up.author}</p>
                                <p className='font-primary font-13 mb-1 opacity-8 pt-1 pb-3'>Giá: {up.price}VND</p>
                              </div>
                              <div className='h-25 d-flex align-items-center justify-content-center'>
                                <button className='buy-btn' onClick={() => {
                                  if (up.quantity === 0) {
                                    toast.error("Hết sách mất rồi!!")
                                  } else {
                                      setP2([...p2, up._id])
                                      if (p1.includes(up._id) || cart.includes(up)) {
                                      toast.error("Có sách này trong giỏ rồi!")
                                      console.log(p2)
                                    } 
                                    else {
                                      setCart([...cart, up])
                                      localStorage.setItem('cart', JSON.stringify([...cart, up]))
                                      toast.success("Đã thêm vào giỏ sách của bạn!!!")
                                    }
                                  }
                                }}>Thuê ngay</button>
                              </div>
                          </div>
                          <div className='book-card-img'>
                            <img src={`/api/v1/product/product-image/${up._id}`} className="" width={"200px"} height={"250px"} alt={up.name} />
                          </div>
                      </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Home