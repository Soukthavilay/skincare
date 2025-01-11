import { useContext, useEffect, useState } from 'react'
import StepTracker from './StepTracker'
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';
import Loading from '../../utils/Loading/Loading';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


function ShippingDetail() {
  const state = useContext(GlobalState)
  const [userDetail] = state.userAPI.detail;
  const [cart, setCart] = state.userAPI.cart;
  const id = userDetail._id;
  const name = userDetail.name;
  const email = userDetail.email; 
  const [phone,setPhone] = useState('');
  const [address,setAddress] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cod');
  const [itemOrder,setItemOrder] = useState();
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const { t } = useTranslation();

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
};
const handleSubmit = async (e) => {
  e.preventDefault();
  if (selectedPaymentMethod === 'cod') {
    try {
      setLoading(true);
      let requestBody = {
        phone: phone,
        address: address,
        user_id: id
      };
      await axios.post('http://localhost:5000/api/createOrder',requestBody);

      window.location.href = "/checkout-confirm";
    } catch (error) {
      alert(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  } else if (selectedPaymentMethod === 'paypal') {
    try {
      setLoading(true);
      let requestBody = {
        phone: phone,
        address: address,
        user_id: id
      };
      const res = await axios.post('http://localhost:5000/api/createOrder',requestBody);
      setItemOrder(res.data);
    } catch (error) {
      console.log(error);
    }
  }
};

useEffect(() => {
  if (itemOrder && itemOrder.order?.listOrderItems?.length > 0) {
    const orderNow = {
      order_id: itemOrder.order._id,
    };
    axios.post('http://localhost:5000/api/paypal', { ...orderNow })
      .then(response => {
        if(response.data.url){
          window.open(response.data.url, '_blank');
          window.location.href = "/checkout-confirm";
        }
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      }).finally(() =>{
        setLoading(false);
      });
  }
}, [itemOrder]);

  useEffect(() => {
    if (cart) {
      let total = 0;
      cart.forEach((item) => {
        total += item.price * item.quantity;
      });
      setTotal(total);
    }
  }, [cart]);


  return (
    <>
      {loading ? <>{loading && <Loading/>}</> : <>
      <div className="shipping-detail">
      <StepTracker current={2} />
      <h3 className="shipping-detail-title">{t("label-shipping-info")}</h3>
      <form onSubmit={handleSubmit}>
        <div className="shipping-detail-form">
          <div className="form-group">
            <label htmlFor="fullname">{t("label-name-and-last-name")}</label>
            <input type="text" name="fullname" placeholder={t("label-name-and-last-name")} value={name} readOnly/>
          </div>
          <div className="form-group">
            <label htmlFor="email">{t("label-email")}</label>
            <input type="email" name={t("label-email")} value={email} readOnly/>
          </div>
          <div className="form-group">
            <label htmlFor="phonenumber">{t("label-phone-number")}</label>
            <input required type="number" name={t("label-phone-number")} value={phone}  onChange={e => setPhone(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="address">{t("label-address")}</label>
            <input required name="address" type="text" value={address}  onChange={e => setAddress(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="payment-method">{t("label-payment-method")}</label>
            <select
                name="payment-method"
                id="paymentMethod"
                value={selectedPaymentMethod}
                onChange={handlePaymentMethodChange}
            >
                <option value="cod">Ship cod</option>
                <option value="paypal">Paypal</option>
            </select>
        </div>
          <div className="checkout-buttons">
            <button className="btn btn--animated btn--primary--blue btn--border--blue">
              <Link to='/order-summary'>{t("label-back")}</Link>
            </button>
            <button type='submit' className="btn btn--animated btn--primary--white btn--border--blue">
            {t("label-continues")}
            </button>
          </div>
        </div>
      </form>
    </div>
      </>}
    </>
  );
}

export default ShippingDetail