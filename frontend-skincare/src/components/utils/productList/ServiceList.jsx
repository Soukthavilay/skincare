import React from 'react'
import { RiTruckLine } from "react-icons/ri";
import { BsCashStack } from "react-icons/bs";
import { AiOutlineGift } from "react-icons/ai";
import { RiCustomerService2Line } from "react-icons/ri";
import { useTranslation } from '../../../../node_modules/react-i18next';

function ServiceList() {
  const { t } = useTranslation();
  return (
    <div className="service-list">
      <div className="service-list-item">
        <div className="service-list-item_img">
          <RiTruckLine />
        </div>
        <div className="service-list-item_content">
          <h3>{t("label-price-cheep")}</h3>
          <span>{t("label-option1")}</span>
        </div>
      </div>
      <div className="service-list-item">
        <div className="service-list-item_img">
          <BsCashStack />
        </div>
        <div className="service-list-item_content">
          <h3>{t("label-cash")}</h3>
          <span>{t("label-option2")}</span>
        </div>
      </div>
      <div className="service-list-item">
        <div className="service-list-item_img">
          <AiOutlineGift />
        </div>
        <div className="service-list-item_content">
          <h3>{t("label-free")}</h3>
          <span>{t("label-option3")}</span>
        </div>
      </div>
      <div className="service-list-item">
        <div className="service-list-item_img">
          <RiCustomerService2Line />
        </div>
        <div className="service-list-item_content">
          <h3>24/7</h3>
          <span>{t("label-option4")}</span>
        </div>
      </div>
    </div>
  );
}

export default ServiceList