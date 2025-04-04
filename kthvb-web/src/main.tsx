import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './i18n.js';
import './index.css';
// Import our custom CSS
import './scss/styles.scss'
import './index.css'
import { BrowserRouter, HashRouter } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>,
  );
} else {
  console.error("Could not find the 'root' element.");
}