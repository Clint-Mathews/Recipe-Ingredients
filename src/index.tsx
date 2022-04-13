import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store, { Peristor } from '../src/store'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import persistReduxStore from './utils/persistReduxStore';

const { persistor } = persistReduxStore()
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={Peristor}>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

