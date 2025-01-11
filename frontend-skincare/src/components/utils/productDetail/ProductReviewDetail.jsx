import StarRatings from "react-star-ratings";

function ProductReviewDetail(fd) {
  const feedback = fd.fd;
  const createdAtDateTime = new Date(feedback.createdAt);
  const formattedDateTime = createdAtDateTime.toLocaleString();

  return (
    <>
      <div className="product-reviews-detail">
        <div className="reviews-detail-item">
          <div className="reviews-detail-avatar">
            <span>{feedback.username?.charAt(0)}</span>
          </div>
          <div className="reviews-detail-content">
            <div className="review-detail-content_header">
              <div className="review-detail-content_header-left">
                <h5 className="reviews-username">{feedback.username}</h5>
                <StarRatings
                  name="rating"
                  rating={feedback.rating}
                  starRatedColor="#fadb14"
                  starDimension="16px"
                  starSpacing="2px"
                />
              </div>
              <div className="review-detail-content_header-right">
                <p>{formattedDateTime} </p>
              </div>
            </div>
            <img src={feedback.image_url} alt={feedback.image_url} width={200} />
            <p className="review-comment-text">{feedback.content}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductReviewDetail;
