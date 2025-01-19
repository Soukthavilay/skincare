import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {MdLogout} from 'react-icons/md'
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RiArrowDownSLine } from "react-icons/ri";
import { AiOutlineSearch } from "react-icons/ai";
import { GlobalState } from "../../../GlobalState";
import { useTranslation } from 'react-i18next';

import '../scss/header.scss';
import axios from "axios";
// import LanguageSwitcher from "../../LanguageSwitcher";

const Header = () => {
    const state = useContext(GlobalState);
    const [isLogged] = state.userAPI.isLogged;
    const userDetail = state.userAPI.detail;
    const [cart] = state.userAPI.cart;
    const [cartCount, setCartCount] = useState(0);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        const count = cart.reduce((total, item) => total + item?.quantity, 0);
        setCartCount(count);
    }, [cart]);

    const logoutUser = async () => {
        await axios.get('http://localhost:5000/user/logout');
        localStorage.removeItem("accessToken")
        window.location.href = "/sign-in";
    };

    const handleSearch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/search?key=${searchKeyword}`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const LogoutRouter = () => {
        return (
          <>
            <div className="header-right">
            {/* <LanguageSwitcher/> */}
                <Link to='/myInfo' className="user-sign">
                    <div className="user-icon">
                      <img src={userDetail[0].avatar} alt={userDetail[0].avatar} width={40} height={40} />
                    </div>
                </Link>
                <div className="header-cart">
                    <Link to="/order-summary">
                        <AiOutlineShoppingCart />
                        <span className="header-cart-count">{cartCount}</span>
                    </Link>
                </div>
                <Link to="/" onClick={logoutUser}>
                    <MdLogout/>
                </Link>
            </div>
          </>
            
        )
    }

    return (
      <>
        <header>
          <div className="header-container">
            <div className="header__logo header-item">
              <Link to="/">
                <label className="text-2xl font-bold uppercase">
                  {t('labe-intro')}
                </label>
              </Link>
            </div>
            <div className="header-search header-item">
              <input 
                type="text" 
                name="search" 
                placeholder={t('labe-find-product')} 
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}/>
                {searchResults.length > 0 && (
                  <div className="search-results">
                    {searchResults.map((product) => (
                      <Link key={product._id} to={`/detail/${product._id}`}>
                        <div className="result-item">
                          <p>{t(`${product.title}`)}</p>
                          <img src={product.images.url} alt={"image-product"} width={30}/>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              <button onClick={handleSearch} className="search-btn"><AiOutlineSearch/></button>
            </div>
            
            {isLogged ? (
              LogoutRouter()
            ) : (
              <div className="header-right header-item">
                <Link to="/sign-in" className="user-sign">
                  <div className="header-right-user">
                    <AiOutlineUser className="user-icon"/>
                    <div className="header-right-user_detail">
                      <span>{t('labe-signIn')} / {t('labe-signUp')}</span>
                      <span>{t('account')} <RiArrowDownSLine /></span>
                    </div>
                  </div>
                </Link>
                <div className="header-cart">
                  <Link to="/order-summary">
                    <AiOutlineShoppingCart />
                    <span className="header-cart-count">0</span>
                  </Link>
                </div>
                {/* <LanguageSwitcher/> */}
              </div>
            )}
          </div>
        </header>
      </>
    );
}

export default Header;
