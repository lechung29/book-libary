import React from 'react'
import Layout from '../../components/Layout/Layout'

const Policy = () => {
  return (
    <Layout title={"Chính sách và điều khoản"}>
        <div className='home-section px-5 pt-4 pb-5'>
            <div className='container-fluid'>
                <div className='row d-flex justify-content-center mb-4'>
                    <div className='col-lg-6 col-md-9 col-sm-12 d-md-flex home-border gap-10 pt-5 justify-content-center'>
                        <h4 className='home-title text-decoration-underline font-primary fw-bold text-uppercase text-success'>Chính sách &</h4>
                        <h4 className='home-title font-primary fw-bold text-uppercase text-warning-emphasis'>Điều khoản</h4>
                    </div>
                </div>
                <div className='row pt-5 d-flex justify-content-center mb-4'>
                    <div className='col-6 text-start'>
                        <h4 className='font-primary text-warning-emphasis fw-semibold'>Về dịch vụ cung cấp</h4>
                        <span className='font-primary mt-3'>Chúng tôi cung cấp cho người dùng những lựa chọn tốt nhất về những thể loại sách, cho thuê không giới hạn về số lượng sách
                        , với điều kiện mỗi sách chỉ thuê được một sản phẩm và không quá 30 ngày kể từ ngày thuê.</span>
                    </div>
                </div>
                <div className='row pt-2 d-flex justify-content-center mb-4'>
                    <div className='col-6 text-start'>
                        <h4 className='font-primary text-warning-emphasis fw-semibold'>Về hình thức thanh toán</h4>
                        <span className='font-primary mt-3'>Đối với mọi dịch vụ cho thuê của booklib, khách hàng đều phải thanh quán tại quầy thu ngân, 
                        chỉ khi thanh toán xong khách hàng mới thành lập được đơn thuê và mang sách đi.</span>
                    </div>
                </div>
                <div className='row pt-2 d-flex justify-content-center mb-4'>
                    <div className='col-6 text-start'>
                        <h4 className='font-primary text-warning-emphasis fw-semibold'>Về cam kết bảo mật thông tin của khách hàng</h4>
                        <span className='font-primary mt-3'>Thông tin của khách hàng được cam kết bảo mật tuyệt đối theo chính sách bảo vệ thông tin cá nhân. 
                        Việc thu thập và sử dụng thông tin của mỗi khách hàng chỉ được thực hiện khi có sự đồng ý của khách hàng đó , trừ trường hợp buộc phải
                        cung cấp khi Cơ quan chức năng yêu cầu. Không sử dụng, không chuyển giao, cung cấp hay tiết lộ cho bên thứ 3 nào về thông tin cá nhân 
                        của thành viên khi không có sự cho phép đồng ý từ thành viên.</span>
                    </div>
                </div>
                <div className='row pt-2 d-flex justify-content-center mb-4'>
                    <div className='col-6 text-start'>
                        <h4 className='font-primary text-warning-emphasis fw-semibold'>Về nghĩa vụ của khách hàng</h4>
                        <span className='font-primary mt-3'>Khách hàng có nghĩa vụ phải thanh toán khi thực hiện đơn thuê sách. Khách hàng cần phải thực hiện trao trả lại sách
                        cho thư viện trước hạn trả sách. Trong trường hợp khách hàng quá hạn trả sách 15 ngày theo quy định, khách hàng sẽ chịu mọi xử phạt theo quy định của booklib.</span>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Policy