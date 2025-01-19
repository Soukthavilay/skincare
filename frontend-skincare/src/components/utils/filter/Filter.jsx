import { Link } from 'react-router-dom';
import '../scss/filter.scss'
import { useContext, useEffect, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
const Filter = () => {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [bands] = state.BandAPI.bands;
  const [categoryIDs, setCategoryIDs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenBand, setIsOpenBand] = useState(false);
  useEffect(() => {
    const categoryNames = ['Laptop', 'Phones', 'Devices', 'Headphones', 'Speakers'];
    const filteredIDs = categories.filter((item) => categoryNames.includes(item.name)).map((item) => item._id);
    setCategoryIDs(filteredIDs);
  }, [categories]);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsOpenBand(false)
  };
  const toggleDropdownBand = () => {
    setIsOpenBand(!isOpenBand);
    setIsOpen(false)
  }
  return (
    <>
      <div className="menu-content">
        <div className="menuMargen">
          <div className="Btncateg">
            <Link to="#" className="btnCategories" onClick={toggleDropdown}>
              {/* <div className="all-menu">all</div> */}
              <strong>
                categories
                <span>
                  <svg width="8" height="8" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 5l4-5H0z" fill="#FFF" fillRule="evenodd" />
                  </svg>
                </span>
              </strong>
            </Link>
            {isOpen && (
              <div className="category-dropdown">
                <ul className="option-menu">
                  {categories.map((category) => (
                    <li className="option" key={category._id}>
                      <Link to={`/product-list/${category._id}`}>
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="Btnband">
            <Link to="#" className="btn-band" onClick={toggleDropdownBand}>
              {/* <div className="all-menu">all</div> */}
              <strong>
                brands{" "}
                <span>
                  <svg width="8" height="8" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 5l4-5H0z" fill="#FFF" fillRule="evenodd" />
                  </svg>
                </span>
              </strong>
            </Link>
            {isOpenBand && (
              <div className="band-dropdown">
                <ul className="option-menu">
                  {bands.map((band) => (
                    <li className="option" key={band._id}>
                      <Link to={`/product-list/${band._id}`}>
                        {band.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="menu-choice">
            <ul className="option-menu">
              <li className="option">
                <Link to={`/product-list/${categoryIDs[4]}`}>
                  Computers
                </Link>
              </li>
              <li className="option">
                <Link to={`/product-list/${categoryIDs[0]}`}>
                  Phones
                </Link>
              </li>
              <li className="option">
                <Link to={`/product-list/${categoryIDs[1]}`}>
                  Gaming
                </Link>
              </li>
              <li className="option">
                <Link to={`/product-list/${categoryIDs[2]}`}>
                  Devices
                </Link>
              </li>
              <li className="option">
                <Link to={`/product-list/${categoryIDs[3]}`}>
                  Hot Deals
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter