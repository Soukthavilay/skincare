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
import Loading from "../Loading/Loading";
import LoadingSmall from "../Loading/LoadingSmall";
import {Link} from 'react-router-dom';
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const RecommenderUser = () => {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;
  const userId = state.userAPI.detail[0];
  const [recommender, setRecommender] = useState();
  const [savePd,setSavePd] = useState([]);
  const [rating,setRating] = useState();
  const  [loading , setLoading] = useState(false);
  useEffect(() => {
    if(products && userId){
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/products/recommender/${userId._id}`);
        setRecommender(response.data.result);
        if(response.status === 200) {
            try {
                const productDataList = await Promise.all(products.map(async (product) => {
                    const productId = product._id;
                    const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
                    const productData = response.data;
                    return { productId, productData };
                }));
                setSavePd(productDataList);
            } catch (error) {
                console.error(error);
            }
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchProductData();
  }
  }, [products,userId]);

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
  return (
    <>
      <div className="featured-product">
        <p className="featured-product-title">Today's Suggestions</p>
        <div className="container-list">
          {loading ? <LoadingSmall/> : <Swiper
            spaceBetween={50}
            loop={true}
            slidesPerView={4}
            navigation={true}
            className="featured-product-slide"
            modules={[Navigation]}
          >
            {recommender &&
              recommender.map((item) => {
                const productData = savePd.find((pd) => pd.productId === item._id);
                const feedbackData = productData
                ? productData.productData.feedback
                : [];
                const totalRating = getTotalRating(feedbackData);
                return (
                  <SwiperSlide key={item._id}>
                    <div className="product-item">
                      <div className="product-item-image">
                        <Link to={`/detail/${item._id}`}>
                          <img src={item.images.url} alt={"product-image"} />
                        </Link>
                        {item.discountPercentage && item.discountExpiration ? 
                          <div className="coupon">
                            <span>{item.discountPercentage}%</span>
                            <span>OFF</span>
                            {/* <span>{item.discountExpiration ? moment(item.discountExpiration).format('DD/MM/YYYY') : ''}</span> */}
                          </div> : null
                        }
                      </div>
                      <div className="product-item-detail">
                        <h3 className="product-name">
                          <Link to={`/detail/${item._id}`}>{item.title}</Link>
                        </h3>
                        <div className="product-detail">
                          <div className="product-detail-meta">
                          {item.discountPercentage ? 
                              <div className="price-both">
                                <span style={{ textDecoration: 'line-through' }}>{((item.price) / (1 - (item.discountPercentage / 100))).toLocaleString("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                })}</span>
                                <span className="product-price">{item.price.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                              })}</span>
                              </div> : 
                              <span className="product-price">
                                {item.price.toLocaleString("en-US", {
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
                          <span>sold : {item.sold ? item.sold : 0}</span>
                          <Link
                            to={`/detail/${item._id}`}
                            className="btn btn--animated btn--primary--white btn--border--blue"
                          >
                            Buy Now
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

export default RecommenderUser;
