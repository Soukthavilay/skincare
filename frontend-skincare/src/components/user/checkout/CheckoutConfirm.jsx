import StepTracker from './StepTracker'
import {Link} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function CheckoutConfirm() {
  const { t } = useTranslation();
  return (
    <div className="checkout-confirm">
      <StepTracker current={3} />
      
      <h3>{t("label-order-has-created")}</h3>

      <p>{t("label-order-has-shipping")}</p>

      <h3>{t("label-order-thank-you")}</h3>

      <Link to='/'>
        <button className="btn btn--animated btn--primary--blue btn--border--blue">
        {t("label-continues-product")}
        </button>
      </Link>
    </div>
  );
}

export default CheckoutConfirm;