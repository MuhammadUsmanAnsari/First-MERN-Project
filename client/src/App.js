import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes/Routes'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes />
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
