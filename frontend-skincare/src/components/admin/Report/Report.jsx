import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';
import OrderCancel from './OrderCancel';

const Report = () => {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [order, setOrder] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [sortedOrders, setSortedOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    if (token) {
      const getOrder = async () => {
        const res = await axios.get('http://localhost:5000/api/order/cancel-request', {
          headers: { Authorization: token },
        });
        setOrder(res.data);
      }
      getOrder();
    }
  }, [token, setOrder]);


  const handleSortOrder = () => {
    const sorted = [...order].sort((a, b) => {
      // Sắp xếp theo createdAt (ngày tạo đơn hàng)
      if (sortOrder === 'asc') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
    setSortedOrders(sorted);
  };

  const handleSearch = () => {
    const filteredOrders = order.filter((orderItem) =>
      orderItem.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSortedOrders(filteredOrders);
  };
  useEffect(() => {
    handleSortOrder();
  }, [order, sortOrder]);
  return (
    <>
      <div className="app-content">
        <div className="app-content-header">
          <h1 className="app-content-headerText">All Order Cancel request</h1>
        </div>
        <div className="app-content-actions">
          <div className="search-action">
            <input
              type="text"
              className="search-bar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by user..."
            />
            <button className="app-content-headerButton button" onClick={handleSearch}>
              Search
            </button>
          </div>
          <select
            className="sort-order app-content-headerButton button"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="desc">Newest</option>
            <option value="asc">Oldest</option>
          </select>
        </div>
        <div className="product-area-wrapper tableView">
          <div className="products-header">
            <div className="product-cell image">Item</div>
            <div className="product-cell status-cell">Status</div>
            <div className="product-cell sales">Quantity</div>
            <div className="product-cell stock">Brand</div>
            <div className="product-cell price">Price</div>
          </div>
          {sortedOrders?.map((orderItem) => {
            return <OrderCancel key={orderItem._id} orders={orderItem} />
          })}
        </div>
      </div>
    </>
  )
}

export default Report