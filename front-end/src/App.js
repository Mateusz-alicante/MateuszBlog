import React from 'react';
import MainRouter from './Routers/MainRouter'
import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import Header from './Components/Header/Header'
import Head from './Components/Head/Head'

import store from './utils/Redux/StoreConfig'
import { Provider } from 'react-redux'

function App() {
  return (
    <div className="App">
      <Head />
      <Provider store={store}>
        <Router>
          <Header />
          <MainRouter />
          <ToastContainer />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
