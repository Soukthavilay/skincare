import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PiShoppingBag, PiShoppingCartLight } from "react-icons/pi";
import { BsCash } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";

function DashboardSummary({statistics}) {
  const { totalSales, totalRevenue, totalUsers, totalOrders } = statistics || {};
  return (
    <div className='dashboard-summary'>
      <div className="dashboard-summary-item">
        <div className="item-content">
          <div className="title">
            <PiShoppingBag />
            <h2>Total Sales</h2>
          </div>
          <p>{totalSales ? totalSales : 0} <small>items</small></p>
        </div>
      </div>
      <div className="dashboard-summary-item">
        <div className="item-content">
          <div className="title">
            <BsCash />
            <h2>Revenue</h2>
          </div>
          <p>{totalRevenue ? totalRevenue?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          }) : 0}</p>
        </div>
      </div>
      <div className="dashboard-summary-item">
        <div className="item-content">
          <div className="title">
            <AiOutlineUser />
            <h2>Total User</h2>
          </div>
          <p>{totalUsers ? totalUsers : 0} <small>users</small></p>
        </div>
      </div>
      <div className="dashboard-summary-item">
        <div className="item-content">
          <div className="title">
            <PiShoppingCartLight />
            <h2>Total Orders</h2>
          </div>
          <p>{totalOrders ? totalOrders : 0} <small>orders</small></p>
        </div>
      </div>
    </div>
  );
}

export default DashboardSummary