import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { GlobalState } from '../../../GlobalState';
import '../scss/createProduct.scss';
import { Link } from 'react-router-dom';

const Users = () => {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [isAdmin] = state.userAPI.isAdmin;
  const [data, setData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [sortType, setSortType] = useState("newest");
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/user/allUser', {
          headers: {
            Authorization: token,
          },
        });
        setData(res.data.users);
      } catch (error) {
        console.error(error);
      }
    };

    if (token && isAdmin) {
      getAllUsers();
    }
  }, [token, isAdmin]);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleSortTypeChange = (e) => {
    setSortType(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOrders = selectedStatus
    ? data.filter((item) => item.name === selectedStatus)
    : data;

  const sortedOrders = filteredOrders.sort((a, b) => {
    if (sortType === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortType === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    return 0;
  });

  const filteredSearch = sortedOrders.filter((order) =>
    order.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {data.length > 0 && (
        <div className="app-content">
          <div className="product-area-wrapper tableView">
            <div className='app-content-actions'>
              <input
                className="search-bar"
                type="text"
                placeholder="Search..."
                onChange={handleSearchChange}
                value={searchTerm}
              />
              <select
                className="sort-order app-content-headerButton button"
                name="sort"
                id="short-time"
                onChange={handleSortTypeChange}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
            <div className="products-header">
              <div className="product-cell image">
                Avatar
                <button className="sort-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.5 20.5 20.5s20.5-9.1 20.5-20.5V81.1l85.7 85.7c3.9 3.9 9 5.9 14.1 5.9s10.2-2 14.1-5.9c7.8-7.9 7.8-20.6 0-28.5zm0 0"></path>
                  </svg>
                </button>
              </div>
              <div className="product-cell">Name</div>
              <div className="product-cell">Phone</div>
              <div className="product-cell">Email</div>
            </div>
            {filteredSearch.map((user) => (
              <div className="products-row" key={user._id}>
                <div className="product-cell image">
                  <img src={user.avatar} alt="avatar" />
                </div>
                <div className="product-cell">{user.name}</div>
                <div className="product-cell">{user.phone}</div>
                <div className="product-cell">{user.email}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
