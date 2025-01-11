// src/components/LanguageSwitcher.js
import { useLanguage } from '../context/LanguageContext';
import logoLA from '../assets/laos.png';
import logoVN from '../assets/vietnam.png'
import './utils/scss/utilsCss/langSwitch.scss'

const LanguageSwitcher = () => {
  const { changeLanguage } = useLanguage();

  return (
    <div className='switch-lang'>
      <button onClick={() => changeLanguage('la')}><img src={logoLA} width={30} height={30} alt="Logo" /></button>
      <button onClick={() => changeLanguage('vi')}><img src={logoVN} width={30} height={30} alt="Logo" /></button>
    </div>
  );
};

export default LanguageSwitcher;
