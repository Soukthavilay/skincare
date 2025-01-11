import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
    }, 1500); 
  }, []);
  
  if (isLoading) {
    return <Loading/>
  }
  return (
    <Router>
      <Switch>
        <Route path="/admin" component={isAdmin ? Admin : Notfound} />
        <Route path="/login" component={Login} />
        <Route path="/sign-in" component={LoginForm} />
        <Route path="/register" component={Register} />
        <Route path="/detail/:id" component={ProductDetail} />
        <Route path="/order-summary" component={OrderSummary} />
        <Route path="/shipping-detail" component={ShippingDetail} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout-confirm" component={CheckoutComfirm} />
        <Route path="/payment-method" component={PaymentMethod} />
        <Route path="/product-list/:id" component={ProductList} />
        <Route path="/order-detail/:id" component={OrderDetail} />
        <Route path="/profile" component={UserProfile} />
        {/* <Route path="/order-detail" component={OrderDetail} /> */}
        <Route path="/myInfo" component={MyInfo} />
        <Route path="/review-product/:id" component={Review} />
        <Route path="/" component={Banner} />
      </Switch>
    </Router>
  );
}

export default Page