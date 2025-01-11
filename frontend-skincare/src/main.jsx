import React from 'react';
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx';
import './index.css';
import './i18n';
import { LanguageProvider } from './context/LanguageContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </I18nextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
