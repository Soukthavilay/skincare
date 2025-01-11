import StarRatings from "react-star-ratings"
import { GlobalState } from "../../../GlobalState";
import { useParams, useHistory } from 'react-router-dom';
import React, { useContext, useEffect, useState } from "react";
import Loading from "../../utils/Loading/Loading";
import { useTranslation } from '../../../../node_modules/react-i18next';

import axios from "axios";
const Review = (product_id) => {
    const state = useContext(GlobalState);
    const [token] = state.token;
    const [pd] = state.productsAPI.products;
    const param = useParams();
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState(false);
    const [score, setScore] = useState(0);
    const [productID, setProductID] = useState('');
    const [content, setContent] = useState('');
    const history = useHistory();
    const idProduct = product_id.productID;
    const { t } = useTranslation();

    useEffect(() => {
        if (idProduct) {
            pd.forEach((item) => {
                if (item._id === idProduct) {
                    setProductID(item._id);
                }
            });
        }
    }, [idProduct, pd]);
    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            const file = e.target.files[0];
            if (!file) return alert('File does not exist.');
            if (file.size > 1024 * 1024)
                return alert('Image size is too big. Try to change another photo');
            if (file.type !== 'image/jpeg' && file.type !== 'image/png')
                // 1mb
                return alert('The file is incorrect. Please check back');
            let formData = new FormData();
            formData.append('file', file);

            setLoading(true);
            const res = await axios.post('http://localhost:5000/api/upload', formData, {
            });
            setLoading(false);
            setImages(res.data);
        } catch (err) {
            alert(err.response.data.msg);
        }
    };
    const styleUpload = {
        display: images ? 'block' : 'none',
    };
    const xStyle = {
        color: 'red',
        left: '69px',
        top: '-20px',
    }
    const handleDestroy = async () => {
        try {
            setLoading(true);
            await axios.post(
                'http://localhost:5000/api/destroy',
                { public_id: images.public_id },
            );
            setLoading(false);
            setImages(false);
        } catch (err) {
            alert(err.response.data.msg);
        }
    };
    const changeRating = (newRating) => {
        setScore(Math.round(newRating));
    }
    const handleChangeInput = (e) => {
        const { value } = e.target;
        setContent(value);
    };
    const handleFeedback = async (e) => {
        const result = {
            content: content,
            image_url: images.url,
            product_id: productID,
            rating: score,
        };
        await axios.post(
            'http://localhost:5000/api/feedback/create',
            { ...result },
            {
                headers: { Authorization: token },
            }
        );
        alert('Thank you for your feedback !');
        window.location.reload();
    };
    return (
        <>
            <h3>{t("label-review-writing")}</h3>

            <div className="comment-form">
                {/* <input type="text" placeholder="Name" /> */}
                <StarRatings
                    name="rating"
                    rating={score}
                    changeRating={changeRating}
                    starHoverColor="#fadb14"
                    starRatedColor="#fadb14"
                    starDimension="16px"
                    starSpacing="2px"
                />
                <textarea
                    name="content"
                    id="contentUser"
                    cols="30"
                    rows="5"
                    placeholder={t("label-review-comment")}
                    onChange={handleChangeInput}
                // value={content}
                ></textarea>
                <div className="uploadImg">
                <div className="upload">
                    <input type="file" name="file" id="file_up" onChange={handleUpload} />
                    <label htmlFor="file_up" className="upload-img-btn">{t("label-upload-files")}</label>
                    {loading ? (
                    <div id="file_img">
                        <Loading />
                    </div>
                    ) : (
                    <div id="file_img" style={styleUpload}>
                        <img src={images ? images.url : ''} alt="" />
                        <span style={xStyle} onClick={handleDestroy}>X</span>
                    </div>
                    )}
                </div>
                </div>
                <button type="button" onClick={handleFeedback} className="btn btn--animated btn--primary--blue btn--border--blue">
                    {t("label-submit-a-review")}
                </button>
            </div>
        </>
    )
}

export default Review