import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './i18n';
import { LanguageProvider } from './context/LanguageContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
      <I18nextProvider i18n={i18n}>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </I18nextProvider>
    </Router>
);
