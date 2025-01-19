import { Routes, Route } from "react-router-dom";
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../scss/dashboard.scss'
import Sidebar from './sidebar/Sidebar';
import Products from '../createProducts/Products';
import Categories from '../createCategories/Categories';
import Orders from '../Orders/Orders';
import Report from '../Report/Report';
import { GlobalState } from '../../../GlobalState';
import Notfound from '../../utils/NotFound/Notfound';
import EditProduct from '../createProducts/EditProduct';
import Home from '../AdminHome/Home';
import OrderDetail from '../Report/OrderDetail';
import Users from '../users/Users';
import UserDetail from "../users/UserDetail";

const Dashboard = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;

  return (
    <Routes>
      <Route path="/createProduct" element={isAdmin ? <Products /> : <Notfound />} />
      <Route path="/createCategories" element={isAdmin ? <Categories /> : <Notfound />} />
      <Route path="/orderList" element={isAdmin ? <Orders /> : <Notfound />} />
      <Route path="/Report" element={isAdmin ? <Report /> : <Notfound />} />
      <Route path="/edit_product/:id" element={isAdmin ? <EditProduct /> : <Notfound />} />
      <Route path="/" element={<Home />} />
      <Route path="/orderDetail/:id" element={<OrderDetail />} />
      <Route path="/userDetail/:id" element={<UserDetail />} />
      <Route path="/allUser" element={<Users />} />
    </Routes>
  );
}

export default Dashboard;
