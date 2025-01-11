import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Popup from "reactjs-popup";
import { GlobalState } from "../../../GlobalState";
import ProfileOption from "./ProfileOption";
import "../../utils/scss/profile.scss";
import Review from "../review/Review";
import Cancel from "../review/Cancel";
import { useTranslation } from '../../../../node_modules/react-i18next';

const OrderDetail = () => {
  const state = useContext(GlobalState);
  const [myOrder] = state.userAPI.order;
  const param = useParams();
  const [data, setData] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    const foundOrder = myOrder.find((order) => order._id === param.id);
    if (foundOrder) {
      setData(foundOrder);
    } else {
      console.log("No match found");
    }
  }, [myOrder, param.id]);
  if(data){
    var style ={
      background: data.status !== "Cancelled" && data.status !== "Cancel Requested" ? 'green' : 'red',
    }
  } else {
    style = {
      background : 'none'
    }
  }

  let content;

  switch (data && data.status) {
    case 'Delivered':
      content = <button className="review-btn">{t("label-review")}</button>;
      break;
    case 'Cancelled':
      content = <div></div>;
      break;
    case 'Cancel Requested':
      content = <div></div>;
      break;
    case 'Shipping':
      content = <button className="review-btn">{t("label-review")}</button>;
      break;
    case 'Confirmed':
      content = <button className="review-btn">{t("label-review")}</button>;
      break;
    case 'Pending':
      content = <div></div>;
      break;
    case 'Paid':
      content = <button className="review-btn">{t("label-review")}</button>;
      break;  
    default:
      content = <div></div>;
      break;
  }
  let status;
  switch (data && data.status) {
    case 'Pending':
      status = <div className="order-header-item order-status order-pending">{t("label-order-pending")}</div>;
      break;
    case 'Delivered':
      status = <div className="order-header-item order-status order-confirmed">{t("label-order-delivered")}</div>;
      break;
    case 'Cancelled':
      status = <div className="order-header-item order-status order-cancelled">{t("label-order-cancelled")}</div>;
      break;
    case 'Cancel Requested':
      status = <div className="order-header-item order-status order-cancelled">{t("label-cancel-requested")}</div>;
      break;
    case 'Shipping':
      status = <div className="order-header-item order-status order-confirmed">{t("label-order-shipping")}</div>;
      break;
    case 'Confirmed':
      status = <div className="order-header-item order-status order-confirmed">{t("label-order-confirmed")}</div>;
      break;
    case 'Paid':
      status = <div className="order-header-item order-status order-confirmed">{t("label-order-paid")}</div>;
      break;  
    default:
      content = <div></div>;
      break;
  }
  return (
    <div className="profile">
      <ProfileOption />
      <div className="profile-content order-details">
        <h2>{t("label-order-details")}</h2>

        <div className="order-details-content">
          <div className="order-details-header">
            <div className="order-header-item">
              {data ? <p>{data.status === "Cancelled" ? t("label-order-cancelled") : t("label-cancel-requested")}</p> : t("label-order-cancelled")}
            </div>
            {status}
          </div>
          <div className="order-details-body">
            <div className="order-details-body_product">
              {data &&
                data.listOrderItems?.map((orderItem) => (
                  <div className="order-product" key={orderItem._id}>
                    <div className="order-product-info">
                      <img
                        src={orderItem.images.url}
                        alt={
                          "product-image"
                        }
                      />
                      <div className="order-product-info_detail">
                        <h3 className="product-name">{orderItem.title}</h3>
                        <span className="product-type" style={{ backgroundColor: orderItem.colors.colorName }}>
                          
                        </span>
                      </div>
                    </div>
                    <div className="order-product-price">
                      ${orderItem.price * orderItem.quantity}
                    </div>
                    <div className="order-product-quantity">
                      Qty: {orderItem?.quantity}
                    </div>
                    <div className="order-product-review">
                      <Popup
                        trigger={content}
                        modal
                        nested
                      >
                        {(close) => (
                          <div className="modal review-modal">
                            <button className="close" onClick={close}>&times;</button>
                            <div className="header">{t("label-review-product")}</div>
                            <div className="content">
                              {" "}
                              <Review productID={orderItem._id}/>
                            </div>
                          </div>
                        )}
                      </Popup>
                    </div>
                  </div>
                ))}
            </div>
            {data ? (
              <>
                <div className="order-details-info">
                  <span className="order-details-info_code">
                    {t("label-orders")}: #{data._id}
                  </span>
                  <span className="order-details-info_date">
                    {t("label-place-on")} {new Date(data.createdAt).toLocaleDateString()}
                  </span>
                  <span className="order-details-info_method">{t("label-ship-with")} {data.paymentMethod ? data.paymentMethod : ""}</span>
                </div>
                <div className="order-details-summary">
                  <div className="order-details-summary_item order-summary-user">
                    <p className="name">{data.name}</p>
                    <p className="address">{data.address}</p>
                    <p className="phone">{data.phone}</p>
                  </div>
                  <div className="order-details-summary_item order-summary-price">
                    <h2>{t("label-total-summary")}</h2>
                    <div className="order-summary-price_item">
                      <span className="order-summary-price_item-left">
                        {t("label-subtotal")} ({data.listOrderItems.length})
                      </span>
                      <span className="order-summary-price_item-right">
                        {data.total.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </span>
                    </div>
                    <div className="order-summary-price_item">
                      <span className="order-summary-price_item-left">
                        {t("label-shipping-fee")}
                      </span>
                      <span className="order-summary-price_item-right">
                        {data.shippingFee ? data.shippingFee : 0} VND
                      </span>
                    </div>
                    <div className="order-summary-price_item total">
                      <span className="order-summary-price_item-left">
                        {t("label-total")}
                      </span>
                      <span className="order-summary-price_item-right">
                        {data.total.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </span>
                    </div>
                    <span className="order-summary-price_method">
                      {t("label-ship-with")} {data.paymentMethod ? data.paymentMethod : ""}
                    </span>
                    <div> 
                      {data && data.status === 'Pending' ? 
                        <Popup
                        trigger={<button className="button btn btn--animated btn--primary--blue btn--border--blue">{t("label-cancel")}</button>}
                        modal
                        nested
                      >
                        {(close) => (
                          <div className="modal review-modal">
                            <button className="close" onClick={close}>&times;</button>
                            <div className="header">{t("label-cancel-request")}</div>
                            <div className="content">
                              {" "}
                              <Cancel orderId={data._id}/>
                            </div>
                          </div>
                        )}
                      </Popup>
                      : ""}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2>{t("label-user-data-is-missing")}</h2>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
