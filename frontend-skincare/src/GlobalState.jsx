import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import UserAPI from './api/UserAPI';
import ProductsAPI from './api/ProductsAPI';
import CategoriesAPI from './api/CategoriesAPI';
import BandAPI from './api/BandAPI';
import axios from 'axios';
export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false);
    
    useEffect (()=>{
        const refres = localStorage.getItem("accessToken");
        if (refres) {
            const refreshToken = async () => {
                const res = await axios.get('http://localhost:5000/user/refresh_token', { withCredentials: true });
                setToken(res.data.accesstoken);
    
                setTimeout(()=>{
                    const refres = localStorage.getItem("accessToken");
                    if (refres) {
                        refreshToken();
                    }
                },10 * 60 * 1000)
            }
            refreshToken();
        }
    },[]);
    

    const state = {
        token: [token, setToken],
        userAPI: UserAPI(token),
        categoriesAPI: CategoriesAPI(),
        productsAPI: ProductsAPI(),
        BandAPI: BandAPI(),
    };

    return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
DataProvider.propTypes = {
    children: PropTypes.node.isRequired,
};