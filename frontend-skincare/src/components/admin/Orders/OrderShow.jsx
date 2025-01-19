import { useContext, useEffect, useState } from "react";
import OrderHeader from "./OrderHeader"
import { GlobalState } from "../../../GlobalState";
import { Link } from 'react-router-dom';

const OrderShow = (orders) => {
  const order = orders.orders;
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [newNameCate,setNewNameCate] = useState();

  useEffect(() => {
    if (categories.length === 0) {
      return;
    }
    categories.map((item) => {
      if (item._id === order.listOrderItems[0]?.category) {
        setNewNameCate(item.name);
      }
    });
  }, [categories, order]);

  return (
    <>
      <OrderHeader key={order._id} order={order} />
      
      {order?.listOrderItems.map((item) => (
        <Link key={item._id} to={`/admin/orderDetail/${order._id}`} state={ order }>
        <div className="products-row">
          <div className="product-cell image">
            <img src={item.images.url} alt={item.images.url} />
            <span>{item.title}</span>
          </div>
          <div className="product-cell category">
            <span className="cell-label">Category:</span>
            {newNameCate ? newNameCate : item.category}
          </div>
          <div className="product-cell status-cell">
            <span className="cell-label">Status:</span>
            {order.status === "Cancelled" ? <span className="status canceled">{order.status}</span> :
              <span className="status active">{order.status}</span>}
          </div>
          <div className="product-cell sales">
            <span className="cell-label">Sales:</span>
            {item.quantity}
          </div>
          <div className="product-cell stock">
            <span className="cell-label">Stock:</span>
            {order.paymentMethod}
          </div>
          <div className="product-cell price">
            <span className="cell-label">Price:</span>
            {item.price} USD
          </div>
        </div></Link>
      ))}
      <span className="total-color">
        <b>Total:</b> {order.total} USD
      </span>
    </>
  );
}

export default OrderShow