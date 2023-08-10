import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import {Helmet} from 'react-helmet'
import {Toaster} from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({children, title, description, keywords, author}) => {
  return (
    <div>
       <Helmet>
            <meta charSet="utf-8" />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
        </Helmet>
        <Header/>
        <main style={{minHeight: '80vh'}}>
            <Toaster />
            {children}
        </main>
        <Footer/>
    </div>
  )
}

Layout.defaultProps = {
  title: "Book Libary App",
  description: "MernStack app",
  keywords: "HTML, CSS, Javascript, React, Node, MongoDb",
  author: "Chung Le"
}
export default Layout