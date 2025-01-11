import parse from 'html-react-parser';

function ProductDetailBody(detailProduct) {
  const product = detailProduct.detailProduct;

  return (
    <>
      <div className="detail-body">
        <div className="detail-body-left">
          <div className="product-detail-content">
            {parse(`${product.description}`)}
          </div>
        </div>
        <div className="detail-body-right">
          {/* <h3 className="product-specs-title">
            <b>{t('label-specifications')}</b>
          </h3> */}
        </div>
      </div>
    </>
  );
}

export default ProductDetailBody