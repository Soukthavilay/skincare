import Band from '../../utils/band/Band'
import CategoryItem from '../../utils/categoryItem/CategoryItem'
import BestSeller from '../../utils/productItem/BestSeller'
import Recommand from '../../utils/productItem/Recommand'
import RecommenderUser from '../../utils/productItem/RecommenderUser'
import '../../utils/scss/banner.scss'


const Banner = () => {
  return (
    <>
        <div className="banner">
            <div className='img-slide'>
                <div className='wrapper'>
                    <img src="https://www.skincare.com/-/media/project/loreal/brand-sites/sdc/americas/us/homepage/category-heros/sdc-homepage-banner-white.jpg" alt="banner" />
                </div>
            </div>
        </div>
        <Band/>
        <CategoryItem/>
        {/* <RecommenderUser/> */}
        <Recommand/>
        <BestSeller/>
    </>
    
  )
}

export default Banner