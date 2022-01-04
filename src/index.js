import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import App from './App';
import reportWebVitals from './reportWebVitals';

import { store, persistor } from './store';

import { Loader } from "./components";

import "./styles/tailwind.css";
import "./styles/custom.css";
import 'react-toastify/dist/ReactToastify.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'react-chat-elements/dist/main.css';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider >,
  document.getElementById('root')
);
reportWebVitals();
