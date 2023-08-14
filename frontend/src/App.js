import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout/Layout';
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Register from './pages/Auth/Register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Auth/Login';
import Dashboard from './pages/User/Dashboard';
import PrivateRoute from './components/Routes/Private'
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory'
import CreateProduct from './pages/Admin/CreateProduct'
import AllProducts from './pages/Admin/AllProducts'
import Users from './pages/Admin/Users'
import Profile from './pages/User/Profile';
import Rent from './pages/User/Rent';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search/Search';
import BookDetail from './pages/BookDetail/BookDetail';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<PrivateRoute />} >
          <Route path='user' element={<Dashboard />} />
          <Route path='user/profile' element={<Profile />} />
          <Route path='user/rents' element={<Rent />} />
        </Route>
        <Route path='/dashboard' element={<AdminRoute />}>
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='admin/create-category' element={<CreateCategory />} />
          <Route path='admin/create-product' element={<CreateProduct />} />
          <Route path='admin/product/:slug' element={<UpdateProduct />} />
          <Route path='admin/all-products' element={<AllProducts />} />
          <Route path='admin/all-users' element={<Users />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/search' element={<Search />} />
        <Route path='/product/:slug' element={<BookDetail />} />
      </Routes>
    </>
  );
}

export default App;
