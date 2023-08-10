import React, {useEffect, useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Spinner = ({path = 'login'}) => {
  const [count,setCount] = useState(5)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((preValue) => preValue - 1)
    }, 1000)
    count === 0 && navigate(`${path}`, {
      state: location.pathname
    })
    return () => clearInterval(interval)
  }, [count, navigate, location, path]) 
  return (
    <>
        <div className='d-flex flex-column justify-content-center align-items-center' style={{height: '100vh'}}>
            <h1 className='text-center pb-2 font-monospace'>Chuyển hướng trong {count} giây</h1>
            <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    </>
  )
}

export default Spinner