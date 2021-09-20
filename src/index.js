import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './Redux/reduxhouse'
import { Provider } from 'react-redux'
import PayByRazorPay from './PayByRazorPay.js'

ReactDOM.render(
    <Provider store={store}>
      <App />
      {/* <PayByRazorPay /> */}
    </Provider>,
  document.getElementById('root')
);

