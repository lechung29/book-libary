import React from 'react'
import { CiSearch } from "react-icons/ci";
import {useSearch} from "../../context/search"
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import './SearchForm.css'

const SearchForm = () => {
    const [values, setValues] = useSearch()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const {data} = await axios.get(`/api/v1/product/search/${values.keywords}`)
            setValues({...values, results: data})
            navigate('/search')
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
        <form style={{minWidth: '300px'}} className='search-form' role='search' onSubmit={handleSubmit}>
            <input 
                className='search__input font-primary font-13'
                type='search'
                placeholder='Tìm sách tại đây...'
                onChange={(e) => setValues({...values, keywords: e.target.value})}
            />
            <button className='search__button'>
                <CiSearch className='search__icon fs-5'/>
            </button>
        </form>
    </>
  )
}

export default SearchForm