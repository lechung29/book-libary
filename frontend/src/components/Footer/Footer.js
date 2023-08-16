import React from 'react'
import '../../App.css'
import './Footer.css'

const Footer = () => {
  return (
    <>
      <div className='footer px-5 py-3'>
        <div className='container-fluid pt-5'>
          <div className='row pt-3 d-flex align-items-center justify-content-center'>
            <div className='col-6 home-border text-center'>
              <p className='text-warning-emphasis font-primary mt-4'>
                Copyright &copy; { new Date().getFullYear()}: Powered by Lê Kim Quốc Chung
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer