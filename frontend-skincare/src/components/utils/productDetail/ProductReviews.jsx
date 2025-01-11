import { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';
import ProductReviewDetail from './ProductReviewDetail';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

function ProductReviews(detailProduct) {
  const dtProduct = detailProduct.detailProduct;
  const idProduct = dtProduct._id;
  const [result, setResult] = useState(0);
  const [feedback, setFeedback] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const { t } = useTranslation();

  useEffect(() => {
    if (idProduct) {
      const getFeedback = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/products/${idProduct}`);
          setFeedback(res.data.feedback);
        } catch (error) {
          alert(error.response.data.msg);
        }
      };
      getFeedback();
    }
  }, [idProduct]);

  useEffect(() => {
    if (feedback && feedback.length) {
      var total = 0;
      feedback?.map((FeedbackItem) => {
        total += FeedbackItem.rating;
      });
      setResult(total / feedback.length);
    }
  }, [feedback]);

  const feedbackTotal = feedback?.length || 0;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = feedback.slice(indexOfFirstItem, indexOfLastItem);


  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(feedback.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="product-reviews">
        <h3 className="product-reviews-title">{t('label-review-product')}</h3>
        <div className="product-reviews-summary">
        <div className="reviews-summary-item">
            <h4>{t('label-review-product-score')}</h4>
            <span className="average-star">{result} / {feedbackTotal}</span>
            <StarRatings
              name="rating"
              rating={result}
              starRatedColor="#fadb14"
              starDimension="16px"
              starSpacing="2px"
            />
            <span className="total-comment">{t('label-review')}</span>
          </div>
        </div>

        {feedback?.length ? (
          <>
            {currentItems.map((item) => (
              <ProductReviewDetail key={item._id} fd={item} />
            ))}
            {feedback.length > itemsPerPage && (
              <div className="pagination">
                {pageNumbers.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    className={pageNumber === currentPage ? 'active' : ''}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <p>{t('label-not-review')}</p>
        )}
      </div>
    </>
  );
}

export default ProductReviews;
