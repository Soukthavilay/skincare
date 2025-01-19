import React from 'react'
import OrderHeader from '../Orders/OrderHeader'
import { Link } from 'react-router-dom';

const OrderCancel = (order) => {
    const orderItem = order.orders
  return (
    <>
        <OrderHeader key={orderItem._id} order={orderItem} />
        {orderItem.listOrderItems.map((item) => (
            <Link key={item._id} to={`/admin/orderDetail/${orderItem._id}`} state={orderItem }>
            <div className="products-row">
              <div className="product-cell image">
              <img src={item.images.url} alt={item.images.url} />
              <span>{item.title}</span>
              </div>
              <div className="product-cell status-cell">
              <span className="cell-label">Status:</span>
              {orderItem.status === "Cancelled" ? <span className="status canceled">{orderItem.status}</span> :
              <span className="status active">{orderItem.status}</span>}
              </div>
              <div className="product-cell sales">
              <span className="cell-label">Sales:</span>
              {item.quantity}
              </div>
              <div className="product-cell stock">
              <span className="cell-label">Stock:</span>
              {item.band}
              </div>
              <div className="product-cell price">
              <span className="cell-label">Price:</span>
              {item.price} VND
              </div>
          </div>
          </Link>
        ))}
        <span className='total-color'>
        <b>Total:</b> {orderItem.total} VND
        </span>
    </>
  )
}

export default OrderCancel