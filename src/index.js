import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Provider store={store}>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
        </Provider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);