import { Link } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import { useContext, useEffect, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import axios from 'axios';
import SuccessPopup from '../../utils/NotFound/SuccessPopup';
import ConfirmPopup from '../../utils/NotFound/ConfirmPopup'

const ProductRow = ( productShow ) => {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [categories] = state.categoriesAPI.categories;
  const product = productShow.productShow;
  const [newNameCate, setNewNameCate] = useState();
  const public_id = product.images.public_id;
  const [error, setError] = useState("");
  const [alert,setAlert] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = async () => {
    try {
      const destroyImg = axios.post(
        'http://localhost:5000/api/destroy',
        { public_id },
        {
          headers: { Authorization: token },
        }
      );
      const deleteProduct = axios.delete(`http://localhost:5000/api/products/${product._id}`, {
        headers: { Authorization: token },
      });

      await destroyImg;
      await deleteProduct;
      setError("");
      setAlert("Delete Product Success");
    } catch (e) {
      console.log(e);
      setError(e.response.data.msg);
    }
  };

  useEffect(() => {
    categories.forEach(item => {
      if (item._id === product.category) {
        setNewNameCate(item.name);
      }
    });
  }, [categories, product]);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirm = () => {
    handleClick();
    setModalOpen(false);
  };
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleSuccessPopupClose = () => {
    setError("");
    setAlert("");
    window.location.reload();
  };

  return (
    <>
      <Link to={`/admin/edit_product/${product._id}`}>
        <div className="products-row">
          <button className="cell-more-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical">
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>
          <div className="product-cell image">
            <img src={product.images.url} alt={product.images.url} />
            <span>{product.name}</span>
          </div>
          <div className="product-cell category"><span className="cell-label">Category:</span>{newNameCate ? newNameCate : product.category}</div>
          <div className="product-cell status-cell">
            <span className="cell-label">Status:</span>
            <span className={`status ${product?.colors[0]?.sizes[0]?.quantity > 0 ? "active" : "canceled"}`}>{product?.colors[0]?.sizes[0]?.quantity > 0 ? "In Stock" : "Out of Stock"}</span>
          </div>
          <div className="product-cell sales"><span className="cell-label">Sales:</span>{product.sold}</div>
          <div className="product-cell stock"><span className="cell-label">Stock:</span>{product?.colors[0]?.sizes[0]?.quantity}</div>
          <div className="product-cell price"><span className="cell-label">Price:</span>{product.price}</div>
        </div>
      </Link>
      <div className="delete w-fit"><button className='text-white bg-black rounded-full' onClick={handleOpenModal}><AiFillCloseCircle /></button></div>
      { modalOpen && (<ConfirmPopup
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        />)}
      {error && (<SuccessPopup successMessage={error} onClose={handleSuccessPopupClose} />)}
      {alert && (<SuccessPopup successMessage={alert} onClose={handleSuccessPopupClose} />)}
    </>
  );
};

export default ProductRow;
