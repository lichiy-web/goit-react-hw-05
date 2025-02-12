// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'modern-normalize';
import './reset.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App.jsx';
import { Toaster } from 'react-hot-toast';
import ToggleDevMode from './components/ToggleDevMode/ToggleDevMode.jsx';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <ToggleDevMode>
    <BrowserRouter>
      <App />
      <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
  </ToggleDevMode>
  // </StrictMode>
);
