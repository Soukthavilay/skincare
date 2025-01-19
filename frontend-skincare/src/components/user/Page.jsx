import { Routes, Route } from "react-router-dom";
import Login from '../login-register/Login';
import TopHeader from '../utils/top-header/TopHeader';
import Header from '../utils/header/Header';
import Banner from './banner/Banner';
import ProductDetail from './productDetail/ProductDetail';
import Filter from '../utils/filter/Filter';
import Register from '../login-register/Register';
import { GlobalState } from '../../GlobalState';
import { useContext } from 'react';
import Admin from '../admin/Admin';
import Notfound from '../utils/NotFound/Notfound';
import OrderSummary from './checkout/OrderSummary';
import ShippingDetail from './checkout/ShippingDetail';
import Cart from './cart/Cart';
import CheckoutComfirm from "./checkout/CheckoutComfirm";
import LoginForm from '../login-register/LoginForm';
import ProductList from '../utils/productList/ProductList';
import UserProfile from './profile/UserProfile';
import PaymentMethod from './checkout/PaymentMethod';
import OrderDetail from './profile/OrderDetail';
import MyInfo from './profile/MyInfo';
import Review from './review/Review';
import { useState } from 'react';
import Loading from '../utils/Loading/Loading';
import { useEffect } from 'react';

const Page = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500); 
  }, []);

  if (isLoading) {
    return <Loading/>
  }

  return (
    <Routes>
      <Route path="/admin*" element={isAdmin ? <Admin /> : <Notfound />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-in" element={<LoginForm />} />
      <Route path="/register" element={<Register />} />
      <Route path="/detail/:id" element={<ProductDetail />} />
      <Route path="/order-summary" element={<OrderSummary />} />
      <Route path="/shipping-detail" element={<ShippingDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout-confirm" element={<CheckoutComfirm />} />
      <Route path="/payment-method" element={<PaymentMethod />} />
      <Route path="/product-list/:id" element={<ProductList />} />
      <Route path="/order-detail/:id" element={<OrderDetail />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/myInfo" element={<MyInfo />} />
      <Route path="/review-product/:id" element={<Review />} />
      <Route path="/" element={<Banner />} />
    </Routes>
  );
}

export default Page;
