import { Link } from 'react-router-dom'
import '../scss/categoryItem.scss'
import { useTranslation } from '../../../../node_modules/react-i18next';

const CategoryItem = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="categories-item">
        <div className="banners-double">
          <Link target='_parent' to={`/product-list/65ae67f88b38bd5b6c4f22e2`} className="banner_fam" title="Áo Polo">
            <div className="view">
              <picture>
                <source media="(min-width: 721px)" srcSet="https://www.sephora.com/contentimages/2025-jan-makeup-mbc-site-home-page-RWD-hero-banner-us-release-image-only.jpg" />
                <source media="(max-width: 720px)" srcSet="https://www.sephora.com/contentimages/2025-jan-makeup-mbc-site-home-page-RWD-hero-banner-us-release-image-only.jpg" />
                <img src="https://www.sephora.com/contentimages/2025-jan-makeup-mbc-site-home-page-RWD-hero-banner-us-release-image-only.jpg" alt="Phones" className="logo-corto img-responsive w-full h-full" />
              </picture>
              <div className="block_gris"></div>
              <div className="topbannerh">
                <h2 className='nom_banner_h'>{t("categoryTitles.678204a8ec16eb49d8f35966")}</h2>
              </div>
            </div>
          </Link>
          <Link target='_parent' to={`/product-list/65ae67f88b38bd5b6c4f22e2`} className="banner_fam" title="Áo Polo">
            <div className="view">
              <picture>
                <source media="(min-width: 721px)" srcSet="https://www.sephora.com/contentimages/homepage/050124/2025-jan-skin-story-site-home-page-hero-banner-image-only-us-2833-handoff-2000x2000.jpeg?imwidth=545" />
                <source media="(max-width: 720px)" srcSet="https://www.sephora.com/contentimages/homepage/050124/2025-jan-skin-story-site-home-page-hero-banner-image-only-us-2833-handoff-2000x2000.jpeg?imwidth=545" />
                <img src="https://www.sephora.com/contentimages/homepage/050124/2025-jan-skin-story-site-home-page-hero-banner-image-only-us-2833-handoff-2000x2000.jpeg?imwidth=545" alt="Phones" className="logo-corto" />
              </picture>
              <div className="block_gris"></div>
              <div className="topbannerh">
                <h2 className='nom_banner_h'>{t("categoryTitles.6782048dec16eb49d8f35962")}</h2>
              </div>
            </div>
          </Link>
          <Link target='_parent' to={`/product-list/65ae67ef8b38bd5b6c4f22de`} className="banner_fam" title="Devices">
            <div className="view">
              <picture>
                <source media="(min-width: 721px)" srcSet="https://www.sephora.com/contentimages/2025-1-4-dae-desert-detox-shampoo-site-desktop-home-page-rwd-hero-banner-1200x800-en-us-can.jpg?imwidth=545" />
                <source media="(max-width: 720px)" srcSet="https://www.sephora.com/contentimages/2025-1-4-dae-desert-detox-shampoo-site-desktop-home-page-rwd-hero-banner-1200x800-en-us-can.jpg?imwidth=545" />
                <img src="https://www.sephora.com/contentimages/2025-1-4-dae-desert-detox-shampoo-site-desktop-home-page-rwd-hero-banner-1200x800-en-us-can.jpg?imwidth=545" alt="Devices" className="logo-corto" />
              </picture>
              <div className="block_gris"></div>
              <div className="topbannerh">
                <h2 className='nom_banner_h'>{t("categoryTitles.67820457ec16eb49d8f3595e")}</h2>
              </div>
            </div>
          </Link>
        </div>
        <div className="banners-triple">
        <Link target='_parent' to={`/product-list/65ae680f8b38bd5b6c4f22e6`} className="banner_fam" title="Computers">
            <div className="view">
              <picture>
                <source media="(min-width: 721px)" srcSet="https://www.sephora.com/contentimages/2025-01-03-slotting-value-size-standard-site-rwd-home-page-marketing-banner-HERRERA-US-handoff_01.jpg?imwidth=400" />
                <source media="(max-width: 720px)" srcSet="https://www.sephora.com/contentimages/2025-01-03-slotting-value-size-standard-site-rwd-home-page-marketing-banner-HERRERA-US-handoff_01.jpg?imwidth=400" />
                <img src="https://www.sephora.com/contentimages/2025-01-03-slotting-value-size-standard-site-rwd-home-page-marketing-banner-HERRERA-US-handoff_01.jpg?imwidth=400" alt="Computers" className="logo-corto" />
              </picture>
              <div className="block_gris"></div>
              <div className="topbannerh">
                <h2 className='nom_banner_h'>{t("categoryTitles.67820441ec16eb49d8f3595a")}</h2>
              </div>
            </div>
          </Link>
          <Link target='_parent' to={`/product-list/65ae681a8b38bd5b6c4f22ea`} className="banner_fam" title="Computers">
            <div className="view">
              <picture>
                <source media="(min-width: 721px)" srcSet="https://www.sephora.com/contentimages/2025-1-12-burberry-her-intense-eau-de-parfum-site-desktop-home-page-rwd-marketing-banner-1200x800-en-us-can.jpg?imwidth=400" />
                <source media="(max-width: 720px)" srcSet="https://www.sephora.com/contentimages/2025-1-12-burberry-her-intense-eau-de-parfum-site-desktop-home-page-rwd-marketing-banner-1200x800-en-us-can.jpg?imwidth=400" />
                <img src="https://www.sephora.com/contentimages/2025-1-12-burberry-her-intense-eau-de-parfum-site-desktop-home-page-rwd-marketing-banner-1200x800-en-us-can.jpg?imwidth=400" alt="Computers" className="logo-corto" />
              </picture>
              <div className="block_gris"></div>
              <div className="topbannerh">
                <h2 className='nom_banner_h'>{t("categoryTitles.67820408ec16eb49d8f3594e")}</h2>
              </div>
            </div>
          </Link>
          <Link target='_parent' to={`/product-list/65ae6b104b4dc368f0898b12`} className="banner_fam" title="Computers">
            <div className="view">
              <picture>
                <source media="(min-width: 721px)" srcSet="https://www.sephora.com/contentimages/2024-12-11-rare-beauty-by-selena-gomez-find-comfort-fragrance-mist-and-body-cream-site-app-home-page-rwd-marketing-banner-app-preview-800x534-en-us-can.jpg?imwidth=400" />
                <source media="(max-width: 720px)" srcSet="https://www.sephora.com/contentimages/2024-12-11-rare-beauty-by-selena-gomez-find-comfort-fragrance-mist-and-body-cream-site-app-home-page-rwd-marketing-banner-app-preview-800x534-en-us-can.jpg?imwidth=400" />
                <img src="https://www.sephora.com/contentimages/2024-12-11-rare-beauty-by-selena-gomez-find-comfort-fragrance-mist-and-body-cream-site-app-home-page-rwd-marketing-banner-app-preview-800x534-en-us-can.jpg?imwidth=400" alt="Computers" className="logo-corto" />
              </picture>
              <div className="block_gris"></div>
              <div className="topbannerh">
                <h2 className='nom_banner_h'>{t("categoryTitles.678204c2ec16eb49d8f3596a")}</h2>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default CategoryItem