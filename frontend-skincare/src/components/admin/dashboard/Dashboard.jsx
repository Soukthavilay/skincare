import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
const Dashboard = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  return (
    <>
      <Router>
        <Switch>
          <Route path="/admin/createProduct" component={isAdmin ? Products : Notfound} />
          <Route path="/admin/createCategories" component={isAdmin ? Categories : Notfound} />
          <Route path="/admin/orderList" component={isAdmin ? Orders : Notfound} />
          <Route path="/admin/Report" component={isAdmin ? Report : Notfound} />
          <Route path="/admin/edit_product/:id" component={isAdmin ? EditProduct : Notfound}/>
          {/* <Route path="/admin/cancel-request" component={isAdmin ? Report : Notfound} /> */}
          <Route path="/admin/statistical" component={Home}/>
          <Route path="/admin/orderDetail/:id" component={OrderDetail}/>
          <Route path="/admin/allUser" component={Users}/>
        </Switch>
      </Router>
    </>
  )
}

export default Dashboard