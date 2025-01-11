import axios from "axios";
import { GlobalState } from "../../../GlobalState";
import { useContext, useEffect, useState } from "react";

const OrderHeader = (order) => {
  const orderData = order.order;
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [selectedStatus, setSelectedStatus] = useState(orderData.status);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    updateOrderStatus(orderData._id, e.target.value);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const url = `http://localhost:5000/api/update-status/${orderId}`;
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .put(url, { status: newStatus }, config)
      .then((res) => {
        alert("Order status updated successfully");
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error updating order status:", err);
      });
  };

  const createdAtDateTime = new Date(orderData.createdAt);
  const currentDateTime = new Date();
  const minutesDifference = Math.floor(
    (createdAtDateTime - currentDateTime) / (1000 * 60)
  );
  const formattedDateTime = createdAtDateTime.toLocaleString();

  return (
    <>
      <div className="products-header">
        <div className="product-cell image">
          Order of User : {orderData.name}
        </div>
        <div className="product-cell image">
          {formattedDateTime} {minutesDifference}
        </div>
        <div className="product-cell image">
          <select
            className="app-content-headerButton button"
            value={selectedStatus}
            onChange={handleStatusChange}
          >
            <option value="Shipping">Shipping</option>
            <option value="Delivered">Delivered</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Paid">Paid</option>
            <option value="Cancelled">Cancel</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default OrderHeader;
