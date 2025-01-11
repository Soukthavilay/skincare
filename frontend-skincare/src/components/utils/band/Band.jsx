import { Link } from 'react-router-dom';
import '../scss/band.scss'
import axios from 'axios';
import { useEffect, useState } from 'react';

const Band = () => {
  const [bandList, setBandList] = useState([]);

  useEffect(() => {
    const fetchBandList = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/band");
        setBandList(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchBandList();
  }, []);

  return (
    <>
      <div className="band-list">
        <ul>
          {bandList.map((band) => (
            <li className="band-list-li" key={band._id}>
              {/* <Link to={`/product-list/${band._id}`}>
                <img src={band.logo ? band.logo.url : ""} alt={band.name} />
              </Link> */}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Band;
