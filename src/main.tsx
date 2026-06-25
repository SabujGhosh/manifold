import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'katex/dist/katex.min.css';
import './styles/globals.css';
import './styles/katex-overrides.css';

// Deploy base (e.g. "/manifold/" on GitHub Pages, "/" at root). React Router
// wants it without a trailing slash.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

// Register the service worker for offline/installability (production only).
// Registered under the deploy base so its scope matches the app.
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => {
      /* registration failures are non-fatal */
    });
  });
}
