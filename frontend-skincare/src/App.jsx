
import { BrowserRouter as Router} from 'react-router-dom';
import User from './components/user/Page';
import { DataProvider } from './GlobalState';
import TopHeader from './components/utils/top-header/TopHeader';
import Header from './components/utils/header/Header';
import { Footer } from './components/utils/footer/Footer';
import { LanguageProvider } from './context/LanguageContext';

const App = () => {

  return (
    <DataProvider>
      <LanguageProvider>
        <Router>
          <div className="header">
            <TopHeader/>
            <Header/>
          </div>
          <div className="page-content">
            <User/>
          </div>
          <Footer/>
        </Router>
      </LanguageProvider>
    </DataProvider>
  );
};

export default App;
