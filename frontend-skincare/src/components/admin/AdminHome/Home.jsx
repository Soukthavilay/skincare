import React, { useEffect, useState } from 'react';
import '../scss/adminDash.scss';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineSearch } from "react-icons/ai";
import { BsCalendar3 } from "react-icons/bs";
import ProductChart from './ProductChart';
import DashboardSummary from './DashboardSummary';
import CategoriesChart from './CategoriesChart';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Home = () => {
  const [topProduct, setTopProduct] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [statistics, setStatistics] = useState();

  useEffect(() => {
    fetchStatistics();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const fetchData = () => {
    let year = selectedDate ? selectedDate.getFullYear() : undefined;
    let month = selectedDate ? selectedDate.getMonth() + 1 : undefined;
    fetchStatistics(year, month);
  };

  const fetchStatistics = async (year, month) => {
    try {
      let res;
      if (!year || !month) {
        res = await axios.get("http://localhost:5000/api/report");
      } else {
        res = await axios.get(`http://localhost:5000/api/report/${year}/${month}`);
      }
      setStatistics(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      const getProducts = async () => {
        const res = await axios.get("http://localhost:5000/api/products/top-sold");
        setTopProduct(res.data);
      };
      getProducts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <>
      <div className="dashboard">
        <div className="dashboard-summary-header">
          <h1>Dashboard</h1>
          <div className="dashboard-search">
            <BsCalendar3 className="calendar-icon" />
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="MM/yyyy"
              placeholderText="Select Month and Year"
              showMonthYearPicker
            />
            <button className="search-btn" onClick={fetchData}><AiOutlineSearch /></button>
          </div>
        </div>
        <DashboardSummary statistics={statistics}/>
        <div className="summary-chart">
          <div className="chart-left">
            <h2>Product Sales</h2>
            <ProductChart statistics={statistics}/>
          </div>
          <div className="chart-right">
            <h2>Sales by Category</h2>
            <CategoriesChart statistics={statistics} />
            
          </div>
        </div>
        <div className="summary-list">
          <div className="summary-list-left">
            <div className="dashboard-orders">
              <div className="dashboard-orders-header">
                <h2 className="title">Recent Orders</h2>
              </div>
              <div className="dashboard-orders-content">
                <div className="orders-content-table">
                  <div className="table-header">
                    <div className="table-header-item table-item">No.</div>
                    <div className="table-header-item table-item">ID order</div>
                    <div className="table-header-item table-item">Customer name</div>
                    <div className="table-header-item table-item">Order date</div>
                    <div className="table-header-item table-item">Status</div>
                    <div className="table-header-item table-item">Amount</div>
                  </div>
                  <div className="table-content">
                    {statistics && statistics.recentOrders?.map((order,index)=>(
                        <div key={order._id} className="table-row">
                        <div className="row-item table-item">{index + 1}</div>
                        <div className="row-item table-item">#{order._id.slice(-5)}</div>
                        <div className="row-item table-item">{order.name}</div>
                        <div className="row-item table-item">{moment(order.createdAt).format('DD/MM/YYYY')}</div>
                        <div className="row-item table-item">
                          <span className="processing">{order.status}</span>
                        </div>
                        <div className="row-item table-item">{order.total} $</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* top product */}
          <div className="summary-list-right">
            <h2>Top Product</h2>
            {topProduct?.filter(top => top.sold > 0).map(top => (
              <div key={top._id} className="list-product-item">
                <Link target='_parent' to={`/detail/${top._id}`}><div className="product-item-img">
                  <img src={top.images.url} alt="image-product" />
                </div>
                <div className="product-item-content">
                  <h4 className="product-name">{top.title.length > 10 ? `${top.title.slice(0, 15)}...` : top.title}</h4>
                  <span className="product-quantity"> sold : {top?.sold}</span>
                </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
