import { Routes, Route, Navigate } from 'react-router-dom'



import Home from '../pages/Home';
import Products from '../pages/Products';
import Favourites from '../pages/Favourites';
import ProductDetails from '../pages/ProductDetails';
import Checkout from '../pages/Checkout';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ProtectedRoute from './ProtectedRoute';

import AddProducts from '../admin/AddProducts';
import AllProducts from '../admin/AllProducts';
import Dashboard from '../admin/Dashboard';
import Users from '../admin/Users';



const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to='home' />} />

            <Route path='home' element={<Home />} />
            <Route path='products' element={<Products />} />
            <Route path='products/:id' element={<ProductDetails />} />
            <Route path='/*' element={<ProtectedRoute />}>
                <Route path="favourites" element={<Favourites />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="dashboard/all-products" element={<AllProducts />} />
                <Route path="dashboard/add-product" element={<AddProducts />} />
                <Route path="dashboard/users" element={<Users />} />
            </Route>
            <Route path='checkout' element={<Checkout />} />
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
        </Routes>
    );
};

export default Routers;