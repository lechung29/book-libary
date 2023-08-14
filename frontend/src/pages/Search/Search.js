import React from 'react'
import Layout from '../../components/Layout/Layout'
import './Search.css'
import { useSearch } from '../../context/search'
import { Link } from 'react-router-dom'

const Search = () => {
    const [values, setValues] = useSearch()
  return (
    <>
        <Layout title={"Tìm kiếm sách"}>
            <div className='search-section px-5 pt-4 pb-5'>
                <div className='container-fluid'>
                    <div className='row d-flex justify-content-center mb-4'>
                        <div className='col-6 home-border d-flex gap-10 pt-5 justify-content-center'>
                            <h3 className='font-sub fw-bold text-uppercase text-success text-decoration-underline'>Kết quả</h3>
                            <h3 className='font-sub fw-bold text-uppercase text-warning-emphasis'>tìm kiếm</h3>
                        </div>
                    </div>
                    <div className='row d-flex justify-content-center mb-5'>
                        <div className='col-6 d-flex justify-content-center'>
                            <h6 className='font-primary '>{values?.results.length < 1 ? "Không tìm thấy bất kỳ sách nào trong thư viện!!!" : `Đã tìm thấy ${values?.results.length} sách trong thư viện!!!`}</h6>
                        </div>
                    </div>
                    <div className='row d-flex justify-content-center'>
                        <div className='col-10 d-flex flex-wrap justify-content-start'>
                            {values?.results.map((p) => (
                            <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className="col-3 d-flex justify-content-center text-decoration-none text-black">
                                <div className="book-card" style={{width: '200px'}} key={p._id}>
                                    <div className="book-card-body">
                                        <h6 className="font-primary text-black mb-0 pt-5 pb-2">{p.name}</h6>
                                        <p className='font-primary font-13 opacity-8 pb-3'>{p.author}</p>
                                        <p className='font-primary font-13 mb-1 opacity-8 pt-1 pb-3'>Giá: {p.price}VND</p>
                                        <button className='buy-btn'>Thuê ngay</button>
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
    </>
  )
}

export default Search