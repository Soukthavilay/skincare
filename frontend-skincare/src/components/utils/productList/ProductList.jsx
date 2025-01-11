import "../scss/product-list.scss";
import StarRatings from "react-star-ratings";
import { useContext,useState ,useEffect} from "react";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from "axios";
import Loading from "../Loading/Loading";
import ServiceList from "./ServiceList";
import SideBar from "./SideBar";
import { useTranslation } from 'react-i18next';

function ProductList() {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [products] = state.productsAPI.products;
  const [bands] = state.BandAPI.bands;
  const params = useParams();
  const [categoryList,setCategoryList] = useState();
  const [band,setBand] = useState();
  const [pdcate,setPdcate] = useState();
  const [loading,setLoading] = useState(false);
  const [savePd,setSavePd] = useState([]);
  const { t } = useTranslation();

  useEffect(()=>{
    if(params.id){
      const category = categories.find(category => category._id === params.id);
      const band = bands.find(band => band._id === params.id);
      if(band){
        setBand(band._id);
      } else if (category){
        setCategoryList(category._id);
      } else {
        console.log('No categories found for ID');
      }
    }
  },[categories,params.id,bands]);


  useEffect(()=>{
    setLoading(true);
    if(params.id === categoryList){
      if(categoryList){
        const getProductByCategory = async ()=>{
          const res = await axios.get(`http://localhost:5000/api/products/category/${categoryList}`)
          setPdcate(res.data.products);
          setLoading(false);
        }
        getProductByCategory();
      }
    } else if(params.id === band){
      if(band){
        const getProductByCategory = async ()=>{
          const res = await axios.get(`http://localhost:5000/api/products/band/${band}`)
          setPdcate(res.data.products);
          setLoading(false);
        }
        getProductByCategory();
      }
    }
  },[categoryList,band,params.id]);

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

  useEffect(()=>{
    if(pdcate?.length === 0 || pdcate === undefined){
      setLoading(true);
    } else {
      setLoading(false);
    }
  },[pdcate])

  useEffect(() => {
    if(pdcate === undefined || pdcate.length === 0){
      setTimeout(() => {
        setLoading(false);
      }, 2500);
    }
  }, [pdcate]);
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
  const HasProduct = () =>{
    return (
              <div className="product-list-items">
                {pdcate &&
                  pdcate.map((item) => {
                    const productData = savePd.find((pd) => pd.productId === item._id);
                    const feedbackData = productData
                      ? productData.productData.feedback
                      : [];
                    const totalRating = getTotalRating(feedbackData);
                    return (
                      <div style={{height: "fit-content"}} className="product-item" key={item._id}>
                        <div className="product-item-image">
                          <Link target='_parent' to={`/detail/${item._id}`}>
                            <img src={item.images.url} alt={"product-image"} />
                          </Link>
                          {item.discountPercentage && item.discountExpiration ? 
                          <div className="coupon">
                            <span>{item.discountPercentage}%</span>
                            <span>OFF</span>
                          </div> : null
                        }
                        </div>
                        <div className="product-item-detail">
                          <h3 className="product-name">
                            <Link target='_parent' to={`/detail/${item._id}`}>{t(`${item.title}`)}</Link>
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
                                  starDimension="12px"
                                  starSpacing="2px"
                                />
                                <span>({totalRating.total ? totalRating.total : 0})</span>
                              </div>
                            </div>
                            <span>{t("label-sold")} : {item.sold}</span>
                            <Link
                              target="_parent"
                              to={`/detail/${item._id}`}
                              className="btn btn--animated btn--primary--white btn--border--blue"
                            >
                              {t("label-buy-now")}
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
    )
  }
  return (
    <>
      <div className="product-list-banner">
        <img
          src="https://res.cloudinary.com/dkiofoako/image/upload/v1705335481/final/res6c4176a0a2ba724e93fec4b2c5c5bee3fr_myjcbo.jpg"
          alt="apple"
        />
      </div>
      <div className="product-list">
        <ServiceList />
        <div className="product-list-content">
          <SideBar />
          {loading ? 
            <Loading />
          : 
            <>
            {pdcate === undefined || pdcate.length === 0 ? <><div className="service-list">{t("label-sorry")}</div></> : 
              <HasProduct/>
            }
            </>
          }
        </div>
      </div>
    </>
  );
}

export default ProductList