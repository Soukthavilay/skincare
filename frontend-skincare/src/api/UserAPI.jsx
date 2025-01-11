import { useState, useEffect } from 'react';
import axios from 'axios';
function UserAPI(token){
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([]);
    const [history, setHistory] = useState([]);
    const [detail,setDetail] = useState([]);
    const [order,setOrder] = useState([]);

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                const res = await axios.get('http://localhost:5000/user/infor', {
                    headers: { Authorization: token },
                });
                setDetail(res.data);
                setIsLogged(true);
                if(res.data.role === 1){
                    setIsAdmin(true)
                } else if(res.data.role === 0) {
                    setIsAdmin(false)
                }
                setCart(res.data.cart)
                } catch (err) {
                alert(err.response.data.msg);
                }
            };
            getUser();
        }
    }, [token]);

    useEffect(()=>{
        if(token){
            try {
                const getMyorder = async ()=>{
                    const res = await axios.get("http://localhost:5000/api/orders",{
                    headers: {
                        Authorization: token,
                    },
                    });
                    if(Array.isArray(res.data)){
                        setOrder(res.data);
                    } else {
                        throw new Error('Invalid order data');
                    }
                };
                getMyorder();
                } catch (error) {
                console.log("error.message");
                }
        }
    },[token]);

    const addCart = async (product,count, dataSize, selectedColor) => {
        if (!isLogged) return alert('Please login to continue buying');
        if(product.amount === 0) return alert('This type not have in stock');
        const check = cart.every(item =>{
            return item._id !== product._id
        });
        if(check){
            const updatedColor = { ...selectedColor, sizes: dataSize };
            setCart([...cart, {...product, quantity:count, colors: updatedColor, price:updatedColor.sizes.price}]);
            await axios.patch('http://localhost:5000/user/addcart',{cart:[...cart, {...product, quantity: count, colors: updatedColor,price:updatedColor.sizes.price|| product.price}]},{
                headers:{
                    Authorization: token
                }
            })
        } else {
            alert("This product has been added to cart.");
        }
    }

    

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart,
        history: [history, setHistory],
        detail:[detail,setDetail], 
        order:[order,setOrder],
    };
}

export default UserAPI