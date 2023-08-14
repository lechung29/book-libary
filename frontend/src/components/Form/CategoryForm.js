import React from 'react'
import '../../pages/Admin/AdminDashboard.css'
import './CategoryForm.css'
const CategoryForm = ({handleSubmit, value, setValue}) => {
  return (
    <>
        <form className='mx-3 d-flex gap-10' onSubmit={handleSubmit}>
            <div className='form-box col-10'>
                <input type='text' className='form-control font-primary'
                value={value}
                onChange={(e) => setValue(e.target.value)}
                />
                <label className='font-primary'>Tên thể loại</label>
            </div>
            <button type='submit' className='col-2 mt-3 mb-2 btn btn-success font-primary'>Enter</button>
        </form>
        
    </>
  )
}

export default CategoryForm