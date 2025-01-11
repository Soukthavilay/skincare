import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function MyOrders(order) {
  const myOrder = order.order;
  const [total,setTotal] = useState(0);
  const { t } = useTranslation();
  useEffect(()=>{
    if(myOrder){
      myOrder.listOrderItems?.map((item) =>{
        const rs = item?.price * item?.quantity;
        setTotal(rs);
      })
    }
  },[myOrder]);

  const createdAtDateTime = new Date(myOrder.createdAt);
  const currentDateTime = new Date();
  const minutesDifference = Math.floor(
    (createdAtDateTime - currentDateTime) / (1000 * 60)
  );
  const formattedDateTime = createdAtDateTime.toLocaleString();
  let content;
  switch (myOrder && myOrder.status) {
    case 'Delivered':
      content = <span className="order-confirmed order-status">{t("label-order-delivered")}</span>;
      break;
    case 'Cancelled':
      content = <span className="order-cancelled order-status">{t("label-order-cancelled")}</span>;
      break;
    case 'Cancel Requested':
      content = <span className="order-cancelled order-status">{t("label-cancel-requested")}</span>;
      break;
    case 'Shipping':
      content = <span className="order-confirmed order-status">{t("label-order-shipping")}</span>;
      break;
    case 'Confirmed':
      content = <span className="order-confirmed order-status">{t("label-order-confirmed")}</span>;
      break;
    case 'Pending':
      content = <span className="order-pending order-status">{t("label-order-pending")}</span>;
      break;
    case 'Paid':
      content = <span className="order-confirmed order-status">{t("label-order-paid")}</span>;
      break;  
    default:
      content = <div></div>;
      break;
  }
  return (
    <div className="order-item">
      <div className="order-item-header">
        <div>
        <span className="order-number">#{myOrder._id.slice(-6)}</span>
        <span className="order-number">{formattedDateTime}</span>
        </div>
        {content}
      </div>
      <div className="order-item-body">
        {myOrder.listOrderItems?.map((orderItem) => (
          <div className="order-product" key={orderItem._id}>
            <div className="order-product-img">
              <img
                src={orderItem.images.url}
                alt={
                  "product-image"
                }
              />
            </div>
            <div className="order-product-info">
              <h3 className="product-name">
                <Link target='_parent' to={`/order-detail/${myOrder._id}`}>
                  {orderItem.title}
                </Link>
              </h3>
              {/* <span className="product-type">{orderItem.feature.color}</span> */}
            </div>
            <div className="order-product-price">
              {total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </div>

            <div className="order-product-quantity">
              {t("label-qty")}: {orderItem?.quantity}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;
