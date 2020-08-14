import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { DRContextProvider } from './context/DRContext';

ReactDOM.render(
  <BrowserRouter>
    <DRContextProvider>
      <App />
    </DRContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);


