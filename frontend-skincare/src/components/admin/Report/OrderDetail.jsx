import { useLocation } from "react-router-dom";
import "../scss/order-detail.scss"
import { useTranslation } from 'react-i18next';

const OrderDetail = () => {
  const location = useLocation();
  const orderItem = location.state.order;
  const { t } = useTranslation();
  const createdAtDateTime = new Date(orderItem.createdAt);
  const currentDateTime = new Date();
  const minutesDifference = Math.floor(
    (createdAtDateTime - currentDateTime) / (1000 * 60)
  );
  const formattedDateTime = createdAtDateTime.toLocaleString();
  return (
    <>
      <div className="orderDetail-admin">
        <h3 className="order-title">
          Order Number: <span className="order-number">{orderItem._id}</span>
        </h3>
        <div className="order-detail-admin">
          <div className="order-detail-left">
            <div className="order-item-summary frame">
              <div className="order-item-summary_row">
                <div className="order-item-summary_row-item title">Items Summary</div>
                <div className="order-item-summary_row-item">Qty</div>
                <div className="order-item-summary_row-item">Price</div>
                <div className="order-item-summary_row-item">Total Price</div>
              </div>
              {orderItem.listOrderItems?.map((item)=>{
                return (
                  <div key={item._id} className="order-item-summary_row product">
                    <div className="order-item-summary_row-item">
                      <img src={item.images.url} alt="order-image" />
                      <h3>{item.title}</h3>
                    </div>
                    <div className="order-item-summary_row-item">x {item.quantity}</div>
                    <div className="order-item-summary_row-item">${item.price}</div>
                    <div className="order-item-summary_row-item">${item.price * item.quantity}</div>
                  </div>
                )
              })}
            </div>
            <div className="order-customer-info frame">
              <h3>Customer And Order Details</h3>
              <div className="order-customer-info_item">
                <span className="title">Customer Name</span>
                <span className="subtitle">{orderItem.name}</span>
              </div>
              <div className="order-customer-info_item">
                <span className="title">Phone Number</span>
                <span className="subtitle">{orderItem.phone}</span>
              </div>
              <div className="order-customer-info_item">
                <span className="title">Type Order</span>
                <span className="subtitle">{orderItem.paymentMethod}</span>
              </div>
              <div className="order-customer-info_item">
                <span className="title">Note</span>
                <span className="subtitle">{orderItem.status === "Delivered" ? "Delivered complete" : "Order is Processing"}</span>
              </div>
            </div>
          </div>
          <div className="order-detail-right">
            <div className="order-summary frame">
              <div className="order-summary-header">
                <h3>Order Summary</h3>
                {orderItem.status === "Cancelled" ? <span className="order-status">
                  {orderItem.status}
                </span> : <span className="order-status-pass">
                  {orderItem.status}
                </span>}
              </div>
              <div className="order-summary-content">
                <div className="order-summary-content_item">
                  <span className="title">Order Date</span>
                  <span className="subtitle">{formattedDateTime}</span>
                </div>
                <div className="order-summary-content_item">
                  <span className="title">{t("label-subtotal")}</span>
                  <span className="subtitle">$ {orderItem.total}</span>
                </div>
                <div className="order-summary-content_item">
                  <span className="title">Delivery Fee</span>
                  <span className="subtitle">$ 0</span>
                </div>
              </div>
            </div>
            <div className="order-total frame">
              <span className="title">Total</span>
              <span className="subtitle">$ {orderItem.total}</span>
            </div>
            <div className="order-address frame">
              <h3>Delivery Address</h3>
              <div className="order-address-content">
                <span className="title">Address: </span>
                <span className="subtitle">{orderItem.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
