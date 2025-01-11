// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import StarRatings from "react-star-ratings";
import moment from 'moment';

// import required modules
import { Navigation } from "swiper";

import "../scss/recommend.scss";
import "../scss/common.scss";
import { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import LoadingSmall from "../Loading/LoadingSmall";
import {Link} from 'react-router-dom';
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useTranslation } from '../../../../node_modules/react-i18next';

const Recommand = () => {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;
  const [savePd,setSavePd] = useState([]);
  const [rating,setRating] = useState();
  let [updatePrice , setUpdatePrice] = useState();
  const [loading,setLoading] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    if(products){
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const productDataList = await Promise.all(products.map(async (product) => {
          const productId = product._id;
          const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
          const productData = response.data;
          return { productId, productData };
          
        }));
        setLoading(false);
        setSavePd(productDataList);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchProductData();
  }
  }, [products]);

  useEffect(() => {
    if (savePd.length > 0) {
      products.forEach((product) => {
        const productData = savePd.find((pd) => pd.productId === product._id);
        if (productData) {
          const feedbackData = productData.productData.feedback;
          setRating(feedbackData);
        }
      });
    }
  }, [savePd, products]);

  const getTotalRating = (feedbackData) => {
    let totalRating = 0;
    if (feedbackData.length > 0) {
      feedbackData?.forEach((feedback) => {
        totalRating += feedback.rating;
      });
      var result = {
        totalRating: totalRating / feedbackData.length,
        total: feedbackData.length
      }
      return result;
    }
    return 0;
  };
  const params = {
    spaceBetween:50,
    loop:true,
    navigation:true,
    className:"featured-product-slide",
    modules:[Navigation],
    breakpoints: {
      590: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 4,
      },
    },
  }

  return (
    <>
      <div className="featured-product">
        <p className="featured-product-title">{t('label-new-product')}</p>
        <div className="container-list">
          {loading ? <LoadingSmall/> : <Swiper {...params}>
            {products &&
              products.map((item) => {
                const { _id, title, images, price ,sold,discountPercentage,discountExpiration} = item;
                const productData = savePd.find((pd) => pd.productId === _id);
                const feedbackData = productData
                  ? productData.productData.feedback
                  : [];
                const totalRating = getTotalRating(feedbackData);
                return (
                  <SwiperSlide key={_id}>
                    <div className="product-item">
                      <div className="product-item-image">
                        <Link target='_parent' to={`/detail/${_id}`}>
                          <img src={images.url} alt={"product-image"} />
                        </Link>
                        {discountPercentage && discountExpiration ? 
                          <div className="coupon">
                            <span>{discountPercentage}%</span>
                            <span>OFF</span>
                            {/* <span>{discountExpiration ? moment(discountExpiration).format('DD/MM/YYYY') : ''}</span> */}
                          </div> : null
                        }
                      </div>
                      <div className="product-item-detail">
                        <h3 className="product-name">
                          <Link target='_parent' to={`/detail/${_id}`}>{title}</Link>
                        </h3>
                        <div className="product-detail">
                          <div className="product-detail-meta">
                            {discountPercentage ? 
                              <div className="price-both">
                                <span style={{ textDecoration: 'line-through' }}>{((price) / (1 - (discountPercentage / 100))).toLocaleString("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                })}</span>
                                <span className="product-price">{price.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                              })}</span>
                              </div> : 
                              <span className="product-price">
                                {price.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                              })}
                              </span>
                            }
                            <div className="product-ratings">
                              <StarRatings
                                name="rating"
                                rating={totalRating.totalRating ? totalRating.totalRating : 0}
                                starRatedColor="#fadb14"
                                starDimension="16px"
                                starSpacing="2px"
                              />
                              <span>({totalRating.total ? totalRating.total : 0})</span>
                            </div>
                          </div>
                          <span>sold : {sold}</span>
                          <Link
                            target="_parent"
                            to={`/detail/${_id}`}
                            className="btn btn--animated btn--primary--white btn--border--blue"
                          >
                            {t('label-buy-now')}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>}
        </div>
      </div>
    </>
  );
};

export default Recommand;
