import { useParams } from "react-router-dom"
import { GlobalState } from "../../../GlobalState"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import "../scss/edit-product.scss"
import Loading from "../../utils/Loading/Loading"

const EditProduct = () => {
    const state = useContext(GlobalState);
    const [isAdmin] = state.userAPI.isAdmin;
    const [token] = state.token
    const [images, setImages] = useState(false);
    const [callback, setCallback] = state.productsAPI.callback;
    const [productShow] = state.productsAPI.products;
    const [category] = state.categoriesAPI.categories;
    const [bands] = state.BandAPI.bands;
    const [loading,setLoading] = useState(false);
    const [edit,setEdit] = useState({
        _id: '',
        title: "",
        description: "",
        price: 98000,
        images: {},
        colors: [],
    })
    const param = useParams();
    useEffect(()=>{
        if(param.id){
            productShow && productShow?.forEach(productItem => {
                if(productItem._id === param.id){
                    setEdit(productItem);
                    setImages(productItem.images);
                }
            });
        }
    },[param.id,productShow]);
    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            if (!isAdmin) return alert('You are not admin');
            const file = e.target.files[0];
            if (!file) return alert('The file is not correct.');
            if (file.size > 1024 * 1024) return alert('Image is large. Please try again');
            if (file.type !== 'image/jpeg' && file.type !== 'image/png') return alert('The file is not correct.Please check again ');
            let formData = new FormData();
            formData.append('file', file);
            setLoading(true);
            const res = await axios.post('http://localhost:5000/api/upload', formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            });
            setLoading(false);
            setImages(res.data);
        } catch (error) {
            console.log(error.response.data.msg);
        }
    }
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setEdit({ ...edit, [name]: value });
    }
    const handleColorChange = (colorIndex, field, value) => {
        const updatedColors = [...edit.colors];
        updatedColors[colorIndex] = {
          ...updatedColors[colorIndex],
          [field]: value
        };
        setEdit({
          ...edit,
          colors: updatedColors
        });
    };
    const handleSizeChange = (colorIndex, sizeIndex, field, value) => {
        const updatedColors = [...edit.colors];
        updatedColors[colorIndex].sizes[sizeIndex] = {
          ...updatedColors[colorIndex].sizes[sizeIndex],
          [field]: value
        };
        setEdit({
          ...edit,
          colors: updatedColors
        });
      };
      const handleAddColor = () => {
        setEdit({
          ...edit,
          colors: [...edit.colors, { colorName: "", colorCode: "", sizes: [] }]
        });
      };
      const handleAddSize = (colorIndex) => {
        const updatedColors = [...edit.colors];
        updatedColors[colorIndex].sizes.push({ sizeName: "", quantity: 0, price: 0 });
        setEdit({
          ...edit,
          colors: updatedColors
        });
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.put(`http://localhost:5000/api/products/${edit._id}`, { ...edit, images },{
                headers: { Authorization: token },
            });
            setCallback(!callback);
            setLoading(false);
            window.location.href = '/admin/createProduct';
        } catch (error) {
            console.log(error);
        }
    }
    const handleDestroy = async () => {
        try {
            if (!isAdmin) return alert('you not admin');
            setLoading(true);
            await axios.post(
                'http://localhost:5000/api/destroy',
                { public_id: images.public_id },
                {
                    headers: { Authorization: token },
                }
            );
            setLoading(false);
            setImages(false);
        } catch (err) {
            alert(err.response.data.msg);
        }
    };
    const styleUpload = {
        display: images ? 'block' : 'none',
      };
  return (
    <>
        <div className="edit_product">
            <div className="header"> Update Product </div>
            <label htmlFor="file_up" className="upload-img-btn">
                Upload files
            </label>
            <div className="uploadImg">
                <input
                type="file"
                name="file"
                id="file_up"
                onChange={handleUpload}
                />
                {loading ? 
                <div id="file_img" className="no-line">
                    <Loading />
                </div> : 
                    <div id="file_img" style={styleUpload}>
                        <img src={images ? images.url : ""} alt="" />
                        <span onClick={handleDestroy}>X</span>
                    </div>
                }
            </div>
            <form className="createProduct" onSubmit={handleSubmit}>
                <div className="row">
                <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    value={edit.title ? edit.title : "no have"}
                    onChange={handleChangeInput}
                    placeholder="Title"
                    disabled
                />
                </div>
                <div className="row">
                <textarea
                    type="text"
                    name="description"
                    id="description"
                    required
                    value={edit.description ? edit.description : "no have"}
                    rows="10"
                    onChange={handleChangeInput}
                    placeholder="Description"
                    disabled
                />
                </div>
                <div className="row">
                <select name="band" value={edit.band ? edit.band : "no have"} onChange={handleChangeInput}>
                    <option>Band</option>
                    {bands.map((band)=>{
                    return <option value={band._id} key={band._id}>{band.name}</option>
                    })}
                </select>
                </div>
                <div className="row">
                <select
                    name="category"
                    value={edit.category ? edit.category : "no have"}
                    onChange={handleChangeInput}
                >
                    <option>Categories</option>
                    {category.map((item) => {
                    return (
                        <option value={item._id} key={item._id}>
                        {item.name}
                        </option>
                    );
                    })}
                </select>
                </div>
                <div className="row">
                <input
                    type="text"
                    name="price"
                    id="price"
                    required
                    value={edit.price}
                    onChange={handleChangeInput}
                    placeholder="Price"
                />
                </div>
                <div className="feature-product">
                    {edit.colors.map((color, colorIndex) => (
                    <div className="feature-product-item-big" key={colorIndex}>
                        <label>
                        Color Name:
                        <input
                            type="text"
                            value={color.colorName || ''}
                            onChange={(e) => handleColorChange(colorIndex, 'colorName', e.target.value)}
                        />
                        </label>
                        <label>
                        Color Code:
                        <input
                            type="text"
                            value={color.colorCode || ''}
                            onChange={(e) => handleColorChange(colorIndex, 'colorCode', e.target.value)}
                        />
                        </label>

                        {color.sizes.map((size, sizeIndex) => (
                        <div className="feature-product-item" key={sizeIndex}>
                            <label>
                            Size Name:
                            <input
                                type="text"
                                value={size.sizeName || ''}
                                onChange={(e) => handleSizeChange(colorIndex, sizeIndex, 'sizeName', e.target.value)}
                            />
                            </label>
                            <label>
                            Quantity:
                            <input
                                type="number"
                                value={size?.quantity || 0}
                                onChange={(e) => handleSizeChange(colorIndex, sizeIndex, 'quantity', parseInt(e.target.value, 10))}
                            />
                            </label>
                            <label>
                            Price:
                            <input
                                type="number"
                                value={size.price || 0}
                                onChange={(e) => handleSizeChange(colorIndex, sizeIndex, 'price', parseInt(e.target.value, 10))}
                            />
                            </label>
                        </div>
                        ))}

                        <button className='button btn btn--primary--white btn--border--blue' style={{ marginBottom: "10px" }} type="button" onClick={() => handleAddSize(colorIndex)}>Add Size</button>
                    </div>
                    ))}

                    </div>
                    <button className='button btn btn--primary--white btn--border--blue' type="button" style={{ marginBottom: "10px" }} onClick={handleAddColor}>Add Color</button>
                <button
                type="submit"
                className="btn btn--primary--blue btn--border--blue"
                >
                Update
                </button>
            </form>
        </div>
    </>
  )
}

export default EditProduct