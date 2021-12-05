import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { StoreConextProvider } from './store/store-context';

ReactDOM.render(
  <StoreConextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreConextProvider>,
  document.getElementById('root')
);
