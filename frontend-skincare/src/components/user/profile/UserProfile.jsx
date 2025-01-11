import "../../utils/scss/profile.scss";
import MyOrders from './MyOrders';
import { GlobalState } from "../../../GlobalState";
import { useContext } from "react";
import ProfileOption from "./ProfileOption";
import Loading from "../../utils/Loading/Loading";
import { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';

function UserProfile() {
  const state = useContext(GlobalState);
  const [myOrder] = state.userAPI.order;
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [sortType, setSortType] = useState("newest");
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    if (myOrder.length === 0 || myOrder === undefined) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [myOrder]);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };
  const filteredOrders = selectedStatus
  ? myOrder.filter((order) => order.status === selectedStatus)
  : myOrder;

  const sortedOrders = filteredOrders.sort((a, b) => {
    if (sortType === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortType === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sortType === "expensive") {
      // const priceA = a.listOrderItems[0]?.price || 0;
      // const priceB = b.listOrderItems[0]?.price || 0;
      const priceA = a.total;
      const priceB = b.total;
      return priceB - priceA;
    } else if (sortType === "cheap") {
      const priceA = a.total;
      const priceB = b.total;
      return priceA - priceB;
    }
  });
  const filteredSearch = sortedOrders.filter((order) =>{
    return order.listOrderItems.some((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
});
  const handleSortTypeChange = (e) => {
    const selectedSortType = e.target.value;
    setSortType(selectedSortType);
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <>
    {loading ? <>{loading && <Loading />}</> : <>
    <div className='profile'>
      <ProfileOption />
      <div className="profile-content">
        <div className="orders">
          <div className="order-wrapper">
            <h2 className="orders-title">{t("label-my-orders")}</h2>
            <div className="order-search">
              <input type="text" name="search" placeholder={t("labe-find-product")} value={searchTerm} onChange={handleSearchChange}/>
            </div>
            <div className="order-select">
              <select className="select-status"
                name="select-status"
                id="selectStatus"
                value={selectedStatus}
                onChange={handleStatusChange}>
                  <option value="">{t("label-all-orders")}</option>
                  <option value="Pending">{t("label-order-pending")}</option>
                  <option value="Confirmed">{t("label-order-confirmed")}</option>
                  <option value="Shipping">{t("label-order-shipping")}</option>
                  <option value="Paid">{t("label-order-paid")}</option>
                  <option value="Cancelled">{t("label-order-cancelled")}</option>
                  <option value="Cancel Requested">{t("label-cancel-requested")}</option>
                  <option value="Delivered">{t("label-order-delivered")}</option>
              </select>
              <select className="select-status" name="sort" id="short-time" onChange={handleSortTypeChange}>
                <option value="newest">{t("label-newest")}</option>
                <option value="oldest">{t("label-oldest")}</option>
                <option value="expensive">{t("label-expensive-price")}</option>
                <option value="cheap">{t("label-cheap-price")}</option>
              </select>
            </div>
          </div>
          <div className="orders-list">
            {filteredSearch?.map((item)=>{
              return (
                <MyOrders key={item._id} order={item} />
              )
            })}
          </div>
        </div>
      </div>
    </div>
    </>}
    </>
  )
}

export default UserProfile