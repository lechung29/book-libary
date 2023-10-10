import React, {useEffect, useState} from 'react'
import '../Admin/AdminDashboard.css'
import UserMenu from '../../components/UserMenu/UserMenu'
import { useAuth } from '../../context/auth'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import moment from 'moment'

const Rent = () => {
    const [orders, setOrders] = useState([])
    const [auth, setAuth] = useAuth();
    const getOrders =  async () => {
        try {
            const {data} = await axios.get('/api/v1/auth/orders')
            setOrders(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (auth?.token) getOrders()
    }, [auth?.token])
    return (
    <Layout title={"Quản lý đơn thuê"}>
        <div className='dashboard-section px-5 pt-2'>
          <div className='container-fluid pt-4'>
            <div className='row d-flex justify-content-center'>
              <div className='col-11 pt-5 justify-content-center home-border d-flex'></div>
            </div>
            <div className='row d-flex justify-content-center'>
              <div className='col-xl-4 col-sm-12 mb-5 d-flex justify-content-center'>
                <UserMenu />
              </div>
              <div className='col-xl-8 col-sm-12 mb-5 d-flex justify-content-center'>
                <div className='admin-content-sub'>
                  <h2 className='admin-content-title py-4 text-center text-uppercase'>Quản lý đơn thuê</h2>
                  <div className='admin-content-body py-3 px-3 text-start'>
                    {
                        orders?.map((o, i) => {
                            return (
                                <div className='border'>
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th className="font-primary font-15" scope='col'>STT</th>
                                                <th className="font-primary font-15" scope='col'>Trạng thái</th>
                                                <th className="font-primary font-15" scope='col'>Số lượng</th>
                                                <th className="font-primary font-15" scope='col'>Tổng cộng</th>
                                                <th className="font-primary font-15" scope='col'>Ngày thuê</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="font-primary font-15">{i + 1}</td>
                                                <td className="font-primary font-15">{o?.status}</td>
                                                <td className="font-primary font-15">{o?.products?.length}</td>
                                                <td className="font-primary font-15">{o?.totals}VND</td>
                                                <td className="font-primary font-15">{moment(o?.creatAt).from()}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className='container'>
                                        { o?.products?.map((p, i) => (
                                            <div className='d-flex gap-15 flex-row mb-3' key={p._id}>
                                                <div className='product-img'>
                                                    <img 
                                                        src={`/api/v1/product/product-image/${p._id}`} 
                                                        width={"140px"} height={"180px"}
                                                        alt={p.name} 
                                                    />
                                                </div>
                                                <div className='product-infor'>
                                                    <h4 className='text-danger font-primary text-uppercase'>{p.name}</h4>
                                                    <h6 className='font-primary font-14'>Giá: {p.price}VND</h6>
                                                    <p className='font-13 font-primary'>{p.description}...</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        })
                      }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Rent