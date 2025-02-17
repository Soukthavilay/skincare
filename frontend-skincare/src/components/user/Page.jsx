import { Routes, Route } from "react-router-dom";
import Banner from './banner/Banner';
import ProductDetail from './productDetail/ProductDetail';
import { GlobalState } from '../../GlobalState';
import { useContext } from 'react';
import Admin from '../admin/Admin';
import OrderSummary from './checkout/OrderSummary';
import ShippingDetail from './checkout/ShippingDetail';
import Cart from './cart/Cart';
import CheckoutConfirm from "./checkout/CheckoutConfirm";
import LoginForm from '../login-register/LoginForm';
import ProductList from '../utils/productList/ProductList';
import UserProfile from './profile/UserProfile';
import PaymentMethod from './checkout/PaymentMethod';
import OrderDetail from './profile/OrderDetail';
import MyInfo from './profile/MyInfo';
import Review from './review/Review';
import Loading from "../utils/Loading/Loading";
import Notfound from "../utils/NotFound/Notfound";

const Page = () => {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;

  return (
    <Routes>
      <Route path="/admin/*" element={isAdmin ? <Admin /> : <Notfound />} />
      <Route path="/sign-in" element={<LoginForm />} />
      <Route path="/detail/:id" element={<ProductDetail />} />
      <Route path="/order-summary" element={<OrderSummary />} />
      <Route path="/shipping-detail" element={<ShippingDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout-confirm" element={<CheckoutConfirm />} />
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
